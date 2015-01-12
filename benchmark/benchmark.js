var htmlEntities = require('..');
var xmlEntities = new htmlEntities.XmlEntities();
var html4Entities = new htmlEntities.Html4Entities();
var html5Entities = new htmlEntities.Html5Entities();

var NodeHtmlEncoder = require('node-html-encoder').Encoder;
var entities = require("entities");

var nodeHtmlEncoderEntities = new NodeHtmlEncoder('entity');
var nodeHtmlEncoderNumerical = new NodeHtmlEncoder('numerical');

var textToEncode = 'This is a test encode benchmark. Should contain <>&\' and ". And some unicode symbols: ©, ∆, —. Good luck.'

benchmark('Encode test', {
    'XmlEntities.encode': function () { xmlEntities.encode(textToEncode); },
    'XmlEntities.encodeNonUTF': function () { xmlEntities.encodeNonUTF(textToEncode); },
    'Html4Entities.encode': function () { html4Entities.encode(textToEncode); },
    'Html4Entities.encodeNonUTF': function () { html4Entities.encodeNonUTF (textToEncode); },
    'html5Entities.encode': function () { html5Entities.encode (textToEncode); },
    'html5Entities.encodeNonUTF': function () { html5Entities.encodeNonUTF (textToEncode); },
    'nodeHtmlEncoder(entities).htmlEncode': function () { nodeHtmlEncoderEntities.htmlEncode (textToEncode); },
    'nodeHtmlEncoder(numerical).htmlEncode': function () { nodeHtmlEncoderNumerical.htmlEncode (textToEncode); },
    'entities.encodeXML': function () { entities.encodeXML (textToEncode); },
    'entities.encodeHTML4': function () { entities.encodeHTML4 (textToEncode); },
    'entities.encodeHTML5': function () { entities.encodeHTML5 (textToEncode); }

});

var textToDecode = '&#60;This&#62; is a test encode benchmark. Should contain &lt;&gt;&amp;&apos; and &quot;. And some unicode symbols: &copy;, &#8710;, &mdash;. Good luck.'

benchmark('Decode test', {
    'XmlEntities.decode': function () { xmlEntities.decode(textToDecode); },
    'Html4Entities.decode': function () { html4Entities.decode(textToDecode); },
    'html5Entities.decode': function () { html5Entities.decode(textToDecode); },
    'nodeHtmlEncoder(entities).htmlDecode': function () { nodeHtmlEncoderEntities.htmlDecode(textToDecode); },
    'nodeHtmlEncoder(numerical).htmlDecode': function () { nodeHtmlEncoderNumerical.htmlDecode(textToDecode); },
    'entities.decodeXML': function () { entities.decodeXML(textToDecode); },
    'entities.decodeHTML4': function () { entities.decodeHTML4(textToDecode); },
    'entities.decodeHTML5': function () { entities.decodeHTML5(textToDecode); }
});

var littleTextToDecode = '&lt;';

benchmark('Decode little text test', {
    'XmlEntities.decode': function () { xmlEntities.decode(littleTextToDecode); },
    'Html4Entities.decode': function () { html4Entities.decode(littleTextToDecode); },
    'html5Entities.decode': function () { html5Entities.decode(littleTextToDecode); },
    'nodeHtmlEncoder(entities).htmlDecode': function () { nodeHtmlEncoderEntities.htmlDecode(littleTextToDecode); },
    'nodeHtmlEncoder(numerical).htmlDecode': function () { nodeHtmlEncoderNumerical.htmlDecode(littleTextToDecode); },
    'entities.decodeXML': function () { entities.decodeXML(littleTextToDecode); },
    'entities.decodeHTML4': function () { entities.decodeHTML4(littleTextToDecode); },
    'entities.decodeHTML5': function () { entities.decodeHTML5(littleTextToDecode); }
});

var emptyTextToDecode = '';

benchmark('Decode empty text test', {
    'XmlEntities.decode': function () { xmlEntities.decode(emptyTextToDecode); },
    'Html4Entities.decode': function () { html4Entities.decode(emptyTextToDecode); },
    'html5Entities.decode': function () { html5Entities.decode(emptyTextToDecode); },
    'nodeHtmlEncoder(entities).htmlDecode': function () { nodeHtmlEncoderEntities.htmlDecode(emptyTextToDecode); },
    'nodeHtmlEncoder(numerical).htmlDecode': function () { nodeHtmlEncoderNumerical.htmlDecode(emptyTextToDecode); },
    'entities.decodeXML': function () { entities.decodeXML(emptyTextToDecode); },
    'entities.decodeHTML4': function () { entities.decodeHTML4(emptyTextToDecode); },
    'entities.decodeHTML5': function () { entities.decodeHTML5(emptyTextToDecode); }
});

/**
 * @param {String} name
 * @param {Object} tests
 */
function benchmark(name, tests) {
    var c = 10000;
    console.log(name + ' ' + c + ' times.');

    Object.keys(tests).forEach(function (testName) {
        var cb = tests[testName];
        var i = 0;
        var start = new Date();
        while (i < c) {
            cb();
            i++;
        }
        var time = (new Date()) - start;
        console.log('    ' + testName + ': ' + time + 'ms, ' + (Math.round(c/time)) + 'op/msec');
    });
}
