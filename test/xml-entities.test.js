require('chai').should();
var htmlEntities = require('..');
var xmlEntities = new htmlEntities.XmlEntities();

describe('xml entities', function () {
    it('should encode xml entities', function () {
        xmlEntities.encode('').should.equal('');
        xmlEntities.encode('<>"&\'').should.equal('&lt;&gt;&quot;&amp;&apos;');
        xmlEntities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;©');
        xmlEntities.encodeNonUTF('').should.equal('');
        xmlEntities.encodeNonUTF('<>"&©®').should.equal('&lt;&gt;&quot;&amp;&#169;&#174;');
        xmlEntities.encodeNonASCII('').should.equal('');
        xmlEntities.encodeNonASCII('<>"&©®').should.equal('<>"&©®');
    });
    it('should decode xml entities', function () {
        xmlEntities.decode('').should.equal('');
        xmlEntities.decode('&lt;&gt;&quot;&amp;&apos;').should.equal('<>"&\'');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;&copy;&#8710;').should.equal('<>"&&copy;∆');
    });
});
