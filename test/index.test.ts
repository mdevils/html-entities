/* eslint-disable @typescript-eslint/no-require-imports */
import {exec as execOriginal} from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {promisify} from 'node:util';
import * as HtmlEntities from '../src/index.js';
import {namedReferences} from '../src/named-references';

const exec = promisify(execOriginal);

async function ensureSelfLink(appPath: string) {
    const nodeModulesPath = path.join(appPath, 'node_modules');
    const selfLinkPath = path.join(nodeModulesPath, 'html-entities');
    try {
        await fs.mkdir(nodeModulesPath);
    } catch {
        // ignore
    }
    try {
        await fs.symlink('../../../..', selfLinkPath, 'dir');
    } catch {
        // ignore
    }
}

describe('package', () => {
    it('should have no dependencies', async () => {
        expect(JSON.parse(await fs.readFile('package.json', 'utf8')).dependencies).toEqual(undefined);
    });
});
describe('lib', () => {
    let {encode, decode, decodeEntity} = {} as typeof HtmlEntities;
    beforeAll(async () => {
        if (process.env.TEST_DIST === 'esm') {
            ({encode, decode, decodeEntity} = await import('../dist/esm/index.js'));
        } else if (process.env.TEST_DIST === 'commonjs') {
            ({encode, decode, decodeEntity} = require('../dist/commonjs/index.js'));
        } else {
            ({encode, decode, decodeEntity} = await import('../src/index.js'));
        }
    });
    if (process.env.TEST_DIST) {
        describe(`dist check (${process.env.TEST_DIST})`, () => {
            it(`should check if module type is set correctly ${process.env.TEST_DIST}`, async () => {
                if (process.env.TEST_DIST === 'esm') {
                    await import('../dist/esm/index.js');
                } else if (process.env.TEST_DIST === 'commonjs') {
                    require('../dist/commonjs/index.js');
                }
            });
            it('should check integration app/package of the type', async () => {
                const appPath = `test/test-apps/${process.env.TEST_DIST}`;
                if (process.env.TEST_DIST === 'esm') {
                    await ensureSelfLink(appPath);
                }
                await exec(`node ${path.join(appPath, 'test.js')}`);
            });
        });
    } else {
        it('should have proper TS types', async () => {
            const appPath = `test/test-apps/ts`;
            await ensureSelfLink(appPath);
            await exec(`tsx ${path.join(appPath, 'test.ts')}`);
        });
    }
    describe('encode()', () => {
        it('should handle undefined', () => {
            expect(decode(undefined)).toEqual('');
        });
        it('should handle null', () => {
            expect(decode(null)).toEqual('');
        });
        it('should handle empty string', () => {
            expect(encode('')).toEqual('');
        });
        it('should handle numbers (backwards compatibility)', () => {
            expect(encode(1 as unknown as string)).toEqual('1');
        });
        describe('mode', () => {
            it('should only match necessary entities', () => {
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'specialChars'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;©∆℞😂\0\x01'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01END', {mode: 'specialChars'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;©∆℞😂\0\x01END'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAscii'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0\x01'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintableOnly'})).toEqual(
                    'a\n<>"\'&&copy;&#8710;&rx;&#128514;\0&#1;'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'extensive'})).toEqual(
                    'a&NewLine;&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
                );
            });
        });
        describe('level', () => {
            it('should encode according to the level', () => {
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'all'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'html5'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;\0&#1;'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'html4'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&#8478;&#128514;\0&#1;'
                );
                expect(encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml'})).toEqual(
                    'a\n&lt;&gt;&quot;&apos;&amp;&#169;&#8710;&#8478;&#128514;\0&#1;'
                );
            });
        });
        describe('numeric', () => {
            it('should use specified numeric style', () => {
                expect(
                    encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml', numeric: 'decimal'})
                ).toEqual('a\n&lt;&gt;&quot;&apos;&amp;&#169;&#8710;&#8478;&#128514;\0&#1;');
                expect(
                    encode('a\n<>"\'&©∆℞😂\0\x01', {mode: 'nonAsciiPrintable', level: 'xml', numeric: 'hexadecimal'})
                ).toEqual('a\n&lt;&gt;&quot;&apos;&amp;&#xa9;&#x2206;&#x211e;&#x1f602;\0&#x1;');
            });
        });
    });

    describe('decode()', () => {
        it('should handle undefined', () => {
            expect(decode(undefined)).toEqual('');
        });
        it('should handle null', () => {
            expect(decode(null)).toEqual('');
        });
        it('should handle empty string', () => {
            expect(decode('')).toEqual('');
        });
        it('should handle single ampersand', () => {
            expect(decode('&')).toEqual('&');
        });
        it('should handle incomplete entity', () => {
            expect(decode('&a')).toEqual('&a');
        });
        it('should handle invalid numeric entities', () => {
            expect(decode('&#2013266066;')).toEqual(String.fromCharCode(65533));
        });
        it('should decode numeric entities without semicolon', () => {
            expect(decode('&#34C&#34')).toEqual('"C"');
        });
        it('should decode incomplete named entities followed by alphanumeric characters', () => {
            expect(decode('&uumlber')).toEqual('über');
        });
        describe('level', () => {
            it('should decode according to the level', () => {
                expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'all'})).toEqual(
                    'a\n<>"\'&©∆℞😂\uFFFD\x01'
                );
                expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'html5'})).toEqual(
                    'a\n<>"\'&©∆℞😂\uFFFD\x01'
                );
                expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'html4'})).toEqual(
                    'a\n<>"\'&©∆&rx;😂\uFFFD\x01'
                );
                expect(decode('a\n&lt;&gt;&quot;&apos;&amp;&copy;&#8710;&rx;&#128514;&#0;&#1;', {level: 'xml'})).toEqual(
                    'a\n<>"\'&&copy;∆&rx;😂\uFFFD\x01'
                );
            });
        });
        describe('scope', () => {
            it('should decode according to the scope', () => {
                expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'strict'})).toEqual('&amp=123&lang=en&amp,&');
                expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'body'})).toEqual('&=123&lang=en&,&');
                expect(decode('&amp=123&lang=en&amp,&amp;', {scope: 'attribute'})).toEqual('&amp=123&lang=en&,&');
                expect(decode('&amp=123', {scope: 'attribute'})).toEqual('&amp=123');
            });
        });
        describe('bugs', () => {
            it('should properly process html5 entitites those names start with html4 entity name - #77', () => {
                for (const [entity, value] of Object.entries(namedReferences.html5.entities)) {
                    expect(decode(entity)).toEqual(value);
                }
            });
        });
    });

    describe('decodeEntity()', () => {
        it('should handle undefined', () => {
            expect(decodeEntity(undefined)).toEqual('');
        });
        it('should handle null', () => {
            expect(decodeEntity(null)).toEqual('');
        });
        it('should handle empty string', () => {
            expect(decodeEntity('')).toEqual('');
        });
        it('should handle null-char', () => {
            expect(decodeEntity('&#0;')).toEqual(String.fromCharCode(65533));
        });
        it('should handle hex entities', () => {
            expect(decodeEntity('&#XD06;')).toEqual('ആ');
            expect(decodeEntity('&#xD06;')).toEqual('ആ');
        });
        it('should handle invalid numeric entities', () => {
            expect(decodeEntity('&#2013266066;')).toEqual(String.fromCharCode(65533));
        });
        it('should decode numeric entities without semicolon', () => {
            expect(decodeEntity('&#34')).toEqual('"');
        });
        it('should decode incomplete named entities', () => {
            expect(decodeEntity('&uuml')).toEqual('ü');
        });
        it('should decode proper named entities', () => {
            expect(decodeEntity('&amp;')).toEqual('&');
            expect(decodeEntity('&amp')).toEqual('&');
            expect(decodeEntity('&amp=')).toEqual('&amp=');
        });
        it('should decode emoji', () => {
            expect(decodeEntity('&#128514;')).toEqual('😂');
        });
        describe('level', () => {
            it('should decode according to the level', () => {
                expect(decodeEntity('&rx;', {level: 'all'})).toEqual('℞');
                expect(decodeEntity('&rx;', {level: 'html5'})).toEqual('℞');
                expect(decodeEntity('&rx;', {level: 'html4'})).toEqual('&rx;');
                expect(decodeEntity('&copy;', {level: 'html4'})).toEqual('©');
                expect(decodeEntity('&rx;', {level: 'xml'})).toEqual('&rx;');
                expect(decodeEntity('&copy;', {level: 'xml'})).toEqual('&copy;');
                expect(decodeEntity('&lt;', {level: 'xml'})).toEqual('<');
            });
        });
    });
});
