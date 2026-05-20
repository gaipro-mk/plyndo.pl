const fs = require('fs');
let content = fs.readFileSync('src/content.js', 'utf8');

content = content.replace(/Subskrypcja/g, 'Pakiety');
content = content.replace(/subskrypcji/g, 'pakietach');
content = content.replace(/subskrypcyjnej/g, 'pakietowej');
content = content.replace(/subskrypcyjnym/g, 'pakietowym');
content = content.replace(/Subscription/g, 'Packages');
content = content.replace(/subscription/g, 'packages');

fs.writeFileSync('src/content.js', content);
