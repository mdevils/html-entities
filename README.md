html-entities
=============

Fastest HTML entities library.


Installation
------------

```bash
$ npm install html-entities
```

Usage
-----

### encode(text, options)

Encodes text replacing HTML special characters (`<>&"'`) plus other character ranges depending on `mode` option value.

```js
import {encode} from 'html-entities';

encode('< > " \' & © ∆');
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

encode('< ©', {mode: 'nonAsciiPrintable'});
// -> '&lt; &copy;'

encode('< ©', {mode: 'nonAsciiPrintable', level: 'xml'});
// -> '&lt; &#169;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

#### mode

 * `specialChars` encodes only HTML special characters (default).
 * `nonAscii` encodes HTML special characters and everything outside of the [ASCII character range](https://en.wikipedia.org/wiki/ASCII).
 * `nonAsciiPrintable` encodes HTML special characters and everything outiside of the [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters).
 * `extensive` encodes all non-printable characters, non-ASCII characters and all characters with named references.

#### numeric

 * `decimal` uses decimal numbers when encoding html entities. i.e. `&#169;` (default).
 * `hexadecimal` uses hexadecimal numbers when encoding html entities. i.e. `&#xa9;`.


### decode(text, options)

Decodes text replacing entities to characters. Unknown entities are left as is.

```js
import {decode} from 'html-entities';

decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;');
// -> '< > " \' & © ∆'

decode('&copy;', {level: 'html5'});
// -> '©'

decode('&copy;', {level: 'xml'});
// -> '&copy;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

#### scope

 * `body` emulates behavior of browser when parsing tag bodies: entities without semicolon are also replaced (default).
 * `attribute` emulates behavior of browser when parsing tag attributes: entities without semicolon are replaced when not followed by equality sign `=`.
 * `strict` ignores entities without semicolon.

Performance
-----------

Statistically significant comparison with other libraries using `benchmark.js`.
Results by this library are marked with `*`.
The source code of the benchmark is available at `benchmark/benchmark.ts`.

```
Common

    Initialization / Load speed

      * #1: html-entities x 2,992,640 ops/sec ±1.76% (82 runs sampled)
        #2: entities x 2,093,859 ops/sec ±1.17% (82 runs sampled)
        #3: he x 1,815,445 ops/sec ±1.30% (87 runs sampled)

HTML5

    Encode test

      * #1: html-entities.encode - html5, nonAsciiPrintable x 427,051 ops/sec ±0.25% (96 runs sampled)
      * #2: html-entities.encode - html5, nonAscii x 427,332 ops/sec ±0.68% (96 runs sampled)
        #3: entities.encodeNonAsciiHTML x 333,348 ops/sec ±1.08% (93 runs sampled)
      * #4: html-entities.encode - html5, extensive x 269,630 ops/sec ±0.26% (98 runs sampled)
        #5: entities.encodeHTML x 126,117 ops/sec ±0.27% (93 runs sampled)
        #6: he.encode x 114,119 ops/sec ±0.20% (96 runs sampled)

    Decode test

      * #1: html-entities.decode - html5, strict x 347,055 ops/sec ±0.27% (94 runs sampled)
      * #2: html-entities.decode - html5, attribute x 340,751 ops/sec ±0.22% (97 runs sampled)
      * #3: html-entities.decode - html5, body x 333,538 ops/sec ±0.28% (94 runs sampled)
        #4: entities.decodeHTMLStrict x 329,206 ops/sec ±1.64% (92 runs sampled)
        #5: entities.decodeHTML x 278,862 ops/sec ±0.24% (97 runs sampled)
        #6: he.decode x 185,834 ops/sec ±0.23% (96 runs sampled)

HTML4

    Encode test

      * #1: html-entities.encode - html4, nonAscii x 413,667 ops/sec ±0.51% (94 runs sampled)
      * #2: html-entities.encode - html4, nonAsciiPrintable x 390,540 ops/sec ±0.39% (95 runs sampled)
      * #3: html-entities.encode - html4, extensive x 199,258 ops/sec ±0.20% (97 runs sampled)

    Decode test

      * #1: html-entities.decode - html4, strict x 369,977 ops/sec ±1.13% (93 runs sampled)
      * #2: html-entities.decode - html4, body x 366,084 ops/sec ±0.30% (94 runs sampled)
      * #3: html-entities.decode - html4, attribute x 363,317 ops/sec ±0.33% (94 runs sampled)

XML

    Encode test

      * #1: html-entities.encode - xml, nonAscii x 478,394 ops/sec ±2.54% (92 runs sampled)
      * #2: html-entities.encode - xml, nonAsciiPrintable x 459,013 ops/sec ±0.20% (97 runs sampled)
        #3: entities.encodeXML x 352,570 ops/sec ±1.05% (93 runs sampled)
      * #4: html-entities.encode - xml, extensive x 269,313 ops/sec ±0.24% (92 runs sampled)

    Decode test

      * #1: html-entities.decode - xml, body x 429,601 ops/sec ±0.20% (96 runs sampled)
      * #2: html-entities.decode - xml, strict x 428,820 ops/sec ±0.22% (96 runs sampled)
        #3: entities.decodeXML x 423,011 ops/sec ±0.28% (94 runs sampled)
      * #4: html-entities.decode - xml, attribute x 419,337 ops/sec ±0.66% (94 runs sampled)

Escaping

    Escape test

        #1: he.escape x 1,126,149 ops/sec ±0.23% (98 runs sampled)
      * #2: html-entities.encode - xml, specialChars x 1,077,095 ops/sec ±1.09% (94 runs sampled)
        #3: entities.escapeUTF8 x 724,973 ops/sec ±0.25% (98 runs sampled)
        #4: entities.escape x 316,363 ops/sec ±0.20% (97 runs sampled)
```

License
-------

MIT
