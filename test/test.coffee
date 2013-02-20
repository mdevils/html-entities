{XmlEntities, Html5Entities, Html4Entities} = require('../index')
colors = require('colors')

assertEquals = (str, expr) ->
  if str == expr
    console.log "#{colors.green('OK', 'green')}: #{colors.yellow("'#{expr}'")} === #{colors.yellow("'#{str}'")}."
  else
    throw Error("Assertion failed: '#{expr}' should equal to '#{str}'.")

xmlEntities = new XmlEntities();
assertEquals '&lt;&gt;&quot;&amp;', xmlEntities.encode('<>"&')
assertEquals '&lt;&gt;&quot;&amp;©', xmlEntities.encode('<>"&©')
assertEquals '&lt;&gt;&quot;&amp;&#169;&#174;', xmlEntities.encodeNonUTF('<>"&©®')
assertEquals '<>"&', xmlEntities.decode('&lt;&gt;&quot;&amp;')
assertEquals '<>"&', xmlEntities.decode('&LT;&GT;&QUOT;&AMP;')
assertEquals '<>"&©', xmlEntities.decode('&lt;&gt;&quot;&amp;©')
assertEquals '<>"&©', xmlEntities.decode('&lt;&gt;&quot;&amp;©')
assertEquals '<>"&∆', xmlEntities.decode('&lt;&gt;&quot;&amp;&copy;&#8710;')

html4Entities = new Html4Entities();
assertEquals '&lt;&gt;&quot;&amp;', html4Entities.encode('<>"&')
assertEquals '&lt;&gt;&quot;&amp;&copy;', html4Entities.encode('<>"&©')
assertEquals '&lt;&gt;&quot;&amp;&copy;&#8710;', html4Entities.encodeNonUTF('<>"&©∆')
assertEquals '<>"&', html4Entities.decode('&lt;&gt;&quot;&amp;')
assertEquals '<>"&', html4Entities.decode('&LT;&GT;&QUOT;&AMP;')
assertEquals '<>"&©', html4Entities.decode('&lt;&gt;&quot;&amp;&copy;')
assertEquals '<<', html4Entities.decode('&#60;&#x3C;')

html5Entities = new Html5Entities();
assertEquals '&lt;&gt;&quot;&amp;', html5Entities.encode('<>"&')
assertEquals '&lt;&gt;&quot;&amp;&copy;', html5Entities.encode('<>"&©')
assertEquals '&lt;&gt;&quot;&amp;&copy;&#8710;', html5Entities.encodeNonUTF('<>"&©∆')
assertEquals '<>"&', html5Entities.decode('&lt;&gt;&quot;&amp;')
assertEquals '<>"&', html5Entities.decode('&LT;&GT;&QUOT;&AMP;')
assertEquals '<>"&©', html5Entities.decode('&lt;&gt;&quot;&amp;©')
assertEquals '<>"&©', html5Entities.decode('&lt;&gt;&quot;&amp;&copy;')
assertEquals '<<Á', html5Entities.decode('&#60;&#x3C;&Aacute;')
assertEquals '&acE;', html5Entities.encode('∾̳')
assertEquals '∾̳', html5Entities.decode('&acE;')
