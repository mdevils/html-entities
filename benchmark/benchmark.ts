/* eslint-disable @typescript-eslint/no-require-imports */
import * as Benchmark from 'benchmark';
import * as entities from 'entities';
import * as he from 'he';
import {XmlEntities, Html4Entities, Html5Entities} from './old';
import {decode, DecodeOptions, encode, EncodeOptions} from '../src';

const includeOldTests = Boolean(process.env.INCLUDE_OLD);

const xmlEntities = new XmlEntities();
const html4Entities = new Html4Entities();
const html5Entities = new Html5Entities();

type GlobalWithRequire = typeof global & {require: typeof require};

(global as GlobalWithRequire).require = require;

function cleanNodeModulesCache() {
    const cache = (global as GlobalWithRequire).require.cache;
    for (const cacheKey in cache) {
        delete cache[cacheKey];
    }
}

function createRequireTests(modules: Record<string, string>) {
    return Object.keys(modules).reduce((result, moduleName) => {
        result[moduleName] = function() {
            require(modules[moduleName]);
            cleanNodeModulesCache();
        };
        return result;
    }, {} as Record<string, () => void>);
}

function createHtml5EncodeMethodsNonAscii(textToEncode: string) {
    const heOptions = {useNamedReferences: true};
    const nonAsciiPrintable: EncodeOptions = {level: 'html5', mode: 'nonAsciiPrintable'};
    const nonAscii: EncodeOptions = {level: 'html5', mode: 'nonAscii'};
    return {
        'html-entities.encode - html5, nonAscii': () => encode(textToEncode, nonAscii),
        'html-entities.encode - html5, nonAsciiPrintable': () => encode(textToEncode, nonAsciiPrintable),
        'entities.encodeNonAsciiHTML': () => entities.encodeNonAsciiHTML(textToEncode),
        'he.encode': () => he.encode(textToEncode, heOptions)
    };
}

function createHtml5EncodeMethods(textToEncode: string) {
    const extensive: EncodeOptions = {level: 'html5', mode: 'extensive'};
    return {
        'html-entities.encode - html5, extensive': () => encode(textToEncode, extensive),
        'entities.encodeHTML': () => entities.encodeHTML(textToEncode)
    };
}

function createHtml5DecodeMethods(textToDecode: string) {
    const strict: DecodeOptions = {level: 'html5', scope: 'strict'};
    const body: DecodeOptions = {level: 'html5', scope: 'body'};
    const attribute: DecodeOptions = {level: 'html5', scope: 'attribute'};
    return {
        'html-entities.decode - html5, strict': () => decode(textToDecode, strict),
        'html-entities.decode - html5, body': () => decode(textToDecode, body),
        'html-entities.decode - html5, attribute': () => decode(textToDecode, attribute),
        '(old) Html5Entities.decode': () => html5Entities.decode(textToDecode),
        'entities.decodeHTML': () => entities.decodeHTML(textToDecode),
        'entities.decodeHTMLStrict': () => entities.decodeHTMLStrict(textToDecode),
        'he.decode': () => he.decode(textToDecode)
    };
}

function createHtml4EncodeMethods(textToEncode: string) {
    const nonAsciiPrintable: EncodeOptions = {level: 'html4', mode: 'nonAsciiPrintable'};
    const extensive: EncodeOptions = {level: 'html4', mode: 'extensive'};
    const nonAscii: EncodeOptions = {level: 'html4', mode: 'nonAscii'};
    return {
        'html-entities.encode - html4, nonAscii': () => encode(textToEncode, nonAscii),
        'html-entities.encode - html4, nonAsciiPrintable': () => encode(textToEncode, nonAsciiPrintable),
        'html-entities.encode - html4, extensive': () => encode(textToEncode, extensive),
        '(old) Html4Entities.encodeNonASCII': () => html4Entities.encodeNonASCII(textToEncode)
    };
}

function createHtml4DecodeMethods(textToDecode: string) {
    const strict: DecodeOptions = {level: 'html4', scope: 'strict'};
    const body: DecodeOptions = {level: 'html4', scope: 'body'};
    const attribute: DecodeOptions = {level: 'html4', scope: 'attribute'};
    return {
        'html-entities.decode - html4, strict': () => decode(textToDecode, strict),
        'html-entities.decode - html4, body': () => decode(textToDecode, body),
        'html-entities.decode - html4, attribute': () => decode(textToDecode, attribute),
        '(old) Html4Entities.decode': () => html4Entities.decode(textToDecode)
    };
}

function createXmlEncodeMethods(textToEncode: string) {
    const nonAsciiPrintable: EncodeOptions = {level: 'xml', mode: 'nonAsciiPrintable'};
    const extensive: EncodeOptions = {level: 'xml', mode: 'extensive'};
    const nonAscii: EncodeOptions = {level: 'xml', mode: 'nonAscii'};
    return {
        'html-entities.encode - xml, nonAscii': () => encode(textToEncode, nonAscii),
        'html-entities.encode - xml, nonAsciiPrintable': () => encode(textToEncode, nonAsciiPrintable),
        'html-entities.encode - xml, extensive': () => encode(textToEncode, extensive),
        '(old) XmlEntities.encodeNonASCII': () => xmlEntities.encode(textToEncode),
        'entities.encodeXML': () => entities.encodeXML(textToEncode)
    };
}

function createXmlDecodeMethods(textToDecode: string) {
    const strict: DecodeOptions = {level: 'xml', scope: 'strict'};
    const body: DecodeOptions = {level: 'xml', scope: 'body'};
    const attribute: DecodeOptions = {level: 'xml', scope: 'attribute'};
    return {
        'html-entities.decode - xml, strict': () => decode(textToDecode, strict),
        'html-entities.decode - xml, body': () => decode(textToDecode, body),
        'html-entities.decode - xml, attribute': () => decode(textToDecode, attribute),
        '(old) XmlEntities.decode': () => xmlEntities.decode(textToDecode),
        'entities.decodeXML': () => entities.decodeXML(textToDecode)
    };
}

function createEscapeMethods(textToEncode: string) {
    const specialChars: EncodeOptions = {level: 'xml', mode: 'specialChars'};
    return {
        'html-entities.encode - xml, specialChars': () => encode(textToEncode, specialChars),
        '(old) XmlEntities.encode': () => xmlEntities.encode(textToEncode),
        'he.escape': () => he.escape(textToEncode),
        'entities.escapeUTF8': () => entities.escapeUTF8(textToEncode),
        'entities.escape': () => entities.escape(textToEncode)
    };
}

function section(sectionName: string, callback: () => void) {
    console.log(sectionName + '\n');
    callback();
}

const indent = '    ';
const indentWithPointer = '  * ';

function benchmark(name: string, tests: {[key: string]: () => void}) {
    console.log(`${indent}${name}\n`);
    const suite = new Benchmark.Suite();
    for (const [testName, testCallback] of Object.entries(tests)) {
        if (!includeOldTests && testName.indexOf('(old)') !== -1) {
            continue;
        }
        suite.add(testName, testCallback);
    }
    suite.on('complete', function (this: Benchmark.Suite) {
        const benchmarks = Array.from((this as unknown) as Benchmark[]);
        benchmarks.sort(function ({stats: statsA}: Benchmark, {stats: statsB}: Benchmark) {
            return statsA.mean + statsA.moe > statsB.mean + statsB.moe ? 1 : -1;
        });
        for (let i = 0; i < benchmarks.length; i++) {
            const benchmarkText = String(benchmarks[i]);
            const secondIndent = benchmarkText.includes('html-entities') ? indentWithPointer : indent;
            console.log(`${indent}${secondIndent}#${i + 1}: ${benchmarkText}`);
        }
    });
    suite.run();
    console.log();
}

section('Common', () => {
    benchmark(
        'Initialization / Load speed',
        createRequireTests({
            'html-entities': '../lib',
            entities: 'entities',
            he: 'he'
        }),
        // cleanNodeModulesCache
    );
});
section('HTML5', () => {
    benchmark(
        'Encode test',
        createHtml5EncodeMethods(
            `
                This is a test encode benchmark.
                Should contain <>&' and ".
                Some control characters: \x01.
                Some HTML5-only named references: ℞ ⪶.
                And some unicode symbols: ©, ∆, —, 😂.
                Good luck.
            `
        )
    );
    benchmark(
        'Encode non-ASCII test',
        createHtml5EncodeMethodsNonAscii(
            `
                This is a test encode benchmark.
                Should contain <>&' and ".
                Some control characters: \x01.
                Some HTML5-only named references: ℞ ⪶.
                And some unicode symbols: ©, ∆, —, 😂.
                Good luck.
            `
        )
    );
    benchmark(
        'Decode test',
        createHtml5DecodeMethods(
            `
                &#60;This&#62; is a test encode benchmark.
                Should contain &lt;&gt;&amp;&apos; and &quot;.
                Some control characters: &#1;.
                Some HTML5-only named references: &rx; &succneqq;.
                And some unicode symbols: &copy;, &#8710;, &mdash;, &#x1f602;.
                Good luck.
            `
        )
    );
});
section('HTML4', () => {
    benchmark(
        'Encode test',
        createHtml4EncodeMethods(
            `
                This is a test encode benchmark.
                Should contain <>&' and ".
                Some control characters: \x01.
                Some HTML4 named references: &ordm; &raquo;.
                And some unicode symbols: ©, ∆, —, 😂.
                Good luck.
            `
        )
    );
    benchmark(
        'Decode test',
        createHtml4DecodeMethods(
            `
                &#60;This&#62; is a test encode benchmark.
                Should contain &lt;&gt;&amp;&apos; and &quot;.
                Some control characters: &#1;.
                Some HTML4 named references: º ».
                And some unicode symbols: &copy;, &#8710;, &mdash;, &#x1f602;.
                Good luck.
            `
        )
    );
});

section('XML', () => {
    benchmark(
        'Encode test',
        createXmlEncodeMethods(
            `
                This is a test encode benchmark.
                Should contain <>&' and ".
                Some control characters: \x01.
                And some unicode symbols: ©, ∆, —, 😂.
                Good luck.
            `
        )
    );
    benchmark(
        'Decode test',
        createXmlDecodeMethods(
            `
                &#60;This&#62; is a test encode benchmark.
                Should contain &lt;&gt;&amp;&apos; and &quot;.
                Some control characters: &#1;.
                And some unicode symbols: &#8710;, &#x1f602;.
                Good luck.
            `
        )
    );
});

section('Escaping', () => {
    benchmark(
        'Escape test',
        createEscapeMethods(
            `
                This is a test encode benchmark.
                Should contain <>&' and ".
                Some control characters: \x01.
                And some unicode symbols: ©, ∆, —, 😂.
                Good luck.
            `
        )
    );
});
