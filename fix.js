const fs = require('fs');
const p = 'C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/admin.html';
let c = fs.readFileSync(p, 'utf8');

// 修复 renderTabs 中的 setFolder 引号问题
// 在单引号字符串中，setFolder('all') 的 ' 会结束字符串
// 改为 setFolder(\'all\')，在单引号字符串中变成 setFolder('all')

// 先找实际内容
const lines = c.split('\n');
let changed = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("setFolder('all')")) {
    lines[i] = lines[i].replace(/setFolder\('all'\)/g, "setFolder(\\'all\\')");
    changed = true;
    console.log('Fixed line', i+1, ': setFolder all');
  }
  if (lines[i].includes("setFolder('"+escJs")) {
    lines[i] = lines[i].replace(/setFolder\('"\+escJs\(folders\[i\]\)\+"'\)/g, "setFolder(\\'\"+escJs(folders[i])+\"\\')");
    changed = true;
    console.log('Fixed line', i+1, ': setFolder dynamic');
  }
}

if (changed) {
  fs.writeFileSync(p, lines.join('\n'), 'utf8');
  console.log('File saved!');
} else {
  console.log('No changes needed');
}
