# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.6.0](https://github.com/mdevils/html-entities/compare/v2.5.6...v2.6.0) (2025-03-30)


### Features

* refactor build to add ESM export ([1e7071a](https://github.com/mdevils/html-entities/commit/1e7071aa53a26de8c408c0456bc1313cd8b8bd53))
* support ESM, fixes [#95](https://github.com/mdevils/html-entities/issues/95) ([a466440](https://github.com/mdevils/html-entities/commit/a4664403c3a2df66c4c29a5253d510a75967f103))

### [2.5.6](https://github.com/mdevils/html-entities/compare/v2.5.5...v2.5.6) (2025-03-30)


### Bug Fixes

* significantly reduce package size ([72c7819](https://github.com/mdevils/html-entities/commit/72c78196a24c7c942367aeac248cd0f73a3e8b20))

### [2.5.5](https://github.com/mdevils/html-entities/compare/v2.5.4...v2.5.5) (2025-03-28)


### Bug Fixes

* incorrect typescript dependency ([adb6176](https://github.com/mdevils/html-entities/commit/adb61760607179251d9249ac22ed556289bdce3a))

### [2.5.4](https://github.com/mdevils/html-entities/compare/v2.5.3...v2.5.4) (2025-03-28)


### Bug Fixes

* avoid failing on numbers, fixes [#97](https://github.com/mdevils/html-entities/issues/97) ([421fd99](https://github.com/mdevils/html-entities/commit/421fd993dc50c173bd28bc22363d3e455e9c84ad))

### [2.5.3](https://github.com/mdevils/html-entities/compare/v2.5.2...v2.5.3) (2025-03-23)


### Bug Fixes

* improve encoding performance ([f4d14e2](https://github.com/mdevils/html-entities/commit/f4d14e2bd3038d8af5b98321c5021ccc346fa936))

2.5.0
-----

* Include source maps into the npm package.

2.4.0
-----

* Introduce `nonAsciiPrintableOnly` mode.

2.3.5
-----

 * Reduce unnecessarily long RegExps.  

2.3.4
-----

 * Fix the problem decoding HTML5 entities those names are part of HTML4 entities. 

2.3.3
-----

 * `package.json`: specify `sideEffects: false`

2.3.2
-----

 * Minimize data files, remove unnecessary files.

2.3.1
-----

 * Improve performance of `encode()`, `decode()` and `decodeEntity()` by using function inlining.
 * Fix decoding HEX HTML entities in some cases.

2.3.0
-----

 * Add flow types.

2.2.0
-----

 * A fast `decodeEntity()` method to decode a single HTML entity.

2.1.1
-----

 * Speed up both `encode()` and `decode()` methods.

2.1.0
-----

 * Add `extensive` mode to `encode()` method. This mode encodes all non-printable characters, non-ASCII characters and all characters with named references.

2.0.6
-----

 * Handle invalid numeric HTML entities: mimic browser behaviour.

2.0.5
-----

 * Handling behaviour of ambiguous ampersands.

2.0.4
-----

 * Fix webpack build warning.

2.0.3
-----

 * Handle invalid numeric HTML entities.

2.0.2
-----

 * Handle `null` and `undefined` text values.

2.0.1
-----

 * Fix decoding numeric HTML entities.

2.0.0
-----

 * Performance was greatly improved.
 * New API: simpler and more flexible.

   `htmlEntitiesInstance.encode(text)` -> `encode(text)`

   Before:

   ```js
   import {AllHtmlEntities} from 'html-entities';

   const entities = new AllHtmlEntities();
   console.log(
       entities.encode('<Hello & World>')
   );
   ```

   After:

   ```js
   import {encode} from 'html-entities';

   console.log(
       encode('<Hello & World>')
   );
   ```

   ---

   `instance.encodeNonASCII(text)` -> `encode(text, {mode: 'nonAscii'})`

   Before:

   ```js
   import {AllHtmlEntities} from 'html-entities';

   const entities = new AllHtmlEntities();
   console.log(
       entities.encodeNonASCII('& © ∆')
   );
   ```

   After:

   ```js
   import {encode} from 'html-entities';

   console.log(
       encode('& © ∆', {mode: 'nonAscii'})
   );
   ```

   ---

   `instance.encodeNonASCII(text)` -> `encode(text, {mode: 'nonAsciiPrintable'})`

   Before:

   ```js
   import {AllHtmlEntities} from 'html-entities';

   const entities = new AllHtmlEntities();
   console.log(
       entities.encodeNonASCII('& © ∆ \x01')
   );
   ```

   After:

   ```js
   import {encode} from 'html-entities';

   console.log(
       encode('& © ∆ \x01', {mode: 'nonAsciiPrintable'})
   );
   ```

   ---

   `instance.decode(text)` -> `decode(text)`

   Before:

   ```js
   import {AllHtmlEntities} from 'html-entities';

   const entities = new AllHtmlEntities();
   console.log(
       entities.decode('&lt;&gt;&amp;')
   );
   ```

   After:

   ```js
   import {decode} from 'html-entities';

   console.log(
       decode('&lt;&gt;&amp;')
   );
   ```

   ---

   Different XML/HTML versions are now implemented via options instead of different classes.

   Before:

   ```js
   import {XmlEntities, Html4Entities, Html5Entities, AllHtmlEntities} from 'html-entities';

   const xmlEntities = new XmlEntities();
   const html4Entities = new Html4Entities();
   const html5Entities = new Html5Entities();
   const allHtmlEntities = new AllHtmlEntities();

   console.log(xmlEntities.encode('<>&'));
   console.log(html4Entities.encode('<>&©'));
   console.log(html5Entities.encode('<>&©℞'));
   console.log(allHtmlEntities.encode('<>&©℞'));

   console.log(xmlEntities.decode('&lt;&gt;&amp;'));
   console.log(html4Entities.decode('&lt;&gt;&amp;&copy;'));
   console.log(html5Entities.decode('&lt;&gt;&amp;&copy;&rx;'));
   console.log(allHtmlEntities.decode('&lt;&gt;&amp;&copy;&rx;'));
   ```

   After:

   ```js
   import {encode, decode} from 'html-entities';

   console.log(encode('<>&', {level: 'xml'}));
   console.log(encode('<>&©', {level: 'html4', mode: 'nonAscii'}));
   console.log(encode('<>&©℞', {level: 'html5', mode: 'nonAscii'}));
   console.log(encode('<>&©℞', {level: 'all', mode: 'nonAscii'}));

   console.log(decode('&lt;&gt;&amp;', {level: 'xml'}));
   console.log(decode('&lt;&gt;&amp;&copy;', {level: 'html4'}));
   console.log(decode('&lt;&gt;&amp;&copy;&rx;', {level: 'html5'}));
   console.log(decode('&lt;&gt;&amp;&copy;&rx;', {level: 'all'}));
   ```
