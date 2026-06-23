const DictionaryPort = require('../ports/dictionary-port');

/**
 * BaseDictionary - Simple dictionary implementation
 */

class BaseDictionary extends DictionaryPort {
  constructor() {
    super();
    this.words = ['EXEMPLO', 'PALAVRA', 'TESTE'];
  }

  getRandomWord(difficulty) {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
}

module.exports = BaseDictionary;
