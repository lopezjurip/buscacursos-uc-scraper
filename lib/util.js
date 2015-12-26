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

exports.querizer = function querizer(initials, year, period) {
  return {
    'cxml_semestre': `${year}-${period}`,
    'cxml_sigla': initials,
  };
}

exports.tryInitials = function(options, workers, callback) {
  function handler(i, cb) {
    const skip = { skipRequisites: true, skipInformation: true };
    buscacursos.fetch(exports.querizer(i, options.year, options.period), skip)
      .then(result => cb(null, result))
      .catch(err => cb(err));
  }
  const initials = options.initials;
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
