// feature-store.js — feature flags sem servidor.
//
// Defaults vêm de config.json (servido estaticamente, funciona no GitHub Pages).
// Os toggles do /admin gravam overrides em localStorage. O jogo lê a mescla.
// Mudanças feitas em outra aba (o painel admin) chegam via evento 'storage',
// substituindo o antigo push por SSE.
const STORAGE_KEY = 'forca:featureFlags';

let defaults = {};

export async function loadDefaults() {
  try {
    const res = await fetch('./config.json', { cache: 'no-store' });
    const cfg = await res.json();
    defaults = cfg.featureFlags || {};
  } catch (error) {
    console.error('Could not load config.json defaults:', error);
    defaults = {};
  }
  return defaults;
}

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function getFeatures() {
  return { ...defaults, ...readOverrides() };
}

export function setFeature(name, value) {
  const overrides = { ...readOverrides(), [name]: value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function onFeaturesChanged(callback) {
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      callback(getFeatures());
    }
  });
}
