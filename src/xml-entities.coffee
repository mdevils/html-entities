class exports.XmlEntities
  alphaIndex =
    'lt': '<'
    'gt': '>'
    'quot': '"'
    'apos': '\''
    'amp': '&'
  charIndex =
    60: 'lt'
    62: 'gt'
    34: 'quot'
    39: 'apos'
    38: 'amp'
  encode: (str) ->
    str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  decode: (str) ->
    str.replace /&(#?[\w\d]+);?/g, (s, entity) ->
      if entity.charAt(0) == "#"
        if entity.charAt(1) == 'x'
          code = parseInt(entity.substr(2).toLowerCase(), 16)
        else
          code = parseInt(entity.substr(1))
        if isNaN(code) || code < -32768 || code > 65535
          char = ''
        else
          char = String.fromCharCode(code)
      else
        char = alphaIndex[entity] || alphaIndex[entity.toLowerCase()]
      return if char == undefined then "" else char
  encodeNonUTF: (str) ->
    result = ''
    l = str.length
    i = 0
    while i < l
      c = str.charCodeAt(i)
      if alpha = charIndex[c]
        result +=  "&#{alpha};"
        i++
        continue;
      if c < 32 || c > 126
        result += '&#' + c + ';'
      else
        result += str.charAt(i)
      i++
    result