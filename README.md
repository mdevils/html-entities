html-entities
=============

Fastest html entities library.


Installation
------------

```bash
$ npm install html-entities
```

Usage
-----

### encode(text, options)

Encodes text replacing HTML special characters (`<>&"'`) plus other character ranges depending on `mode` option value.

```
import {encode} from 'html-entities';

encode('<>"\'&©∆')
// -> '&lt;&gt;&quot;&apos;&amp;©∆'

encode('<>"\'&©∆', {mode: 'nonAsciiPrintable'})
// -> '&lt;&gt;&quot;&apos;&amp;&copy;&#8710;'

encode('<>"\'&©∆', {mode: 'nonAsciiPrintable', level: 'xml'})
// -> '&lt;&gt;&quot;&apos;&amp;&#169;&#8710;'
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

#### numeric

 * `decimal` uses decimal numbers when encoding html entities. i.e. `&#169;` (default).
 * `hexadecimal` uses hexadecimal numbers when encoding html entities. i.e. `&#xa9;`.


### decode(text, options)

Decodes text replacing entities to characters. Unknown entities are left as is.

```
import {decode} from 'html-entities';

decode('&lt;&gt;&quot;&apos;&amp;&#169;&#8710;')
// -> '<>"\'&©∆'

decode('&copy', {level: 'html5'})
// -> '©'

decode('&copy', {level: 'xml'})
// -> '&copy;'
```

Options:

#### level

 * `all` alias to `html5` (default).
 * `html5` uses `HTML5` named references.
 * `html4` uses `HTML4` named references.
 * `xml` uses `XML` named references.

#### scope

 * 'body' emulates behavior of browser when parsing tag bodies: entities without semicolon are also replaced (default).
 * 'attribute' emulates behavior of browser when parsing tag attributes: entities without semicolon are replaced when not followed by equality sign `=`.
 * 'strict' ignores entities without semicolon.

Performance
-----------

Statistically significant comparison with other libraries using `benchmark.js`.
Results by this library are marked with `*`.
The source code of the benchmark is available at `benchmark/benchmark.ts`.

```
HTML

    Encode test
      * #1: html-entities.encode - html5, specialChars x 1,218,530 ops/sec ±0.30% (94 runs sampled)
      * #2: html-entities.encode - html5, nonAscii x 468,875 ops/sec ±0.38% (95 runs sampled)
      * #3: html-entities.encode - html5, nonAsciiPrintable x 426,809 ops/sec ±0.60% (96 runs sampled)
        #4: entities.encodeHTML5 x 132,621 ops/sec ±0.38% (91 runs sampled)
        #5: he.encode x 119,645 ops/sec ±1.54% (93 runs sampled)

    Decode test
      * #1: html-entities.decode - html5, strict x 356,322 ops/sec ±0.50% (93 runs sampled)
      * #2: html-entities.decode - html5, body x 348,765 ops/sec ±2.20% (94 runs sampled)
      * #3: html-entities.decode - html5, attribute x 334,330 ops/sec ±0.29% (98 runs sampled)
        #4: entities.decodeHTML4 x 301,096 ops/sec ±0.44% (96 runs sampled)
        #5: entities.decodeHTML5 x 298,314 ops/sec ±2.12% (95 runs sampled)
        #6: he.decode x 214,220 ops/sec ±2.01% (91 runs sampled)

XML

    Encode test
        #1: he.escape x 1,229,701 ops/sec ±0.40% (97 runs sampled)
      * #2: html-entities.encode - xml, specialChars x 1,143,625 ops/sec ±1.90% (96 runs sampled)
      * #3: html-entities.encode - xml, nonAscii x 443,845 ops/sec ±0.33% (93 runs sampled)
      * #4: html-entities.encode - xml, nonAsciiPrintable x 418,533 ops/sec ±0.48% (94 runs sampled)
        #5: entities.encodeXML x 303,733 ops/sec ±2.09% (91 runs sampled)
        #6: entities.escape x 233,410 ops/sec ±0.43% (95 runs sampled)

    Decode test
      * #1: html-entities.decode - xml, body x 409,645 ops/sec ±0.43% (93 runs sampled)
        #2: entities.decodeXML x 417,140 ops/sec ±2.42% (91 runs sampled)
      * #3: html-entities.decode - xml, attribute x 406,512 ops/sec ±0.99% (97 runs sampled)
      * #4: html-entities.decode - xml, strict x 398,532 ops/sec ±2.54% (93 runs sampled)
        #5: entities.decodeXMLStrict x 377,224 ops/sec ±5.69% (85 runs sampled)
        #6: he.unescape x 250,981 ops/sec ±2.57% (93 runs sampled)
```

License
-------

MIT
