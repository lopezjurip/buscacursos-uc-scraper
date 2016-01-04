'use strict';

const fs = require('fs');
const scraper = require('../index');

scraper.deepSearch(['IIC', 'MAT'], { year: 2016, period: 1 }).then(courses => {
  console.log('Count:', courses.length);
  fs.writeFile('./some.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
}).catch(console.error);
