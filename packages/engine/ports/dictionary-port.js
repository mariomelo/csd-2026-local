/**
 * DictionaryPort - Interface for dictionary implementations
 */

class DictionaryPort {
  /**
   * Returns a random word from the dictionary
   * @param {string} difficulty - Optional: 'easy', 'medium', or 'hard'
   * @returns {string} A random word in uppercase
   */
  getRandomWord(difficulty) {
    throw new Error('Method getRandomWord() must be implemented');
  }
}

module.exports = DictionaryPort;
