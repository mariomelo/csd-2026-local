const BaseDictionary = require('./adapters/base-dictionary');

/**
 * Config - Manages dictionary adapter selection
 *
 * Allows switching between different dictionary implementations at runtime.
 * Students can create new dictionary adapters and set them here.
 */

let currentDictionaryAdapter = new BaseDictionary();

const setDictionaryAdapter = (adapterInstance) => {
  currentDictionaryAdapter = adapterInstance;
};

const getCurrentDictionaryAdapter = () => {
  return currentDictionaryAdapter;
};

module.exports = {
  setDictionaryAdapter,
  getCurrentDictionaryAdapter,
};
