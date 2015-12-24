# BuscaCursos Scraper

This proyect uses [mrpatiwi/buscacursos-uc](https://github.com/mrpatiwi/buscacursos-uc) and requires Node 5.3.x or newer.

> Use by your own responsability, because this creates heavy load on http://buscacursos.uc.cl

## Install

This shall not be published to `npm`.

To install as a dependency, edit the `package.json` and add:

```json
"dependencies": {
    "buscacursos-uc-scraper": "git://github.com/mrpatiwi/buscacursos-uc-scraper.git"
}
```

## Usage

```javascript
'use strict';

const fs = require('fs');
const scraper = require('buscacursos-uc-scraper');

scraper.all(function(err, courses) {
  if (err) return console.error(err);

  console.log('Count:', courses.length);
  fs.writeFile('./courses.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
});
```

```javascript
scraper.deepSearch(['IIC', 'MAT'], function(err, courses) {
  if (err) return console.error(err);

  console.log('Count:', courses.length);
  fs.writeFile('./some.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
});
```
