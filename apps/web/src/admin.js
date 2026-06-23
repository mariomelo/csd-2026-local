// admin.js — painel de feature flags (/admin).
// Grava overrides em localStorage via feature-store; o jogo aberto em outra aba
// reage pelo evento 'storage'.
import { loadDefaults, getFeatures, setFeature } from './feature-store.js';

const FLAGS = ['virtualKeyboard', 'timer', 'difficulty', 'leaderboard', 'moneyBag'];
const statusMessage = document.getElementById('status');

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type} show`;
  setTimeout(() => statusMessage.classList.remove('show'), 3000);
}

async function init() {
  await loadDefaults();
  const features = getFeatures();

  FLAGS.forEach((name) => {
    const toggle = document.getElementById(name);
    if (!toggle) return;
    toggle.checked = features[name] || false;
    toggle.addEventListener('change', (event) => {
      setFeature(name, event.target.checked);
      showStatus(`Feature flag "${name}" updated!`, 'success');
    });
  });
}

init();
