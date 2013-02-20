{BasicHtmlEntities, FullHtmlEntities} = require('../index')
colors = require('colors')

assertEquals = (str, expr) ->
  if str == expr
    console.log "#{colors.green('OK', 'green')}: #{colors.yellow("'#{expr}'")} === #{colors.yellow("'#{str}'")}."
  else
    throw Error("Assertion failed: '#{expr}' should equal to '#{str}'.")

basicEntities = new BasicHtmlEntities();
assertEquals '&lt;&gt;&quot;&amp;', basicEntities.encode('<>"&')
assertEquals '&lt;&gt;&quot;&amp;©', basicEntities.encode('<>"&©')
assertEquals '<>"&', basicEntities.decode('&lt;&gt;&quot;&amp;')
assertEquals '<>"&©', basicEntities.decode('&lt;&gt;&quot;&amp;©')
assertEquals '<>"&&copy;', basicEntities.decode('&lt;&gt;&quot;&amp;&copy;')

fullEntities = new FullHtmlEntities();
assertEquals '&lt;&gt;&quot;&amp;', fullEntities.encode('<>"&')
assertEquals '&lt;&gt;&quot;&amp;&copy;', fullEntities.encode('<>"&©')
assertEquals '<>"&', fullEntities.decode('&lt;&gt;&quot;&amp;')
assertEquals '<>"&©', fullEntities.decode('&lt;&gt;&quot;&amp;©')
assertEquals '<>"&©', fullEntities.decode('&lt;&gt;&quot;&amp;&copy;')
