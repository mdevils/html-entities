{XmlEntities, Html5Entities, Html4Entities} = require('../index')

NodeHtmlEncoder = require('node-html-encoder').Encoder
entities = require("entities")

nodeHtmlEncoderEntities = new NodeHtmlEncoder('entity');
nodeHtmlEncoderNumerical = new NodeHtmlEncoder('numerical');

benchmark = (name, tests) ->
  c = 10000
  console.log name + ' ' + c + ' times.'
  Object.keys(tests).forEach (testName) ->
    cb = tests[testName]
    i = 0
    start = new Date()
    while i < c
      cb()
      i++
    time = (new Date()) - start
    console.log '    ' + testName + ': ' + time + 'ms, ' + (Math.round(c/time)) + 'op/msec'
  console.log ''

xmlEntities = new XmlEntities
html4Entities = new Html4Entities
html5Entities = new Html5Entities

textToEncode = 'This is a test encode benchmark. Should contain <>&\' and ". And some unicode symbols: ©, ∆, —. Good luck.'

benchmark 'Encode test',
  'XmlEntities.encode': (-> xmlEntities.encode textToEncode)
  'XmlEntities.encodeNonUTF': (-> xmlEntities.encodeNonUTF textToEncode)
  'Html4Entities.encode': (-> html4Entities.encode textToEncode)
  'Html4Entities.encodeNonUTF': (-> html4Entities.encodeNonUTF textToEncode)
  'html5Entities.encode': (-> html5Entities.encode textToEncode)
  'html5Entities.encodeNonUTF': (-> html5Entities.encodeNonUTF textToEncode)
  'nodeHtmlEncoder(entities).htmlEncode': (-> nodeHtmlEncoderEntities.htmlEncode textToEncode)
  'nodeHtmlEncoder(numerical).htmlEncode': (-> nodeHtmlEncoderNumerical.htmlEncode textToEncode)
  'entities.encodeXML': (-> entities.encodeXML textToEncode)
  'entities.encodeHTML4': (-> entities.encodeHTML4 textToEncode)
  'entities.encodeHTML5': (-> entities.encodeHTML5 textToEncode)

textToDecode = '&#60;This&#62; is a test encode benchmark. Should contain &lt;&gt;&amp;&apos; and &quot;. And some unicode symbols: &copy;, &#8710;, &mdash;. Good luck.'

benchmark 'Decode test',
  'XmlEntities.decode': (-> xmlEntities.decode textToDecode)
  'Html4Entities.decode': (-> html4Entities.decode textToDecode)
  'html5Entities.decode': (-> html5Entities.decode textToDecode)
  'nodeHtmlEncoder(entities).htmlDecode': (-> nodeHtmlEncoderEntities.htmlDecode textToDecode)
  'nodeHtmlEncoder(numerical).htmlDecode': (-> nodeHtmlEncoderNumerical.htmlDecode textToDecode)
  'entities.decodeXML': (-> entities.decodeXML textToDecode)
  'entities.decodeHTML4': (-> entities.decodeHTML4 textToDecode)
  'entities.decodeHTML5': (-> entities.decodeHTML5 textToDecode)

littleTextToDecode = '&lt;'

benchmark 'Decode little text test',
  'XmlEntities.decode': (-> xmlEntities.decode littleTextToDecode)
  'Html4Entities.decode': (-> html4Entities.decode littleTextToDecode)
  'html5Entities.decode': (-> html5Entities.decode littleTextToDecode)
  'nodeHtmlEncoder(entities).htmlDecode': (-> nodeHtmlEncoderEntities.htmlDecode littleTextToDecode)
  'nodeHtmlEncoder(numerical).htmlDecode': (-> nodeHtmlEncoderNumerical.htmlDecode littleTextToDecode)
  'entities.decodeXML': (-> entities.decodeXML littleTextToDecode)
  'entities.decodeHTML4': (-> entities.decodeHTML4 littleTextToDecode)
  'entities.decodeHTML5': (-> entities.decodeHTML5 littleTextToDecode)

emptyTextToDecode = ''

benchmark 'Decode empty text test',
  'XmlEntities.decode': (-> xmlEntities.decode emptyTextToDecode)
  'Html4Entities.decode': (-> html4Entities.decode emptyTextToDecode)
  'html5Entities.decode': (-> html5Entities.decode emptyTextToDecode)
  'nodeHtmlEncoder(entities).htmlDecode': (-> nodeHtmlEncoderEntities.htmlDecode emptyTextToDecode)
  'nodeHtmlEncoder(numerical).htmlDecode': (-> nodeHtmlEncoderNumerical.htmlDecode emptyTextToDecode)
  'entities.decodeXML': (-> entities.decodeXML emptyTextToDecode)
  'entities.decodeHTML4': (-> entities.decodeHTML4 emptyTextToDecode)
  'entities.decodeHTML5': (-> entities.decodeHTML5 emptyTextToDecode)

