'use strict';

const allInitials = ['ART', 'AGL'];// require('./initials');
const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

function makeQuery(initials) {
  return {
    'cxml_semestre': '2016-1',
    'cxml_sigla': initials,
  };
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

function handler(initials, callback) {
  const temp = initials;
  const newInitials = [initials + '0', initials + '1', initials + '2', initials + '3'];
  buscacursos.fetch(makeQuery(initials)).then(courses => {
    console.log(temp, courses.length);
    if (courses.length >= 50) {
      async.mapLimit(newInitials, 4, handler, (err, r2) => {
        callback(err, r2);
      });
    } else {
      callback(null, courses);
    }
  }).catch(err => callback(err));
}

function ewe() {
  async.mapLimit(allInitials, 5, handler, function(err, results) {
    const final = flatten(results);
    console.log(JSON.stringify(final.map(course => course.initials + ' ' + course.name), null ,4));
    // console.log(results);
  });
}

ewe();
