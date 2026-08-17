/**
 * @file fix_all_coupons.mjs
 * @description Automatycznie konfiguruje kupony rabatowe PLYNDO-PACK-4/8/12 w panelu Shoper przez AppleScript w Google Chrome.
 * @requirements macOS, Google Chrome z otwartą sesją admina Shopera.
 * @usage node scripts/fix_all_coupons.mjs
 */

import fs from 'fs';
import { execSync } from 'child_process';

async function fixCoupon(id) {
  console.log(`Fixing coupon ${id}...`);
  // Navigate
  execSync(`osascript -e 'tell application "Google Chrome" to set URL of active tab of front window to "https://sklep562393.shoparena.pl/admin/promoCodes/edit/id/${id}"'`);
  await new Promise(r => setTimeout(r, 2000));

  const fixScript = `
  (() => {
    // 1. Ensure active is checked
    const active = document.querySelector("#active");
    if (active && !active.checked) active.click();

    // 2. Select global_1 (rabat na całe zamówienie)
    const g1 = document.querySelector("#global_1");
    if (g1) g1.click();

    // 3. Ensure time_limit is unchecked
    const tl = document.querySelector("#time_limit");
    if (tl && tl.checked) tl.click();

    // 4. Ensure value_limit is unchecked
    const vl = document.querySelector("#value_limit");
    if (vl && vl.checked) vl.click();

    // 5. Ensure products_limit is unchecked
    const pl = document.querySelector("#products_limit");
    if (pl && pl.checked) pl.click();

    // 6. Ensure coupons_limit is unchecked
    const cl = document.querySelector("#coupons_limit");
    if (cl && cl.checked) cl.click();

    // 7. Save
    const btn = document.querySelector("button[name=save]");
    if (btn) {
      btn.click();
      return "SAVED";
    }
    return "NO_BTN";
  })()
  `;

  fs.writeFileSync('/tmp/fix_coupon.js', fixScript);
  const osa = `
  set jsText to read POSIX file "/tmp/fix_coupon.js" as «class utf8»
  tell application "Google Chrome"
    tell active tab of front window
      set res to execute javascript jsText
      return res
    end tell
  end tell
  `;
  fs.writeFileSync('/tmp/fix_coupon.applescript', osa);
  const res = execSync('osascript /tmp/fix_coupon.applescript').toString();
  console.log(`Coupon ${id} result:`, res.trim());
  await new Promise(r => setTimeout(r, 2000));
}

for (const id of [7, 5, 6]) {
  await fixCoupon(id);
}
console.log('All coupons updated!');
