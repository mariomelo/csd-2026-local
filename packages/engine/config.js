const BaseDictionary = require('./adapters/base-dictionary');

/**
 * Config - Manages dictionary adapter selection
 *
 * Allows switching between different dictionary implementations at runtime.
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
