/**
 * @file create_custom_module_shoper.mjs
 * @description Tworzy moduł własny w szablonie graficznym Shoper (SVE skin ID 12) przez XHR w aktywnej karcie Google Chrome.
 * @requirements macOS, Google Chrome z otwartą sesją admina Shopera.
 * @usage node scripts/create_custom_module_shoper.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

const jsContent = fs.readFileSync('shoper-theme/custom-js/plyndo-storefront.js', 'utf-8');

const postScript = `
(() => {
  window.__MODULE_CREATE_RESULT = "IN_PROGRESS";

  const fd = new FormData();
  fd.append("name", "PlynDo Handoff");
  fd.append("type", "2"); // Integration module
  fd.append("integration_context", "0"); // All pages
  fd.append("integration_hide", "1"); // Locked in SVE
  fd.append("twig", "");
  fd.append("js", ${JSON.stringify(jsContent)});
  fd.append("config_json", "{}");
  fd.append("translation_json", "{}");
  fd.append("save", "1");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/admin/configSkins/skin-add-module/id/12", true);
  xhr.onload = function() {
    window.__MODULE_CREATE_RESULT = JSON.stringify({
      status: xhr.status,
      responseURL: xhr.responseURL,
      responseTextLength: xhr.responseText.length
    });
  };
  xhr.onerror = function() {
    window.__MODULE_CREATE_RESULT = "XHR_ERROR";
  };
  xhr.send(fd);

  return "SENT";
})()
`;

fs.writeFileSync('/tmp/create_module.applescript', `
tell application "Google Chrome"
  tell active tab of front window
    execute javascript "${postScript.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"
  end tell
end tell
`);

execSync('osascript /tmp/create_module.applescript');
console.log('Creation XHR sent. Waiting 3s...');

await new Promise(r => setTimeout(r, 3000));

const checkScript = `
tell application "Google Chrome"
  tell active tab of front window
    set res to execute javascript "window.__MODULE_CREATE_RESULT"
    return res
  end tell
end tell
`;
fs.writeFileSync('/tmp/check_create.applescript', checkScript);
const checkRes = execSync('osascript /tmp/check_create.applescript').toString();
console.log('Result:', checkRes.trim());
