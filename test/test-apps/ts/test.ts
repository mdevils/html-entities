import * as assert from 'node:assert';
import {encode, decode, decodeEntity} from 'html-entities';

assert.equal('&lt;&gt;&amp;&quot;&apos;', encode('<>&"\''));
assert.equal('<>&"\'', decode('&lt;&gt;&amp;&quot;&apos;'));
assert.equal('<', decodeEntity('&lt;'));

console.log('OK');
