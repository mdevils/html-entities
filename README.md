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

        #1: html-entities x 2,986,166 ops/sec ±1.21% (85 runs sampled)
        #2: entities x 2,211,849 ops/sec ±1.16% (82 runs sampled)
        #3: he x 1,940,763 ops/sec ±1.07% (87 runs sampled)

HTML5

    Encode test

        #1: html-entities.encode - html5, nonAscii x 436,912 ops/sec ±0.37% (95 runs sampled)
        #2: html-entities.encode - html5, nonAsciiPrintable x 420,014 ops/sec ±0.31% (97 runs sampled)
        #3: entities.encodeNonAsciiHTML x 337,400 ops/sec ±0.38% (96 runs sampled)
        #4: html-entities.encode - html5, extensive x 270,985 ops/sec ±0.52% (96 runs sampled)
        #5: entities.encodeHTML x 128,155 ops/sec ±0.33% (91 runs sampled)
        #6: he.encode x 115,127 ops/sec ±0.74% (93 runs sampled)

    Decode test

        #1: html-entities.decode - html5, strict x 345,565 ops/sec ±0.21% (95 runs sampled)
        #2: entities.decodeHTMLStrict x 337,245 ops/sec ±0.59% (94 runs sampled)
        #3: html-entities.decode - html5, body x 333,330 ops/sec ±0.75% (96 runs sampled)
        #4: html-entities.decode - html5, attribute x 312,208 ops/sec ±0.31% (95 runs sampled)
        #5: entities.decodeHTML x 275,014 ops/sec ±0.54% (95 runs sampled)
        #6: he.decode x 182,385 ops/sec ±2.23% (89 runs sampled)

HTML4

    Encode test

        #1: html-entities.encode - html4, nonAscii x 407,753 ops/sec ±0.24% (95 runs sampled)
        #2: html-entities.encode - html4, nonAsciiPrintable x 393,630 ops/sec ±0.42% (96 runs sampled)
        #3: html-entities.encode - html4, extensive x 202,439 ops/sec ±0.23% (95 runs sampled)

    Decode test

        #1: html-entities.decode - html4, strict x 373,579 ops/sec ±0.25% (95 runs sampled)
        #2: html-entities.decode - html4, attribute x 365,673 ops/sec ±0.20% (96 runs sampled)
        #3: html-entities.decode - html4, body x 364,291 ops/sec ±2.17% (95 runs sampled)

XML

    Encode test

        #1: html-entities.encode - xml, nonAscii x 481,889 ops/sec ±0.43% (98 runs sampled)
        #2: html-entities.encode - xml, nonAsciiPrintable x 459,323 ops/sec ±0.33% (95 runs sampled)
        #3: entities.encodeXML x 352,201 ops/sec ±1.12% (93 runs sampled)
        #4: html-entities.encode - xml, extensive x 266,395 ops/sec ±0.23% (97 runs sampled)

    Decode test

        #1: html-entities.decode - xml, body x 434,407 ops/sec ±0.22% (94 runs sampled)
        #2: html-entities.decode - xml, strict x 430,113 ops/sec ±0.26% (95 runs sampled)
        #3: entities.decodeXML x 428,018 ops/sec ±0.54% (97 runs sampled)
        #4: html-entities.decode - xml, attribute x 426,291 ops/sec ±0.39% (95 runs sampled)

Escaping

    Escape test

        #1: he.escape x 1,145,770 ops/sec ±0.24% (97 runs sampled)
        #2: html-entities.encode - xml, specialChars x 1,100,040 ops/sec ±1.80% (92 runs sampled)
        #3: entities.escapeUTF8 x 728,382 ops/sec ±0.56% (93 runs sampled)
        #4: entities.escape x 313,666 ops/sec ±0.27% (97 runs sampled)
```

License
-------

MIT
