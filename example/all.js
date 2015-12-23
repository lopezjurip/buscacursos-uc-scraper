'use strict';

const fs = require('fs');
const scraper = require('../index');

scraper.all(function(err, courses) {
  if (err) return console.error(err);

  console.log('Count:', courses.length);
  fs.writeFile('./all.json', JSON.stringify(courses, null, 4), function(err) {
    if (err) return console.error(err);

    console.log('success!');
  });
});
