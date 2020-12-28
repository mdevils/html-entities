import * as Benchmark from 'benchmark';
import * as entities from 'entities';
import * as he from 'he';
import {Html4Entities} from './old/html4-entities';
import {Html5Entities} from './old/html5-entities';
import {XmlEntities} from './old/xml-entities';
import {decode, DecodeOptions, encode, EncodeOptions} from '../src';

const xmlEntities = new XmlEntities();
const html4Entities = new Html4Entities();
const html5Entities = new Html5Entities();

function createHtmlEncodeMethods(textToEncode: string) {
    const encodeOptions: Record<string, EncodeOptions> = {
        'html5, specialChars': {level: 'html5', mode: 'specialChars'},
        'html5, nonAsciiPrintable': {level: 'html5', mode: 'nonAsciiPrintable'},
        'html5, nonAscii': {level: 'html5', mode: 'nonAscii'}
    };

    const encodeMethods = Object.keys(encodeOptions).reduce((result, key) => {
        const options = encodeOptions[key];
        result['html-entities.encode - ' + key] = () => encode(textToEncode, options);
        return result;
    }, {} as Record<string, () => void>);

    const heOptions = {
        useNamedReferences: true
    };
    return {
        ...encodeMethods,
        // '(old) Html4Entities.encode': () => html4Entities.encode(textToEncode),
        // '(old) Html5Entities.encode': () => html5Entities.encode(textToEncode),
        'entities.encodeHTML5': () => entities.encodeHTML5(textToEncode),
        'he.encode': () => he.encode(textToEncode, heOptions)
    };
}

function createHtmlDecodeMethods(textToDecode: string) {
    const decodeOptions: Record<string, DecodeOptions> = {
        'html5, strict': {level: 'html5', scope: 'strict'},
        'html5, body': {level: 'html5', scope: 'body'},
        'html5, attribute': {level: 'html5', scope: 'attribute'}
    };

    const decodeMethods = Object.keys(decodeOptions).reduce((result, key) => {
        const options = decodeOptions[key];
        result['html-entities.decode - ' + key] = () => decode(textToDecode, options);
        return result;
    }, {} as Record<string, () => void>);

    return {
        ...decodeMethods,
        // '(old) Html4Entities.decode': () => html4Entities.decode(textToDecode),
        // '(old) Html5Entities.decode': () => html5Entities.decode(textToDecode),
        'entities.decodeHTML4': () => entities.decodeHTML4(textToDecode),
        'entities.decodeHTML5': () => entities.decodeHTML5(textToDecode),
        'he.decode': () => he.decode(textToDecode)
    };
}

function createXmlEncodeMethods(textToEncode: string) {
    const encodeOptions: Record<string, EncodeOptions> = {
        'xml, specialChars': {level: 'xml', mode: 'specialChars'},
        'xml, nonAsciiPrintable': {level: 'xml', mode: 'nonAsciiPrintable'},
        'xml, nonAscii': {level: 'xml', mode: 'nonAscii'}
    };

    const encodeMethods = Object.keys(encodeOptions).reduce((result, key) => {
        const options = encodeOptions[key];
        result['html-entities.encode - ' + key] = () => encode(textToEncode, options);
        return result;
    }, {} as Record<string, () => void>);

    return {
        ...encodeMethods,
        // '(old) XmlEntities.encode': () => xmlEntities.encode(textToEncode),
        'entities.encodeXML': () => entities.encodeXML(textToEncode),
        'entities.escape': () => entities.escape(textToEncode),
        'he.escape': () => he.escape(textToEncode)
    };
}

function createXmlDecodeMethods(textToDecode: string) {
    const decodeOptions: Record<string, DecodeOptions> = {
        'xml, strict': {level: 'xml', scope: 'strict'},
        'xml, body': {level: 'xml', scope: 'body'},
        'xml, attribute': {level: 'xml', scope: 'attribute'}
    };

    const decodeMethods = Object.keys(decodeOptions).reduce((result, key) => {
        const options = decodeOptions[key];
        result['html-entities.decode - ' + key] = () => decode(textToDecode, options);
        return result;
    }, {} as Record<string, () => void>);

    return {
        ...decodeMethods,
        // '(old) XmlEntities.decode': () => xmlEntities.decode(textToDecode),
        'entities.decodeXML': () => entities.decodeXML(textToDecode),
        'entities.decodeXMLStrict': () => entities.decodeXMLStrict(textToDecode),
        'he.unescape': () => he.unescape(textToDecode)
    };
}

function section(sectionName: string, callback: () => void) {
    console.log(sectionName);
    callback();
}

const indent = '    ';

function benchmark(name: string, tests: {[key: string]: () => void}) {
    console.log(`${indent}${name}`);
    const suite = new Benchmark.Suite();
    for (const [testName, testCallback] of Object.entries(tests)) {
        suite.add(testName, testCallback);
    }
    suite.on('complete', function (this: Benchmark.Suite) {
        const benchmarks = Array.from((this as unknown) as Benchmark[]);
        benchmarks.sort(function ({stats: statsA}: Benchmark, {stats: statsB}: Benchmark) {
            return statsA.mean + statsA.moe > statsB.mean + statsB.moe ? 1 : -1;
        });
        for (let i = 0; i < benchmarks.length; i++) {
            console.log(`${indent}${indent}#${i + 1}: ${String(benchmarks[i])}`);
        }
    });
    suite.run();
}

section('HTML', () => {
    benchmark(
        'Encode test',
        createHtmlEncodeMethods(
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
        createHtmlDecodeMethods(
            `
                &#60;This&#62; is a test encode benchmark.
                Should contain &lt;&gt;&amp;&apos; and &quot;.
                Some control characters: &#1;.
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
