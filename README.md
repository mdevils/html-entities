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

Encodes text replacing HTML special characters (`<>&"''`) plus other character ranges depending on `mode` option value.

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
      * #1: html-entities.encode - html5, specialChars x 1,182,489 ops/sec ±0.65% (93 runs sampled)
      * #2: html-entities.encode - html5, nonAscii x 442,639 ops/sec ±1.49% (90 runs sampled)
      * #3: html-entities.encode - html5, nonAsciiPrintable x 426,967 ops/sec ±1.07% (92 runs sampled)
        #4: entities.encodeHTML5 x 127,785 ops/sec ±1.16% (94 runs sampled)
        #5: he.encode x 113,690 ops/sec ±1.11% (89 runs sampled)

    Decode test
      * #1: html-entities.decode - html5, body x 358,440 ops/sec ±0.74% (89 runs sampled)
      * #2: html-entities.decode - html5, attribute x 354,841 ops/sec ±1.54% (91 runs sampled)
      * #3: html-entities.decode - html5, strict x 346,212 ops/sec ±1.79% (89 runs sampled)
        #4: entities.decodeHTML4 x 288,765 ops/sec ±0.75% (96 runs sampled)
        #5: entities.decodeHTML5 x 283,268 ops/sec ±0.96% (87 runs sampled)
        #6: he.decode x 212,620 ops/sec ±2.63% (93 runs sampled)

XML

    Encode test
      * #1: html-entities.encode - xml, specialChars x 1,123,722 ops/sec ±1.79% (93 runs sampled)
        #2: he.escape x 1,139,774 ops/sec ±3.95% (85 runs sampled)
      * #3: html-entities.encode - xml, nonAscii x 434,552 ops/sec ±0.68% (95 runs sampled)
      * #4: html-entities.encode - xml, nonAsciiPrintable x 409,857 ops/sec ±0.52% (93 runs sampled)
        #5: entities.encodeXML x 292,893 ops/sec ±2.19% (93 runs sampled)
        #6: entities.escape x 225,854 ops/sec ±2.37% (94 runs sampled)

    Decode test
      * #1: html-entities.decode - xml, body x 404,036 ops/sec ±0.45% (94 runs sampled)
      * #2: html-entities.decode - xml, strict x 402,978 ops/sec ±0.53% (94 runs sampled)
        #3: entities.decodeXMLStrict x 393,540 ops/sec ±3.02% (91 runs sampled)
      * #4: html-entities.decode - xml, attribute x 389,117 ops/sec ±1.99% (91 runs sampled)
        #5: entities.decodeXML x 389,969 ops/sec ±3.47% (87 runs sampled)
        #6: he.unescape x 245,149 ops/sec ±1.28% (93 runs sampled)
```

License
-------

MIT
