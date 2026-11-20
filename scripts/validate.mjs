import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '..');
const errors = [];
const assert = (value, message) => { if (!value) errors.push(message); };
for (const file of ['index.html', 'styles.css', 'app.js', 'config.js']) assert(fs.existsSync(path.join(root, file)), `${file} ontbreekt`);

const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const id of ['runnix','garmin','strava','tcx','github','releases','docs','synology','grafana','containers','influx']) {
  assert(html.includes(`data-node="${id}"`), `node ${id} ontbreekt`);
}
assert(!/data-domain="work"|Microsoft 365|Business Central/i.test(html), 'Work-domein mag niet in V1 staan');

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'config.js'), 'utf8'), sandbox);
const config = sandbox.window.JOJO_BRAIN_CONFIG;
assert(config?.links, 'config.js levert geen links op');
for (const id of ['runnix','garmin','strava','tcx','github','releases','docs','synology','grafana','containers','influx']) assert(config?.links?.[id], `config voor ${id} ontbreekt`);

const serialized = JSON.stringify(config || {});
assert(!/(password|passwd|client_secret|access_token|bearer\s)/i.test(serialized), 'config bevat mogelijk een secret');

if (errors.length) {
  console.error(`JoJo Brain-validatie mislukt (${errors.length}):`);
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}
console.log('JoJo Brain V1: structuur, domeinen en veilige configuratie zijn geldig.');
