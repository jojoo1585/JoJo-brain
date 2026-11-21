import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const required = [
  'index.html','styles.css','config.js','graph-data.js','neural-engine.js','app.js',
  'manifest.webmanifest','service-worker.js','offline.html','VERSION','README.md','SECURITY.md','PUBLISHING.md',
  'ARCHITECTURE.md','ENGINE.md','ROADMAP.md','TESTING.md','VERSION_HISTORY.md','CONVERSATION_LOG.md',
  'CHANGELOG.md','CHANGELOG-V0.3.0.md','CHANGELOG-V0.3.0.1.md','CHANGELOG-V0.4.0.md',
  'TEST_REPORT-V0.3.0.md','TEST_REPORT-V0.3.0.1.md','TEST_REPORT-V0.4.0.md',
  'assets/icons/favicon.svg','assets/icons/icon-192.png','assets/icons/icon-512.png',
  'assets/icons/maskable-192.png','assets/icons/maskable-512.png','assets/icons/apple-touch-icon.png'
];
required.forEach((file) => assert(exists(file), `Ontbrekend bestand: ${file}`));

const version = read('VERSION').trim();
assert(version === '0.4.0', 'VERSION moet 0.4.0 zijn');
const pkg = JSON.parse(read('package.json'));
assert(pkg.version === version, 'package.json-versie wijkt af');

const html = read('index.html');
assert(html.includes('lang="nl"'), 'HTML-taal ontbreekt');
assert(html.includes('viewport-fit=cover'), 'Safe-area viewport ontbreekt');
['space-canvas','graph-viewport','node-layer','info-drawer'].forEach((id) => assert(html.includes(`id="${id}"`), `App-shell mist ${id}`));
assert(html.includes('class="mobile-dock"'), 'Mobiele dock ontbreekt');
assert(html.includes('class="signal-legend"'), 'Sport & Health-signaalleger ontbreekt');
['config.js','graph-data.js','neural-engine.js','app.js'].forEach((asset) => assert(html.includes(`src="${asset}?v=${version}"`), `Versioned script ontbreekt in index: ${asset}`));
assert(html.includes(`styles.css?v=${version}`), 'Versioned stylesheet ontbreekt');
assert(html.includes('__JOJO_SYNC_VIEWPORT__'), 'Visual-viewportbootstrap ontbreekt');
assert(html.includes('class="info-drawer is-collapsed"'), 'Drawer moet statisch verborgen starten');
const ids = (html.match(/id="[^"]+"/g) || []).map((item) => item.slice(4,-1));
assert(ids.length === new Set(ids).size, 'Dubbele HTML-id gevonden');

const manifest = JSON.parse(read('manifest.webmanifest'));
assert(manifest.display === 'standalone', 'PWA display moet standalone zijn');
assert(manifest.start_url === './' && manifest.scope === './', 'Relatieve start_url/scope verwacht');
assert(manifest.description.includes('V0.4.0'), 'V0.4 manifestbeschrijving ontbreekt');
manifest.icons.forEach((icon) => assert(exists(icon.src.split('?')[0]), `Manifesticoon ontbreekt: ${icon.src}`));
assert(manifest.icons.every((icon) => icon.src.includes(`?v=${version}`)), 'Manifesticonen moeten release-versioned zijn');
assert(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose === 'maskable'), '512 maskable icon ontbreekt');
assert(manifest.shortcuts.length === 3, 'Drie PWA shortcuts verwacht');

const configSandbox = { window: {} };
vm.runInNewContext(read('config.js'), configSandbox, { filename: 'config.js' });
assert(configSandbox.window.JOJO_CONFIG.version === version, 'Configversie wijkt af');
['runnix','synology','dsm','grafana','influxdb','containers'].forEach((key) => assert(configSandbox.window.JOJO_CONFIG.links[key] === '', `Lokale URL ${key} moet leeg blijven`));

const graphSandbox = { window: {}, Object };
vm.runInNewContext(read('graph-data.js'), graphSandbox, { filename: 'graph-data.js' });
const graph = graphSandbox.window.JOJO_GRAPH;
assert(graph?.jojo?.children?.join(',') === 'sport-health,home,development', 'JoJo-hoofdtakken wijken af');
assert(graph['sport-health']?.children?.join(',') === 'runnix,garmin,strava,health', 'Sport & Health-hoofdnodes wijken af');
assert(graph.runnix?.children?.join(',') === 'today,planning,execution,progress', 'Runnix moet exact vier routes hebben');
assert(graph.garmin?.children?.join(',') === 'garmin-signals,garmin-devices', 'Garmin mag geen Runnix-overlap bevatten');
assert(!Object.hasOwn(graph, 'garmin-training'), 'Garmin Training mag niet terugkeren');
assert(graph.strava?.children?.join(',') === 'strava-activities,strava-trends,strava-volume', 'Strava-focus wijkt af');
assert(!Object.hasOwn(graph, 'strava-segments'), 'Segments mag geen prominente node zijn');
assert(graph.health?.children?.join(',') === 'sleep,hrv,resting-hr,weight,recovery', 'Health-aggregator is onvolledig');
assert(graph['sport-health']?.connections?.length === 3, 'Drie betekenisvolle Sport & Health-datalijnen verwacht');
assert(graph.runnix?.connections?.length === 3, 'Runnix closed-loopverbindingen ontbreken');
Object.values(graph).forEach((node) => {
  if (node.parent) assert(Boolean(graph[node.parent]), `Onbekende parent voor ${node.id}`);
  (node.children || []).forEach((child) => assert(Boolean(graph[child]), `Onbekend child ${child} van ${node.id}`));
  (node.connections || []).forEach((connection) => {
    assert(Boolean(graph[connection.from]), `Onbekende verbinding van ${connection.from}`);
    assert(Boolean(graph[connection.to]), `Onbekende verbinding naar ${connection.to}`);
  });
});

const engine = read('neural-engine.js');
['startDrag','dragTo','endDrag','physics','particles','prefers-reduced-motion',"? 'child' : 'context'",'semantic: true'].forEach((term) => assert(engine.includes(term), `Engine-capability ontbreekt: ${term}`));
assert(engine.includes('this.mobile ? 32 : 62'), 'Adaptief particle-budget ontbreekt');
assert(engine.includes('1.25 : 1.6'), 'DPR-cap ontbreekt');
assert(engine.includes("blue: [76, 151, 255]"), 'Garmin-blauw ontbreekt');

const styles = read('styles.css');
['accent-blue','signal-legend','data-node-id="sport-health"','role-context','size-metric'].forEach((term) => assert(styles.includes(term), `V0.4-stijl ontbreekt: ${term}`));

const sw = read('service-worker.js');
assert(sw.includes("const RELEASE = '0.4.0'"), 'Service-workercacheversie klopt niet');
['graph-data.js','neural-engine.js','app.js','styles.css','offline.html'].forEach((asset) => assert(sw.includes(`./${asset}`), `App-shell mist ${asset}`));
assert(sw.includes("cache: 'no-store'"), 'Navigatie moet HTTP-cache omzeilen');
assert(sw.includes("url.searchParams.get('v') === RELEASE"), 'Versioned assetcache ontbreekt');
assert(engine.includes("typeof window.ResizeObserver === 'function'"), 'ResizeObserver compatibility fallback ontbreekt');
assert(!engine.includes('CSS.escape('), 'CSS.escape runtime dependency mag niet terugkeren');

const allText = required.filter((file) => exists(file) && !file.endsWith('.png')).map(read).join('\n');
assert(!/(password|api[_ -]?key|secret|token)\s*[:=]\s*['"][^'"]{3,}/i.test(allText), 'Mogelijk geheim gevonden');
assert(!/https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(allText), 'Privé-IP-adres gevonden');

const architecture = read('ARCHITECTURE.md');
assert(architecture.includes('V0.4.0') && architecture.includes('Health-aggregator'), 'Architectuurdocument niet bijgewerkt voor V0.4');
['ROADMAP.md','TESTING.md','VERSION_HISTORY.md','CONVERSATION_LOG.md','CHANGELOG-V0.4.0.md','TEST_REPORT-V0.4.0.md'].forEach((file) => assert(read(file).includes('V0.4.0'), `${file} mist V0.4.0`));

if (errors.length) {
  console.error(`Validatie mislukt (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`JoJo Brain V${version} validatie geslaagd.`);
console.log(`${required.length} kern- en documentatiebestanden, ${Object.keys(graph).length} nodes, ${graph['sport-health'].connections.length + graph.runnix.connections.length} semantische datalijnen en ${manifest.icons.length} manifesticonen gecontroleerd.`);
