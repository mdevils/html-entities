/* eslint-disable @typescript-eslint/no-require-imports */
const {encode, decode, decodeEntity} = require('../../..');
const assert = require('node:assert');

assert.equal('&lt;&gt;&amp;&quot;&apos;', encode('<>&"\''));
assert.equal('<>&"\'', decode('&lt;&gt;&amp;&quot;&apos;'));
assert.equal('<', decodeEntity('&lt;'));

console.log('OK');
