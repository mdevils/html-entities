# html-entities

[![npm version](https://img.shields.io/npm/v/html-entities.svg)](https://www.npmjs.com/package/html-entities)
[![License](https://img.shields.io/npm/l/html-entities.svg)](https://github.com/mdevils/html-entities/blob/main/LICENSE)
[![Types](https://img.shields.io/npm/types/html-entities.svg)](https://www.npmjs.com/package/html-entities)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/html-entities)](https://bundlephobia.com/package/html-entities)

Fast and lightweight HTML entities library for all HTML standards (HTML5, HTML4, XML).

## Features

- 🚀 **Fast performance** - optimized for speed (see [benchmarks](#performance-comparison))
- 📦 **Lightweight** - small package size (132 kB, see [comparison](#package-size-comparison))
- 🔄 **Standards compliant** - supports HTML5, HTML4, and XML entities
- 📄 **Type safe** - includes TypeScript and Flow types
- 🔌 **Dual ESM/CJS support** - works with both module systems

## Installation

```bash
# NPM
npm install html-entities

# Yarn
yarn add html-entities

# pnpm
pnpm add html-entities
```

## Usage

### encode(text, options)

Encodes text by replacing HTML special characters (`<>&"'`) and/or other character ranges depending on `mode` option.

```js
import { encode } from 'html-entities';

// Basic usage (defaults to HTML5 special chars only)
encode('< > " \' & © ∆');
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

// Encode non-ASCII printable characters
encode('< ©', { mode: 'nonAsciiPrintable' });
// -> '&lt; &copy;'

// Specify encoding level (XML) and mode
encode('< ©', { mode: 'nonAsciiPrintable', level: 'xml' });
// -> '&lt; &#169;'

// Encode only non-ASCII characters, leaving special chars intact
encode('< > " \' & ©', { mode: 'nonAsciiPrintableOnly', level: 'xml' });
// -> '< > " \' & &#169;'
```

#### Options

##### `level`
- `all` or `html5` (default) - Uses HTML5 named references
- `html4` - Uses HTML4 named references
- `xml` - Uses XML named references

##### `mode`
- `specialChars` (default) - Encodes only HTML special characters
- `nonAscii` - Encodes HTML special characters and everything outside the [ASCII range](https://en.wikipedia.org/wiki/ASCII)
- `nonAsciiPrintable` - Encodes HTML special characters and everything outside [ASCII printable characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters)
- `nonAsciiPrintableOnly` - Encodes everything outside ASCII printable range, keeping HTML special characters intact
- `extensive` - Encodes all non-printable characters, non-ASCII characters and all characters with named references

##### `numeric`
- `decimal` (default) - Uses decimal numbers for HTML entities (e.g., `&#169;`)
- `hexadecimal` - Uses hexadecimal numbers for HTML entities (e.g., `&#xa9;`)

### decode(text, options)

Decodes text by replacing HTML entities with their corresponding characters. Unknown entities are preserved.

```js
import { decode } from 'html-entities';

// Basic usage (defaults to HTML5)
decode('&lt; &gt; &quot; &apos; &amp; &#169; &#8710;');
// -> '< > " \' & © ∆'

// Specify encoding level
decode('&copy;', { level: 'html5' });
// -> '©'

// XML level doesn't recognize &copy;
decode('&copy;', { level: 'xml' });
// -> '&copy;'
```

#### Options

##### `level`
- `all` or `html5` (default) - Uses HTML5 named references
- `html4` - Uses HTML4 named references
- `xml` - Uses XML named references

##### `scope`
- `body` (default) - Emulates browser behavior when parsing tag bodies: entities without semicolon are also replaced
- `attribute` - Emulates browser behavior when parsing tag attributes: entities without semicolon are replaced when not followed by `=`
- `strict` - Ignores entities without semicolon

### decodeEntity(text, options)

Decodes a single HTML entity. Unknown entities are preserved.

```js
import { decodeEntity } from 'html-entities';

decodeEntity('&lt;');
// -> '<'

decodeEntity('&copy;', { level: 'html5' });
// -> '©'

decodeEntity('&copy;', { level: 'xml' });
// -> '&copy;'
```

#### Options

##### `level`
- `all` or `html5` (default) - Uses HTML5 named references
- `html4` - Uses HTML4 named references
- `xml` - Uses XML named references

## Package Size Comparison

| Library | Size |
|---------|------|
| **html-entities** | 132 kB |
| he | 124 kB |
| entities | 540 kB |

## Performance Comparison

Results from benchmarks using `benchmark.js`. This library's results are marked with `*`.
See benchmark source code at `benchmark/benchmark.ts`.

```
Common

    Initialization / Load speed

        #1: he x 516 ops/sec ±5.71% (78 runs sampled)
      * #2: html-entities x 407 ops/sec ±5.64% (81 runs sampled)
        #3: entities x 352 ops/sec ±4.16% (80 runs sampled)

HTML5

    Encode test

      * #1: html-entities.encode - html5, extensive x 437,236 ops/sec ±0.90% (98 runs sampled)
        #2: entities.encodeHTML x 335,714 ops/sec ±0.87% (92 runs sampled)

    Encode non-ASCII test

      * #1: html-entities.encode - html5, nonAscii x 749,246 ops/sec ±0.61% (96 runs sampled)
        #2: entities.encodeNonAsciiHTML x 706,984 ops/sec ±1.06% (98 runs sampled)
      * #3: html-entities.encode - html5, nonAsciiPrintable x 691,193 ops/sec ±4.47% (90 runs sampled)
        #4: he.encode x 141,105 ops/sec ±0.87% (92 runs sampled)

    Decode test

        #1: entities.decodeHTML x 678,595 ops/sec ±1.28% (92 runs sampled)
        #2: entities.decodeHTMLStrict x 684,372 ops/sec ±2.76% (82 runs sampled)
      * #3: html-entities.decode - html5, strict x 485,664 ops/sec ±0.80% (94 runs sampled)
      * #4: html-entities.decode - html5, body x 463,074 ops/sec ±1.11% (93 runs sampled)
      * #5: html-entities.decode - html5, attribute x 456,185 ops/sec ±2.24% (91 runs sampled)
        #6: he.decode x 302,668 ops/sec ±2.73% (90 runs sampled)

HTML4

    Encode test

      * #1: html-entities.encode - html4, nonAscii x 737,475 ops/sec ±1.04% (95 runs sampled)
      * #2: html-entities.encode - html4, nonAsciiPrintable x 649,866 ops/sec ±4.28% (79 runs sampled)
      * #3: html-entities.encode - html4, extensive x 202,337 ops/sec ±3.66% (64 runs sampled)

    Decode test

      * #1: html-entities.decode - html4, attribute x 529,674 ops/sec ±0.90% (90 runs sampled)
      * #2: html-entities.decode - html4, body x 499,135 ops/sec ±2.27% (80 runs sampled)
      * #3: html-entities.decode - html4, strict x 489,806 ops/sec ±4.37% (84 runs sampled)

XML

    Encode test

      * #1: html-entities.encode - xml, nonAscii x 823,097 ops/sec ±0.75% (81 runs sampled)
      * #2: html-entities.encode - xml, nonAsciiPrintable x 764,638 ops/sec ±0.93% (93 runs sampled)
        #3: entities.encodeXML x 672,186 ops/sec ±1.51% (92 runs sampled)
      * #4: html-entities.encode - xml, extensive x 376,870 ops/sec ±0.76% (77 runs sampled)

    Decode test

        #1: entities.decodeXML x 930,758 ops/sec ±2.90% (90 runs sampled)
      * #2: html-entities.decode - xml, body x 617,321 ops/sec ±0.74% (83 runs sampled)
      * #3: html-entities.decode - xml, attribute x 611,598 ops/sec ±0.50% (92 runs sampled)
      * #4: html-entities.decode - xml, strict x 607,191 ops/sec ±2.30% (85 runs sampled)

Escaping

    Escape test

        #1: entities.escapeUTF8 x 1,930,874 ops/sec ±0.80% (95 runs sampled)
        #2: he.escape x 1,717,522 ops/sec ±0.75% (84 runs sampled)
      * #3: html-entities.encode - xml, specialChars x 1,611,374 ops/sec ±1.30% (92 runs sampled)
        #4: entities.escape x 673,710 ops/sec ±1.30% (94 runs sampled)
```

## License

MIT

## Security Contact Information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.

## For Enterprise

Available as part of the Tidelift Subscription.

The maintainers of `html-entities` and thousands of other packages are working with Tidelift to deliver commercial support and maintenance for the open source dependencies you use to build your applications. Save time, reduce risk, and improve code health, while paying the maintainers of the exact dependencies you use. [Learn more.](https://tidelift.com/subscription/pkg/npm-html-entities?utm_source=npm-html-entities&utm_medium=referral&utm_campaign=enterprise)