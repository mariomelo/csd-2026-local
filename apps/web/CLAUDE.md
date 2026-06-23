# CLAUDE.md — apps/web

Guidance for Claude Code when working in the web app.

## Project Overview

Interface web **estática** do jogo da forca (curso Certified Scrum Developer). A
lógica do jogo vem do pacote **`@forca/engine`** (`packages/engine`) — a **mesma**
engine consumida pela TUI (`apps/cli`). Aqui ela é **empacotada para o navegador**
pelo esbuild e roda 100% client-side. Não há servidor: o mesmo `dist/` roda local
e é publicado no **GitHub Pages** (CD).

> Os alunos trabalham **somente** em `packages/engine`. O código da UI não deve ser
> modificado por eles. Como `apps/web` consome `@forca/engine` via npm workspaces,
> editar a engine reflete imediatamente na web e na CLI — sem cópia manual.

## Arquitetura

- **Sem backend.** O antigo Express + chokidar + SSE foi removido.
- **`src/game-api.js`** — adaptador client-side com a mesma superfície dos antigos
  endpoints (`start`/`guess`/`event`/`version`), chamando `@forca/engine` direto.
  Mesmo contrato da TUI e do antigo servidor; muda só o adapter.
- **`src/feature-store.js`** — feature flags sem servidor: defaults vêm de
  `config.json` (servido estaticamente, funciona no Pages); overrides do painel
  admin vão para `localStorage`. Mudanças entre abas via evento `storage`.
- **`src/leaderboard-store.js`** — placar em `localStorage` (substitui o
  `leaderboard.json` do servidor).
- **`src/app.js`** — UI do jogo (não chama mais `fetch`; usa os módulos acima).
- **`src/admin.js` + `admin.html`** — painel de feature flags. Na web estática fica
  em **`/admin.html`** (antes era a rota `/adm` do Express).
- **`src/docs.js` + `docs.html`** — campos exigidos pela engine para cada flag ativa
  (`/docs.html`).
- **`esbuild.mjs`** — `build` (gera `dist/` para o Pages), `dev` (watch +
  livereload), `preview` (build único + serve). Substitui nodemon/SSE.

### GameState e métodos da engine
```js
{ status: "RUNNING", word, lives: 6, display_word, guesses: [], message: "Adivinhe uma letra" }
```
- `startGame(difficulty?): GameState`
- `guessLetter(currentGameState, letter): GameState`
- `handleEvent(event, data?, currentGameState): GameState`
- `version(): string`

### Feature flags (`config.json` = defaults; admin grava em localStorage)
1. **virtualKeyboard** — 26 botões A-Z; desabilita por `gameState.guesses`.
2. **timer** — evento `"tick"` a cada segundo enquanto `status === "RUNNING"`; exibe `gameState.timer`.
3. **difficulty** — botões Easy/Medium/Hard; passa a string para `startGame(difficulty)`.
4. **leaderboard** — pede nome e salva `gameState.score` no `localStorage` ao fim do jogo (top 10).
5. **moneyBag** — saco de dinheiro clicável; envia evento `"money_bag"`; controlado por `gameState.money_bag`.

## Comandos (rodar da RAIZ do repo)
```bash
npm install        # instala tudo e linka @forca/engine (workspaces)
npm run web        # build + serve estático em http://localhost:3000
npm run web:dev    # watch + livereload: editar packages/engine recarrega o navegador
npm run build:web  # gera apps/web/dist/ (o que o GitHub Pages publica)
```

## Deploy (CD)
`.github/workflows/ci-cd.yml` builda `apps/web` e publica `apps/web/dist/` no
GitHub Pages a cada push na `main` (após os testes passarem). Caminhos de assets são
**relativos** para funcionar no subpath `https://<usuario>.github.io/<repo>/`.
