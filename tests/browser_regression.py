from pathlib import Path
import os
import subprocess
import time
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
REPORTS = ROOT / "tests" / "reports"
REPORTS.mkdir(parents=True, exist_ok=True)
PORT = 8091
CHROME = os.environ.get("JOJO_CHROMIUM_PATH")
EXTERNAL_BASE = os.environ.get("JOJO_TEST_BASE_URL", "").rstrip("/")

GESTURE_JS = """(element, [pointerType, distance]) => {
  element.setPointerCapture = () => {};
  element.releasePointerCapture = () => {};
  const init = { bubbles: true, cancelable: true, button: 0, pointerId: pointerType === 'touch' ? 41 : 21, pointerType, clientX: 220, clientY: 220 };
  element.dispatchEvent(new PointerEvent('pointerdown', init));
  element.dispatchEvent(new PointerEvent('pointermove', { ...init, clientX: 220 + distance }));
  element.dispatchEvent(new PointerEvent('pointerup', { ...init, clientX: 220 + distance }));
}"""

server = None if EXTERNAL_BASE else subprocess.Popen(
    ["python3", "-m", "http.server", str(PORT), "--bind", "127.0.0.1"],
    cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
)
base_url = EXTERNAL_BASE or f"http://127.0.0.1:{PORT}"
try:
    time.sleep(0.5)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path=CHROME)
        scenarios = [
            ("desktop-mouse", "mouse", {"width": 1440, "height": 900}, False),
            ("mobile-touch", "touch", {"width": 390, "height": 844}, True),
        ]
        for name, pointer_type, viewport, mobile in scenarios:
            scenario_context = browser.new_context(viewport=viewport, is_mobile=mobile, has_touch=mobile, service_workers="block")
            page = scenario_context.new_page()
            errors = []
            page.on("pageerror", lambda error: errors.append(str(error)))
            page.goto(f"{base_url}/#sport-health", wait_until="networkidle")
            page.wait_for_selector("html.app-ready")
            assert page.locator('.neural-node').count() == 6, f"{name}: Sport & Health-subgraph is onvolledig"
            assert page.locator('.version').inner_text() == 'V0.4.0.2', f"{name}: releaseversie wijkt af"
            assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://jojo1585.github.io/jojo-brain/'

            theme = page.evaluate("""() => {
              const style = getComputedStyle(document.documentElement);
              const preview = getComputedStyle(document.querySelector('#runnix-preview'));
              return {
                bg: style.getPropertyValue('--bg').trim(), magenta: style.getPropertyValue('--magenta').trim(),
                violet: style.getPropertyValue('--violet').trim(), blue: style.getPropertyValue('--blue').trim(),
                cyan: style.getPropertyValue('--cyan').trim(), previewDisplay: preview.display,
                previewStatus: document.querySelector('#runnix-preview-status').textContent.trim()
              };
            }""")
            assert theme["bg"] == "#07080d", f"{name}: dark navy foundation wijkt af"
            assert (theme["magenta"], theme["violet"], theme["blue"]) == ("#f43fa6", "#8b5cf6", "#3b82f6")
            assert theme["cyan"] == "#2dd4bf"
            assert theme["previewDisplay"] != "none" and theme["previewStatus"] == "LOCAL-ONLY"
            page.screenshot(path=str(REPORTS / f"V0.4.0.2-{name}.png"), full_page=True)

            page.locator('[data-node-id="runnix"]').evaluate(GESTURE_JS, [pointer_type, 24])
            page.wait_for_timeout(150)
            assert page.url.endswith("#sport-health"), f"{name}: drag wijzigde focus"
            assert not page.locator("#info-drawer").evaluate("element => element.classList.contains('is-open')"), f"{name}: drag opende detailpaneel"

            page.locator('[data-node-id="runnix"]').evaluate(GESTURE_JS, [pointer_type, 2])
            page.wait_for_timeout(150)
            assert page.url.endswith("#runnix"), f"{name}: genuine tap focuste Runnix niet"
            assert not errors, f"{name}: browserfouten: {'; '.join(errors)}"
            scenario_context.close()

        pwa = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, service_workers="allow")
        page = pwa.new_page()
        page.goto(f"{base_url}/#sport-health", wait_until="networkidle")
        page.wait_for_selector("html.app-ready")
        page.reload(wait_until="networkidle")
        page.wait_for_selector("html.app-ready")
        assert page.evaluate("Boolean(navigator.serviceWorker.controller)"), "PWA: service worker beheert de client niet"
        cache_keys = page.evaluate("caches.keys()")
        assert 'jojo-brain-v0.4.0.2' in cache_keys, "PWA: V0.4.0.2-cache ontbreekt"
        pwa.set_offline(True)
        page.reload(wait_until="domcontentloaded")
        page.wait_for_selector("html.app-ready")
        assert page.locator('.version').inner_text() == 'V0.4.0.2', "PWA: offline shell gebruikt niet de nieuwe release"
        pwa.close()
        browser.close()
    print("Browser- en visual-regressie mouse/touch geslaagd.")
finally:
    if server:
        server.terminate()
        server.wait(timeout=5)
