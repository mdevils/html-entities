node-html-entities
==================

Faster html entities library.


Installation
------------

    npm install git://github.com/mdevils/node-html-entities.git

Usage
-----

####Basic HTML entities####

HTML validity and XSS attack prevention you can achieve from BasicHtmlEntities class.

#####Example#####
```javascript
var Entities = require('html-entities').BasicHtmlEntities;

entities = new Entities();

console.log(entities.encode('<>"&©®')); // &lt;&gt;&quot;&amp;©®
console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;')); // <>"&copy;&reg;
```

####Full HTML entities encoding/decoding####


```javascript
  var Entities = require('html-entities').FullHtmlEntities;

  entities = new Entities();
  
  console.log(entities.encode('<>"&©®')); // &lt;&gt;&quot;&amp;&copy;&reg;
  console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;')); // <>"&©®
```
