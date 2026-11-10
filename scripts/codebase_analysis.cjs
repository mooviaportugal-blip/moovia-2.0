const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');
const routesDir = path.resolve('src/routes');
const componentsDir = path.resolve('src/components');

// 1. Map all route files and their imported components
const routeFiles = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const routeComponentMap = {};
const allImportedComponents = new Set();
const componentUsageCounts = {};

for (const rf of routeFiles) {
  const filePath = path.join(routesDir, rf);
  const content = fs.readFileSync(filePath, 'utf8');

  // find component imports
  const importMatches = [...content.matchAll(/import\s+(?:\{([^}]+)\}|([A-Z][a-zA-Z0-9_]*))\s+from\s+['"](@\/components\/[^'"]+)['"]/g)];
  const components = [];

  for (const m of importMatches) {
    const named = m[1];
    const def = m[2];
    const impPath = m[3];
    if (named) {
      named.split(',').map(s => s.trim()).filter(Boolean).forEach(c => {
        // filter out types/interfaces
        if (/^[A-Z]/.test(c)) {
          components.push({ name: c, path: impPath });
          allImportedComponents.add(impPath);
          componentUsageCounts[c] = (componentUsageCounts[c] || 0) + 1;
        }
      });
    }
    if (def) {
      components.push({ name: def, path: impPath });
      allImportedComponents.add(impPath);
      componentUsageCounts[def] = (componentUsageCounts[def] || 0) + 1;
    }
  }

  routeComponentMap[rf] = components;
}

// 2. Find all component files in src/components
function getAllFiles(dir) {
  let res = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      res = res.concat(getAllFiles(full));
    } else if (/\.(tsx|jsx)$/.test(item)) {
      res.push(full);
    }
  }
  return res;
}

const allComponentFiles = getAllFiles(componentsDir);
const unusedComponents = [];

for (const cf of allComponentFiles) {
  const rel = '@/' + path.relative(srcDir, cf).replace(/\\/g, '/').replace(/\.tsx?$/, '');
  const baseName = path.basename(cf, path.extname(cf));

  // check if imported anywhere in src/
  let importedAnywhere = false;
  for (const rf of getAllFiles(srcDir)) {
    if (rf === cf) continue;
    const c = fs.readFileSync(rf, 'utf8');
    if (c.includes(rel) || c.includes(baseName)) {
      importedAnywhere = true;
      break;
    }
  }
  if (!importedAnywhere) {
    unusedComponents.push(cf);
  }
}

// 3. Search for "Validação Jurídica" and RGPD
const searchOccurrences = (term) => {
  const occurrences = [];
  for (const file of getAllFiles(srcDir)) {
    const text = fs.readFileSync(file, 'utf8');
    if (text.includes(term)) {
      occurrences.push(path.relative(srcDir, file).replace(/\\/g, '/'));
    }
  }
  return occurrences;
};

// 4. Mentions of Portugal in footer and legal
const footerPath = path.join(componentsDir, 'site/Footer.tsx');
const footerContent = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf8') : '';

// 5. Check for dashes, ™, ®, acronyms in dict.ts and locales
const dictPath = path.resolve('src/i18n/dict.ts');
const dictContent = fs.readFileSync(dictPath, 'utf8');
const emDashesInDict = [...dictContent.matchAll(/[—–]/g)].length;
const tmInDict = [...dictContent.matchAll(/[™®]/g)].length;

const analysis = {
  routeComponentMap,
  componentUsageCounts,
  unusedComponents: unusedComponents.map(f => path.relative(srcDir, f).replace(/\\/g, '/')),
  validacaoJuridicaFiles: searchOccurrences('Validação Jurídica'),
  rgpdFiles: searchOccurrences('RGPD'),
  portugalInFooter: footerContent.includes('Portugal'),
  emDashesInDict,
  tmInDict,
};

fs.writeFileSync('scratch/codebase_analysis.json', JSON.stringify(analysis, null, 2), 'utf8');
console.log('Codebase analysis saved to scratch/codebase_analysis.json');

