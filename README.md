node-html-entities
==================

Faster html entities library.


Installation
------------

    npm install html-entities

Usage
-----

####Basic HTML entities####

HTML validity and XSS attack prevention you can achieve from XmlEntities class.

```javascript
var Entities = require('html-entities').XmlEntities;

entities = new Entities();

console.log(entities.encode('<>"&©®')); // &lt;&gt;&quot;&amp;©®
console.log(entities.encodeNonUTF('<>"&©®')); // &lt;&gt;&quot;&amp;&#169;&#174;
console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;&#8710;')); // <>"&∆
```

####All HTML entities encoding/decoding####


```javascript
var Entities = require('html-entities').AllHtmlEntities;

entities = new Entities();

console.log(entities.encode('<>"&©®∆')); // &lt;&gt;&quot;&amp;&copy;&reg;∆
console.log(entities.encodeNonUTF('<>"&©®∆')); // &lt;&gt;&quot;&amp;&copy;&reg;&#8710;
console.log(entities.decode('&lt;&gt;&quot;&amp;&copy;&reg;')); // <>"&©®
```

####Available classes####

```javascript
var XmlEntities = require('html-entities').XmlEntities, // <>"'& + &#...; decoding
    Html4Entities = require('html-entities').Html4Entities, // HTML4 entities.
    Html5Entities = require('html-entities').Html5Entities, // HTML5 entities.
    AllHtmlEntities = require('html-entities').AllHtmlEntities; // Synonym for HTML5 entities.

```
