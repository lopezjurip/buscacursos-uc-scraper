const buscacursos = require('buscacursos-uc');
const MySet = require("collections/set");
const Promise = require('bluebird');

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

exports.tryInitials = function(options, workers) {
  function handler(i) {
    const skip = { skipRequisites: true, skipInformation: true };
    return buscacursos.fetch(exports.querizer(i, options.year, options.period), skip);
  }

  const initials = options.initials;
  return Promise.map(initials, handler, { concurrency: workers }).then(page => {
    return page.map((courses, i) => {
      return {
        initials: initials[i],
        results: (courses) ? courses.length : 0,
      }
    }).filter(obj => obj.results !== 0);
  });
}
