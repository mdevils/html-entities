import {expect} from 'chai';
import * as HE from '../src';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const {encode, decode} = require(process.env.TEST_LIB ? '../lib' : '../src') as typeof HE;

describe('encode()', () => {
    it('should handle empty string', () => {
        expect(encode('')).to.equal('');
    });
    describe('mode', () => {
        it('should only match necessary entities', () => {
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'specialChars'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;©∆℞😂\0\x01'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAscii'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0\x01'
            );
            expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable'})).to.equal(
                'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
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
    it('should handle empty string', () => {
        expect(decode('')).to.equal('');
    });
    it('should decode numeric entities without semicolon', () => {
        expect(decode('&#34C&#34')).to.equal('"C"');
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
        });
    });
});
