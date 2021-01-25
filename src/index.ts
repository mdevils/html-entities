import {bodyRegExps, namedReferences} from './named-references';
import {numericUnicodeMap} from './numeric-unicode-map';
import {fromCodePoint, getCodePoint} from './surrogate-pairs';

const allNamedReferences = {
    ...namedReferences,
    all: namedReferences.html5
};

export type Level = 'xml' | 'html4' | 'html5' | 'all';

interface CommonOptions {
    level?: Level;
}

export type EncodeMode = 'specialChars' | 'nonAsciiPrintable' | 'nonAscii';

export interface EncodeOptions extends CommonOptions {
    mode?: EncodeMode;
    numeric?: 'decimal' | 'hexadecimal';
}

export type DecodeScope = 'strict' | 'body' | 'attribute';

export interface DecodeOptions extends CommonOptions {
    scope?: DecodeScope;
}

const encodeRegExps: Record<EncodeMode, RegExp> = {
    specialChars: /[<>'"&]/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
};

const defaultEncodeOptions: EncodeOptions = {
    mode: 'specialChars',
    level: 'all',
    numeric: 'decimal'
};

export function encode(
    text: string | undefined | null,
    {mode = 'specialChars', numeric = 'decimal', level = 'all'}: EncodeOptions = defaultEncodeOptions
) {
    if (!text) {
        return '';
    }
    const references = allNamedReferences[level].characters;
    const isHex = numeric === 'hexadecimal';

    return text.replace(encodeRegExps[mode], function (input) {
        const entity = references[input];
        if (entity) {
            return entity;
        }
        const code = input.length > 1 ? getCodePoint(input, 0)! : input.charCodeAt(0);
        return (isHex ? '&#x' + code.toString(16) : '&#' + code) + ';';
    });
}

const defaultDecodeOptions: DecodeOptions = {
    scope: 'body',
    level: 'all'
};

const strict = /&(?:#\d+|#x[\da-fA-F]+|[0-9a-zA-Z]+);/g;
const attribute = /&(?:#\d+|#x[\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;

const baseDecodeRegExps: Record<Exclude<Level, 'all'>, Record<DecodeScope, RegExp>> = {
    xml: {
        strict,
        attribute,
        body: bodyRegExps.xml
    },
    html4: {
        strict,
        attribute,
        body: bodyRegExps.html4
    },
    html5: {
        strict,
        attribute,
        body: bodyRegExps.html5
    }
};

const decodeRegExps: Record<Level, Record<DecodeScope, RegExp>> = {
    ...baseDecodeRegExps,
    all: baseDecodeRegExps.html5
};

const fromCharCode = String.fromCharCode;

export function decode(
    text: string | undefined | null,
    {level = 'all', scope = level === 'xml' ? 'strict' : 'body'}: DecodeOptions = defaultDecodeOptions
) {
    if (!text) {
        return '';
    }
    const references = allNamedReferences[level].entities;
    const isAttribute = scope === 'attribute';

    return text.replace(decodeRegExps[level][scope], function (entity) {
        if (isAttribute && entity[entity.length - 1] === '=') {
            return entity;
        }
        if (entity[1] != '#') {
            return references[entity] || entity;
        }
        const secondChar = entity[2];
        const code =
            secondChar == 'x' || secondChar == 'X' ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));

        return code >= 0x10ffff
            ? entity
            : code > 65535
            ? fromCodePoint(code)
            : fromCharCode(numericUnicodeMap[code] || code);
    });
}
