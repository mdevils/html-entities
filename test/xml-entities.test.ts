import * as htmlEntities from '../src';
import {should} from 'chai';

should();

const xmlEntities = new htmlEntities.XmlEntities();

describe('xml entities', function () {
    it('should encode xml entities', function () {
        xmlEntities.encode('').should.equal('');
        xmlEntities.encode('<>"&\'').should.equal('&lt;&gt;&quot;&amp;&apos;');
        xmlEntities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;©');
        xmlEntities.encodeNonUTF('').should.equal('');
        xmlEntities.encodeNonUTF('<>"&©®').should.equal('&lt;&gt;&quot;&amp;&#169;&#174;');
        xmlEntities.encodeNonUTF('😂').should.equal('&#128514;');
        xmlEntities.encodeNonASCII('').should.equal('');
        xmlEntities.encodeNonASCII('<>"&©®').should.equal('<>"&©®');
        xmlEntities.encodeNonASCII('😂').should.equal('&#128514;');

        htmlEntities.XmlEntities.encode('').should.equal('');
        htmlEntities.XmlEntities.encode('<>"&\'').should.equal('&lt;&gt;&quot;&amp;&apos;');
        htmlEntities.XmlEntities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;©');
        htmlEntities.XmlEntities.encodeNonUTF('').should.equal('');
        htmlEntities.XmlEntities.encodeNonUTF('<>"&©®').should.equal('&lt;&gt;&quot;&amp;&#169;&#174;');
        htmlEntities.XmlEntities.encodeNonASCII('').should.equal('');
        htmlEntities.XmlEntities.encodeNonASCII('<>"&©®').should.equal('<>"&©®');
    });
    it('should decode xml entities', function () {
        xmlEntities.decode('').should.equal('');
        xmlEntities.decode('&lt;&gt;&quot;&amp;&apos;').should.equal('<>"&\'');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        xmlEntities.decode('&lt;&gt;&quot;&amp;&copy;&#8710;').should.equal('<>"&&copy;∆');
        xmlEntities.decode('&#128514;').should.equal('😂');

        htmlEntities.XmlEntities.decode('').should.equal('');
        htmlEntities.XmlEntities.decode('&lt;&gt;&quot;&amp;&apos;').should.equal('<>"&\'');
        htmlEntities.XmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        htmlEntities.XmlEntities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        htmlEntities.XmlEntities.decode('&lt;&gt;&quot;&amp;&copy;&#8710;').should.equal('<>"&&copy;∆');
    });
});
