/* eslint-disable @typescript-eslint/no-require-imports */
const assert = require('node:assert');
const {encode, decode, decodeEntity} = require('html-entities');

assert.equal('&lt;&gt;&amp;&quot;&apos;', encode('<>&"\''));
assert.equal('<>&"\'', decode('&lt;&gt;&amp;&quot;&apos;'));
assert.equal('<', decodeEntity('&lt;'));

console.log('OK');
