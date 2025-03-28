import {expect} from 'chai';
import * as HtmlEntities from '../src';
import {namedReferences} from '../src/named-references';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const {encode, decode, decodeEntity} = require(process.env.TEST_LIB ? '../lib' : '../src') as typeof HtmlEntities;

describe('package', () => {
    it('should have no dependencies', () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        expect(require('../package.json').dependencies).to.equal(undefined);
    });
});
describe('encode()', () => {
    it('should handle undefined', () => {
        expect(decode(undefined)).to.equal('');
    });
    it('should handle null', () => {
        expect(decode(null)).to.equal('');
    });
    it('should handle empty string', () => {
        expect(encode('')).to.equal('');
    });
    it('should handle numbers (backwards compatibility)', () => {
        expect(encode(1 as unknown as string)).to.equal('1');
    });
    describe('mode', () => {
        it('should only match necessary entities', () => {
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'specialChars'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;©∆℞😂\0\x01'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01END', {mode: 'specialChars'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;©∆℞😂\0\x01END'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAscii'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0\x01'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintableOnly'})).to.equal(
                'a\n<>"\'&&copy;&#8710;&rx;&#128514;\0&#1;'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'extensive'})).to.equal(
                'a&NewLine;&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
            );
        });
    });
    describe('level', () => {
        it('should encode according to the level', () => {
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'all'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'html5'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'html4'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&#8478;&#128514;\0&#1;'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&#169;&#8710;&#8478;&#128514;\0&#1;'
            );
        });
    });
    describe('numeric', () => {
        it('should use specified numeric style', () => {
            expect(
                encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml', numeric: 'decimal'})
            ).to.equal('a\n&lt;&gt;&quot;&apos;&amp;&#169;&#8710;&#8478;&#128514;\0&#1;');
            expect(
                encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml', numeric: 'hexadecimal'})
            ).to.equal('a\n&lt;&gt;&quot;&apos;&amp;&#xa9;&#x2206;&#x211e;&#x1f602;\0&#x1;');
        });
    });
});

describe('decode()', () => {
    it('should handle undefined', () => {
        expect(decode(undefined)).to.equal('');
    });
    it('should handle null', () => {
        expect(decode(null)).to.equal('');
    });
    it('should handle empty string', () => {
        expect(decode('')).to.equal('');
    });
    it('should handle single ampersand', () => {
        expect(decode('&')).to.equal('&');
    });
    it('should handle incomplete entity', () => {
        expect(decode('&a')).to.equal('&a');
    });
    it('should handle invalid numeric entities', () => {
        expect(decode('&#2013266066;')).to.equal(String.fromCharCode(65533));
    });
    it('should decode numeric entities without semicolon', () => {
        expect(decode('&#34C&#34')).to.equal('"C"');
    });
    it('should decode incomplete named entities followed by alphanumeric characters', () => {
        expect(decode('&uumlber')).to.equal('über');
    });
    describe('level', () => {
        it('should decode according to the level', () => {
            expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'all'})).to.equal(
                'a\n<>"\'&©∆℞😂\uFFFD\x01'
            );
            expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'html5'})).to.equal(
                'a\n<>"\'&©∆℞😂\uFFFD\x01'
            );
            expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'html4'})).to.equal(
                'a\n<>"\'&©∆&rx;😂\uFFFD\x01'
            );
            expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'xml'})).to.equal(
                'a\n<>"\'&&copy;∆&rx;😂\uFFFD\x01'
            );
        });
    });
    describe('scope', () => {
        it('should decode according to the scope', () => {
            expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'strict'})).to.equal('&amp=123&lang=en&amp,&');
            expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'body'})).to.equal('&=123&lang=en&,&');
            expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'attribute'})).to.equal('&amp=123&lang=en&,&');
            expect(decode('&amp=123', {scope: 'attribute'})).to.equal('&amp=123');
        });
    });
    describe('bugs', () => {
        it('should properly process html5 entitites those names start with html4 entity name - #77', () => {
            for (const [entity, value] of Object.entries(namedReferences.html5.entities)) {
                expect(decode(entity)).to.equal(value);
            }
        });
    });
});

describe('decodeEntity()', () => {
    it('should handle undefined', () => {
        expect(decodeEntity(undefined)).to.equal('');
    });
    it('should handle null', () => {
        expect(decodeEntity(null)).to.equal('');
    });
    it('should handle empty string', () => {
        expect(decodeEntity('')).to.equal('');
    });
    it('should handle null-char', () => {
        expect(decodeEntity('&#0;')).to.equal(String.fromCharCode(65533));
    });
    it('should handle hex entities', () => {
        expect(decodeEntity('&#XD06;')).to.equal('ആ');
        expect(decodeEntity('&#xD06;')).to.equal('ആ');
    });
    it('should handle invalid numeric entities', () => {
        expect(decodeEntity('&#2013266066;')).to.equal(String.fromCharCode(65533));
    });
    it('should decode numeric entities without semicolon', () => {
        expect(decodeEntity('&#34')).to.equal('"');
    });
    it('should decode incomplete named entities', () => {
        expect(decodeEntity('&uuml')).to.equal('ü');
    });
    it('should decode proper named entities', () => {
        expect(decodeEntity('&amp;')).to.equal('&');
        expect(decodeEntity('&amp')).to.equal('&');
        expect(decodeEntity('&amp=')).to.equal('&amp=');
    });
    it('should decode emoji', () => {
        expect(decodeEntity('&#128514;')).to.equal('😂');
    });
    describe('level', () => {
        it('should decode according to the level', () => {
            expect(decodeEntity('&rx;', {level: 'all'})).to.equal('℞');
            expect(decodeEntity('&rx;', {level: 'html5'})).to.equal('℞');
            expect(decodeEntity('&rx;', {level: 'html4'})).to.equal('&rx;');
            expect(decodeEntity('&copy;', {level: 'html4'})).to.equal('©');
            expect(decodeEntity('&rx;', {level: 'xml'})).to.equal('&rx;');
            expect(decodeEntity('&copy;', {level: 'xml'})).to.equal('&copy;');
            expect(decodeEntity('&lt;', {level: 'xml'})).to.equal('<');
        });
    });
});
