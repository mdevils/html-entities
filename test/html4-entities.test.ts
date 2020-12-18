import * as htmlEntities from '../src';
import {should} from 'chai';

should();

var html4Entities = new htmlEntities.Html4Entities();

describe('html4 entities', function () {
    it('should encode html4 entities', function () {
        html4Entities.encode('').should.equal('');
        html4Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        html4Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        html4Entities.encodeNonUTF('').should.equal('');
        html4Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        html4Entities.encodeNonUTF('😂').should.equal('&#128514;');
        html4Entities.encodeNonASCII('').should.equal('');
        html4Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');
        html4Entities.encodeNonASCII('😂').should.equal('&#128514;');

        htmlEntities.Html4Entities.encode('').should.equal('');
        htmlEntities.Html4Entities.encode('<>"&').should.equal('&lt;&gt;&quot;&amp;');
        htmlEntities.Html4Entities.encode('<>"&©').should.equal('&lt;&gt;&quot;&amp;&copy;');
        htmlEntities.Html4Entities.encodeNonUTF('').should.equal('');
        htmlEntities.Html4Entities.encodeNonUTF('<>"&©∆').should.equal('&lt;&gt;&quot;&amp;&copy;&#8710;');
        htmlEntities.Html4Entities.encodeNonASCII('').should.equal('');
        htmlEntities.Html4Entities.encodeNonASCII('<>"&©®∆').should.equal('<>"&©®&#8710;');
    });
    it('should decode html4 entities', function () {
        html4Entities.decode('').should.equal('');
        html4Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        html4Entities.decode('&lt;&gt;&quot;&amp;&acE;&copy;').should.equal('<>"&&acE;©');
        html4Entities.decode('&#60;&#x3C;').should.equal('<<');
        html4Entities.decode('&#128514;').should.equal('😂');

        htmlEntities.Html4Entities.decode('').should.equal('');
        htmlEntities.Html4Entities.decode('&lt;&gt;&quot;&amp;').should.equal('<>"&');
        htmlEntities.Html4Entities.decode('&lt;&gt;&quot;&amp;&acE;&copy;').should.equal('<>"&&acE;©');
        htmlEntities.Html4Entities.decode('&#60;&#x3C;').should.equal('<<');
    });
});
