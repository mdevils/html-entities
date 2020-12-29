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

encode(' < > " \' & © ∆')
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

encode('< > " \' & © ∆', {mode: 'nonAsciiPrintable'})
// -> '&lt; &gt; &quot; &apos; &amp; &copy; &#8710;'

encode('< > " \' & © ∆', {mode: 'nonAsciiPrintable', level: 'xml'})
// -> '&lt; &gt; &quot; &apos; &amp; &#169; &#8710;'
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

decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;')
// -> '< > " \' & © ∆'

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
HTML5

    Encode test

      * #1: html-entities.encode - html5, nonAscii x 362,978 ops/sec ±1.10% (93 runs sampled)
      * #2: html-entities.encode - html5, nonAsciiPrintable x 343,554 ops/sec ±1.35% (93 runs sampled)
        #3: entities.encodeHTML5 x 106,418 ops/sec ±0.41% (91 runs sampled)
        #4: he.encode x 98,762 ops/sec ±0.93% (92 runs sampled)

    Decode test

      * #1: html-entities.decode - html5, strict x 291,466 ops/sec ±3.09% (86 runs sampled)
      * #2: html-entities.decode - html5, body x 293,192 ops/sec ±5.33% (91 runs sampled)
      * #3: html-entities.decode - html5, attribute x 272,764 ops/sec ±2.30% (91 runs sampled)
        #4: entities.decodeHTML5 x 250,868 ops/sec ±0.59% (93 runs sampled)
        #5: he.decode x 176,291 ops/sec ±4.48% (88 runs sampled)

HTML4

    Encode test

      * #1: html-entities.encode - html4, nonAscii x 364,044 ops/sec ±1.70% (92 runs sampled)
      * #2: html-entities.encode - html4, nonAsciiPrintable x 328,646 ops/sec ±2.61% (88 runs sampled)
        #3: entities.encodeHTML4 x 105,841 ops/sec ±0.53% (91 runs sampled)

    Decode test

      * #1: html-entities.decode - html4, body x 327,197 ops/sec ±0.76% (95 runs sampled)
      * #2: html-entities.decode - html4, attribute x 317,243 ops/sec ±2.10% (90 runs sampled)
      * #3: html-entities.decode - html4, strict x 312,160 ops/sec ±2.94% (83 runs sampled)
        #4: entities.decodeHTML4 x 288,001 ops/sec ±0.85% (93 runs sampled)

XML

    Encode test

      * #1: html-entities.encode - xml, nonAscii x 427,148 ops/sec ±1.40% (94 runs sampled)
      * #2: html-entities.encode - xml, nonAsciiPrintable x 397,820 ops/sec ±2.77% (92 runs sampled)
        #3: entities.encodeXML x 283,177 ops/sec ±3.57% (93 runs sampled)

    Decode test

      * #1: html-entities.decode - xml, strict x 407,364 ops/sec ±0.55% (91 runs sampled)
        #2: entities.decodeXML x 405,984 ops/sec ±0.78% (94 runs sampled)
      * #3: html-entities.decode - xml, body x 402,167 ops/sec ±0.67% (95 runs sampled)
      * #4: html-entities.decode - xml, attribute x 387,630 ops/sec ±2.51% (94 runs sampled)
        #5: entities.decodeXMLStrict x 390,023 ops/sec ±7.37% (86 runs sampled)

Escaping

    Escape test

        #1: he.escape x 1,163,620 ops/sec ±2.53% (88 runs sampled)
        #2: html-entities.encode - xml, specialChars x 1,087,350 ops/sec ±4.06% (91 runs sampled)
```

License
-------

MIT
