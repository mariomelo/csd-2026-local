const DictionaryPort = require('@forca/engine/ports/dictionary-port');

/**
 * TestDictionary - Dictionary adapter for testing
 * Returns predictable words to make tests deterministic
 */
class TestDictionary extends DictionaryPort {
  constructor(word = 'CASA') {
    super();
    this.defaultWord = word;
  }

  getRandomWord(difficulty) {
    return this.defaultWord;
  }

  setCurrentWord(word) {
    this.defaultWord = word;
  }
}

module.exports = TestDictionary;
