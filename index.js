'use strict';

const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');
// const async = require('asyncawait/async');
// const wait = require('asyncawait/await');

function twoInitials() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
  const collection = new MySet();
  alphabet.forEach(char1 => {
    alphabet.forEach(char2 => {
      collection.add(char1 + char2);
    });
  })
  return collection.toArray();
}

let initials = twoInitials();

function split(a, n) {
  var len = a.length,
    out = [],
    i = 0;
  while (i < len) {
    var size = Math.ceil((len - i) / n--);
    out.push(a.slice(i, i += size));
  }
  return out;
}

initials = split(initials, 60);
initials = initials[0];

function ewe() {
  const queries = initials.map(i => {
    return {
      'cxml_semestre': '2016-1',
      'cxml_sigla': i,
    };
  });

  function handler(query, callback) {
    buscacursos.fetch(query)
      .then(result => callback(null, result))
      .catch(err => callback(err));
  }

  async.mapLimit(queries, 5, handler, function(err, results) {
    if (err) return console.error(err);

    results.forEach((result, i) => {
      if (result && result.length !== 0) {
        console.log(queries[i]['cxml_sigla'], result.length);
      }
    });
  });
}

ewe();
