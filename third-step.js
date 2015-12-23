'use strict';

let initials = require('./second-step');
const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

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

const page = process.argv[2] || 0;
initials = split(initials, 10);
initials = initials[page];
console.log(initials.length);

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

  // 5 concurrent
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
