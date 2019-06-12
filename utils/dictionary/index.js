const wordListPath = require('word-list');
const fs = require('fs');

const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');
const dictionary = new Set(wordArray);

module.exports = dictionary;