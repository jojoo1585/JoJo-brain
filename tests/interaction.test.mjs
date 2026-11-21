import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pointer = require('../pointer-gesture.js');

global.location = {
  protocol: 'https:',
  origin: 'https://jojo1585.github.io',
  href: 'https://jojo1585.github.io/jojo-brain/'
};
const runnix = require('../runnix-adapter.js');

for (const pointerType of ['mouse', 'touch']) {
  const tap = pointer.begin({ pointerId: 1, pointerType, clientX: 100, clientY: 100 });
  pointer.move(tap, 104, 104);
  assert.equal(pointer.finish(tap, 104, 104).kind, 'tap', `${pointerType}: beweging onder 6 px moet tap blijven`);

  const drag = pointer.begin({ pointerId: 2, pointerType, clientX: 100, clientY: 100 });
  pointer.move(drag, 106, 100);
  pointer.move(drag, 101, 100);
  assert.equal(pointer.finish(drag, 101, 100).kind, 'drag', `${pointerType}: drag moet gelatcht blijven na terugbewegen`);

  const cancelled = pointer.begin({ pointerId: 3, pointerType, clientX: 0, clientY: 0 });
  pointer.cancel(cancelled);
  assert.equal(pointer.finish(cancelled, 0, 0).kind, 'cancel', `${pointerType}: pointercancel mag nooit activeren`);
}

assert.equal(pointer.DEFAULT_THRESHOLD, 6, 'Pointerdrempel moet 6 px zijn');
assert.equal(runnix.safeEndpoint(''), null, 'Lege publieke endpoint moet local-only blijven');
assert.equal(runnix.safeEndpoint('https://jojo1585.github.io/api/runnix').origin, global.location.origin, 'Same-origin bridge moet toegestaan zijn');
assert.equal(runnix.safeEndpoint('https://example.com/api/runnix'), null, 'Cross-origin bridge mag niet worden aangeroepen');
assert.equal(runnix.safeEndpoint('http://private-host.invalid/api/runnix'), null, 'Private cross-origin host mag niet worden aangeroepen');

const preview = runnix.sanitizePreview({
  today: { title: 'Easy run', type: 'easy', durationMinutes: 40, hrv: 62 },
  lastExecution: { label: 'Binnen plan', status: 'complete', heartRate: 150 },
  progress: { label: '3 van 4', completedSessions: 3 },
  sleep: 8, weight: 70
});
assert.deepEqual(Object.keys(preview), ['today', 'lastExecution', 'progress'], 'Adapter mag alleen Runnix-trainingscontext tonen');
assert.equal('hrv' in preview.today, false, 'Garmin-specifieke healthwaarden mogen niet doorlekken');

const adapter = runnix.createRunnixAdapter({ previewEndpoint: '' });
assert.equal(adapter.getState().status, 'disconnected');
assert.equal(adapter.getState().mode, 'local-only');
assert.equal((await adapter.refresh()).preview, null, 'Local-only state mag geen gefabriceerde preview bevatten');

console.log('Pointer mouse/touch en veilige Runnix-adapter regressietests geslaagd.');
