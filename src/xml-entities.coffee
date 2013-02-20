class exports.XmlEntities
  alphaIndex =
    '&lt': '<'
    '&LT': '<'
    '&gt': '>'
    '&GT': '>'
    '&quot': '"'
    '&QUOT': '"'
    '&apos': '\''
    '&APOS': '\''
    '&amp': '&'
    '&AMP': '&'
    '&lt;': '<'
    '&LT;': '<'
    '&gt;': '>'
    '&GT;': '>'
    '&quot;': '"'
    '&QUOT;': '"'
    '&apos;': '\''
    '&APOS;': '\''
    '&amp;': '&'
    '&AMP;': '&'
  charIndex =
    60: 'lt'
    62: 'gt'
    34: 'quot'
    39: 'apos'
    38: 'amp'
  charSIndex =
    '<': '&lt;'
    '>': '&gt;'
    '"': '&quot;'
    '\'': '&apos;'
    '&': '&amp;'
  encode: (str) ->
    return '' if str.length == 0
    str.replace /<|>|"|'|&/g, (s) -> charSIndex[s]
  decode: (str) ->
    return '' if str.length == 0
    str
      .replace /&#?[0-9a-zA-Z]+;?/g, (s) ->
        if s.charAt(1) == '#'
          if s.charAt(2).toLowerCase() == 'x'
            code = parseInt(s.substr(3), 16)
          else
            code = parseInt(s.substr(2))
          if isNaN(code) || code < -32768 || code > 65535
            return ''
          return String.fromCharCode(code)
        else
          return if a = alphaIndex[s] then a else ''
  encodeNonUTF: (str) ->
    return '' if str.length == 0
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