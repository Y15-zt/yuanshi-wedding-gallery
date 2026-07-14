const fs = require('fs');
const p = 'C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/admin.html';
let lines = fs.readFileSync(p, 'utf8').split('\n');
let changed = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].indexOf("setFolder('all')") >= 0) {
    lines[i] = lines[i].replace(/setFolder\('all'\)/g, "setFolder(\\'all\\')");
    changed = true;
    console.log('Fixed line', i+1);
  }
  if (lines[i].indexOf("setFolder('") >= 0 && lines[i].indexOf("escJs") >= 0) {
    lines[i] = lines[i].replace(/setFolder\('"\+escJs\(folders\[i\]\)\+"'\)/g, "setFolder(\\'\"+escJs(folders[i])+\"\\')");
    changed = true;
    console.log('Fixed line', i+1, 'dynamic');
  }
}
if (changed) {
  fs.writeFileSync(p, lines.join('\n'), 'utf8');
  console.log('Saved!');
} else {
  console.log('No changes');
}
