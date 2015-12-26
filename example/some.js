'use strict';

const fs = require('fs');
const scraper = require('../index');

scraper.deepSearch(['IIC'], { year: 2015, period: 2 }, function(err, courses) {
  if (err) return console.error(err);

  console.log('Count:', courses.length);
  fs.writeFile('./some.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
});
