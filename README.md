# 🎯 Jogo da Forca - CSD 2026

Template educativo para o ensino de desenvolvimento de software ágil (Certified Scrum Developer).

## 📋 Sobre o Projeto

Monorepo com **uma única engine** consumida por **dois clientes** (terminal e web),
para ensinar na prática:

- ✅ Arquitetura Hexagonal (ports & adapters de dicionário)
- ✅ Contratos/interfaces — a **mesma** engine roda na TUI e na web
- ✅ TDD com Jest e BDD com Cucumber (multi-idioma)
- ✅ Vertical slices e feature flags (painel `/admin.html`)
- ✅ CI **e** CD: testes no push/PR e deploy automático no **GitHub Pages**

## 📁 Estrutura

```
.
├── packages/
│   └── engine/        # 🔧 ÚNICA fonte da engine (hexagonal). ALUNOS MEXEM AQUI.
│       ├── index.js   #    GameEngine (startGame, guessLetter, handleEvent, version)
│       ├── config.js  #    seleção do adapter de dicionário
│       ├── ports/     #    interfaces (contratos)
│       └── adapters/  #    implementações (BaseDictionary)
├── apps/
│   ├── cli/           # 🖥️  cliente de terminal (consome @forca/engine)
│   └── web/           # 🌐 web estática; engine empacotada no navegador (esbuild)
├── tests/             # ✅ TDD (Jest)
├── features/          # 🥒 BDD (Cucumber) — pt_br / en_us / it
└── .github/workflows/ # 🔁 CI (testes) + CD (deploy no Pages)
```

> **Onde os alunos trabalham:** somente em `packages/engine`. Como `apps/cli` e
> `apps/web` consomem `@forca/engine` via npm workspaces, uma alteração na engine
> reflete **imediatamente** nos dois clientes — sem cópia manual.

## 🚀 Comandos (rodar da raiz)

```bash
npm install            # instala tudo e linka @forca/engine nos clientes
```

### Jogar
```bash
npm start              # joga no terminal (TUI)
npm run web            # joga no navegador → http://localhost:3000
npm run web:dev        # web com hot-reload: editar packages/engine recarrega o navegador
```

### Testes
```bash
npm test               # testes unitários (Jest)
npm run tdd:watch      # Jest em watch (loop de TDD)
npm run test:coverage  # cobertura de código
npm run test:bdd       # testes BDD (Cucumber)
npm run test:all       # unitários + BDD
```

### Build da web
```bash
npm run build:web      # gera apps/web/dist/ (o que o GitHub Pages publica)
```

## 🎮 Como Jogar

1. Execute `npm start` (terminal) ou `npm run web` (navegador).
2. O jogo mostra a palavra oculta com underscores.
3. Digite uma letra e pressione ENTER.
4. Adivinhe a palavra antes de acabarem as vidas!

## 🛠️ Para Desenvolvedores (alunos)

Este é um template: a engine começa propositalmente incompleta. Implemente em
`packages/engine`:

1. **Dicionário** (`adapters/base-dictionary.js`) — carregar palavras e sortear.
2. **Game Engine** (`index.js`) — lógica completa, validação e estado do jogo.
3. **Novos adapters** — estendendo `ports/dictionary-port.js` (ex.: por dificuldade).

A UI (CLI e web) **não** deve ser modificada pelos alunos — ela apenas consome o
contrato do `GameEngine`.

### Feature flags
Disponíveis em `apps/web/src/config.json` e alternáveis no painel **`/admin.html`**:
`virtualKeyboard`, `timer`, `difficulty`, `leaderboard`, `moneyBag`. Os requisitos de
cada flag (campos esperados no `GameState`) aparecem em **`/docs.html`**.

### Idiomas (BDD/README)
```bash
./switch-language.sh   # alterna entre pt_br / en_us / it (features + steps + README)
```

## 🔁 CI/CD (GitHub Actions)

`.github/workflows/ci-cd.yml`:
- **CI** — em cada push/PR roda Jest e Cucumber.
- **CD** — em push na `main` (após os testes), builda `apps/web` e publica
  `apps/web/dist/` no **GitHub Pages**: `https://<usuario>.github.io/<repo>/`.

Para habilitar: no repositório do GitHub, **Settings → Pages → Source: GitHub Actions**.

---

**Nota:** projeto educativo; a implementação está intencionalmente incompleta para
permitir o aprendizado prático.
