const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const async = require('async');

exports.chunk = function chunk(a, n) {
  var len = a.length,
    out = [],
    i = 0;
  while (i < len) {
    var size = Math.ceil((len - i) / n--);
    out.push(a.slice(i, i += size));
  }
  return out;
}

exports.flatten = function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

exports.querizer = function querizer(initials) {
  return {
    'cxml_semestre': '2016-1',
    'cxml_sigla': initials,
  };
}

exports.tryInitials = function(initials, workers, callback) {
  function handler(i, cb) {
    buscacursos.fetch(querizer(i))
      .then(result => cb(null, result))
      .catch(err => cb(err));
  }

  async.mapLimit(initials, workers, handler, function(err, results) {
    if (err) return callback(err);

    const valid = [];
    results.forEach((result, i) => {
      if (result && result.length > 0) {
        valid.push({
          initials: initials[i],
          results: result.length,
        });
      }
    });
    callback(null, valid);
  });
}
