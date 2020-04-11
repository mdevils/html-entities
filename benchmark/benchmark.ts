import * as htmlEntities from '../src';

const xmlEntities = new htmlEntities.XmlEntities();
const html4Entities = new htmlEntities.Html4Entities();
const html5Entities = new htmlEntities.Html5Entities();

const NodeHtmlEncoder = require('node-html-encoder').Encoder;
const entities = require("entities");

const nodeHtmlEncoderEntities = new NodeHtmlEncoder('entity');
const nodeHtmlEncoderNumerical = new NodeHtmlEncoder('numerical');

const textToEncode = 'This is a test encode benchmark. Should contain <>&\' and ". And some unicode symbols: ©, ∆, —. Good luck.';

benchmark('Encode test', {
    'XmlEntities.encode': () => xmlEntities.encode(textToEncode),
    'XmlEntities.encodeNonUTF': () => xmlEntities.encodeNonUTF(textToEncode),
    'Html4Entities.encode': () => html4Entities.encode(textToEncode),
    'Html4Entities.encodeNonUTF': () => html4Entities.encodeNonUTF (textToEncode),
    'html5Entities.encode': () => html5Entities.encode (textToEncode),
    'html5Entities.encodeNonUTF': () => html5Entities.encodeNonUTF (textToEncode),
    'nodeHtmlEncoder(entities).htmlEncode': () => nodeHtmlEncoderEntities.htmlEncode (textToEncode),
    'nodeHtmlEncoder(numerical).htmlEncode': () => nodeHtmlEncoderNumerical.htmlEncode (textToEncode),
    'entities.encodeXML': () => entities.encodeXML (textToEncode),
    'entities.encodeHTML4': () => entities.encodeHTML4 (textToEncode),
    'entities.encodeHTML5': () => entities.encodeHTML5 (textToEncode)

});

const textToDecode = '&#60;This&#62; is a test encode benchmark. Should contain &lt;&gt;&amp;&apos; and &quot;. And some unicode symbols: &copy;, &#8710;, &mdash;. Good luck.';

benchmark('Decode test', {
    'XmlEntities.decode': () => xmlEntities.decode(textToDecode),
    'Html4Entities.decode': () => html4Entities.decode(textToDecode),
    'html5Entities.decode': () => html5Entities.decode(textToDecode),
    'nodeHtmlEncoder(entities).htmlDecode': () => nodeHtmlEncoderEntities.htmlDecode(textToDecode),
    'nodeHtmlEncoder(numerical).htmlDecode': () => nodeHtmlEncoderNumerical.htmlDecode(textToDecode),
    'entities.decodeXML': () => entities.decodeXML(textToDecode),
    'entities.decodeHTML4': () => entities.decodeHTML4(textToDecode),
    'entities.decodeHTML5': () => entities.decodeHTML5(textToDecode)
});

const littleTextToDecode = '&lt;';

benchmark('Decode little text test', {
    'XmlEntities.decode': () => xmlEntities.decode(littleTextToDecode),
    'Html4Entities.decode': () => html4Entities.decode(littleTextToDecode),
    'html5Entities.decode': () => html5Entities.decode(littleTextToDecode),
    'nodeHtmlEncoder(entities).htmlDecode': () => nodeHtmlEncoderEntities.htmlDecode(littleTextToDecode),
    'nodeHtmlEncoder(numerical).htmlDecode': () => nodeHtmlEncoderNumerical.htmlDecode(littleTextToDecode),
    'entities.decodeXML': () => entities.decodeXML(littleTextToDecode),
    'entities.decodeHTML4': () => entities.decodeHTML4(littleTextToDecode),
    'entities.decodeHTML5': () => entities.decodeHTML5(littleTextToDecode)
});

const emptyTextToDecode = '';

benchmark('Decode empty text test', {
    'XmlEntities.decode': () => xmlEntities.decode(emptyTextToDecode),
    'Html4Entities.decode': () => html4Entities.decode(emptyTextToDecode),
    'html5Entities.decode': () => html5Entities.decode(emptyTextToDecode),
    'nodeHtmlEncoder(entities).htmlDecode': () => nodeHtmlEncoderEntities.htmlDecode(emptyTextToDecode),
    'nodeHtmlEncoder(numerical).htmlDecode': () => nodeHtmlEncoderNumerical.htmlDecode(emptyTextToDecode),
    'entities.decodeXML': () => entities.decodeXML(emptyTextToDecode),
    'entities.decodeHTML4': () => entities.decodeHTML4(emptyTextToDecode),
    'entities.decodeHTML5': () => entities.decodeHTML5(emptyTextToDecode)
});

function benchmark(name: string, tests: {[key: string]: () => void}) {
    const c = 10000;
    console.log(name + ' ' + c + ' times.');

    Object.keys(tests).forEach(function (testName) {
        const cb = tests[testName];
        const start = Date.now();
        let i = 0;
        while (i < c) {
            cb();
            i++;
        }
        const time = Date.now() - start;
        console.log('    ' + testName + ': ' + time + 'ms, ' + (Math.round(c/time)) + 'op/msec');
    });
}
