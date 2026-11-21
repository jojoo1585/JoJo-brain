import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const required = [
  'index.html','404.html','styles.css','config.js','graph-data.js','pointer-gesture.js','runnix-adapter.js','neural-engine.js','app.js',
  'manifest.webmanifest','service-worker.js','offline.html','VERSION','README.md','SECURITY.md','PUBLISHING.md','package.json',
  'ARCHITECTURE.md','ENGINE.md','ROADMAP.md','TESTING.md','VERSION_HISTORY.md','CONVERSATION_LOG.md',
  'CHANGELOG.md','CHANGELOG-V0.3.0.md','CHANGELOG-V0.3.0.1.md','CHANGELOG-V0.4.0.md','CHANGELOG-V0.4.0.1.md','CHANGELOG-V0.4.0.2.md',
  'TEST_REPORT-V0.3.0.md','TEST_REPORT-V0.3.0.1.md','TEST_REPORT-V0.4.0.md','TEST_REPORT-V0.4.0.1.md','TEST_REPORT-V0.4.0.2.md',
  'tests/interaction.test.mjs','tests/browser_regression.py',
  '.github/workflows/deploy-pages.yml','.github/workflows/validate.yml',
  'assets/icons/favicon.svg','assets/icons/icon-192.png','assets/icons/icon-512.png',
  'assets/icons/maskable-192.png','assets/icons/maskable-512.png','assets/icons/apple-touch-icon.png'
];
required.forEach((file) => assert(exists(file), `Ontbrekend bestand: ${file}`));

const version = read('VERSION').trim();
assert(version === '0.4.0.2', 'VERSION moet 0.4.0.2 zijn');
const pkg = JSON.parse(read('package.json'));
assert(pkg.version === version, 'package.json-versie wijkt af');
assert(pkg.scripts.test.includes('interaction.test.mjs'), 'Pointer/adapter regressietests ontbreken in npm test');
assert(pkg.scripts['test:browser']?.includes('browser_regression.py'), 'Browserregressiescript ontbreekt');

const html = read('index.html');
assert(html.includes('lang="nl"'), 'HTML-taal ontbreekt');
assert(html.includes('viewport-fit=cover'), 'Safe-area viewport ontbreekt');
['space-canvas','graph-viewport','node-layer','info-drawer','runnix-preview'].forEach((id) => assert(html.includes(`id="${id}"`), `App-shell mist ${id}`));
assert(html.includes('class="mobile-dock"'), 'Mobiele dock ontbreekt');
assert(html.includes('class="signal-legend"'), 'Sport & Health-signaalleger ontbreekt');
['config.js','graph-data.js','pointer-gesture.js','runnix-adapter.js','neural-engine.js','app.js'].forEach((asset) => assert(html.includes(`src="${asset}?v=${version}"`), `Versioned script ontbreekt in index: ${asset}`));
assert(html.includes(`styles.css?v=${version}`), 'Versioned stylesheet ontbreekt');
assert(html.includes('<link rel="canonical" href="https://jojo1585.github.io/jojo-brain/">'), 'Canonical Pages-URL ontbreekt');
assert(html.includes('__JOJO_SYNC_VIEWPORT__'), 'Visual-viewportbootstrap ontbreekt');
assert(html.includes('class="info-drawer is-collapsed"'), 'Drawer moet statisch verborgen starten');
const ids = (html.match(/id="[^"]+"/g) || []).map((item) => item.slice(4,-1));
assert(ids.length === new Set(ids).size, 'Dubbele HTML-id gevonden');

const manifest = JSON.parse(read('manifest.webmanifest'));
assert(manifest.display === 'standalone', 'PWA display moet standalone zijn');
assert(manifest.start_url === './' && manifest.scope === './', 'Relatieve start_url/scope verwacht');
assert(manifest.description.includes('V0.4.0.2'), 'V0.4.0.2 manifestbeschrijving ontbreekt');
assert(manifest.background_color === '#07080d' && manifest.theme_color === '#07080d', 'PWA-kleuren moeten Runnix-family dark navy gebruiken');
manifest.icons.forEach((icon) => assert(exists(icon.src.split('?')[0]), `Manifesticoon ontbreekt: ${icon.src}`));
assert(manifest.icons.every((icon) => icon.src.includes(`?v=${version}`)), 'Manifesticonen moeten release-versioned zijn');
assert(manifest.icons.some((icon) => icon.sizes === '512x512' && icon.purpose === 'maskable'), '512 maskable icon ontbreekt');
assert(manifest.shortcuts.length === 3, 'Drie PWA shortcuts verwacht');

const configSandbox = { window: {} };
vm.runInNewContext(read('config.js'), configSandbox, { filename: 'config.js' });
assert(configSandbox.window.JOJO_CONFIG.version === version, 'Configversie wijkt af');
assert(configSandbox.window.JOJO_CONFIG.site.canonicalUrl === 'https://jojo1585.github.io/jojo-brain/', 'Canonical Pages-URL wijkt af');
assert(configSandbox.window.JOJO_CONFIG.site.basePath === '/jojo-brain/', 'Repository-basepath wijkt af');
assert(configSandbox.window.JOJO_CONFIG.sources.runnix.mode === 'local-only', 'Publieke Runnix-modus moet local-only zijn');
assert(configSandbox.window.JOJO_CONFIG.sources.runnix.previewEndpoint === '', 'Publieke Runnix-endpoint moet leeg blijven');
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
assert(graph.home?.children?.join(',') === 'synology,monitoring,services', 'Home-structuur mag niet wijzigen');
assert(graph.development?.children?.join(',') === 'github,jojo-repo,releases,docs', 'Development-structuur mag niet wijzigen');
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
assert(engine.includes("blue: [59, 130, 246]"), 'Runnix-family Garmin-blauw ontbreekt');
assert(engine.includes('this.pointerGesture.begin(event)'), 'Pointer gesture controller is niet aangesloten');
assert(engine.includes("result.kind === 'tap'"), 'Alleen genuine taps mogen activeren');
assert(!engine.includes('else this.onSelect'), 'Drag mag geen detailselectie meer uitvoeren');

const pointerGesture = read('pointer-gesture.js');
assert(pointerGesture.includes('const DEFAULT_THRESHOLD = 6'), 'Tap/drag-drempel moet 6 px zijn');
assert(pointerGesture.includes("session.maxDistance >= session.threshold"), 'Dragclassificatie moet op maximale beweging latches');
const runnixAdapter = read('runnix-adapter.js');
assert(runnixAdapter.includes("url.origin !== location.origin"), 'Runnix-adapter moet cross-origin verkeer blokkeren');
assert(runnixAdapter.includes("credentials: 'same-origin'"), 'Runnix-adapter moet same-origin credentialsbeleid gebruiken');
assert(runnixAdapter.includes("cache: 'no-store'"), 'Runnix-preview mag niet uit HTTP-cache komen');
['today','lastExecution','progress'].forEach((field) => assert(runnixAdapter.includes(field), `Runnix-contract mist ${field}`));

const styles = read('styles.css');
['accent-blue','signal-legend','data-node-id="sport-health"','role-context','size-metric'].forEach((term) => assert(styles.includes(term), `V0.4-stijl ontbreekt: ${term}`));
[
  '--bg: #07080d', '--surface-solid: #0c0f17', '--text: #f7f7fb',
  '--cyan: #2dd4bf', '--magenta: #f43fa6', '--violet: #8b5cf6', '--blue: #3b82f6',
  '--green: #35cdbb', '--orange: #fb7185'
].forEach((token) => assert(styles.includes(token), `Runnix-family thematoken ontbreekt: ${token}`));
assert(styles.includes('.neural-node[data-node-id="runnix"]::before'), 'Runnix-node mist product-family accentrail');
assert(styles.includes('.runnix-preview::before'), 'Runnix-preview mist product-family accentrail');
assert(styles.includes('linear-gradient(90deg,var(--magenta),var(--violet),var(--blue),var(--cyan))'), 'Runnix-preview mist gedeelde accentvolgorde');

const pagesWorkflow = read('.github/workflows/deploy-pages.yml');
const buildStart = pagesWorkflow.indexOf('\n  build:');
const deployStart = pagesWorkflow.indexOf('\n  deploy:');
const buildJob = buildStart >= 0 && deployStart > buildStart ? pagesWorkflow.slice(buildStart, deployStart) : '';
const deployJob = deployStart >= 0 ? pagesWorkflow.slice(deployStart) : '';
assert(buildStart >= 0 && deployStart > buildStart, 'Pages-workflow moet afzonderlijke build- en deployjobs bevatten');
assert(buildJob.includes('run: npm test'), 'Buildjob moet de static app valideren');
assert(buildJob.includes('uses: actions/configure-pages@v5'), 'Buildjob mist Configure Pages v5');
assert(buildJob.includes('uses: actions/upload-pages-artifact@v5'), 'Pages-uploader moet v5 gebruiken');
assert(buildJob.includes('name: github-pages'), 'Upload moet exact artifact github-pages produceren');
assert(buildJob.includes('Stage repository Pages site'), 'Pages-workflow moet een expliciete site-root stagen');
assert(buildJob.includes('cp index.html 404.html'), 'Pages-stage moet index en 404-shell bevatten');
assert(buildJob.includes('path: _site'), 'Pages-upload moet de gestagede repositorysite publiceren');
assert(buildJob.includes('include-hidden-files: true'), 'Verborgen sitebestanden zoals .nojekyll moeten meegaan');
assert(!buildJob.includes('actions/deploy-pages'), 'Deployment mag niet meer in de uploadjob staan');
assert(deployJob.includes('needs: build'), 'Deployjob moet wachten op volledige artifactfinalisatie in build');
assert(deployJob.includes('uses: actions/deploy-pages@v4'), 'Deployjob moet deploy-pages v4 gebruiken');
assert(deployJob.includes('artifact_name: github-pages'), 'Deployjob moet exact artifact github-pages opvragen');
assert(deployJob.includes('name: github-pages'), 'Deployjob moet environment github-pages behouden');
assert(!deployJob.includes('upload-pages-artifact'), 'Upload mag niet opnieuw in de deployjob gebeuren');
assert(buildJob.indexOf('run: npm test') < buildJob.indexOf('upload-pages-artifact@v5'), 'Validatie moet vóór artifactupload lopen');

const sw = read('service-worker.js');
assert(sw.includes("const RELEASE = '0.4.0.2'"), 'Service-workercacheversie klopt niet');
['graph-data.js','pointer-gesture.js','runnix-adapter.js','neural-engine.js','app.js','styles.css','offline.html'].forEach((asset) => assert(sw.includes(`./${asset}`), `App-shell mist ${asset}`));
assert(sw.includes("cache: 'no-store'"), 'Navigatie moet HTTP-cache omzeilen');
assert(sw.includes("url.searchParams.get('v') === RELEASE"), 'Versioned assetcache ontbreekt');
assert(engine.includes("typeof window.ResizeObserver === 'function'"), 'ResizeObserver compatibility fallback ontbreekt');
assert(!engine.includes('CSS.escape('), 'CSS.escape runtime dependency mag niet terugkeren');

const textExtensions = new Set(['.html','.css','.js','.mjs','.py','.json','.md','.yml','.yaml','.webmanifest','.txt']);
const projectTextFiles = fs.readdirSync(root, { recursive: true }).filter((file) => {
  const full = path.join(root, file);
  return fs.statSync(full).isFile() && (textExtensions.has(path.extname(file)) || ['VERSION','.nojekyll'].includes(path.basename(file)));
});
const allText = projectTextFiles.map(read).join('\n');
assert(!/(password|api[_ -]?key|secret|token)\s*[:=]\s*['"][^'"]{3,}/i.test(allText), 'Mogelijk geheim gevonden');
assert(!/https?:\/\/(192\.168\.|10\.|172\.(1[6-9]|2\d|3[01])\.)/i.test(allText), 'Privé-IP-adres gevonden');
assert(!projectTextFiles.some((file) => /\.(tcx|fit|gpx)$/i.test(file)), 'Trainingsbestand mag niet in publieke repository staan');
assert(!/previewEndpoint\s*:\s*['"]https?:/i.test(allText), 'Publieke Runnix-endpoint mag niet gecommit worden');
const notFound = read('404.html');
assert(notFound.includes('https://jojo1585.github.io/jojo-brain/'), '404-herstel mist canonical repositorypad');

const architecture = read('ARCHITECTURE.md');
assert(architecture.includes('V0.4.0.2') && architecture.includes('Runnix-adapter') && architecture.includes('GitHub Pages-publicatie'), 'Architectuurdocument niet bijgewerkt voor V0.4.0.2');
['ROADMAP.md','TESTING.md','VERSION_HISTORY.md','CONVERSATION_LOG.md','PUBLISHING.md','ENGINE.md','CHANGELOG-V0.4.0.2.md','TEST_REPORT-V0.4.0.2.md'].forEach((file) => assert(read(file).includes('V0.4.0.2'), `${file} mist V0.4.0.2`));

if (errors.length) {
  console.error(`Validatie mislukt (${errors.length}):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`JoJo Brain V${version} validatie geslaagd.`);
console.log(`${required.length} kern- en documentatiebestanden, ${Object.keys(graph).length} nodes, ${graph['sport-health'].connections.length + graph.runnix.connections.length} semantische datalijnen en ${manifest.icons.length} manifesticonen gecontroleerd.`);
