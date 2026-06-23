/**
 * DictionaryPort - Interface for dictionary implementations
 *
 * Students can create different dictionary adapters by extending this class.
 * Examples: FileDictionary, APIDictionary, DifficultyBasedDictionary, etc.
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
