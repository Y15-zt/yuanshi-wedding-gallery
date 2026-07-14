const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/admin.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('no script'); process.exit(1); }
const js = m[1];
console.log('JS length:', js.length);
try {
  new Function(js);
  console.log('OK - syntax valid');
} catch (e) {
  const lines = js.split('\n');
  console.log('Error:', e.message);
  // Try binary search to find error location
  let left = 0, right = lines.length;
  let errorLine = -1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const half = lines.slice(0, mid).join('\n');
    try {
      new Function(half);
      left = mid + 1;
    } catch (err) {
      right = mid;
      errorLine = mid;
    }
  }
  if (errorLine > 0) {
    console.log('Error around line', errorLine);
    for (let i = Math.max(0, errorLine - 3); i < Math.min(lines.length, errorLine + 3); i++) {
      console.log((i + 1) + ': ' + lines[i].substring(0, 200));
    }
  }
}
