import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = new URL('../', import.meta.url);
const files = (await fs.readdir(root)).filter(name => name.endsWith('.html'));
const voidTags = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
for (const file of files) {
 const html = await fs.readFile(new URL(file, root), 'utf8');
 assert.match(html, /^<!doctype html>/i, file + ': missing doctype');
 const stack = [], ids = new Set(), refs = []; let previous = 0, h1 = 0;
 const counts = {};
 for (const token of html.matchAll(/<!--[\s\S]*?-->|<![^>]*>|<\/?[a-z][^>]*>/gi)) {
  const tag = token[0]; if (tag.startsWith('<!')) continue;
  const name = tag.match(/^<\/?([a-z0-9-]+)/i)[1].toLowerCase();
  if (tag.startsWith('</')) { assert.equal(stack.pop(), name, file + ': mismatched closing ' + tag); continue; }
  counts[name] = (counts[name] || 0) + 1;
  if (name === 'head' || name === 'body') assert.equal(stack.at(-1), 'html', file + ': misplaced ' + name);
  if (name === 'main' || name === 'header' || name === 'footer') assert.equal(stack.at(-1), 'body', file + ': misplaced landmark ' + name);
  const id = tag.match(/\bid="([^"]+)"/); if (id) { assert(!ids.has(id[1]), file + ': duplicate id ' + id[1]); ids.add(id[1]); }
  for (const match of tag.matchAll(/(?:aria-labelledby|aria-describedby|aria-controls|for)="([^"]+)"/g)) refs.push(...match[1].split(/\s+/));
  if (/^h[1-6]$/.test(name)) { const level = Number(name[1]); assert(level <= previous + 1, file + ': skipped heading level at ' + name); assert(stack.includes('main'), file + ': heading outside main'); previous = level; if (level === 1) h1++; }
  if (name === 'a') assert(!stack.includes('a'), file + ': nested anchor');
  if (!voidTags.has(name)) stack.push(name);
 }
 assert.equal(stack.length, 0, file + ': unclosed tags ' + stack.join(', '));
 for (const name of ['html','head','body','main','header','footer','title']) assert.equal(counts[name], 1, file + ': expected one ' + name);
 assert.equal(h1, 1, file + ': expected one H1');
 for (const ref of refs) assert(ids.has(ref), file + ': unresolved reference ' + ref);
 assert(html.indexOf('<header') < html.indexOf('<main') && html.indexOf('<main') < html.indexOf('<footer'), file + ': landmark order');
 assert.match(html, /href="#main-content"/, file + ': missing skip link');
 console.log('PASS ' + file + ': tag nesting, landmarks, headings, IDs, and accessibility references');
}
const css = await fs.readFile(new URL('styles/main.css', root), 'utf8');
let depth = 0; for (const char of css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/"[^"]*"|'[^']*'/g, '')) { if (char === '{') depth++; if (char === '}') depth--; assert(depth >= 0, 'CSS closing brace without opening brace'); } assert.equal(depth, 0, 'CSS unclosed block');
assert(css.indexOf('/* Header') < css.indexOf('/* Page heroes') && css.indexOf('/* Page heroes') < css.indexOf('/* Footer'), 'CSS section order');
assert(css.indexOf('@media') > css.indexOf('.footer-shortcut p'), 'Responsive overrides must follow base component styles');
console.log('PASS CSS block balance and page section order');
console.log('Structural checks passed for ' + files.length + ' HTML pages.');
