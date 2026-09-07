// Remove the retired bottom navigation from every pre-rendered public page.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../vercel-static/', import.meta.url));
let changed = 0;

function updatePages(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      updatePages(path);
    } else if (entry.name.endsWith('.html')) {
      const before = readFileSync(path, 'utf8');
      const after = before
        .replace(/<section class="kpRelated">[\s\S]*?<\/section>/g, '')
        .replace(/<footer class="kpFooter">[\s\S]*?<\/footer>/g, '');
      if (after !== before) {
        writeFileSync(path, after);
        changed++;
      }
    }
  }
}

updatePages(root);
console.log(`Removed bottom navigation from ${changed} pages`);
