const MySet = require("collections/set");

const alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');

function generator(count) {
  if (count === 0) return '';
  else if (count === 1) return alphabet;

  const results = new MySet();
  generator(count - 1).forEach(string => {
    alphabet.forEach(char => {
      results.add(string + char);
    });
  });
  return results.toArray();
}

module.exports = generator;
