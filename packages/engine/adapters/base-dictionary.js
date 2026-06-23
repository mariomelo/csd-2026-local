const DictionaryPort = require('../ports/dictionary-port');

/**
 * BaseDictionary - Simple dictionary implementation
 *
 * Students should implement:
 * - Load words from array or file
 * - Random selection logic
 */

class BaseDictionary extends DictionaryPort {
  constructor() {
    super();
    // TODO: Students should implement word loading
    this.words = ['EXEMPLO', 'PALAVRA', 'TESTE'];
  }

  getRandomWord(difficulty) {
    // TODO: Optionally filter by difficulty
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
}

module.exports = BaseDictionary;
