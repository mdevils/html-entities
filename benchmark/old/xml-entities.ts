import {fromCodePoint, getCodePoint, highSurrogateFrom, highSurrogateTo} from '../../src/surrogate-pairs';

const ALPHA_INDEX: {[entity: string]: string} = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

const CHAR_INDEX: {[charCode: string]: string} = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

const CHAR_S_INDEX: {[char: string]: string} = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

export class XmlEntities {
    encode(str: string) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/[<>"'&]/g, function (s) {
            return CHAR_S_INDEX[s];
        });
    }

    static encode(str: string) {
        return new XmlEntities().encode(str);
    }

    decode(str: string) {
        if (!str || !str.length) {
            return '';
        }
        return str.replace(/&#?[0-9a-zA-Z]+;?/g, function (s) {
            if (s.charAt(1) === '#') {
                const code = s.charAt(2).toLowerCase() === 'x' ?
                    parseInt(s.substr(3), 16) :
                    parseInt(s.substr(2));

                if (!isNaN(code) || code >= -32768) {
                    if (code <= 65535) {
                        return String.fromCharCode(code);
                    } else {
                        return fromCodePoint(code);
                    }
                }
                return '';
            }
            return ALPHA_INDEX[s] || s;
        });
    }

    static decode(str: string) {
        return new XmlEntities().decode(str);
    }

    encodeNonUTF(str: string) {
        if (!str || !str.length) {
            return '';
        }
        const strLength = str.length;
        let result = '';
        let i = 0;
        while (i < strLength) {
            const c = str.charCodeAt(i);
            const alpha = CHAR_INDEX[c];
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
            if (c < 32 || c > 126) {
                if (c >= highSurrogateFrom && c <= highSurrogateTo) {
                    result += '&#' + getCodePoint(str, i) + ';';
                    i++;
                } else {
                    result += '&#' + c + ';';
                }
            } else {
                result += str.charAt(i);
            }
            i++;
        }
        return result;
    }

    static encodeNonUTF(str: string) {
        return new XmlEntities().encodeNonUTF(str);
    }

    encodeNonASCII(str: string) {
        if (!str || !str.length) {
            return '';
        }
        const strLength = str.length;
        let result = '';
        let i = 0;
        while (i < strLength) {
            const c = str.charCodeAt(i);
            if (c <= 255) {
                result += str[i++];
                continue;
            }
            if (c >= highSurrogateFrom && c <= highSurrogateTo) {
                result += '&#' + getCodePoint(str, i) + ';';
                i++;
            } else {
                result += '&#' + c + ';';
            }
            i++;
        }
        return result;
    }

    static encodeNonASCII(str: string) {
        return new XmlEntities().encodeNonASCII(str);
    }
}
