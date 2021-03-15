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

      * #1: html-entities x 2,941,745 ops/sec ±1.87% (81 runs sampled)
        #2: entities x 2,061,661 ops/sec ±1.16% (82 runs sampled)
        #3: he x 1,861,758 ops/sec ±1.15% (86 runs sampled)

HTML5

    Encode test

      * #1: html-entities.encode - html5, nonAscii x 439,350 ops/sec ±0.21% (96 runs sampled)
      * #2: html-entities.encode - html5, nonAsciiPrintable x 410,462 ops/sec ±0.22% (93 runs sampled)
        #3: entities.encodeNonAsciiHTML x 332,966 ops/sec ±0.54% (92 runs sampled)
      * #4: html-entities.encode - html5, extensive x 280,865 ops/sec ±0.22% (95 runs sampled)
        #5: entities.encodeHTML x 125,338 ops/sec ±0.30% (92 runs sampled)
        #6: he.encode x 112,572 ops/sec ±0.25% (97 runs sampled)

    Decode test

      * #1: html-entities.decode - html5, body x 428,051 ops/sec ±0.22% (98 runs sampled)
      * #2: html-entities.decode - html5, strict x 402,821 ops/sec ±0.22% (91 runs sampled)
      * #3: html-entities.decode - html5, attribute x 391,007 ops/sec ±0.33% (90 runs sampled)
        #4: entities.decodeHTMLStrict x 332,909 ops/sec ±0.56% (95 runs sampled)
        #5: entities.decodeHTML x 274,700 ops/sec ±0.29% (97 runs sampled)
        #6: he.decode x 184,440 ops/sec ±0.27% (95 runs sampled)

HTML4

    Encode test

      * #1: html-entities.encode - html4, nonAscii x 419,600 ops/sec ±0.65% (94 runs sampled)
      * #2: html-entities.encode - html4, nonAsciiPrintable x 413,954 ops/sec ±0.83% (91 runs sampled)
      * #3: html-entities.encode - html4, extensive x 216,838 ops/sec ±0.22% (96 runs sampled)

    Decode test

      * #1: html-entities.decode - html4, strict x 420,850 ops/sec ±0.23% (92 runs sampled)
      * #2: html-entities.decode - html4, body x 413,042 ops/sec ±0.49% (94 runs sampled)
      * #3: html-entities.decode - html4, attribute x 408,538 ops/sec ±2.59% (92 runs sampled)

XML

    Encode test

      * #1: html-entities.encode - xml, nonAscii x 511,788 ops/sec ±0.21% (97 runs sampled)
      * #2: html-entities.encode - xml, nonAsciiPrintable x 482,136 ops/sec ±0.40% (93 runs sampled)
        #3: entities.encodeXML x 353,189 ops/sec ±0.57% (95 runs sampled)
      * #4: html-entities.encode - xml, extensive x 291,091 ops/sec ±0.23% (96 runs sampled)

    Decode test

      * #1: html-entities.decode - xml, body x 543,327 ops/sec ±0.25% (89 runs sampled)
      * #2: html-entities.decode - xml, attribute x 533,470 ops/sec ±0.22% (94 runs sampled)
      * #3: html-entities.decode - xml, strict x 528,014 ops/sec ±2.27% (95 runs sampled)
        #4: entities.decodeXML x 421,154 ops/sec ±0.32% (96 runs sampled)

Escaping

    Escape test

      * #1: html-entities.encode - xml, specialChars x 1,583,074 ops/sec ±0.24% (95 runs sampled)
        #2: he.escape x 1,131,879 ops/sec ±1.65% (94 runs sampled)
        #3: entities.escapeUTF8 x 736,205 ops/sec ±0.28% (94 runs sampled)
        #4: entities.escape x 314,225 ops/sec ±0.24% (93 runs sampled)
```

License
-------

MIT
