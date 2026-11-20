import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const required = [
  'index.html', 'styles.css', 'config.js', 'app.js', 'manifest.webmanifest',
  'service-worker.js', 'offline.html', 'assets/icons/favicon.svg',
  'assets/icons/icon-192.png', 'assets/icons/icon-512.png',
  'assets/icons/maskable-192.png', 'assets/icons/maskable-512.png',
  'assets/icons/apple-touch-icon.png'
];
required.forEach((file) => assert(exists(file), `Ontbrekend bestand: ${file}`));

const html = read('index.html');
assert(html.includes('lang="nl"'), 'HTML-taal ontbreekt');
assert(html.includes('manifest.webmanifest'), 'Manifest-link ontbreekt');
assert(html.includes('viewport-fit=cover'), 'Mobiele safe-area viewport ontbreekt');
assert((html.match(/id="[^"]+"/g) || []).length === new Set((html.match(/id="[^"]+"/g) || []).map((id) => id.slice(4,-1))).size, 'Dubbele HTML-id gevonden');

const manifest = JSON.parse(read('manifest.webmanifest'));
assert(manifest.display === 'standalone', 'PWA display moet standalone zijn');
assert(manifest.start_url === './' && manifest.scope === './', 'Relatieve start_url/scope verwacht');
assert(manifest.icons.some((icon) => icon.sizes === '192x192' && icon.purpose === 'any'), '192x192 app-icoon ontbreekt');
assert(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose === 'maskable'), '512x512 maskable icoon ontbreekt');
manifest.icons.forEach((icon) => assert(exists(icon.src), `Manifest verwijst naar ontbrekend icoon: ${icon.src}`));

const sw = read('service-worker.js');
assert(sw.includes("jojo-brain-v0.2.0"), 'Service-worker cacheversie klopt niet');
required.filter((file) => !file.endsWith('favicon.svg')).forEach((file) => {
  if (['service-worker.js'].includes(file)) return;
  assert(sw.includes(`./${file}`) || file === 'manifest.webmanifest', `App-shell mist ${file}`);
});

const configSource = read('config.js');
const sandbox = { window: {} };
vm.runInNewContext(configSource, sandbox, { filename: 'config.js' });
assert(sandbox.window.JOJO_CONFIG.version === '0.2.0', 'Configversie klopt niet');
const localKeys = ['runnix','synology','dsm','grafana','influxdb','containers'];
localKeys.forEach((key) => assert(sandbox.window.JOJO_CONFIG.links[key] === '', `Lokale URL ${key} moet leeg blijven`));
assert(!/(token|password|secret)\s*[:=]\s*['"][^'"]+/i.test(configSource), 'Mogelijk geheim gevonden in config.js');

const app = read('app.js');
['sport-health','runnix','garmin','strava','health','home','synology','monitoring','services','development','github'].forEach((id) => assert(app.includes(`id: '${id}'`) || app.includes(`'${id}':`), `Navigatienode ontbreekt: ${id}`));
assert(app.includes('beforeinstallprompt'), 'Installatieprompt ontbreekt');
assert(app.includes('serviceWorker.register'), 'Service-workerregistratie ontbreekt');

if (errors.length) {
  console.error(`Validatie mislukt (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`JoJo Brain v${manifest.short_name === 'JoJo' ? '0.2.0' : '?'} validatie geslaagd.`);
console.log(`${required.length} kernbestanden, ${manifest.icons.length} manifest-iconen en ${manifest.shortcuts.length} snelkoppelingen gecontroleerd.`);
