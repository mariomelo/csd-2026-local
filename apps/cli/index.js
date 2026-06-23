const chalk = require("chalk");
const readlineSync = require("readline-sync");
const GameEngine = require("@forca/engine");
const I18n = require("./i18n");

class GameCLI {
  constructor(locale = "pt_br") {
    this.gameEngine = GameEngine;
    this.i18n = new I18n(locale);
  }

  displayWelcome() {
    console.log(chalk.blue.bold(this.i18n.t("welcome")));
    console.log(chalk.yellow(this.i18n.t("instruction")));
    console.log(chalk.gray(this.i18n.t("inputHint")));
  }

  displayGameState(gameState) {
    console.log(
      chalk.cyan("\n" + this.i18n.t("word")) + chalk.bold(gameState.display_word),
    );
    console.log(chalk.red(this.i18n.t("lives")) + gameState.lives);

    if (gameState.guesses.length > 0) {
      console.log(
        chalk.gray(this.i18n.t("guesses")) + gameState.guesses.join(", "),
      );
    }

    console.log(chalk.green("💭 " + gameState.message));
  }

  displayGameOver(gameState) {
    if (gameState.status === "WON") {
      console.log(chalk.green.bold(this.i18n.t("won")));
    } else if (gameState.status === "LOST") {
      console.log(chalk.red.bold(this.i18n.t("lost")));
      console.log(chalk.yellow(this.i18n.t("theWordWas")) + chalk.bold(gameState.word));
    }
  }

  play() {
    this.displayWelcome();

    let gameState = this.gameEngine.startGame();

    while (gameState.status === "RUNNING") {
      this.displayGameState(gameState);

      const letter = readlineSync
        .question(chalk.blue(this.i18n.t("promptLetter")))
        .toLowerCase();

      gameState = this.gameEngine.guessLetter(gameState, letter);
    }

    this.displayGameState(gameState);
    this.displayGameOver(gameState);
  }
}

// Executar o jogo se este arquivo for chamado diretamente
if (require.main === module) {
  const game = new GameCLI();
  game.play();
}

module.exports = GameCLI;
