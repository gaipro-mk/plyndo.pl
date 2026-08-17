/**
 * @file fill_module_form.mjs
 * @description Wypełnia formularz dodawania/edycji modułu własnego w panelu Shoper przez AppleScript w Google Chrome.
 * @requirements macOS, Google Chrome z otwartą kartą formularza modułu Shoper.
 * @usage node scripts/fill_module_form.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

const jsContent = fs.readFileSync('shoper-theme/custom-js/plyndo-storefront.js', 'utf-8');

// Write JS code to evaluate in Chrome
const jsCode = `
(() => {
  const nameInput = document.querySelector("#name");
  if (nameInput) {
    nameInput.value = "PlynDo Handoff";
    nameInput.dispatchEvent(new Event("input", { bubbles: true }));
    nameInput.dispatchEvent(new Event("change", { bubbles: true }));
  }

  const integrationRadio = document.querySelector("#integration");
  if (integrationRadio) {
    integrationRadio.click();
  }

  const allRadio = document.querySelector("#integration_all");
  if (allRadio) {
    allRadio.click();
  }

  const hideCb = document.querySelector("#hide");
  if (hideCb && !hideCb.checked) {
    hideCb.click();
  }

  const twigTa = document.querySelector("#twig");
  if (twigTa) twigTa.value = "<div></div>";

  const jsTa = document.querySelector("#js");
  if (jsTa) jsTa.value = ${JSON.stringify(jsContent)};

  const configTa = document.querySelector("#config_json");
  if (configTa) configTa.value = "{}";

  const transTa = document.querySelector("#translation_json");
  if (transTa) transTa.value = "{}";

  ["twig", "js", "config_json", "translation_json"].forEach(id => {
    const el = document.querySelector("#" + id);
    if (el) {
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });

  const btn = document.querySelector("button[name=save]");
  if (btn) {
    btn.click();
    return "CLICKED_SAVE";
  }
  return "NO_SAVE_BTN";
})()
`;

// Save jsCode to a file and execute in Chrome via file
fs.writeFileSync('/tmp/module_js_code.js', jsCode);

const osaScript = `
set jsText to read POSIX file "/tmp/module_js_code.js" as «class utf8»
tell application "Google Chrome"
  tell active tab of front window
    set res to execute javascript jsText
    return res
  end tell
end tell
`;

fs.writeFileSync('/tmp/run_fill_module.applescript', osaScript);
const output = execSync('osascript /tmp/run_fill_module.applescript').toString();
console.log('Fill & Save Result:', output.trim());
