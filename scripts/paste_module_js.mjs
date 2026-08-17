/**
 * @file paste_module_js.mjs
 * @description Kopiuje kod plyndo-storefront.js do schowka systemowego (pbcopy) i wkleja go do edytora CodeMirror w panelu Shoper przez AppleScript.
 * @requirements macOS, pbcopy, Google Chrome z otwartym edytorem modułu Shoper.
 * @usage node scripts/paste_module_js.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

const jsContent = fs.readFileSync('shoper-theme/custom-js/plyndo-storefront.js', 'utf-8');

// Copy jsContent to clipboard
execSync('pbcopy', { input: jsContent });
console.log('Copied jsContent to clipboard (' + jsContent.length + ' bytes)');

// AppleScript to focus 2nd CodeMirror editor (JS), Select All, Paste, and Click Save
const osaScript = `
tell application "Google Chrome"
  activate
  tell active tab of front window
    execute javascript "(() => {
      const editors = document.querySelectorAll('.cm-content');
      if (editors.length >= 2) {
        editors[1].focus();
        return 'FOCUSED_JS_EDITOR';
      }
      return 'NO_JS_EDITOR';
    })()"
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
    execute javascript "const btn = document.querySelector('button[name=save], input[name=save]'); if (btn) btn.click();"
  end tell
end tell
`;

fs.writeFileSync('/tmp/paste_module_js.applescript', osaScript);
execSync('osascript /tmp/paste_module_js.applescript');
console.log('Pasted JS and clicked Save on Module 226');
