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

export type EncodeMode = 'specialChars' | 'nonAscii' | 'nonAsciiPrintable' | 'extensive';

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
    nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
    extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
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

    const encodeRegExp = encodeRegExps[mode];
    encodeRegExp.lastIndex = 0;

    let match = encodeRegExp.exec(text);

    if (!match) {
        return text;
    }

    const references = allNamedReferences[level].characters;
    const isHex = numeric === 'hexadecimal';

    let lastIndex = 0;
    let result = '';

    do {
        if (lastIndex !== match.index) {
            result += text.substring(lastIndex, match.index);
        }
        const input = match[0];
        const entity = references[input];
        if (entity) {
            result += entity;
        } else {
            const code = input.length > 1 ? getCodePoint(input, 0)! : input.charCodeAt(0);
            result += (isHex ? '&#x' + code.toString(16) : '&#' + code) + ';';
        }
        lastIndex = match.index + input.length;
    } while ((match = encodeRegExp.exec(text)));

    if (lastIndex !== text.length) {
        result += text.substring(lastIndex, text.length);
    }

    return result;
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
const outOfBoundsChar = fromCharCode(65533);

const defaultDecodeEntityOptions: CommonOptions = {
    level: 'all'
};

export function decodeEntity(
    entity: string | undefined | null,
    {level = 'all'}: CommonOptions = defaultDecodeEntityOptions
): string {
    if (!entity) {
        return '';
    }

    const references = allNamedReferences[level].entities;
    const resultByReference = references[entity];
    if (resultByReference) {
        return resultByReference;
    }
    if (entity[0] === '&' && entity[1] === '#') {
        const secondChar = entity[2];
        const code =
            secondChar == 'x' || secondChar == 'X' ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));

        return code >= 0x10ffff
            ? outOfBoundsChar
            : code > 65535
            ? fromCodePoint(code)
            : fromCharCode(numericUnicodeMap[code] || code);
    }
    return entity;
}

export function decode(
    text: string | undefined | null,
    {level = 'all', scope = level === 'xml' ? 'strict' : 'body'}: DecodeOptions = defaultDecodeOptions
) {
    if (!text) {
        return '';
    }
    const decodeRegExp = decodeRegExps[level][scope];

    let match = decodeRegExp.exec(text);

    if (!match) {
        return text;
    }

    const references = allNamedReferences[level].entities;
    const isAttribute = scope === 'attribute';

    let lastIndex = 0;
    let result = '';

    do {
        const entity = match[0];
        if (lastIndex !== match.index) {
            result += text.substring(lastIndex, match.index);
        }
        if (isAttribute && entity[entity.length - 1] === '=') {
            result += entity;
        } else if (entity[1] != '#') {
            result += references[entity] || entity;
        } else {
            const secondChar = entity[2];
            const code =
                secondChar == 'x' || secondChar == 'X' ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));

            result +=
                code >= 0x10ffff
                    ? outOfBoundsChar
                    : code > 65535
                    ? fromCodePoint(code)
                    : fromCharCode(numericUnicodeMap[code] || code);
        }

        lastIndex = match.index + entity.length;
    } while ((match = decodeRegExp.exec(text)));

    if (lastIndex !== text.length) {
        result += text.substring(lastIndex, text.length);
    }

    return result;
}
