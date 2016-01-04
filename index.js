'use strict';

const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const Promise = require('bluebird');

const util = require('./lib/util');
const generator = require('./lib/initials-generator');

const settings = {
  verbose: true,
  concurrency: 5,
};

function all(options) {
  return getValidTwoInitials(options).then(twos => {
    twos = twos.map(r => r.initials);
    if (settings.verbose) console.log("Valid Two Identifiers", twos);
    return getValidThreeInitials(twos, options);
  }).then(threes => {
    threes = threes.map(r => r.initials);
    if (settings.verbose) console.log("Valid Three Identifiers", threes);
    return deepSearch(threes, options);
  });
}

function getValidTwoInitials(options) {
  options.initials = generator(2);
  return util.tryInitials(options, 5);
}

function getValidThreeInitials(twoInitials, options) {
  const three = new MySet();
  twoInitials.forEach(a => {
    twoInitials.forEach(b => {
      if (a[1] === b[0]) {
        three.add(`${a[0]}${a[1]}${b[1]}`);
      }
    });
  });
  options.initials = three.toArray();
  return util.tryInitials(options, 5);
}

function deepSearch(threeInitials, options) {
  const query = threeInitials.map(i => {
    return {
        initials: i,
        year: options.year,
        period: options.period,
    };
  });
  return Promise.map(query, recursiveHandler, settings).then(results => {
    return util.flatten(results);
  });
}

function recursiveHandler(query) {
  const initials = query.initials;
  return buscacursos.fetch(util.querizer(initials, query.year, query.period)).then(courses => {
    if (settings.verbose) console.log(initials, courses.length);
    if (courses.length < 50) {
      return courses;
    }
    const newInitials = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => {
      return {
        initials: initials + n,
        year: query.year,
        period: query.period,
      };
    });
    return Promise.map(newInitials, recursiveHandler, settings);
  });
}

exports.settings = settings;
exports.generator = generator;
exports.getValidTwoInitials = getValidTwoInitials;
exports.getValidThreeInitials = getValidThreeInitials;
exports.deepSearch = deepSearch;
exports.all = all;
exports.initials = require('./initials');
