// docs.js — mostra os campos exigidos pela engine para as features ativas.
// Lê as flags do feature-store (config.json + localStorage); reage a mudanças
// feitas no painel admin em outra aba.
import { loadDefaults, getFeatures, onFeaturesChanged } from './feature-store.js';

const docsContent = document.getElementById('docs-content');

const docs = {
  virtualKeyboard: {
    title: 'Virtual Keyboard',
    content: `
      <h3>Required GameState Field</h3>
      <p><span class="field-name">guesses</span> (array of strings)</p>
      <p>Must contain all letters that have been guessed by the player.</p>

      <h3>Example</h3>
      <div class="code-block">guesses: ["A", "E", "I", "O", "U"]</div>

      <p>Each letter in this array will have its corresponding virtual keyboard button disabled.</p>
    `
  },
  timer: {
    title: 'Timer',
    content: `
      <h3>Required GameState Field</h3>
      <p><span class="field-name">timer</span> (number)</p>
      <p>The current timer value to display to the player.</p>

      <h3>Example</h3>
      <div class="code-block">timer: 45</div>

      <h3>Event Handler</h3>
      <p>Your <span class="field-name">handleEvent()</span> method will receive a <span class="field-name">"tick"</span> event every second while the game status is <span class="field-name">"RUNNING"</span>.</p>

      <h3>Example Event Call</h3>
      <div class="code-block">handleEvent("tick", undefined, currentGameState)</div>
    `
  },
  difficulty: {
    title: 'Difficulty Levels',
    content: `
      <h3>Required Method Parameter</h3>
      <p>Your <span class="field-name">startGame()</span> method will receive a difficulty parameter.</p>

      <h3>Possible Values</h3>
      <div class="code-block">"easy"
"medium"
"hard"</div>

      <h3>Example Method Signature</h3>
      <div class="code-block">startGame(difficulty)</div>

      <h3>Optional GameState Field</h3>
      <p><span class="field-name">difficulty</span> (string)</p>
      <p>You may store the difficulty in the game state if needed.</p>
    `
  },
  leaderboard: {
    title: 'Leaderboard',
    content: `
      <h3>Required GameState Field</h3>
      <p><span class="field-name">score</span> (number)</p>
      <p>The player's score for the current game.</p>

      <h3>Example</h3>
      <div class="code-block">score: 100</div>

      <p>When the game ends (status changes from <span class="field-name">"RUNNING"</span> to <span class="field-name">"WON"</span> or <span class="field-name">"LOST"</span>), the score will be automatically saved to the leaderboard if the player has entered their name.</p>

      <h3>Note</h3>
      <p>Higher scores are ranked better. The leaderboard displays the top 10 scores in descending order.</p>
    `
  },
  moneyBag: {
    title: 'Money Bag',
    content: `
      <h3>Required GameState Field</h3>
      <p><span class="field-name">money_bag</span> (boolean)</p>
      <p>Controls whether the money bag is displayed. If <span class="field-name">true</span>, the money bag appears on screen.</p>

      <h3>Example</h3>
      <div class="code-block">money_bag: true</div>

      <h3>Event Handler</h3>
      <p>Your <span class="field-name">handleEvent()</span> method will receive a <span class="field-name">"money_bag"</span> event when the player clicks the money bag.</p>

      <h3>Example Event Call</h3>
      <div class="code-block">handleEvent("money_bag", undefined, currentGameState)</div>

      <p>If you set <span class="field-name">money_bag</span> to <span class="field-name">false</span> in the returned game state, the money bag will be removed from the screen.</p>
    `
  }
};

function loadDocs() {
  const features = getFeatures();
  const enabledFeatures = Object.entries(features).filter(([, value]) => value === true);

  if (enabledFeatures.length === 0) {
    docsContent.innerHTML = `
      <div class="no-features">
        <p>No features are currently enabled.</p>
      </div>
    `;
    return;
  }

  let html = '';
  for (const [featureName] of enabledFeatures) {
    if (docs[featureName]) {
      html += `
        <div class="feature-doc">
          <h2>${docs[featureName].title}</h2>
          ${docs[featureName].content}
        </div>
      `;
    }
  }

  docsContent.innerHTML = html;
}

onFeaturesChanged(loadDocs);

(async () => {
  await loadDefaults();
  loadDocs();
})();
