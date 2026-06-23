// esbuild.mjs — build / dev / preview da web estática.
//
//   node esbuild.mjs build     → gera dist/ (usado pelo CI para o GitHub Pages)
//   node esbuild.mjs dev       → watch + livereload (recarrega ao editar a engine)
//   node esbuild.mjs preview   → build único + serve local (sem watch)
//
// Substitui o antigo express + chokidar + nodemon + SSE.
import esbuild from 'esbuild';
import { cp, rm, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');
const outDir = path.join(__dirname, 'dist');
const mode = process.argv[2] || 'build';
const PORT = Number(process.env.PORT) || 3000;

const STATIC_FILES = ['index.html', 'admin.html', 'docs.html', 'style.css', 'config.json'];

const buildOptions = {
  entryPoints: [
    path.join(srcDir, 'app.js'),
    path.join(srcDir, 'admin.js'),
    path.join(srcDir, 'docs.js'),
  ],
  bundle: true,
  format: 'iife',
  outdir: outDir,
  logLevel: 'info',
  // No modo dev, injeta o livereload do esbuild: ao reconstruir (ex.: aluno
  // editou packages/engine), o navegador recarrega sozinho.
  banner:
    mode === 'dev'
      ? { js: "new EventSource('/esbuild').addEventListener('change', () => location.reload());" }
      : {},
};

async function clean() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
}

async function copyStatic() {
  for (const file of STATIC_FILES) {
    await cp(path.join(srcDir, file), path.join(outDir, file));
  }
  await cp(path.join(srcDir, 'assets'), path.join(outDir, 'assets'), { recursive: true });
}

await clean();

if (mode === 'build') {
  await esbuild.build(buildOptions);
  await copyStatic();
  console.log('Build pronto → apps/web/dist/');
} else if (mode === 'dev' || mode === 'preview') {
  const ctx = await esbuild.context(buildOptions);
  if (mode === 'dev') {
    await ctx.watch();
  } else {
    await ctx.rebuild();
  }
  await copyStatic();
  await ctx.serve({ servedir: outDir, port: PORT });
  console.log(`\n  Forca web em  http://localhost:${PORT}\n`);
  if (mode === 'preview') console.log('  (preview: sem hot-reload; use "npm run web:dev" para watch)\n');
}
