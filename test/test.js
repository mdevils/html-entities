require('chai').should();
var htmlEntities = require('..');
var xmlEntities = new htmlEntities.XmlEntities();
var html4Entities = new htmlEntities.Html4Entities();
var html5Entities = new htmlEntities.Html5Entities();

describe('XML entities', function () {
    it('should encode xml entities', function () {
        xmlEntities.encode('<>"&\'').should.equal('&lt;&gt;&quot;&amp;&apos;');
        xmlEntities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;©');
        xmlEntities.encodeNonUTF('<>"&©®').should.equal('&lt;&gt;&quot;&amp;&#169;&#174;');
        xmlEntities.encodeNonASCII('<>"&©®').should.equal('<>"&©®');
    });
    it('should decode xml entities', function () {
        xmlEntities.decode('&lt;&gt;&quot;&amp;&apos;').should.equal('<>"&\'');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;&copy;&#8710;').should.equal('<>"&&copy;∆');
    });
});

describe('HTML4 entities', function () {
    it('should encode html4 entities', function () {
        html4Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        html4Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        html4Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        html4Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');
    });
    it('should decode html4 entities', function () {
        html4Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        html4Entities.decode('&lt;&gt;&quot;&amp;&acE;&copy;').should.equal('<>"&&acE;©');
        html4Entities.decode('&#60;&#x3C;').should.equal('<<');
    });
});

describe('HTML5 entities', function () {
    it('should encode html5 entities', function () {
        html5Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        html5Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        html5Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        html5Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');
    });
    it('should decode html5 entities', function () {
        html5Entities.decode('&Lt;&gt;&quot;&amp;').should.equal('≪>"&');
        html5Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        html5Entities.decode('&LT;&GT;&QUOT;&AMP;').should.equal('<>"&');
        html5Entities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        html5Entities.decode('&lt;&gt;&quot;&amp;&copy;').should.equal('<>"&©');
        html5Entities.decode('&#60;&#x3C;&Aacute;&asdasd;').should.equal('<<Á&asdasd;');
        html5Entities.encode('∾̳').should.equal('&acE;');
        html5Entities.decode('&acE;').should.equal('∾̳');
        html5Entities.decode('&acE;x').should.equal('∾̳x');
    });
});
