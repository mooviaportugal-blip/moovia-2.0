const fs = require('fs');

const content = fs.readFileSync('src/routeTree.gen.ts', 'utf8');
const routes = [];
const lines = content.split('\n');
for (const line of lines) {
  const m = line.match(/path:\s*['"]([^'"]+)['"]/);
  if (m) {
    routes.push(m[1]);
  }
}
console.log('Registered route paths:', [...new Set(routes)]);

