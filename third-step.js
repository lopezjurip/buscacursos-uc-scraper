const initials = require('./second-step');

const page = process.argv[2] || 0;
initials = split(initials, 10);
initials = initials[page];

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
