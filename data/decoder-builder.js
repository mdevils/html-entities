/*
 * Tool for building code for decoding named and numeric character references
 *
 * Code according to rule specified by
 * https://html.spec.whatwg.org/multipage/parsing.html#character-reference-state
 */

/*************************** Code overview ***************************/
/*
function(input, strict) {
    var segments = input.split('&');
    var output = '';
    for (var i=1; i<segments.length; i++) {
        seg = segments[i];
        if (seg.charAt(0) == '#') {
            // decode numeric char reference
        } else {
            // decode named char reference
        }
        output += '&' + seg; // fall back
    }
    return output;
}
*/

const fs = require('fs');
const { legacyEntitiesSorted, html4EntitiesSorted, html5EntitiesSorted } =
    require('./entities-dict');

const ERRORS = {
    NULL_CHAR_REF:         { CODE: 0, MSG: "null character reference" },
    OUT_OF_RANGE_CHAR_REF: { CODE: 1, MSG: "character reference outside unicode range" },
    SURROGATE_CHAR_REF:    { CODE: 2, MSG: "surrogate character reference" },
    NON_CHARACTER:         { CODE: 3, MSG: "non-character character reference" },
    CTRL_CHARACTER:        { CODE: 4, MSG: "control character character reference" },
    MISSING_DIGIT:         { CODE: 6, MSG: "missing digit in numeric character reference" },
    UNKNOWN_NAMED_CHAR_REF:{ CODE: 7, MSG: "unknown named character reference" },
    MISSING_SEMICOLON:     { CODE: 9, MSG: "missing semicolon after character reference" },
}

function buildNumericCharRefDecoder() {
    // https://infra.spec.whatwg.org/#noncharacter
    const NON_CHARACTER = [
        /* 0xFDD0-0xFDEF (range comparision used) */
        0xFFFF, 0x1FFFE, 0x1FFFF, 0x2FFFE, 0x2FFFF, 0x3FFFE, 0x3FFFF, 0x4FFFE,
        0x4FFFF, 0x5FFFE, 0x5FFFF, 0x6FFFE, 0x6FFFF, 0x7FFFE, 0x7FFFF, 0x8FFFE,
        0x8FFFF, 0x9FFFE, 0x9FFFF, 0xAFFFE, 0xAFFFF, 0xBFFFE, 0xBFFFF, 0xCFFFE,
        0xCFFFF, 0xDFFFE, 0xDFFFF, 0xEFFFE, 0xEFFFF, 0xFFFFE, 0xFFFFF, 0x10FFFE,
        0x10FFFF
    ];

    // https://html.spec.whatwg.org/multipage/parsing.html#numeric-character-reference-end-state
    const C1_REPLACE = [
        { from: 0x80, to: 0x20AC },
        { from: 0x82, to: 0x201A },
        { from: 0x83, to: 0x0192 },
        { from: 0x84, to: 0x201E },
        { from: 0x85, to: 0x2026 },
        { from: 0x86, to: 0x2020 },
        { from: 0x87, to: 0x2021 },
        { from: 0x88, to: 0x02C6 },
        { from: 0x89, to: 0x2030 },
        { from: 0x8A, to: 0x0160 },
        { from: 0x8B, to: 0x2039 },
        { from: 0x8C, to: 0x0152 },
        { from: 0x8E, to: 0x017D },
        { from: 0x91, to: 0x2018 },
        { from: 0x92, to: 0x2019 },
        { from: 0x93, to: 0x201C },
        { from: 0x94, to: 0x201D },
        { from: 0x95, to: 0x2022 },
        { from: 0x96, to: 0x2013 },
        { from: 0x97, to: 0x2014 },
        { from: 0x98, to: 0x02DC },
        { from: 0x99, to: 0x2122 },
        { from: 0x9A, to: 0x0161 },
        { from: 0x9B, to: 0x203A },
        { from: 0x9C, to: 0x0153 },
        { from: 0x9E, to: 0x017E },
        { from: 0x9F, to: 0x0178 }
    ]
    return `
            j = 1;
            var cc = seg.charCodeAt(1);
            var num = 0;
            var isEmpty;
            if ((cc == ${'x'.charCodeAt(0)}) || (cc == ${'X'.charCodeAt(0)})) {
                do {
                    cc = seg.charCodeAt(++j);
                    if ((cc > ${'0'.charCodeAt(0)-1}) && (cc < ${'9'.charCodeAt(0)+1})) { num = num * 16 + cc - ${'0'.charCodeAt(0)}; }
                    else if ((cc > ${'a'.charCodeAt(0)-1}) && (cc < ${'f'.charCodeAt(0)+1})) { num = num * 16 + cc - ${'a'.charCodeAt(0) - 10}; }
                    else if ((cc > ${'A'.charCodeAt(0)-1}) && (cc < ${'F'.charCodeAt(0)+1})) { num = num * 16 + cc - ${'A'.charCodeAt(0) - 10}; }
                    else break;
                } while (1)
                isEmpty = j <= 2;
            } else {
                while (1) {
                    if ((cc < ${'0'.charCodeAt(0)}) || (cc > ${'9'.charCodeAt(0)})) break;
                    num = num * 10 + cc - ${'0'.charCodeAt(0)};
                    cc = seg.charCodeAt(++j);
                }
                isEmpty = j < 1;
            }
            if (isEmpty) {
                parseError("${ERRORS.MISSING_DIGIT.MSG}",${ERRORS.MISSING_DIGIT.CODE});
                output += '&' + seg;
                continue;
            }
            if (cc == ${';'.charCodeAt(0)}) {
                j++;
            } else if (strict) {
                parseError("${ERRORS.MISSING_SEMICOLON.MSG}",${ERRORS.MISSING_SEMICOLON.CODE});
                output += '&' + seg;
                continue;
            }
            if (num > ${0x10FFFF}) {
                parseError("${ERRORS.OUT_OF_RANGE_CHAR_REF.MSG}",${ERRORS.OUT_OF_RANGE_CHAR_REF.CODE});
                output += '\\uFFFD' + seg.substring(j);
            } else if (num == 0) {
                parseError("${ERRORS.NULL_CHAR_REF.MSG}",${ERRORS.NULL_CHAR_REF.CODE});
                output += '\\uFFFD' + seg.substring(j);
            } else if ( (num > ${0xD800-1}) && (num < ${0xDFFF+1}) ) {
                parseError("${ERRORS.SURROGATE_CHAR_REF.MSG}",${ERRORS.SURROGATE_CHAR_REF.CODE});
                output += '\\uFFFD' + seg.substring(j);
            } else {` + /* https://infra.spec.whatwg.org/#c0-control */ `
                if (((num > ${0xFDD0-1}) && (num < ${0xFDEF+1})) || ([${NON_CHARACTER.join(',')}].indexOf(num) >= 0)) {
                    parseError("${ERRORS.NON_CHARACTER.MSG}",${ERRORS.NON_CHARACTER.CODE});
                } else if ((num == ${0x0D}) || (num < ${0x001F+1})) {
                    parseError("${ERRORS.CTRL_CHARACTER.MSG}",${ERRORS.CTRL_CHARACTER.CODE});
                } else if ((num > ${0x007F-1}) && (num < ${0x009F+1})) {
                    parseError("${ERRORS.CTRL_CHARACTER.MSG}",${ERRORS.CTRL_CHARACTER.CODE});
                    var k = [${C1_REPLACE.map(el => el.from).join(',')}].indexOf(num);
                    if (k >= 0) num = [${C1_REPLACE.map(el => el.to).join(',')}][k];
                }
                output += String.fromCharCode(num) + seg.substring(j);
            }
            continue;`;
}


function buildDecoder(entities) {
    let decoderSource  =
`function(input, strict, parseError) {
    if (!input || !input.length) return '';
    var segments = input.split('&');
    if (segments.length == 1) return input;
    var output = segments[0];
    var j = 0;
    for (var i=1; i<segments.length; i++) {
        var seg = segments[i];
        if (seg.charAt(0) == '#') {` +
           `${buildNumericCharRefDecoder()}
        } else {
            var candidateLen = seg.indexOf(';');
            var candidateStr = seg.substring(0, candidateLen)
            %%NamedEntityParserCodeStrict%%
            if (strict) {
                if (candidateLen) parseError("${ERRORS.UNKNOWN_NAMED_CHAR_REF.MSG}",${ERRORS.UNKNOWN_NAMED_CHAR_REF.CODE});
                else parseError("${ERRORS.MISSING_SEMICOLON.MSG}",${ERRORS.MISSING_SEMICOLON.CODE});
            } else {
                if (candidateStr == 'AMP') {
                    output += '&' + seg.substring(4); continue;
                } else if (candidateStr == 'GT') {
                    output += '>' + seg.substring(3); continue;
                } else if (candidateStr == 'LT') {
                    output += '<' + seg.substring(3); continue;
                } else if (candidateStr == 'QUOT') {
                    output += '"' + seg.substring(5); continue;
                }` +
               `%%NamedEntityParserCodeQuirk%%
            }
        }
        output += '&' + seg;
    }
    return output;
}`;

    // Generate strict named entity parser
    let namedEntityParserCodeStrict = '';
    Object.keys(entities).sort( (a,b) => parseInt(a) - parseInt(b) ).forEach((entityLen) => {
        entityLen = parseInt(entityLen);
        const named = entities[entityLen].named;
        const decoded = entities[entityLen].decoded;
        if (namedEntityParserCodeStrict != '')
            namedEntityParserCodeStrict += ' else ';
        if (named.length > 2) {
            namedEntityParserCodeStrict +=
           `if (candidateLen == ${entityLen}) {
                j = [${named.join(',')}].indexOf(candidateStr);
                if (j >= 0) {
                    output += [${decoded.join(',')}][j]
                              + seg.substring(${entityLen+1});
                    continue;
                }
            }`;
        } else if (named.length == 2) {
            namedEntityParserCodeStrict +=
           `if (candidateLen == ${entityLen}) {
                if (candidateStr == ${named[0]}) {
                    output += ${decoded[0]} + seg.substring(${entityLen+1});
                    continue;
                } else if (candidateStr == ${named[1]}) {
                    output += ${decoded[1]} + seg.substring(${entityLen+1});
                    continue;
                }
            }`;
        } else {
            namedEntityParserCodeStrict +=
           `if (candidateStr == ${named[0]}) {
                output += ${decoded[0]} + seg.substring(${entityLen+1});
                continue;
            }`;
        }
    })

    // Generate quirky named entity parser
    let namedEntityParserCodeQuirk = '';

    function indent4(codeBlock) {
        return codeBlock.split('\n').map( (line) => '    ' + line ).join('\n');
    }
    Object.keys(legacyEntitiesSorted).sort( (a,b) => parseInt(a) - parseInt(b) ).reverse().forEach((entityLen) => {
        let innerParserCode = '';
        entityLen = parseInt(entityLen);
        const named = legacyEntitiesSorted[entityLen].named;
        const decoded = legacyEntitiesSorted[entityLen].decoded;
        if (named.length > 2) {
            innerParserCode =`
                    j = [${named.join(',')}].indexOf(candidateStr);
                    if (j >= 0) {
                        output += [${decoded.join(',')}][j]
                                  + seg.substring(${entityLen});
                        continue;
                    }`;
        } else if (named.length == 2) {
            innerParserCode =`
                    if (candidateStr == ${named[0]}) {
                        output += ${decoded[0]} + seg.substring(${entityLen});
                        continue;
                    } else if (candidateStr == ${named[1]}) {
                        output += ${decoded[1]} + seg.substring(${entityLen});
                        continue;
                    }`;
        } else {
            innerParserCode =`
                    if (candidateStr == ${named[0]}) {
                        output += ${decoded[0]} + seg.substring(${entityLen});
                        continue;
                    }`;
        }

        namedEntityParserCodeQuirk =
`                if (seg.length >= ${entityLen}) {
                    candidateStr = seg.substring(0, ${entityLen});` +
                    innerParserCode +
                    (
                        namedEntityParserCodeQuirk !== ''
                            ? ('\n' + indent4(namedEntityParserCodeQuirk))
                            : ''
                    ) + `
                }`;
    })

    decoderSource =  decoderSource.replace('%%NamedEntityParserCodeStrict%%', namedEntityParserCodeStrict);
    decoderSource =  decoderSource.replace('%%NamedEntityParserCodeQuirk%%', '\n' + namedEntityParserCodeQuirk);
    return decoderSource;
}

const decoderSource =
`/* THIS IS GENERATED SOURCE. DO NOT EDIT */

/* eslint-disable no-constant-condition */

var ERRORS = {
    NULL_CHAR_REF: ${ERRORS.NULL_CHAR_REF.CODE},
    OUT_OF_RANGE_CHAR_REF: ${ERRORS.OUT_OF_RANGE_CHAR_REF.CODE},
    SURROGATE_CHAR_REF:${ERRORS.SURROGATE_CHAR_REF.CODE},
    NON_CHARACTER: ${ERRORS.NON_CHARACTER.CODE},
    CTRL_CHARACTER: ${ERRORS.CTRL_CHARACTER.CODE},
    MISSING_DIGIT: ${ERRORS.MISSING_DIGIT.CODE},
    UNKNOWN_NAMED_CHAR_REF:${ERRORS.UNKNOWN_NAMED_CHAR_REF.CODE},
    MISSING_SEMICOLON: ${ERRORS.MISSING_SEMICOLON.CODE},
}

var decodeHTML4Entities = ${buildDecoder(html4EntitiesSorted)}

var decodeHTML5Entities = ${buildDecoder(html5EntitiesSorted)}

module.exports = {decodeHTML5Entities, decodeHTML4Entities, ERRORS};
`

fs.writeFileSync('../lib/entities-decoder.js', decoderSource);
