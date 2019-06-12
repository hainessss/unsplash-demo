const dictionary =  require('../dictionary');
const lowerCase = require('lodash/lowerCase');

const stripNonLetterChars = (term) => {
  return term.replace(/[^a-zA-Z]/g, '');
}

const vowelRegex = /[a,e,i,o,u]/ig;
const vowels = ['a', 'e', 'i', 'o', 'u'];

const findAlternateWord = (term, startIndex = 0) => {
  let alternateWord = '';
  const termLetterArray = term.split('');

  for (var i = startIndex; i < termLetterArray.length; i++) {
    const letter = termLetterArray[i];

    if (vowelRegex.test(letter)) {
        for (var index = 0; index < vowels.length; index++) {
          const vowel = vowels[index];

          if (alternateWord) {
            break;
          }

          termLetterArray.splice(i, 1, vowel);
          const newWord = termLetterArray.join('');

          if (dictionary.has(lowerCase(newWord))) {
            alternateWord = newWord;
          } else {
            alternateWord = findAlternateWord(newWord, i + 1);
          }
        }
     }

     if (alternateWord) {
       break;
     }
  }

  return alternateWord;
}

module.exports = (term) => {
  let newTerm = stripNonLetterChars(term);

  if (dictionary.has(newTerm)) {
    return newTerm;
  } else {
    newTerm = findAlternateWord(newTerm);
    return newTerm;
  }
}
