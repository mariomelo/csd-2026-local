const Config = require('./config');

class GameEngine {
  startGame(difficulty) {
    const dictionary = Config.getCurrentDictionaryAdapter();
    const word = dictionary.getRandomWord(difficulty);

    return {
      status: 'RUNNING',
      word: word,
      lives: 6,
      display_word: this._getInitialDisplayWord(word),
      guesses: [],
      message: 'Adivinhe uma letra',
    };
  }

  guessLetter(currentGameState, letter) {
    return {
      ...currentGameState,
      lives: currentGameState.lives - 1,
      message: `A letra ${letter} não está na palavra.`,
    }
  }

  handleEvent(event, data, currentGameState) {
    return currentGameState;
  }

  version() {
    return '0.0.1-beta';
  }

  _getInitialDisplayWord(word) {
    return word
      .split('')
      .map(() => '_')
      .join(' ');
  }

  _getDisplayWord(gameState) {
    return gameState.word
      .split('')
      .map((letter) => (gameState.guesses.includes(letter) ? letter : '_'))
      .join(' ');
  }
}

module.exports = new GameEngine();
