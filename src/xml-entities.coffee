class exports.XmlEntities
  alphaIndex =
    '&lt': '<'
    '&gt': '>'
    '&quot': '"'
    '&apos': '\''
    '&amp': '&'
    '&lt;': '<'
    '&gt;': '>'
    '&quot;': '"'
    '&apos;': '\''
    '&amp;': '&',
    '&Aring;': 'Å'
    '&Auml;': 'Ä'
    '&Ouml;': 'Ö'
    '&aring;': 'å'
    '&auml;': 'ä'
    '&ouml;': 'ö'
    '&middot;': '·'

  charIndex =
    60: 'lt'
    62: 'gt'
    34: 'quot'
    39: 'apos'
    38: 'amp'
    196: 'Auml'
    197: 'Aring'
    214: 'Ouml'
    228: 'auml'
    229: 'aring'
    246: 'ouml'
    183: 'middot'

  charSIndex =
    '<': '&lt;'
    '>': '&gt;'
    '"': '&quot;'
    '\'': '&apos;'
    '&': '&amp;'
    'Å': '&Aring;'
    'å': '&aring;'
    'Ä': '&Auml;'
    'ä': '&auml;'
    'Ö': '&Ouml;'
    'ö': '&ouml;'
    '·': '&middot;'

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
          return if a = alphaIndex[s] then a else s
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