/**
 * @file inject_custom_js_chrome.mjs
 * @description Wstrzykuje skrypt custom-js do pola tekstowego w panelu integracji Shoper przez Google Chrome.
 * @requirements macOS, Google Chrome z otwartą sesją admina Shopera.
 * @usage node scripts/inject_custom_js_chrome.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

const jsContent = fs.readFileSync('shoper-theme/custom-js/plyndo-storefront.js', 'utf-8');
const wrapped = `<script>\n${jsContent}\n</script>`;

// Write osascript script
const osaScript = `
tell application "Google Chrome"
  set jsCode to "(() => {
    const ta = document.querySelector('#text2');
    if (ta) {
      ta.value = " & quoted form of ${JSON.stringify(wrapped)} & ";
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      ta.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const btn = document.querySelector('button[type=submit], input[type=submit]');
    if (btn) {
      btn.click();
      return 'SAVED';
    }
    return 'NO_BTN';
  })()"
  tell active tab of front window to execute javascript jsCode
end tell
`;

fs.writeFileSync('/tmp/inject_js.applescript', osaScript);
const output = execSync('osascript /tmp/inject_js.applescript').toString();
console.log('Result:', output.trim());
