# BuscaCursos UC Scraper

[![dependencies][dependencies-image]][dependencies-url] [![dev-dependencies][dev-dependencies-image]][dev-dependencies-url]

This proyect uses [mrpatiwi/buscacursos-uc](https://github.com/mrpatiwi/buscacursos-uc) and requires Node 5.3.x or newer.

> Use by your own responsability, because this creates heavy load on [http://buscacursos.uc.cl](http://buscacursos.uc.cl)

## How does it works

When you query [http://buscacursos.uc.cl](http://buscacursos.uc.cl) you can have at most 50 results without be able to get the next results (no pagination).

This works by quering the initials (`MAT`, `LET`, etc) and counting the results, then if the results are more than 50, this perform another ten (recursive) queries like: `MAT0`, `MAT1`, ..., `MAT9`, otherwise just return the results.

In shorter words, this performs a kind of *Depth First Search (DFS)*.

## Install

This shall not be published to `npm`.

To install as a dependency, edit the `package.json` and add:

```json
"dependencies": {
    "buscacursos-uc-scraper": "git+https://git@github.com/mrpatiwi/buscacursos-uc-scraper"
}
```

## Usage

The function `deepSearch` receives an array of course initials (strings of length 3).

*   Example: `MAT`, `IIC`, `DNO`, ...

```javascript
scraper.deepSearch(['IIC', 'MAT'], { year: 2016, period: 1 }).then(courses => {
  console.log('Count:', courses.length);
  fs.writeFile('./some.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
}).catch(err => {
  console.error(err);
});
```

All the (current) available identifiers are importable with:

```javascript
const scraper = require('buscacursos-uc-scraper');
const initials = scraper.initials;
```

Usage:

```javascript
'use strict';

const fs = require('fs');
const scraper = require('buscacursos-uc-scraper');

// Recomended:
// Use known initials to speed the process.
const initials = scraper.initials;

scraper.deepSearch(initials, { year: 2016, period: 1 }).then(courses => {
  console.log('Count:', courses.length);
  fs.writeFile('./all.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
}).catch(err => {
  console.error(err);
});

// To perform a full search use (rediscover initials):
//
// This takes a lot of time to complete.
// Also, creates heavy load on the server, use with caution.
// Big chances of failing:
//
// scraper.all({ year: 2016, period: 1 }).then(courses => { ...
```

[dependencies-image]: https://david-dm.org/mrpatiwi/buscacursos-uc-scraper.svg
[dependencies-url]: https://david-dm.org/mrpatiwi/buscacursos-uc-scraper
[dev-dependencies-image]: https://david-dm.org/mrpatiwi/buscacursos-uc-scraper/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/mrpatiwi/buscacursos-uc-scraper#info=devDependencies
