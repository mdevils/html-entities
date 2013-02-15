{HtmlEntities} = require('./html-entities.coffee')

class exports.BasicHtmlEntities extends HtmlEntities
  encode: (str) ->
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  decode: (str) ->
    str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&')