// Sistema de internacionalização para o jogo da forca
const translations = {
  pt_br: {
    // Mensagens da interface CLI
    welcome: "\n🎯 BEM-VINDO AO JOGO DA FORCA! 🎯\n",
    instruction: "Adivinhe a palavra secreta letra por letra!",
    inputHint: "Digite uma letra por vez e pressione ENTER\n",
    word: "📝 Palavra: ",
    lives: "❤️  Vidas restantes: ",
    guesses: "🔤 Letras tentadas: ",
    promptLetter: "\n🔤 Digite uma letra: ",
    won: "\n🎉 PARABÉNS! VOCÊ GANHOU! 🎉",
    lost: "\n💀 GAME OVER! VOCÊ PERDEU! 💀",
    theWordWas: "A palavra era: ",
  },
  en_us: {
    // Mensagens da interface CLI
    welcome: "\n🎯 WELCOME TO HANGMAN GAME! 🎯\n",
    instruction: "Guess the secret word letter by letter!",
    inputHint: "Type one letter at a time and press ENTER\n",
    word: "📝 Word: ",
    lives: "❤️  Lives remaining: ",
    guesses: "🔤 Letters tried: ",
    promptLetter: "\n🔤 Type a letter: ",
    won: "\n🎉 CONGRATULATIONS! YOU WON! 🎉",
    lost: "\n💀 GAME OVER! YOU LOST! 💀",
    theWordWas: "The word was: ",
  },
};

class I18n {
  constructor(locale = "pt_br") {
    this.locale = locale;
  }

  setLocale(locale) {
    if (!translations[locale]) {
      throw new Error(`Locale ${locale} not supported`);
    }
    this.locale = locale;
  }

  t(key) {
    return translations[this.locale][key] || key;
  }

  getAvailableLocales() {
    return Object.keys(translations);
  }
}

module.exports = I18n;
