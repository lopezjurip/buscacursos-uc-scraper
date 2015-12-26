'use strict';

const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

const util = require('./lib/util');
const generator = require('./lib/initials-generator');

function all(options, callback) {
  getValidTwoInitials(options, (err, r2s) => {
    if (err) return callback(err);
    r2s = r2s.map(r => r.initials);
    getValidThreeInitials(r2s, options, (err, r3s) => {
      if (err) return callback(err);
      r3s = r3s.map(r => r.initials);
      deepSearch(r3s, options, callback);
    });
  });
}

function getValidTwoInitials(options, callback) {
  options.initials = generator(2);
  util.tryInitials(options, 5, callback);
}

function getValidThreeInitials(twoInitials, options, callback) {
  const three = new MySet();
  twoInitials.forEach(a => {
    twoInitials.forEach(b => {
      if (a[1] === b[0]) {
        three.add(`${a[0]}${a[1]}${b[1]}`);
      }
    });
  });
  options.initials = three.toArray();
  util.tryInitials(options, 5, callback);
}

function deepSearch(threeInitials, options, callback) {
  const temp = threeInitials.map(i => {
    return {
        initials: i,
        year: options.year,
        period: options.period,
    };
  });
  async.mapLimit(temp, 5, recursiveHandler, function(err, results) {
    if (err) callback(err);
    else callback(null, util.flatten(results));
  });
}

function recursiveHandler(options, callback) {
  const initials = options.initials;
  buscacursos.fetch(util.querizer(initials, options.year, options.period)).then(courses => {
    // console.log(initials, courses.length);
    if (courses.length >= 50) {
      const newInitials = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
        return {
          initials: initials + n,
          year: options.year,
          period: options.period,
        };
      });
      async.mapLimit(newInitials, newInitials.length, recursiveHandler, function(err, r2) {
        callback(err, r2);
      });
    } else {
      callback(null, courses);
    }
  }).catch(callback);
}

exports.generator = generator;
exports.getValidTwoInitials = getValidTwoInitials;
exports.getValidThreeInitials = getValidThreeInitials;
exports.deepSearch = deepSearch;
exports.all = all;
exports.initials = require('./initials');
