/**
 * @file save_myintegrations.mjs
 * @description Zapisuje kod plyndo-storefront.js w sekcji Integracje Własne (/admin/myintegrations) panelu Shoper przez AppleScript w Google Chrome.
 * @requirements macOS, pbcopy, Google Chrome z aktywną sesją admina Shopera.
 * @usage node scripts/save_myintegrations.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

const jsContent = fs.readFileSync('shoper-theme/custom-js/plyndo-storefront.js', 'utf-8');
const wrapped = `<script>\n${jsContent}\n</script>`;

// 1. Copy to clipboard
execSync('pbcopy', { input: wrapped });
console.log('Copied wrapped JS (' + wrapped.length + ' bytes) to clipboard');

// 2. Navigate to myintegrations
const navScript = `
tell application "Google Chrome"
  set URL of active tab of front window to "https://sklep562393.shoparena.pl/admin/myintegrations"
end tell
`;
fs.writeFileSync('/tmp/step1_nav.applescript', navScript);
execSync('osascript /tmp/step1_nav.applescript');
console.log('Navigated to myintegrations');

// 3. Wait 3 seconds for page and CodeMirror to load
await new Promise(r => setTimeout(r, 3000));

// 4. Focus editor 2, Select All, Paste, and Click Save
const pasteAndSaveScript = `
tell application "Google Chrome"
  activate
  tell active tab of front window
    execute javascript "document.querySelector('#editor-target-text2 .cm-content').focus();"
  end tell
end tell
delay 0.5
tell application "System Events"
  keystroke "a" using command down
  delay 0.3
  keystroke "v" using command down
  delay 1.0
end tell
tell application "Google Chrome"
  tell active tab of front window
    execute javascript "const btn = document.querySelector('button[type=submit], input[type=submit]'); if (btn) btn.click();"
  end tell
end tell
`;

fs.writeFileSync('/tmp/step2_paste_save.applescript', pasteAndSaveScript);
execSync('osascript /tmp/step2_paste_save.applescript');
console.log('Pasted and clicked Save');

// 5. Wait 3 seconds for save request to complete
await new Promise(r => setTimeout(r, 3000));

// 6. Check status
const checkScript = `
tell application "Google Chrome"
  tell active tab of front window
    set res to execute javascript "JSON.stringify({ url: window.location.href, title: document.title })"
    return res
  end tell
end tell
`;
fs.writeFileSync('/tmp/step3_check.applescript', checkScript);
const checkOutput = execSync('osascript /tmp/step3_check.applescript').toString();
console.log('Check Output:', checkOutput.trim());
