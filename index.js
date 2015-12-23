'use strict';

const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

const util = require('./lib/util');
const generator = require('./lib/initials-generator');

function all(callback) {
  getValidTwoInitials((err, r2s) => {
    if (err) return callback(err);
    r2s = r2s.map(r => r.initials);
    getValidThreeInitials(r2s, (err, r3s) => {
      if (err) return callback(err);
      r3s = r3s.map(r => r.initials);
      deepSearch(r3s, callback);
    });
  });
}

function getValidTwoInitials(callback) {
  let twoInitials = generator(2);
  util.tryInitials(twoInitials, 5, callback);
}

function getValidThreeInitials(twoInitials, callback) {
  const three = new MySet();
  twoInitials.forEach(a => {
    twoInitials.forEach(b => {
      if (a[1] === b[0]) {
        three.add(`${a[0]}${a[1]}${b[1]}`);
      }
    });
  });

  util.tryInitials(three.toArray(), 5, callback);
}

function deepSearch(threeInitials, callback) {
  async.mapLimit(threeInitials, 5, recursiveHandler, function(err, results) {
    if (err) callback(err);
    else callback(null, util.flatten(results));
  });
}

function recursiveHandler(initials, callback) {
  const newInitials = [
    initials + '0',
    initials + '1',
    initials + '2',
    initials + '3'
  ];
  buscacursos.fetch(util.querizer(initials)).then(courses => {
    // console.log(temp, courses.length);
    if (courses.length >= 50) {
      async.mapLimit(newInitials, newInitials.length, recursiveHandler, function(err, r2) {
        callback(err, r2);
      });
    } else {
      callback(null, courses);
    }
  }).catch(err => callback(err));
}

exports.generator = generator;
exports.getValidTwoInitials = getValidTwoInitials;
exports.getValidThreeInitials = getValidThreeInitials;
exports.deepSearch = deepSearch;
exports.all = all;
