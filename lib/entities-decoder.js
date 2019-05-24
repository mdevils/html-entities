/* THIS IS GENERATED SOURCE. DO NOT EDIT */

/* eslint-disable no-constant-condition */

var ERRORS = {
    NULL_CHAR_REF: 0,
    OUT_OF_RANGE_CHAR_REF: 1,
    SURROGATE_CHAR_REF:2,
    NON_CHARACTER: 3,
    CTRL_CHARACTER: 4,
    MISSING_DIGIT: 6,
    UNKNOWN_NAMED_CHAR_REF:7,
    MISSING_SEMICOLON: 9,
}

var decodeHTML4Entities = function(input, strict, parseError) {
    if (!input || !input.length) return '';
    var segments = input.split('&');
    if (segments.length == 1) return input;
    var output = segments[0];
    var j = 0;
    for (var i=1; i<segments.length; i++) {
        var seg = segments[i];
        if (seg.charAt(0) == '#') {
            j = 1;
            var cc = seg.charCodeAt(1);
            var num = 0;
            var isEmpty;
            if ((cc == 120) || (cc == 88)) {
                do {
                    cc = seg.charCodeAt(++j);
                    if ((cc > 47) && (cc < 58)) { num = num * 16 + cc - 48; }
                    else if ((cc > 96) && (cc < 103)) { num = num * 16 + cc - 87; }
                    else if ((cc > 64) && (cc < 71)) { num = num * 16 + cc - 55; }
                    else break;
                } while (1)
                isEmpty = j <= 2;
            } else {
                while (1) {
                    if ((cc < 48) || (cc > 57)) break;
                    num = num * 10 + cc - 48;
                    cc = seg.charCodeAt(++j);
                }
                isEmpty = j < 1;
            }
            if (isEmpty) {
                parseError("missing digit in numeric character reference",6);
                output += '&' + seg;
                continue;
            }
            if (cc == 59) {
                j++;
            } else if (strict) {
                parseError("missing semicolon after character reference",9);
                output += '&' + seg;
                continue;
            }
            if (num > 1114111) {
                parseError("character reference outside unicode range",1);
                output += '\uFFFD' + seg.substring(j);
            } else if (num == 0) {
                parseError("null character reference",0);
                output += '\uFFFD' + seg.substring(j);
            } else if ( (num > 55295) && (num < 57344) ) {
                parseError("surrogate character reference",2);
                output += '\uFFFD' + seg.substring(j);
            } else {
                if (((num > 64975) && (num < 65008)) || ([65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111].indexOf(num) >= 0)) {
                    parseError("non-character character reference",3);
                } else if ((num == 13) || (num < 32)) {
                    parseError("control character character reference",4);
                } else if ((num > 126) && (num < 160)) {
                    parseError("control character character reference",4);
                    var k = [128,130,131,132,133,134,135,136,137,138,139,140,142,145,146,147,148,149,150,151,152,153,154,155,156,158,159].indexOf(num);
                    if (k >= 0) num = [8364,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,381,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,382,376][k];
                }
                output += String.fromCharCode(num) + seg.substring(j);
            }
            continue;
        } else {
            var candidateLen = seg.indexOf(';');
            var candidateStr = seg.substring(0, candidateLen)
            if (candidateLen == 2) {
                j = ["ge","gt","le","lt","mu","Mu","ne","ni","nu","Nu","or","pi","Pi","Xi","xi"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2265",">","\u2264","<","\u03BC","\u039C","\u2260","\u220B","\u03BD","\u039D","\u2228","\u03C0","\u03A0","\u039E","\u03BE"][j]
                              + seg.substring(3);
                    continue;
                }
            } else if (candidateLen == 3) {
                j = ["amp","and","ang","cap","chi","Chi","cup","deg","Eta","eta","eth","ETH","int","loz","lrm","not","Phi","phi","piv","psi","Psi","reg","rho","Rho","rlm","shy","sim","sub","sum","sup","Tau","tau","uml","yen","zwj"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["&","\u2227","\u2220","\u2229","\u03C7","\u03A7","\u222A","\xB0","\u0397","\u03B7","\xF0","\xD0","\u222B","\u25CA","\u200E","\xAC","\u03A6","\u03C6","\u03D6","\u03C8","\u03A8","\xAE","\u03C1","\u03A1","\u200F","\xAD","\u223C","\u2282","\u2211","\u2283","\u03A4","\u03C4","\xA8","\xA5","\u200D"][j]
                              + seg.substring(4);
                    continue;
                }
            } else if (candidateLen == 4) {
                j = ["Auml","auml","beta","Beta","bull","cent","circ","cong","copy","dArr","darr","emsp","ensp","Euml","euml","euro","fnof","hArr","harr","iota","Iota","isin","Iuml","iuml","lang","larr","lArr","macr","nbsp","nsub","ordf","ordm","Ouml","ouml","para","part","perp","prod","prop","quot","rang","rArr","rarr","real","sdot","sect","sube","sup1","sup2","sup3","supe","uArr","uarr","uuml","Uuml","yuml","Yuml","zeta","Zeta","zwnj","apos"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\xC4","\xE4","\u03B2","\u0392","\u2022","\xA2","\u02C6","\u2245","\xA9","\u21D3","\u2193","\u2003","\u2002","\xCB","\xEB","\u20AC","\u0192","\u21D4","\u2194","\u03B9","\u0399","\u2208","\xCF","\xEF","\u27E8","\u2190","\u21D0","\xAF","\xA0","\u2284","\xAA","\xBA","\xD6","\xF6","\xB6","\u2202","\u22A5","\u220F","\u221D","\"","\u27E9","\u21D2","\u2192","\u211C","\u22C5","\xA7","\u2286","\xB9","\xB2","\xB3","\u2287","\u21D1","\u2191","\xFC","\xDC","\xFF","\u0178","\u03B6","\u0396","\u200C","'"][j]
                              + seg.substring(5);
                    continue;
                }
            } else if (candidateLen == 5) {
                j = ["acirc","Acirc","acute","aelig","AElig","Alpha","alpha","Aring","aring","asymp","bdquo","cedil","clubs","crarr","Delta","delta","diams","ecirc","Ecirc","empty","equiv","exist","frasl","gamma","Gamma","icirc","Icirc","iexcl","image","infin","kappa","Kappa","laquo","lceil","ldquo","lsquo","mdash","micro","minus","nabla","ndash","notin","ocirc","Ocirc","OElig","oelig","oline","Omega","omega","oplus","pound","prime","Prime","radic","raquo","rceil","rdquo","rsquo","sbquo","Sigma","sigma","szlig","Theta","theta","thorn","THORN","tilde","times","trade","ucirc","Ucirc","upsih"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\xE2","\xC2","\xB4","\xE6","\xC6","\u0391","\u03B1","\xC5","\xE5","\u2248","\u201E","\xB8","\u2663","\u21B5","\u0394","\u03B4","\u2666","\xEA","\xCA","\u2205","\u2261","\u2203","\u2044","\u03B3","\u0393","\xEE","\xCE","\xA1","\u2111","\u221E","\u03BA","\u039A","\xAB","\u2308","\u201C","\u2018","\u2014","\xB5","\u2212","\u2207","\u2013","\u2209","\xF4","\xD4","\u0152","\u0153","\u203E","\u03A9","\u03C9","\u2295","\xA3","\u2032","\u2033","\u221A","\xBB","\u2309","\u201D","\u2019","\u201A","\u03A3","\u03C3","\xDF","\u0398","\u03B8","\xFE","\xDE","\u02DC","\xD7","\u2122","\xFB","\xDB","\u03D2"][j]
                              + seg.substring(6);
                    continue;
                }
            } else if (candidateLen == 6) {
                j = ["Aacute","aacute","agrave","Agrave","Atilde","atilde","brvbar","Ccedil","ccedil","curren","dagger","Dagger","divide","eacute","Eacute","egrave","Egrave","forall","frac12","frac14","frac34","hearts","hellip","iacute","Iacute","igrave","Igrave","iquest","Lambda","lambda","lfloor","lowast","lsaquo","middot","Ntilde","ntilde","oacute","Oacute","ograve","Ograve","oslash","Oslash","Otilde","otilde","otimes","permil","plusmn","rfloor","rsaquo","scaron","Scaron","sigmaf","spades","there4","thinsp","Uacute","uacute","ugrave","Ugrave","weierp","Yacute","yacute"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\xC1","\xE1","\xE0","\xC0","\xC3","\xE3","\xA6","\xC7","\xE7","\xA4","\u2020","\u2021","\xF7","\xE9","\xC9","\xE8","\xC8","\u2200","\xBD","\xBC","\xBE","\u2665","\u2026","\xED","\xCD","\xEC","\xCC","\xBF","\u039B","\u03BB","\u230A","\u2217","\u2039","\xB7","\xD1","\xF1","\xF3","\xD3","\xF2","\xD2","\xF8","\xD8","\xD5","\xF5","\u2297","\u2030","\xB1","\u230B","\u203A","\u0161","\u0160","\u03C2","\u2660","\u2234","\u2009","\xDA","\xFA","\xF9","\xD9","\u2118","\xDD","\xFD"][j]
                              + seg.substring(7);
                    continue;
                }
            } else if (candidateLen == 7) {
                j = ["alefsym","Epsilon","epsilon","omicron","Omicron","Upsilon","upsilon"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2135","\u0395","\u03B5","\u03BF","\u039F","\u03A5","\u03C5"][j]
                              + seg.substring(8);
                    continue;
                }
            } else if (candidateStr == "thetasym") {
                output += "\u03D1" + seg.substring(9);
                continue;
            }
            if (strict) {
                if (candidateLen) parseError("unknown named character reference",7);
                else parseError("missing semicolon after character reference",9);
            } else {
                if (candidateStr == 'AMP') {
                    output += '&' + seg.substring(4); continue;
                } else if (candidateStr == 'GT') {
                    output += '>' + seg.substring(3); continue;
                } else if (candidateStr == 'LT') {
                    output += '<' + seg.substring(3); continue;
                } else if (candidateStr == 'QUOT') {
                    output += '"' + seg.substring(5); continue;
                }
                if (seg.length >= 2) {
                    candidateStr = seg.substring(0, 2);
                    j = ["lt","gt","LT","GT"].indexOf(candidateStr);
                    if (j >= 0) {
                        output += ["<",">","<",">"][j]
                                  + seg.substring(2);
                        continue;
                    }
                    if (seg.length >= 3) {
                        candidateStr = seg.substring(0, 3);
                        j = ["ETH","deg","eth","not","reg","shy","uml","yen","amp","AMP"].indexOf(candidateStr);
                        if (j >= 0) {
                            output += ["\xD0","\xB0","\xF0","\xAC","\xAE","\xAD","\xA8","\xA5","&","&"][j]
                                      + seg.substring(3);
                            continue;
                        }
                        if (seg.length >= 4) {
                            candidateStr = seg.substring(0, 4);
                            j = ["Auml","Euml","Iuml","Ouml","Uuml","auml","cent","copy","euml","iuml","macr","nbsp","ordf","ordm","ouml","para","sect","sup1","sup2","sup3","uuml","yuml","quot","QUOT"].indexOf(candidateStr);
                            if (j >= 0) {
                                output += ["\xC4","\xCB","\xCF","\xD6","\xDC","\xE4","\xA2","\xA9","\xEB","\xEF","\xAF","\xA0","\xAA","\xBA","\xF6","\xB6","\xA7","\xB9","\xB2","\xB3","\xFC","\xFF","\"","\""][j]
                                          + seg.substring(4);
                                continue;
                            }
                            if (seg.length >= 5) {
                                candidateStr = seg.substring(0, 5);
                                j = ["AElig","Acirc","Aring","Ecirc","Icirc","Ocirc","THORN","Ucirc","acirc","acute","aelig","aring","cedil","ecirc","icirc","iexcl","laquo","micro","ocirc","pound","raquo","szlig","thorn","times","ucirc"].indexOf(candidateStr);
                                if (j >= 0) {
                                    output += ["\xC6","\xC2","\xC5","\xCA","\xCE","\xD4","\xDE","\xDB","\xE2","\xB4","\xE6","\xE5","\xB8","\xEA","\xEE","\xA1","\xAB","\xB5","\xF4","\xA3","\xBB","\xDF","\xFE","\xD7","\xFB"][j]
                                              + seg.substring(5);
                                    continue;
                                }
                                if (seg.length >= 6) {
                                    candidateStr = seg.substring(0, 6);
                                    j = ["Aacute","Agrave","Atilde","Ccedil","Eacute","Egrave","Iacute","Igrave","Ntilde","Oacute","Ograve","Oslash","Otilde","Uacute","Ugrave","Yacute","aacute","agrave","atilde","brvbar","ccedil","curren","divide","eacute","egrave","frac12","frac14","frac34","iacute","igrave","iquest","middot","ntilde","oacute","ograve","oslash","otilde","plusmn","uacute","ugrave","yacute"].indexOf(candidateStr);
                                    if (j >= 0) {
                                        output += ["\xC1","\xC0","\xC3","\xC7","\xC9","\xC8","\xCD","\xCC","\xD1","\xD3","\xD2","\xD8","\xD5","\xDA","\xD9","\xDD","\xE1","\xE0","\xE3","\xA6","\xE7","\xA4","\xF7","\xE9","\xE8","\xBD","\xBC","\xBE","\xED","\xEC","\xBF","\xB7","\xF1","\xF3","\xF2","\xF8","\xF5","\xB1","\xFA","\xF9","\xFD"][j]
                                                  + seg.substring(6);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        output += '&' + seg;
    }
    return output;
}

var decodeHTML5Entities = function(input, strict, parseError) {
    if (!input || !input.length) return '';
    var segments = input.split('&');
    if (segments.length == 1) return input;
    var output = segments[0];
    var j = 0;
    for (var i=1; i<segments.length; i++) {
        var seg = segments[i];
        if (seg.charAt(0) == '#') {
            j = 1;
            var cc = seg.charCodeAt(1);
            var num = 0;
            var isEmpty;
            if ((cc == 120) || (cc == 88)) {
                do {
                    cc = seg.charCodeAt(++j);
                    if ((cc > 47) && (cc < 58)) { num = num * 16 + cc - 48; }
                    else if ((cc > 96) && (cc < 103)) { num = num * 16 + cc - 87; }
                    else if ((cc > 64) && (cc < 71)) { num = num * 16 + cc - 55; }
                    else break;
                } while (1)
                isEmpty = j <= 2;
            } else {
                while (1) {
                    if ((cc < 48) || (cc > 57)) break;
                    num = num * 10 + cc - 48;
                    cc = seg.charCodeAt(++j);
                }
                isEmpty = j < 1;
            }
            if (isEmpty) {
                parseError("missing digit in numeric character reference",6);
                output += '&' + seg;
                continue;
            }
            if (cc == 59) {
                j++;
            } else if (strict) {
                parseError("missing semicolon after character reference",9);
                output += '&' + seg;
                continue;
            }
            if (num > 1114111) {
                parseError("character reference outside unicode range",1);
                output += '\uFFFD' + seg.substring(j);
            } else if (num == 0) {
                parseError("null character reference",0);
                output += '\uFFFD' + seg.substring(j);
            } else if ( (num > 55295) && (num < 57344) ) {
                parseError("surrogate character reference",2);
                output += '\uFFFD' + seg.substring(j);
            } else {
                if (((num > 64975) && (num < 65008)) || ([65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111].indexOf(num) >= 0)) {
                    parseError("non-character character reference",3);
                } else if ((num == 13) || (num < 32)) {
                    parseError("control character character reference",4);
                } else if ((num > 126) && (num < 160)) {
                    parseError("control character character reference",4);
                    var k = [128,130,131,132,133,134,135,136,137,138,139,140,142,145,146,147,148,149,150,151,152,153,154,155,156,158,159].indexOf(num);
                    if (k >= 0) num = [8364,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,381,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,382,376][k];
                }
                output += String.fromCharCode(num) + seg.substring(j);
            }
            continue;
        } else {
            var candidateLen = seg.indexOf(';');
            var candidateStr = seg.substring(0, candidateLen)
            if (candidateLen == 2) {
                j = ["ac","af","ap","DD","dd","ee","eg","el","ge","gE","gg","Gg","gl","gt","Gt","ic","ii","Im","in","it","le","lE","lg","ll","Ll","lt","Lt","mp","Mu","mu","ne","ni","Nu","nu","Or","or","oS","Pi","pi","pm","Pr","pr","Re","rx","Sc","sc","wp","wr","Xi","xi"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u223E","\u2061","\u2248","\u2145","\u2146","\u2147","\u2A9A","\u2A99","\u2265","\u2267","\u226B","\u22D9","\u2277",">","\u226B","\u2063","\u2148","\u2111","\u2208","\u2062","\u2264","\u2266","\u2276","\u226A","\u22D8","<","\u226A","\u2213","\u039C","\u03BC","\u2260","\u220B","\u039D","\u03BD","\u2A54","\u2228","\u24C8","\u03A0","\u03C0","\xB1","\u2ABB","\u227A","\u211C","\u211E","\u2ABC","\u227B","\u2118","\u2240","\u039E","\u03BE"][j]
                              + seg.substring(3);
                    continue;
                }
            } else if (candidateLen == 3) {
                j = ["acd","acE","Acy","acy","Afr","afr","amp","And","and","ang","apE","ape","ast","Bcy","bcy","Bfr","bfr","bne","bot","cap","Cap","cfr","Cfr","Chi","chi","cir","cup","Cup","Dcy","dcy","deg","Del","Dfr","dfr","die","div","Dot","dot","Ecy","ecy","Efr","efr","egs","ell","els","ENG","eng","Eta","eta","ETH","eth","Fcy","fcy","Ffr","ffr","gap","Gcy","gcy","gEl","gel","geq","ges","Gfr","gfr","ggg","gla","glE","glj","gne","gnE","Hat","hfr","Hfr","Icy","icy","iff","ifr","Ifr","int","Int","Jcy","jcy","Jfr","jfr","Kcy","kcy","Kfr","kfr","lap","lat","Lcy","lcy","lEg","leg","leq","les","Lfr","lfr","lgE","lne","lnE","loz","lrm","lsh","Lsh","Map","map","Mcy","mcy","Mfr","mfr","mho","mid","nap","Ncy","ncy","Nfr","nfr","ngE","nge","nGg","nGt","ngt","nis","niv","nlE","nle","nLl","nLt","nlt","Not","not","npr","nsc","num","Ocy","ocy","Ofr","ofr","ogt","ohm","olt","ord","orv","par","Pcy","pcy","Pfr","pfr","Phi","phi","piv","pre","prE","Psi","psi","Qfr","qfr","Rcy","rcy","reg","REG","rfr","Rfr","Rho","rho","rlm","rsh","Rsh","sce","scE","Scy","scy","Sfr","sfr","shy","sim","smt","sol","squ","sub","Sub","sum","Sum","sup","Sup","Tab","Tau","tau","Tcy","tcy","Tfr","tfr","top","Ucy","ucy","Ufr","ufr","uml","Vcy","vcy","vee","Vee","Vfr","vfr","Wfr","wfr","Xfr","xfr","Ycy","ycy","yen","Yfr","yfr","Zcy","zcy","zfr","Zfr","zwj"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u223F","\u223E\u0333","\u0410","\u0430","\uD835\uDD04","\uD835\uDD1E","&","\u2A53","\u2227","\u2220","\u2A70","\u224A","*","\u0411","\u0431","\uD835\uDD05","\uD835\uDD1F","=\u20E5","\u22A5","\u2229","\u22D2","\uD835\uDD20","\u212D","\u03A7","\u03C7","\u25CB","\u222A","\u22D3","\u0414","\u0434","\xB0","\u2207","\uD835\uDD07","\uD835\uDD21","\xA8","\xF7","\xA8","\u02D9","\u042D","\u044D","\uD835\uDD08","\uD835\uDD22","\u2A96","\u2113","\u2A95","\u014A","\u014B","\u0397","\u03B7","\xD0","\xF0","\u0424","\u0444","\uD835\uDD09","\uD835\uDD23","\u2A86","\u0413","\u0433","\u2A8C","\u22DB","\u2265","\u2A7E","\uD835\uDD0A","\uD835\uDD24","\u22D9","\u2AA5","\u2A92","\u2AA4","\u2A88","\u2269","^","\uD835\uDD25","\u210C","\u0418","\u0438","\u21D4","\uD835\uDD26","\u2111","\u222B","\u222C","\u0419","\u0439","\uD835\uDD0D","\uD835\uDD27","\u041A","\u043A","\uD835\uDD0E","\uD835\uDD28","\u2A85","\u2AAB","\u041B","\u043B","\u2A8B","\u22DA","\u2264","\u2A7D","\uD835\uDD0F","\uD835\uDD29","\u2A91","\u2A87","\u2268","\u25CA","\u200E","\u21B0","\u21B0","\u2905","\u21A6","\u041C","\u043C","\uD835\uDD10","\uD835\uDD2A","\u2127","\u2223","\u2249","\u041D","\u043D","\uD835\uDD11","\uD835\uDD2B","\u2267\u0338","\u2271","\u22D9\u0338","\u226B\u20D2","\u226F","\u22FC","\u220B","\u2266\u0338","\u2270","\u22D8\u0338","\u226A\u20D2","\u226E","\u2AEC","\xAC","\u2280","\u2281","#","\u041E","\u043E","\uD835\uDD12","\uD835\uDD2C","\u29C1","\u03A9","\u29C0","\u2A5D","\u2A5B","\u2225","\u041F","\u043F","\uD835\uDD13","\uD835\uDD2D","\u03A6","\u03C6","\u03D6","\u2AAF","\u2AB3","\u03A8","\u03C8","\uD835\uDD14","\uD835\uDD2E","\u0420","\u0440","\xAE","\xAE","\uD835\uDD2F","\u211C","\u03A1","\u03C1","\u200F","\u21B1","\u21B1","\u2AB0","\u2AB4","\u0421","\u0441","\uD835\uDD16","\uD835\uDD30","\xAD","\u223C","\u2AAA","/","\u25A1","\u2282","\u22D0","\u2211","\u2211","\u2283","\u22D1","\x09","\u03A4","\u03C4","\u0422","\u0442","\uD835\uDD17","\uD835\uDD31","\u22A4","\u0423","\u0443","\uD835\uDD18","\uD835\uDD32","\xA8","\u0412","\u0432","\u2228","\u22C1","\uD835\uDD19","\uD835\uDD33","\uD835\uDD1A","\uD835\uDD34","\uD835\uDD1B","\uD835\uDD35","\u042B","\u044B","\xA5","\uD835\uDD1C","\uD835\uDD36","\u0417","\u0437","\uD835\uDD37","\u2128","\u200D"][j]
                              + seg.substring(4);
                    continue;
                }
            } else if (candidateLen == 4) {
                j = ["andd","andv","ange","Aopf","aopf","apid","apos","Ascr","ascr","Auml","auml","Barv","bbrk","Beta","beta","beth","bNot","bnot","Bopf","bopf","boxh","boxH","boxv","boxV","bscr","Bscr","bsim","bsol","bull","bump","caps","Cdot","cdot","cent","CHcy","chcy","circ","cirE","cire","comp","cong","copf","Copf","copy","COPY","Cscr","cscr","csub","csup","cups","darr","Darr","dArr","dash","dHar","diam","DJcy","djcy","Dopf","dopf","Dscr","dscr","DScy","dscy","dsol","dtri","DZcy","dzcy","ecir","Edot","edot","eDot","emsp","ensp","Eopf","eopf","epar","epsi","escr","Escr","Esim","esim","Euml","euml","euro","excl","flat","fnof","Fopf","fopf","fork","fscr","Fscr","Gdot","gdot","geqq","gesl","GJcy","gjcy","gnap","gneq","Gopf","gopf","Gscr","gscr","gsim","gtcc","gvnE","half","harr","hArr","hbar","hopf","Hopf","hscr","Hscr","Idot","IEcy","iecy","imof","IOcy","iocy","Iopf","iopf","Iota","iota","iscr","Iscr","isin","Iuml","iuml","Jopf","jopf","Jscr","jscr","KHcy","khcy","KJcy","kjcy","Kopf","kopf","Kscr","kscr","lang","Lang","larr","Larr","lArr","late","lcub","ldca","ldsh","leqq","lesg","lHar","LJcy","ljcy","lnap","lneq","Lopf","lopf","lozf","lpar","lscr","Lscr","lsim","lsqb","ltcc","ltri","lvnE","macr","male","malt","mlcp","mldr","Mopf","mopf","mscr","Mscr","nang","napE","nbsp","ncap","ncup","ngeq","nges","ngtr","nGtv","nisd","NJcy","njcy","nldr","nleq","nles","nLtv","nmid","nopf","Nopf","npar","npre","nsce","Nscr","nscr","nsim","nsub","nsup","ntgl","ntlg","nvap","nvge","nvgt","nvle","nvlt","oast","ocir","odiv","odot","ogon","oint","omid","Oopf","oopf","opar","ordf","ordm","oror","Oscr","oscr","osol","Ouml","ouml","para","part","perp","phiv","plus","popf","Popf","prap","prec","prnE","prod","prop","Pscr","pscr","qint","qopf","Qopf","Qscr","qscr","quot","race","rang","Rang","rarr","Rarr","rArr","rcub","rdca","rdsh","real","rect","rHar","rhov","ring","ropf","Ropf","rpar","rscr","Rscr","rsqb","rtri","scap","scnE","sdot","sect","semi","sext","SHcy","shcy","sime","simg","siml","smid","smte","solb","Sopf","sopf","spar","Sqrt","squf","Sscr","sscr","Star","star","subE","sube","succ","sung","sup1","sup2","sup3","supE","supe","tbrk","tdot","tint","toea","Topf","topf","tosa","trie","Tscr","tscr","TScy","tscy","uarr","Uarr","uArr","uHar","Uopf","uopf","upsi","Upsi","Uscr","uscr","utri","Uuml","uuml","varr","vArr","vBar","Vbar","vert","Vert","Vopf","vopf","Vscr","vscr","Wopf","wopf","Wscr","wscr","xcap","xcup","xmap","xnis","Xopf","xopf","Xscr","xscr","xvee","YAcy","yacy","YIcy","yicy","Yopf","yopf","Yscr","yscr","YUcy","yucy","yuml","Yuml","Zdot","zdot","Zeta","zeta","ZHcy","zhcy","zopf","Zopf","Zscr","zscr","zwnj"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2A5C","\u2A5A","\u29A4","\uD835\uDD38","\uD835\uDD52","\u224B","'","\uD835\uDC9C","\uD835\uDCB6","\xC4","\xE4","\u2AE7","\u23B5","\u0392","\u03B2","\u2136","\u2AED","\u2310","\uD835\uDD39","\uD835\uDD53","\u2500","\u2550","\u2502","\u2551","\uD835\uDCB7","\u212C","\u223D","\\","\u2022","\u224E","\u2229\uFE00","\u010A","\u010B","\xA2","\u0427","\u0447","\u02C6","\u29C3","\u2257","\u2201","\u2245","\uD835\uDD54","\u2102","\xA9","\xA9","\uD835\uDC9E","\uD835\uDCB8","\u2ACF","\u2AD0","\u222A\uFE00","\u2193","\u21A1","\u21D3","\u2010","\u2965","\u22C4","\u0402","\u0452","\uD835\uDD3B","\uD835\uDD55","\uD835\uDC9F","\uD835\uDCB9","\u0405","\u0455","\u29F6","\u25BF","\u040F","\u045F","\u2256","\u0116","\u0117","\u2251","\u2003","\u2002","\uD835\uDD3C","\uD835\uDD56","\u22D5","\u03B5","\u212F","\u2130","\u2A73","\u2242","\xCB","\xEB","\u20AC","!","\u266D","\u0192","\uD835\uDD3D","\uD835\uDD57","\u22D4","\uD835\uDCBB","\u2131","\u0120","\u0121","\u2267","\u22DB\uFE00","\u0403","\u0453","\u2A8A","\u2A88","\uD835\uDD3E","\uD835\uDD58","\uD835\uDCA2","\u210A","\u2273","\u2AA7","\u2269\uFE00","\xBD","\u2194","\u21D4","\u210F","\uD835\uDD59","\u210D","\uD835\uDCBD","\u210B","\u0130","\u0415","\u0435","\u22B7","\u0401","\u0451","\uD835\uDD40","\uD835\uDD5A","\u0399","\u03B9","\uD835\uDCBE","\u2110","\u2208","\xCF","\xEF","\uD835\uDD41","\uD835\uDD5B","\uD835\uDCA5","\uD835\uDCBF","\u0425","\u0445","\u040C","\u045C","\uD835\uDD42","\uD835\uDD5C","\uD835\uDCA6","\uD835\uDCC0","\u27E8","\u27EA","\u2190","\u219E","\u21D0","\u2AAD","{","\u2936","\u21B2","\u2266","\u22DA\uFE00","\u2962","\u0409","\u0459","\u2A89","\u2A87","\uD835\uDD43","\uD835\uDD5D","\u29EB","(","\uD835\uDCC1","\u2112","\u2272","[","\u2AA6","\u25C3","\u2268\uFE00","\xAF","\u2642","\u2720","\u2ADB","\u2026","\uD835\uDD44","\uD835\uDD5E","\uD835\uDCC2","\u2133","\u2220\u20D2","\u2A70\u0338","\xA0","\u2A43","\u2A42","\u2271","\u2A7E\u0338","\u226F","\u226B\u0338","\u22FA","\u040A","\u045A","\u2025","\u2270","\u2A7D\u0338","\u226A\u0338","\u2224","\uD835\uDD5F","\u2115","\u2226","\u2AAF\u0338","\u2AB0\u0338","\uD835\uDCA9","\uD835\uDCC3","\u2241","\u2284","\u2285","\u2279","\u2278","\u224D\u20D2","\u2265\u20D2",">\u20D2","\u2264\u20D2","<\u20D2","\u229B","\u229A","\u2A38","\u2299","\u02DB","\u222E","\u29B6","\uD835\uDD46","\uD835\uDD60","\u29B7","\xAA","\xBA","\u2A56","\uD835\uDCAA","\u2134","\u2298","\xD6","\xF6","\xB6","\u2202","\u22A5","\u03D5","+","\uD835\uDD61","\u2119","\u2AB7","\u227A","\u2AB5","\u220F","\u221D","\uD835\uDCAB","\uD835\uDCC5","\u2A0C","\uD835\uDD62","\u211A","\uD835\uDCAC","\uD835\uDCC6","\"","\u223D\u0331","\u27E9","\u27EB","\u2192","\u21A0","\u21D2","}","\u2937","\u21B3","\u211C","\u25AD","\u2964","\u03F1","\u02DA","\uD835\uDD63","\u211D",")","\uD835\uDCC7","\u211B","]","\u25B9","\u2AB8","\u2AB6","\u22C5","\xA7",";","\u2736","\u0428","\u0448","\u2243","\u2A9E","\u2A9D","\u2223","\u2AAC","\u29C4","\uD835\uDD4A","\uD835\uDD64","\u2225","\u221A","\u25AA","\uD835\uDCAE","\uD835\uDCC8","\u22C6","\u2606","\u2AC5","\u2286","\u227B","\u266A","\xB9","\xB2","\xB3","\u2AC6","\u2287","\u23B4","\u20DB","\u222D","\u2928","\uD835\uDD4B","\uD835\uDD65","\u2929","\u225C","\uD835\uDCAF","\uD835\uDCC9","\u0426","\u0446","\u2191","\u219F","\u21D1","\u2963","\uD835\uDD4C","\uD835\uDD66","\u03C5","\u03D2","\uD835\uDCB0","\uD835\uDCCA","\u25B5","\xDC","\xFC","\u2195","\u21D5","\u2AE8","\u2AEB","|","\u2016","\uD835\uDD4D","\uD835\uDD67","\uD835\uDCB1","\uD835\uDCCB","\uD835\uDD4E","\uD835\uDD68","\uD835\uDCB2","\uD835\uDCCC","\u22C2","\u22C3","\u27FC","\u22FB","\uD835\uDD4F","\uD835\uDD69","\uD835\uDCB3","\uD835\uDCCD","\u22C1","\u042F","\u044F","\u0407","\u0457","\uD835\uDD50","\uD835\uDD6A","\uD835\uDCB4","\uD835\uDCCE","\u042E","\u044E","\xFF","\u0178","\u017B","\u017C","\u0396","\u03B6","\u0416","\u0436","\uD835\uDD6B","\u2124","\uD835\uDCB5","\uD835\uDCCF","\u200C"][j]
                              + seg.substring(5);
                    continue;
                }
            } else if (candidateLen == 5) {
                j = ["Acirc","acirc","acute","AElig","aelig","aleph","Alpha","alpha","Amacr","amacr","amalg","angle","angrt","angst","Aogon","aogon","Aring","aring","asymp","awint","bcong","bdquo","bepsi","blank","blk12","blk14","blk34","block","boxdl","boxdL","boxDl","boxDL","boxdr","boxdR","boxDr","boxDR","boxhd","boxHd","boxhD","boxHD","boxhu","boxHu","boxhU","boxHU","boxul","boxuL","boxUl","boxUL","boxur","boxuR","boxUr","boxUR","boxvh","boxvH","boxVh","boxVH","boxvl","boxvL","boxVl","boxVL","boxvr","boxvR","boxVr","boxVR","breve","Breve","bsemi","bsime","bsolb","bumpE","bumpe","caret","caron","ccaps","Ccirc","ccirc","ccups","cedil","check","clubs","colon","Colon","comma","crarr","cross","Cross","csube","csupe","ctdot","cuepr","cuesc","cupor","cuvee","cuwed","cwint","Dashv","dashv","dblac","ddarr","Delta","delta","dharl","dharr","diams","disin","doteq","dtdot","dtrif","duarr","duhar","Ecirc","ecirc","eDDot","efDot","Emacr","emacr","empty","Eogon","eogon","eplus","epsiv","eqsim","Equal","equiv","erarr","erDot","esdot","exist","fflig","filig","fjlig","fllig","fltns","forkv","frasl","frown","Gamma","gamma","Gcirc","gcirc","gescc","gimel","gneqq","gnsim","grave","gsime","gsiml","gtcir","gtdot","Hacek","harrw","Hcirc","hcirc","hoarr","Icirc","icirc","iexcl","iiint","iiota","IJlig","ijlig","Imacr","imacr","image","imath","imped","infin","Iogon","iogon","iprod","isinE","isins","isinv","Iukcy","iukcy","Jcirc","jcirc","jmath","Jukcy","jukcy","Kappa","kappa","lAarr","langd","laquo","larrb","lates","lbarr","lBarr","lbbrk","lbrke","lceil","ldquo","lescc","lhard","lharu","lhblk","llarr","lltri","lneqq","lnsim","loang","loarr","lobrk","lopar","lrarr","lrhar","lrtri","lsime","lsimg","lsquo","ltcir","ltdot","ltrie","ltrif","mdash","mDDot","micro","minus","mumap","nabla","napid","napos","natur","nbump","ncong","ndash","nearr","neArr","nedot","nesim","ngeqq","ngsim","nharr","nhArr","nhpar","nlarr","nlArr","nleqq","nless","nlsim","nltri","notin","notni","npart","nprec","nrarr","nrArr","nrtri","nsime","nsmid","nspar","nsubE","nsube","nsucc","nsupE","nsupe","numsp","nvsim","nwarr","nwArr","Ocirc","ocirc","odash","OElig","oelig","ofcir","ohbar","olarr","olcir","oline","Omacr","omacr","Omega","omega","operp","oplus","orarr","order","ovbar","parsl","phone","plusb","pluse","pound","prcue","prime","Prime","prnap","prsim","quest","rAarr","radic","rangd","range","raquo","rarrb","rarrc","rarrw","ratio","rbarr","rBarr","RBarr","rbbrk","rbrke","rceil","rdquo","reals","rhard","rharu","rlarr","rlhar","rnmid","roang","roarr","robrk","ropar","rrarr","rsquo","rtrie","rtrif","sbquo","sccue","Scirc","scirc","scnap","scsim","sdotb","sdote","searr","seArr","setmn","sharp","Sigma","sigma","simeq","simgE","simlE","simne","slarr","smile","smtes","sqcap","sqcup","sqsub","sqsup","srarr","starf","strns","subnE","subne","supnE","supne","swarr","swArr","szlig","Theta","theta","thkap","THORN","thorn","tilde","Tilde","times","trade","TRADE","trisb","TSHcy","tshcy","twixt","Ubrcy","ubrcy","Ucirc","ucirc","udarr","udhar","uharl","uharr","uhblk","ultri","Umacr","umacr","Union","Uogon","uogon","uplus","upsih","UpTee","Uring","uring","urtri","utdot","utrif","uuarr","varpi","vBarv","vdash","vDash","Vdash","VDash","veeeq","vltri","vnsub","vnsup","vprop","vrtri","Wcirc","wcirc","wedge","Wedge","xcirc","xdtri","xharr","xhArr","xlarr","xlArr","xodot","xrarr","xrArr","xutri","Ycirc","ycirc"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\xC2","\xE2","\xB4","\xC6","\xE6","\u2135","\u0391","\u03B1","\u0100","\u0101","\u2A3F","\u2220","\u221F","\xC5","\u0104","\u0105","\xC5","\xE5","\u2248","\u2A11","\u224C","\u201E","\u03F6","\u2423","\u2592","\u2591","\u2593","\u2588","\u2510","\u2555","\u2556","\u2557","\u250C","\u2552","\u2553","\u2554","\u252C","\u2564","\u2565","\u2566","\u2534","\u2567","\u2568","\u2569","\u2518","\u255B","\u255C","\u255D","\u2514","\u2558","\u2559","\u255A","\u253C","\u256A","\u256B","\u256C","\u2524","\u2561","\u2562","\u2563","\u251C","\u255E","\u255F","\u2560","\u02D8","\u02D8","\u204F","\u22CD","\u29C5","\u2AAE","\u224F","\u2041","\u02C7","\u2A4D","\u0108","\u0109","\u2A4C","\xB8","\u2713","\u2663",":","\u2237",",","\u21B5","\u2717","\u2A2F","\u2AD1","\u2AD2","\u22EF","\u22DE","\u22DF","\u2A45","\u22CE","\u22CF","\u2231","\u2AE4","\u22A3","\u02DD","\u21CA","\u0394","\u03B4","\u21C3","\u21C2","\u2666","\u22F2","\u2250","\u22F1","\u25BE","\u21F5","\u296F","\xCA","\xEA","\u2A77","\u2252","\u0112","\u0113","\u2205","\u0118","\u0119","\u2A71","\u03F5","\u2242","\u2A75","\u2261","\u2971","\u2253","\u2250","\u2203","\uFB00","\uFB01","fj","\uFB02","\u25B1","\u2AD9","\u2044","\u2322","\u0393","\u03B3","\u011C","\u011D","\u2AA9","\u2137","\u2269","\u22E7","`","\u2A8E","\u2A90","\u2A7A","\u22D7","\u02C7","\u21AD","\u0124","\u0125","\u21FF","\xCE","\xEE","\xA1","\u222D","\u2129","\u0132","\u0133","\u012A","\u012B","\u2111","\u0131","\u01B5","\u221E","\u012E","\u012F","\u2A3C","\u22F9","\u22F4","\u2208","\u0406","\u0456","\u0134","\u0135","\u0237","\u0404","\u0454","\u039A","\u03BA","\u21DA","\u2991","\xAB","\u21E4","\u2AAD\uFE00","\u290C","\u290E","\u2772","\u298B","\u2308","\u201C","\u2AA8","\u21BD","\u21BC","\u2584","\u21C7","\u25FA","\u2268","\u22E6","\u27EC","\u21FD","\u27E6","\u2985","\u21C6","\u21CB","\u22BF","\u2A8D","\u2A8F","\u2018","\u2A79","\u22D6","\u22B4","\u25C2","\u2014","\u223A","\xB5","\u2212","\u22B8","\u2207","\u224B\u0338","\u0149","\u266E","\u224E\u0338","\u2247","\u2013","\u2197","\u21D7","\u2250\u0338","\u2242\u0338","\u2267\u0338","\u2275","\u21AE","\u21CE","\u2AF2","\u219A","\u21CD","\u2266\u0338","\u226E","\u2274","\u22EA","\u2209","\u220C","\u2202\u0338","\u2280","\u219B","\u21CF","\u22EB","\u2244","\u2224","\u2226","\u2AC5\u0338","\u2288","\u2281","\u2AC6\u0338","\u2289","\u2007","\u223C\u20D2","\u2196","\u21D6","\xD4","\xF4","\u229D","\u0152","\u0153","\u29BF","\u29B5","\u21BA","\u29BE","\u203E","\u014C","\u014D","\u03A9","\u03C9","\u29B9","\u2295","\u21BB","\u2134","\u233D","\u2AFD","\u260E","\u229E","\u2A72","\xA3","\u227C","\u2032","\u2033","\u2AB9","\u227E","?","\u21DB","\u221A","\u2992","\u29A5","\xBB","\u21E5","\u2933","\u219D","\u2236","\u290D","\u290F","\u2910","\u2773","\u298C","\u2309","\u201D","\u211D","\u21C1","\u21C0","\u21C4","\u21CC","\u2AEE","\u27ED","\u21FE","\u27E7","\u2986","\u21C9","\u2019","\u22B5","\u25B8","\u201A","\u227D","\u015C","\u015D","\u2ABA","\u227F","\u22A1","\u2A66","\u2198","\u21D8","\u2216","\u266F","\u03A3","\u03C3","\u2243","\u2AA0","\u2A9F","\u2246","\u2190","\u2323","\u2AAC\uFE00","\u2293","\u2294","\u228F","\u2290","\u2192","\u2605","\xAF","\u2ACB","\u228A","\u2ACC","\u228B","\u2199","\u21D9","\xDF","\u0398","\u03B8","\u2248","\xDE","\xFE","\u02DC","\u223C","\xD7","\u2122","\u2122","\u29CD","\u040B","\u045B","\u226C","\u040E","\u045E","\xDB","\xFB","\u21C5","\u296E","\u21BF","\u21BE","\u2580","\u25F8","\u016A","\u016B","\u22C3","\u0172","\u0173","\u228E","\u03D2","\u22A5","\u016E","\u016F","\u25F9","\u22F0","\u25B4","\u21C8","\u03D6","\u2AE9","\u22A2","\u22A8","\u22A9","\u22AB","\u225A","\u22B2","\u2282\u20D2","\u2283\u20D2","\u221D","\u22B3","\u0174","\u0175","\u2227","\u22C0","\u25EF","\u25BD","\u27F7","\u27FA","\u27F5","\u27F8","\u2A00","\u27F6","\u27F9","\u25B3","\u0176","\u0177"][j]
                              + seg.substring(6);
                    continue;
                }
            } else if (candidateLen == 6) {
                j = ["Aacute","aacute","Abreve","abreve","Agrave","agrave","andand","angmsd","angsph","apacir","approx","Assign","Atilde","atilde","barvee","barwed","Barwed","becaus","bernou","bigcap","bigcup","bigvee","bkarow","bottom","bowtie","boxbox","bprime","brvbar","bullet","Bumpeq","bumpeq","Cacute","cacute","capand","capcap","capcup","capdot","Ccaron","ccaron","Ccedil","ccedil","circeq","cirmid","Colone","colone","commat","compfn","conint","Conint","coprod","copysr","cularr","cupcap","CupCap","cupcup","cupdot","curarr","curren","cylcty","dagger","Dagger","daleth","Dcaron","dcaron","dfisht","divide","divonx","dlcorn","dlcrop","dollar","DotDot","drcorn","drcrop","Dstrok","dstrok","Eacute","eacute","easter","Ecaron","ecaron","ecolon","Egrave","egrave","egsdot","elsdot","emptyv","emsp13","emsp14","eparsl","eqcirc","equals","equest","Exists","female","ffilig","ffllig","forall","ForAll","frac12","frac13","frac14","frac15","frac16","frac18","frac23","frac25","frac34","frac35","frac38","frac45","frac56","frac58","frac78","gacute","Gammad","gammad","Gbreve","gbreve","Gcedil","gesdot","gesles","gtlPar","gtrarr","gtrdot","gtrsim","hairsp","hamilt","HARDcy","hardcy","hearts","hellip","hercon","homtht","horbar","hslash","Hstrok","hstrok","hybull","hyphen","Iacute","iacute","Igrave","igrave","iiiint","iinfin","incare","inodot","intcal","iquest","isinsv","Itilde","itilde","Jsercy","jsercy","kappav","Kcedil","kcedil","kgreen","Lacute","lacute","lagran","Lambda","lambda","langle","larrfs","larrhk","larrlp","larrpl","larrtl","latail","lAtail","lbrace","lbrack","Lcaron","lcaron","Lcedil","lcedil","ldquor","lesdot","lesges","lfisht","lfloor","lharul","llhard","Lmidot","lmidot","lmoust","loplus","lowast","lowbar","lparlt","lrhard","lsaquo","lsquor","Lstrok","lstrok","lthree","ltimes","ltlarr","ltrPar","mapsto","marker","mcomma","midast","midcir","middot","minusb","minusd","mnplus","models","mstpos","Nacute","nacute","nbumpe","Ncaron","ncaron","Ncedil","ncedil","nearhk","nequiv","nesear","nexist","nltrie","notinE","nparsl","nprcue","nrarrc","nrarrw","nrtrie","nsccue","nsimeq","Ntilde","ntilde","numero","nvdash","nvDash","nVdash","nVDash","nvHarr","nvlArr","nvrArr","nwarhk","nwnear","Oacute","oacute","Odblac","odblac","odsold","Ograve","ograve","ominus","origof","Oslash","oslash","Otilde","otilde","Otimes","otimes","parsim","percnt","period","permil","phmmat","planck","plankv","plusdo","plusdu","plusmn","preceq","primes","prnsim","propto","prurel","puncsp","qprime","Racute","racute","rangle","rarrap","rarrfs","rarrhk","rarrlp","rarrpl","Rarrtl","rarrtl","ratail","rAtail","rbrace","rbrack","Rcaron","rcaron","Rcedil","rcedil","rdquor","rfisht","rfloor","rharul","rmoust","roplus","rpargt","rsaquo","rsquor","rthree","rtimes","Sacute","sacute","Scaron","scaron","Scedil","scedil","scnsim","searhk","seswar","sfrown","SHCHcy","shchcy","sigmaf","sigmav","simdot","smashp","SOFTcy","softcy","solbar","spades","sqcaps","sqcups","sqsube","sqsupe","square","Square","squarf","ssetmn","ssmile","sstarf","subdot","subset","Subset","subsim","subsub","subsup","succeq","supdot","supset","Supset","supsim","supsub","supsup","swarhk","swnwar","target","Tcaron","tcaron","Tcedil","tcedil","telrec","there4","thetav","thinsp","thksim","timesb","timesd","topbot","topcir","tprime","tridot","Tstrok","tstrok","Uacute","uacute","Ubreve","ubreve","Udblac","udblac","ufisht","Ugrave","ugrave","ulcorn","ulcrop","urcorn","urcrop","Utilde","utilde","vangrt","varphi","varrho","Vdashl","veebar","vellip","verbar","Verbar","vsubnE","vsubne","vsupnE","vsupne","Vvdash","wedbar","wedgeq","weierp","wreath","xoplus","xotime","xsqcup","xuplus","xwedge","Yacute","yacute","Zacute","zacute","Zcaron","zcaron","zeetrf"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\xC1","\xE1","\u0102","\u0103","\xC0","\xE0","\u2A55","\u2221","\u2222","\u2A6F","\u2248","\u2254","\xC3","\xE3","\u22BD","\u2305","\u2306","\u2235","\u212C","\u22C2","\u22C3","\u22C1","\u290D","\u22A5","\u22C8","\u29C9","\u2035","\xA6","\u2022","\u224E","\u224F","\u0106","\u0107","\u2A44","\u2A4B","\u2A47","\u2A40","\u010C","\u010D","\xC7","\xE7","\u2257","\u2AEF","\u2A74","\u2254","@","\u2218","\u222E","\u222F","\u2210","\u2117","\u21B6","\u2A46","\u224D","\u2A4A","\u228D","\u21B7","\xA4","\u232D","\u2020","\u2021","\u2138","\u010E","\u010F","\u297F","\xF7","\u22C7","\u231E","\u230D","$","\u20DC","\u231F","\u230C","\u0110","\u0111","\xC9","\xE9","\u2A6E","\u011A","\u011B","\u2255","\xC8","\xE8","\u2A98","\u2A97","\u2205","\u2004","\u2005","\u29E3","\u2256","=","\u225F","\u2203","\u2640","\uFB03","\uFB04","\u2200","\u2200","\xBD","\u2153","\xBC","\u2155","\u2159","\u215B","\u2154","\u2156","\xBE","\u2157","\u215C","\u2158","\u215A","\u215D","\u215E","\u01F5","\u03DC","\u03DD","\u011E","\u011F","\u0122","\u2A80","\u2A94","\u2995","\u2978","\u22D7","\u2273","\u200A","\u210B","\u042A","\u044A","\u2665","\u2026","\u22B9","\u223B","\u2015","\u210F","\u0126","\u0127","\u2043","\u2010","\xCD","\xED","\xCC","\xEC","\u2A0C","\u29DC","\u2105","\u0131","\u22BA","\xBF","\u22F3","\u0128","\u0129","\u0408","\u0458","\u03F0","\u0136","\u0137","\u0138","\u0139","\u013A","\u2112","\u039B","\u03BB","\u27E8","\u291D","\u21A9","\u21AB","\u2939","\u21A2","\u2919","\u291B","{","[","\u013D","\u013E","\u013B","\u013C","\u201E","\u2A7F","\u2A93","\u297C","\u230A","\u296A","\u296B","\u013F","\u0140","\u23B0","\u2A2D","\u2217","_","\u2993","\u296D","\u2039","\u201A","\u0141","\u0142","\u22CB","\u22C9","\u2976","\u2996","\u21A6","\u25AE","\u2A29","*","\u2AF0","\xB7","\u229F","\u2238","\u2213","\u22A7","\u223E","\u0143","\u0144","\u224F\u0338","\u0147","\u0148","\u0145","\u0146","\u2924","\u2262","\u2928","\u2204","\u22EC","\u22F9\u0338","\u2AFD\u20E5","\u22E0","\u2933\u0338","\u219D\u0338","\u22ED","\u22E1","\u2244","\xD1","\xF1","\u2116","\u22AC","\u22AD","\u22AE","\u22AF","\u2904","\u2902","\u2903","\u2923","\u2927","\xD3","\xF3","\u0150","\u0151","\u29BC","\xD2","\xF2","\u2296","\u22B6","\xD8","\xF8","\xD5","\xF5","\u2A37","\u2297","\u2AF3","%",".","\u2030","\u2133","\u210F","\u210F","\u2214","\u2A25","\xB1","\u2AAF","\u2119","\u22E8","\u221D","\u22B0","\u2008","\u2057","\u0154","\u0155","\u27E9","\u2975","\u291E","\u21AA","\u21AC","\u2945","\u2916","\u21A3","\u291A","\u291C","}","]","\u0158","\u0159","\u0156","\u0157","\u201D","\u297D","\u230B","\u296C","\u23B1","\u2A2E","\u2994","\u203A","\u2019","\u22CC","\u22CA","\u015A","\u015B","\u0160","\u0161","\u015E","\u015F","\u22E9","\u2925","\u2929","\u2322","\u0429","\u0449","\u03C2","\u03C2","\u2A6A","\u2A33","\u042C","\u044C","\u233F","\u2660","\u2293\uFE00","\u2294\uFE00","\u2291","\u2292","\u25A1","\u25A1","\u25AA","\u2216","\u2323","\u22C6","\u2ABD","\u2282","\u22D0","\u2AC7","\u2AD5","\u2AD3","\u2AB0","\u2ABE","\u2283","\u22D1","\u2AC8","\u2AD4","\u2AD6","\u2926","\u292A","\u2316","\u0164","\u0165","\u0162","\u0163","\u2315","\u2234","\u03D1","\u2009","\u223C","\u22A0","\u2A30","\u2336","\u2AF1","\u2034","\u25EC","\u0166","\u0167","\xDA","\xFA","\u016C","\u016D","\u0170","\u0171","\u297E","\xD9","\xF9","\u231C","\u230F","\u231D","\u230E","\u0168","\u0169","\u299C","\u03D5","\u03F1","\u2AE6","\u22BB","\u22EE","|","\u2016","\u2ACB\uFE00","\u228A\uFE00","\u2ACC\uFE00","\u228B\uFE00","\u22AA","\u2A5F","\u2259","\u2118","\u2240","\u2A01","\u2A02","\u2A06","\u2A04","\u22C0","\xDD","\xFD","\u0179","\u017A","\u017D","\u017E","\u2128"][j]
                              + seg.substring(7);
                    continue;
                }
            } else if (candidateLen == 7) {
                j = ["alefsym","angrtvb","angzarr","asympeq","backsim","because","Because","bemptyv","between","bigcirc","bigodot","bigstar","bnequiv","boxplus","Cayleys","Cconint","ccupssm","Cedilla","cemptyv","cirscir","coloneq","congdot","cudarrl","cudarrr","cularrp","curarrm","dbkarow","ddagger","ddotseq","demptyv","diamond","Diamond","digamma","dotplus","DownTee","dwangle","Element","Epsilon","epsilon","eqcolon","equivDD","gesdoto","gtquest","gtrless","harrcir","Implies","intprod","isindot","larrbfs","larrsim","lbrksld","lbrkslu","ldrdhar","LeftTee","lesdoto","lessdot","lessgtr","lesssim","lotimes","lozenge","ltquest","luruhar","maltese","minusdu","napprox","natural","nearrow","NewLine","nexists","NoBreak","notinva","notinvb","notinvc","NotLess","notniva","notnivb","notnivc","npolint","npreceq","nsqsube","nsqsupe","nsubset","nsucceq","nsupset","nvinfin","nvltrie","nvrtrie","nwarrow","olcross","Omicron","omicron","orderof","orslope","OverBar","pertenk","planckh","pluscir","plussim","plustwo","precsim","Product","quatint","questeq","rarrbfs","rarrsim","rbrksld","rbrkslu","rdldhar","realine","rotimes","ruluhar","searrow","simplus","simrarr","subedot","submult","subplus","subrarr","succsim","supdsub","supedot","suphsol","suphsub","suplarr","supmult","supplus","swarrow","topfork","triplus","tritime","uparrow","UpArrow","Uparrow","Upsilon","upsilon","uwangle","vzigzag","zigrarr"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2135","\u22BE","\u237C","\u224D","\u223D","\u2235","\u2235","\u29B0","\u226C","\u25EF","\u2A00","\u2605","\u2261\u20E5","\u229E","\u212D","\u2230","\u2A50","\xB8","\u29B2","\u29C2","\u2254","\u2A6D","\u2938","\u2935","\u293D","\u293C","\u290F","\u2021","\u2A77","\u29B1","\u22C4","\u22C4","\u03DD","\u2214","\u22A4","\u29A6","\u2208","\u0395","\u03B5","\u2255","\u2A78","\u2A82","\u2A7C","\u2277","\u2948","\u21D2","\u2A3C","\u22F5","\u291F","\u2973","\u298F","\u298D","\u2967","\u22A3","\u2A81","\u22D6","\u2276","\u2272","\u2A34","\u25CA","\u2A7B","\u2966","\u2720","\u2A2A","\u2249","\u266E","\u2197","\x0A","\u2204","\u2060","\u2209","\u22F7","\u22F6","\u226E","\u220C","\u22FE","\u22FD","\u2A14","\u2AAF\u0338","\u22E2","\u22E3","\u2282\u20D2","\u2AB0\u0338","\u2283\u20D2","\u29DE","\u22B4\u20D2","\u22B5\u20D2","\u2196","\u29BB","\u039F","\u03BF","\u2134","\u2A57","\u203E","\u2031","\u210E","\u2A22","\u2A26","\u2A27","\u227E","\u220F","\u2A16","\u225F","\u2920","\u2974","\u298E","\u2990","\u2969","\u211B","\u2A35","\u2968","\u2198","\u2A24","\u2972","\u2AC3","\u2AC1","\u2ABF","\u2979","\u227F","\u2AD8","\u2AC4","\u27C9","\u2AD7","\u297B","\u2AC2","\u2AC0","\u2199","\u2ADA","\u2A39","\u2A3B","\u2191","\u2191","\u21D1","\u03A5","\u03C5","\u29A7","\u299A","\u21DD"][j]
                              + seg.substring(8);
                    continue;
                }
            } else if (candidateLen == 8) {
                j = ["andslope","angmsdaa","angmsdab","angmsdac","angmsdad","angmsdae","angmsdaf","angmsdag","angmsdah","angrtvbd","approxeq","awconint","backcong","barwedge","bbrktbrk","bigoplus","bigsqcup","biguplus","bigwedge","boxminus","boxtimes","bsolhsub","capbrcup","circledR","circledS","cirfnint","clubsuit","cupbrcap","curlyvee","cwconint","DDotrahd","doteqdot","DotEqual","dotminus","drbkarow","dzigrarr","elinters","emptyset","eqvparsl","fpartint","geqslant","gesdotol","gnapprox","hksearow","hkswarow","imagline","imagpart","infintie","integers","Integral","intercal","intlarhk","laemptyv","ldrushar","leqslant","lesdotor","LessLess","llcorner","lnapprox","lrcorner","lurdshar","mapstoup","multimap","naturals","ncongdot","NotEqual","notindot","NotTilde","otimesas","parallel","PartialD","plusacir","pointint","Precedes","precneqq","precnsim","profalar","profline","profsurf","raemptyv","realpart","RightTee","rppolint","rtriltri","scpolint","setminus","shortmid","smeparsl","sqsubset","sqsupset","subseteq","Succeeds","succneqq","succnsim","SuchThat","Superset","supseteq","thetasym","thicksim","timesbar","triangle","triminus","trpezium","Uarrocir","ulcorner","UnderBar","urcorner","varkappa","varsigma","vartheta"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2A58","\u29A8","\u29A9","\u29AA","\u29AB","\u29AC","\u29AD","\u29AE","\u29AF","\u299D","\u224A","\u2233","\u224C","\u2305","\u23B6","\u2A01","\u2A06","\u2A04","\u22C0","\u229F","\u22A0","\u27C8","\u2A49","\xAE","\u24C8","\u2A10","\u2663","\u2A48","\u22CE","\u2232","\u2911","\u2251","\u2250","\u2238","\u2910","\u27FF","\u23E7","\u2205","\u29E5","\u2A0D","\u2A7E","\u2A84","\u2A8A","\u2925","\u2926","\u2110","\u2111","\u29DD","\u2124","\u222B","\u22BA","\u2A17","\u29B4","\u294B","\u2A7D","\u2A83","\u2AA1","\u231E","\u2A89","\u231F","\u294A","\u21A5","\u22B8","\u2115","\u2A6D\u0338","\u2260","\u22F5\u0338","\u2241","\u2A36","\u2225","\u2202","\u2A23","\u2A15","\u227A","\u2AB5","\u22E8","\u232E","\u2312","\u2313","\u29B3","\u211C","\u22A2","\u2A12","\u29CE","\u2A13","\u2216","\u2223","\u29E4","\u228F","\u2290","\u2286","\u227B","\u2AB6","\u22E9","\u220B","\u2283","\u2287","\u03D1","\u223C","\u2A31","\u25B5","\u2A3A","\u23E2","\u2949","\u231C","_","\u231D","\u03F0","\u03C2","\u03D1"][j]
                              + seg.substring(9);
                    continue;
                }
            } else if (candidateLen == 9) {
                j = ["backprime","backsimeq","Backslash","bigotimes","centerdot","CenterDot","checkmark","CircleDot","complexes","Congruent","Coproduct","dotsquare","DoubleDot","downarrow","DownArrow","Downarrow","DownBreve","gtrapprox","gtreqless","gvertneqq","heartsuit","HumpEqual","leftarrow","LeftArrow","Leftarrow","LeftFloor","lesseqgtr","LessTilde","lvertneqq","Mellintrf","MinusPlus","ngeqslant","nleqslant","NotCupCap","NotExists","NotSubset","nparallel","nshortmid","nsubseteq","nsupseteq","OverBrace","pitchfork","PlusMinus","rationals","spadesuit","subseteqq","subsetneq","supseteqq","supsetneq","therefore","Therefore","ThinSpace","triangleq","TripleDot","UnionPlus","varpropto"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2035","\u22CD","\u2216","\u2A02","\xB7","\xB7","\u2713","\u2299","\u2102","\u2261","\u2210","\u22A1","\xA8","\u2193","\u2193","\u21D3","\u0311","\u2A86","\u22DB","\u2269\uFE00","\u2665","\u224F","\u2190","\u2190","\u21D0","\u230A","\u22DA","\u2272","\u2268\uFE00","\u2133","\u2213","\u2A7E\u0338","\u2A7D\u0338","\u226D","\u2204","\u2282\u20D2","\u2226","\u2224","\u2288","\u2289","\u23DE","\u22D4","\xB1","\u211A","\u2660","\u2AC5","\u228A","\u2AC6","\u228B","\u2234","\u2234","\u2009","\u225C","\u20DB","\u228E","\u221D"][j]
                              + seg.substring(10);
                    continue;
                }
            } else if (candidateLen == 10) {
                j = ["Bernoullis","circledast","CirclePlus","complement","curlywedge","eqslantgtr","EqualTilde","Fouriertrf","gtreqqless","ImaginaryI","Laplacetrf","LeftVector","lessapprox","lesseqqgtr","Lleftarrow","lmoustache","longmapsto","mapstodown","mapstoleft","nleftarrow","nLeftarrow","NotElement","NotGreater","nsubseteqq","nsupseteqq","precapprox","Proportion","rightarrow","RightArrow","Rightarrow","RightFloor","rmoustache","sqsubseteq","sqsupseteq","subsetneqq","succapprox","supsetneqq","ThickSpace","TildeEqual","TildeTilde","UnderBrace","UpArrowBar","UpTeeArrow","upuparrows","varepsilon","varnothing"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u212C","\u229B","\u2295","\u2201","\u22CF","\u2A96","\u2242","\u2131","\u2A8C","\u2148","\u2112","\u21BC","\u2A85","\u2A8B","\u21DA","\u23B0","\u27FC","\u21A7","\u21A4","\u219A","\u21CD","\u2209","\u226F","\u2AC5\u0338","\u2AC6\u0338","\u2AB7","\u2237","\u2192","\u2192","\u21D2","\u230B","\u23B1","\u2291","\u2292","\u2ACB","\u2AB8","\u2ACC","\u205F\u200A","\u2243","\u2248","\u23DF","\u2912","\u21A5","\u21C8","\u03F5","\u2205"][j]
                              + seg.substring(11);
                    continue;
                }
            } else if (candidateLen == 11) {
                j = ["backepsilon","blacksquare","circledcirc","circleddash","CircleMinus","CircleTimes","curlyeqprec","curlyeqsucc","diamondsuit","eqslantless","Equilibrium","expectation","GreaterLess","LeftCeiling","LessGreater","MediumSpace","NotLessLess","NotPrecedes","NotSucceeds","NotSuperset","nrightarrow","nRightarrow","OverBracket","preccurlyeq","precnapprox","quaternions","RightVector","Rrightarrow","RuleDelayed","SmallCircle","SquareUnion","straightphi","SubsetEqual","succcurlyeq","succnapprox","thickapprox","updownarrow","UpDownArrow","Updownarrow","VerticalBar"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u03F6","\u25AA","\u229A","\u229D","\u2296","\u2297","\u22DE","\u22DF","\u2666","\u2A95","\u21CC","\u2130","\u2277","\u2308","\u2276","\u205F","\u226A\u0338","\u2280","\u2281","\u2283\u20D2","\u219B","\u21CF","\u23B4","\u227C","\u2AB9","\u210D","\u21C0","\u21DB","\u29F4","\u2218","\u2294","\u03D5","\u2286","\u227D","\u2ABA","\u2248","\u2195","\u2195","\u21D5","\u2223"][j]
                              + seg.substring(12);
                    continue;
                }
            } else if (candidateLen == 12) {
                j = ["blacklozenge","DownArrowBar","DownTeeArrow","exponentiale","ExponentialE","GreaterEqual","GreaterTilde","HilbertSpace","HumpDownHump","Intersection","LeftArrowBar","LeftTeeArrow","LeftTriangle","LeftUpVector","NotCongruent","NotHumpEqual","NotLessEqual","NotLessTilde","Proportional","RightCeiling","risingdotseq","RoundImplies","ShortUpArrow","SquareSubset","triangledown","triangleleft","UnderBracket","varsubsetneq","varsupsetneq","VerticalLine"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u29EB","\u2913","\u21A7","\u2147","\u2147","\u2265","\u2273","\u210B","\u224E","\u22C2","\u21E4","\u21A4","\u22B2","\u21BF","\u2262","\u224F\u0338","\u2270","\u2274","\u221D","\u2309","\u2253","\u2970","\u2191","\u228F","\u25BF","\u25C3","\u23B5","\u228A\uFE00","\u228B\uFE00","|"][j]
                              + seg.substring(13);
                    continue;
                }
            } else if (candidateLen == 13) {
                j = ["ApplyFunction","bigtriangleup","blacktriangle","DifferentialD","divideontimes","DoubleLeftTee","DoubleUpArrow","fallingdotseq","hookleftarrow","leftarrowtail","leftharpoonup","LeftTeeVector","LeftVectorBar","LessFullEqual","longleftarrow","LongLeftArrow","Longleftarrow","looparrowleft","measuredangle","NotEqualTilde","NotTildeEqual","NotTildeTilde","ntriangleleft","Poincareplane","PrecedesEqual","PrecedesTilde","RightArrowBar","RightTeeArrow","RightTriangle","RightUpVector","shortparallel","smallsetminus","SucceedsEqual","SucceedsTilde","SupersetEqual","triangleright","UpEquilibrium","upharpoonleft","varsubsetneqq","varsupsetneqq","VerticalTilde","VeryThinSpace"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2061","\u25B3","\u25B4","\u2146","\u22C7","\u2AE4","\u21D1","\u2252","\u21A9","\u21A2","\u21BC","\u295A","\u2952","\u2266","\u27F5","\u27F5","\u27F8","\u21AB","\u2221","\u2242\u0338","\u2244","\u2249","\u22EA","\u210C","\u2AAF","\u227E","\u21E5","\u21A6","\u22B3","\u21BE","\u2225","\u2216","\u2AB0","\u227F","\u2287","\u25B9","\u296E","\u21BF","\u2ACB\uFE00","\u2ACC\uFE00","\u2240","\u200A"][j]
                              + seg.substring(14);
                    continue;
                }
            } else if (candidateLen == 14) {
                j = ["curvearrowleft","DiacriticalDot","doublebarwedge","DoubleRightTee","downdownarrows","DownLeftVector","GreaterGreater","hookrightarrow","HorizontalLine","InvisibleComma","InvisibleTimes","LeftDownVector","leftleftarrows","leftrightarrow","LeftRightArrow","Leftrightarrow","leftthreetimes","LessSlantEqual","longrightarrow","LongRightArrow","Longrightarrow","looparrowright","LowerLeftArrow","NestedLessLess","NotGreaterLess","NotLessGreater","NotSubsetEqual","NotVerticalBar","nshortparallel","ntriangleright","OpenCurlyQuote","ReverseElement","rightarrowtail","rightharpoonup","RightTeeVector","RightVectorBar","ShortDownArrow","ShortLeftArrow","SquareSuperset","TildeFullEqual","trianglelefteq","upharpoonright","UpperLeftArrow","ZeroWidthSpace"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u21B6","\u02D9","\u2306","\u22A8","\u21CA","\u21BD","\u2AA2","\u21AA","\u2500","\u2063","\u2062","\u21C3","\u21C7","\u2194","\u2194","\u21D4","\u22CB","\u2A7D","\u27F6","\u27F6","\u27F9","\u21AC","\u2199","\u226A","\u2279","\u2278","\u2288","\u2224","\u2226","\u22EB","\u2018","\u220B","\u21A3","\u21C0","\u295B","\u2953","\u2193","\u2190","\u2290","\u2245","\u22B4","\u21BE","\u2196","\u200B"][j]
                              + seg.substring(15);
                    continue;
                }
            } else if (candidateLen == 15) {
                j = ["bigtriangledown","circlearrowleft","CloseCurlyQuote","ContourIntegral","curvearrowright","DoubleDownArrow","DoubleLeftArrow","downharpoonleft","DownRightVector","leftharpoondown","leftrightarrows","LeftRightVector","LeftTriangleBar","LeftUpTeeVector","LeftUpVectorBar","LowerRightArrow","nleftrightarrow","nLeftrightarrow","NotGreaterEqual","NotGreaterTilde","NotHumpDownHump","NotLeftTriangle","NotSquareSubset","ntrianglelefteq","OverParenthesis","RightDownVector","rightleftarrows","rightsquigarrow","rightthreetimes","ShortRightArrow","straightepsilon","trianglerighteq","UpperRightArrow","vartriangleleft"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u25BD","\u21BA","\u2019","\u222E","\u21B7","\u21D3","\u21D0","\u21C3","\u21C1","\u21BD","\u21C6","\u294E","\u29CF","\u2960","\u2958","\u2198","\u21AE","\u21CE","\u2271","\u2275","\u224E\u0338","\u22EA","\u228F\u0338","\u22EC","\u23DC","\u21C2","\u21C4","\u219D","\u22CC","\u2192","\u03F5","\u22B5","\u2197","\u22B2"][j]
                              + seg.substring(16);
                    continue;
                }
            } else if (candidateLen == 16) {
                j = ["circlearrowright","DiacriticalAcute","DiacriticalGrave","DiacriticalTilde","DoubleRightArrow","DownArrowUpArrow","downharpoonright","EmptySmallSquare","GreaterEqualLess","GreaterFullEqual","LeftAngleBracket","LeftUpDownVector","LessEqualGreater","NonBreakingSpace","NotPrecedesEqual","NotRightTriangle","NotSucceedsEqual","NotSucceedsTilde","NotSupersetEqual","ntrianglerighteq","rightharpoondown","rightrightarrows","RightTriangleBar","RightUpTeeVector","RightUpVectorBar","twoheadleftarrow","UnderParenthesis","UpArrowDownArrow","vartriangleright"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u21BB","\xB4","`","\u02DC","\u21D2","\u21F5","\u21C2","\u25FB","\u22DB","\u2267","\u27E8","\u2951","\u22DA","\xA0","\u2AAF\u0338","\u22EB","\u2AB0\u0338","\u227F\u0338","\u2289","\u22ED","\u21C1","\u21C9","\u29D0","\u295C","\u2954","\u219E","\u23DD","\u21C5","\u22B3"][j]
                              + seg.substring(17);
                    continue;
                }
            } else if (candidateLen == 17) {
                j = ["blacktriangledown","blacktriangleleft","DoubleUpDownArrow","DoubleVerticalBar","DownLeftTeeVector","DownLeftVectorBar","FilledSmallSquare","GreaterSlantEqual","LeftDoubleBracket","LeftDownTeeVector","LeftDownVectorBar","leftrightharpoons","LeftTriangleEqual","NegativeThinSpace","NotGreaterGreater","NotLessSlantEqual","NotNestedLessLess","NotReverseElement","NotSquareSuperset","NotTildeFullEqual","RightAngleBracket","rightleftharpoons","RightUpDownVector","SquareSubsetEqual","twoheadrightarrow","VerticalSeparator"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u25BE","\u25C2","\u21D5","\u2225","\u295E","\u2956","\u25FC","\u2A7E","\u27E6","\u2961","\u2959","\u21CB","\u22B4","\u200B","\u226B\u0338","\u2A7D\u0338","\u2AA1\u0338","\u220C","\u2290\u0338","\u2247","\u27E9","\u21CC","\u294F","\u2291","\u21A0","\u2758"][j]
                              + seg.substring(18);
                    continue;
                }
            } else if (candidateLen == 18) {
                j = ["blacktriangleright","DownRightTeeVector","DownRightVectorBar","longleftrightarrow","LongLeftRightArrow","Longleftrightarrow","NegativeThickSpace","NotLeftTriangleBar","PrecedesSlantEqual","ReverseEquilibrium","RightDoubleBracket","RightDownTeeVector","RightDownVectorBar","RightTriangleEqual","SquareIntersection","SucceedsSlantEqual"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u25B8","\u295F","\u2957","\u27F7","\u27F7","\u27FA","\u200B","\u29CF\u0338","\u227C","\u21CB","\u27E7","\u295D","\u2955","\u22B5","\u2293","\u227D"][j]
                              + seg.substring(19);
                    continue;
                }
            } else if (candidateLen == 19) {
                j = ["DoubleLongLeftArrow","DownLeftRightVector","LeftArrowRightArrow","leftrightsquigarrow","NegativeMediumSpace","NotGreaterFullEqual","NotRightTriangleBar","RightArrowLeftArrow","SquareSupersetEqual"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u27F8","\u2950","\u21C6","\u21AD","\u200B","\u2267\u0338","\u29D0\u0338","\u21C4","\u2292"][j]
                              + seg.substring(20);
                    continue;
                }
            } else if (candidateLen == 20) {
                j = ["CapitalDifferentialD","DoubleLeftRightArrow","DoubleLongRightArrow","EmptyVerySmallSquare","NestedGreaterGreater","NotDoubleVerticalBar","NotGreaterSlantEqual","NotLeftTriangleEqual","NotSquareSubsetEqual","OpenCurlyDoubleQuote","ReverseUpEquilibrium"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u2145","\u21D4","\u27F9","\u25AB","\u226B","\u2226","\u2A7E\u0338","\u22EC","\u22E2","\u201C","\u296F"][j]
                              + seg.substring(21);
                    continue;
                }
            } else if (candidateLen == 21) {
                j = ["CloseCurlyDoubleQuote","DoubleContourIntegral","FilledVerySmallSquare","NegativeVeryThinSpace","NotPrecedesSlantEqual","NotRightTriangleEqual","NotSucceedsSlantEqual"].indexOf(candidateStr);
                if (j >= 0) {
                    output += ["\u201D","\u222F","\u25AA","\u200B","\u22E0","\u22ED","\u22E1"][j]
                              + seg.substring(22);
                    continue;
                }
            } else if (candidateLen == 22) {
                if (candidateStr == "DiacriticalDoubleAcute") {
                    output += "\u02DD" + seg.substring(23);
                    continue;
                } else if (candidateStr == "NotSquareSupersetEqual") {
                    output += "\u22E3" + seg.substring(23);
                    continue;
                }
            } else if (candidateStr == "NotNestedGreaterGreater") {
                output += "\u2AA2\u0338" + seg.substring(24);
                continue;
            } else if (candidateLen == 24) {
                if (candidateStr == "ClockwiseContourIntegral") {
                    output += "\u2232" + seg.substring(25);
                    continue;
                } else if (candidateStr == "DoubleLongLeftRightArrow") {
                    output += "\u27FA" + seg.substring(25);
                    continue;
                }
            } else if (candidateStr == "CounterClockwiseContourIntegral") {
                output += "\u2233" + seg.substring(32);
                continue;
            }
            if (strict) {
                if (candidateLen) parseError("unknown named character reference",7);
                else parseError("missing semicolon after character reference",9);
            } else {
                if (candidateStr == 'AMP') {
                    output += '&' + seg.substring(4); continue;
                } else if (candidateStr == 'GT') {
                    output += '>' + seg.substring(3); continue;
                } else if (candidateStr == 'LT') {
                    output += '<' + seg.substring(3); continue;
                } else if (candidateStr == 'QUOT') {
                    output += '"' + seg.substring(5); continue;
                }
                if (seg.length >= 2) {
                    candidateStr = seg.substring(0, 2);
                    j = ["lt","gt","LT","GT"].indexOf(candidateStr);
                    if (j >= 0) {
                        output += ["<",">","<",">"][j]
                                  + seg.substring(2);
                        continue;
                    }
                    if (seg.length >= 3) {
                        candidateStr = seg.substring(0, 3);
                        j = ["ETH","deg","eth","not","reg","shy","uml","yen","amp","AMP"].indexOf(candidateStr);
                        if (j >= 0) {
                            output += ["\xD0","\xB0","\xF0","\xAC","\xAE","\xAD","\xA8","\xA5","&","&"][j]
                                      + seg.substring(3);
                            continue;
                        }
                        if (seg.length >= 4) {
                            candidateStr = seg.substring(0, 4);
                            j = ["Auml","Euml","Iuml","Ouml","Uuml","auml","cent","copy","euml","iuml","macr","nbsp","ordf","ordm","ouml","para","sect","sup1","sup2","sup3","uuml","yuml","quot","QUOT"].indexOf(candidateStr);
                            if (j >= 0) {
                                output += ["\xC4","\xCB","\xCF","\xD6","\xDC","\xE4","\xA2","\xA9","\xEB","\xEF","\xAF","\xA0","\xAA","\xBA","\xF6","\xB6","\xA7","\xB9","\xB2","\xB3","\xFC","\xFF","\"","\""][j]
                                          + seg.substring(4);
                                continue;
                            }
                            if (seg.length >= 5) {
                                candidateStr = seg.substring(0, 5);
                                j = ["AElig","Acirc","Aring","Ecirc","Icirc","Ocirc","THORN","Ucirc","acirc","acute","aelig","aring","cedil","ecirc","icirc","iexcl","laquo","micro","ocirc","pound","raquo","szlig","thorn","times","ucirc"].indexOf(candidateStr);
                                if (j >= 0) {
                                    output += ["\xC6","\xC2","\xC5","\xCA","\xCE","\xD4","\xDE","\xDB","\xE2","\xB4","\xE6","\xE5","\xB8","\xEA","\xEE","\xA1","\xAB","\xB5","\xF4","\xA3","\xBB","\xDF","\xFE","\xD7","\xFB"][j]
                                              + seg.substring(5);
                                    continue;
                                }
                                if (seg.length >= 6) {
                                    candidateStr = seg.substring(0, 6);
                                    j = ["Aacute","Agrave","Atilde","Ccedil","Eacute","Egrave","Iacute","Igrave","Ntilde","Oacute","Ograve","Oslash","Otilde","Uacute","Ugrave","Yacute","aacute","agrave","atilde","brvbar","ccedil","curren","divide","eacute","egrave","frac12","frac14","frac34","iacute","igrave","iquest","middot","ntilde","oacute","ograve","oslash","otilde","plusmn","uacute","ugrave","yacute"].indexOf(candidateStr);
                                    if (j >= 0) {
                                        output += ["\xC1","\xC0","\xC3","\xC7","\xC9","\xC8","\xCD","\xCC","\xD1","\xD3","\xD2","\xD8","\xD5","\xDA","\xD9","\xDD","\xE1","\xE0","\xE3","\xA6","\xE7","\xA4","\xF7","\xE9","\xE8","\xBD","\xBC","\xBE","\xED","\xEC","\xBF","\xB7","\xF1","\xF3","\xF2","\xF8","\xF5","\xB1","\xFA","\xF9","\xFD"][j]
                                                  + seg.substring(6);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        output += '&' + seg;
    }
    return output;
}

module.exports = {decodeHTML5Entities, decodeHTML4Entities, ERRORS};
