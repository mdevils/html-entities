import * as htmlEntities from '../src';
import {should} from 'chai';

should();

var html5Entities = new htmlEntities.Html5Entities();

describe('html5 entities', function () {
    it('should encode html5 entities', function () {
        html5Entities.encode('').should.equal('');
        html5Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        html5Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        html5Entities.encode('∾̳').should.equal('&acE;');
        html5Entities.encodeNonUTF('').should.equal('');
        html5Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        html5Entities.encodeNonASCII('').should.equal('');
        html5Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');

        htmlEntities.Html5Entities.encode('').should.equal('');
        htmlEntities.Html5Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        htmlEntities.Html5Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        htmlEntities.Html5Entities.encode('∾̳').should.equal('&acE;');
        htmlEntities.Html5Entities.encodeNonUTF('').should.equal('');
        htmlEntities.Html5Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        htmlEntities.Html5Entities.encodeNonASCII('').should.equal('');
        htmlEntities.Html5Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');
    });
    it('should decode html5 entities', function () {
        html5Entities.decode('').should.equal('');
        html5Entities.decode('&Lt;&gt;&quot;&amp;').should.equal('≪>"&');
        html5Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        html5Entities.decode('&LT;&GT;&QUOT;&AMP;').should.equal('<>"&');
        html5Entities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        html5Entities.decode('&lt;&gt;&quot;&amp;&copy;').should.equal('<>"&©');
        html5Entities.decode('&#60;&#x3C;&Aacute;&asdasd;').should.equal('<<Á&asdasd;');
        html5Entities.decode('&acE;').should.equal('∾̳');
        html5Entities.decode('&acE;x').should.equal('∾̳x');

        htmlEntities.Html5Entities.decode('').should.equal('');
        htmlEntities.Html5Entities.decode('&Lt;&gt;&quot;&amp;').should.equal('≪>"&');
        htmlEntities.Html5Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        htmlEntities.Html5Entities.decode('&LT;&GT;&QUOT;&AMP;').should.equal('<>"&');
        htmlEntities.Html5Entities.decode('&lt;&gt;&quot;&amp;©').should.equal('<>"&©');
        htmlEntities.Html5Entities.decode('&lt;&gt;&quot;&amp;&copy;').should.equal('<>"&©');
        htmlEntities.Html5Entities.decode('&#60;&#x3C;&Aacute;&asdasd;').should.equal('<<Á&asdasd;');
        htmlEntities.Html5Entities.decode('&acE;').should.equal('∾̳');
        htmlEntities.Html5Entities.decode('&acE;x').should.equal('∾̳x');
    });
});
