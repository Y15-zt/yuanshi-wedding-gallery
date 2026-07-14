const fs = require('fs');
const html = fs.readFileSync('C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/admin.html', 'utf8');
const m = html.match(/<script>([\s\S]*?)<\/script>/);
if (!m) { console.log('no script'); process.exit(1); }
const js = m[1];
fs.writeFileSync('C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/test.js', js);
try {
  require('C:/Users/Administrator/Documents/Kimi/Workspaces/网络图册/show/test.js');
  console.log('SYNTAX OK');
} catch (e) {
  if (e instanceof SyntaxError) {
    console.log('SYNTAX ERROR:', e.message);
    console.log('At line', e.lineNumber || 'unknown');
  } else {
    console.log('RUNTIME ERROR (expected for DOM code):', e.message);
    console.log('SYNTAX OK - script parses correctly');
  }
}
