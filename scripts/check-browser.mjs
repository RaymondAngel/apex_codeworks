// Run with a path to an installed playwright module as the first argument.
// All contact submissions are intercepted locally; no email is sent.
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const { chromium } = await import(process.argv[2] ? pathToFileURL(process.argv[2]).href : 'playwright');
const types = {'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp'};
const server = http.createServer(async (req,res) => {
 try {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const filename = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!filename.startsWith(root)) { res.writeHead(403).end(); return; }
  const content = await fs.readFile(filename);
  res.writeHead(200, {'Content-Type': types[path.extname(filename)] || 'application/octet-stream'}).end(content);
 } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
let browser;
try {
 browser = await chromium.launch({channel:'msedge', headless:true});
 const origin = `http://127.0.0.1:${server.address().port}`;
 const errors = [];
 const page = await browser.newPage();
 page.on('pageerror',e => errors.push(e.message));
 await page.route('https://fonts.googleapis.com/**',r => r.abort());
 await page.route('https://fonts.gstatic.com/**',r => r.abort());
 const pages = (await fs.readdir(root)).filter(f => f.endsWith('.html'));
 // Validate every stylesheet, including the unused site-plan stylesheet.
 await page.goto(origin);
 for (const name of (await fs.readdir(path.join(root,'styles'))).filter(f=>f.endsWith('.css'))) {
  const css = await fs.readFile(path.join(root,'styles',name),'utf8');
  const problems = await page.evaluate(source => {
   const problems=[];
   // Current stylesheets contain standard rules and media queries, with no CSS nesting.
   for (const match of source.replace(/\/\*[\s\S]*?\*\//g,'').matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector=match[1].trim();
    if (selector.startsWith('@')) continue;
    const properties=new Set();
    for(const declaration of match[2].split(';').map(v=>v.trim()).filter(Boolean)) {
     const colon=declaration.indexOf(':');
     const property=declaration.slice(0,colon).trim();
     const value=declaration.slice(colon+1).trim().replace(/\s*!important$/,'');
     if(colon<1 || !CSS.supports(property,value)) problems.push(`${selector}: invalid ${declaration}`);
     if(properties.has(property)) problems.push(`${selector}: duplicate ${property}`);
     properties.add(property);
    }
   }
   const sheet=new CSSStyleSheet(); sheet.replaceSync(source);
   function check(rules) {
    const seen=new Set();
    for(const rule of rules) {
     if(rule.selectorText) {
      if(seen.has(rule.selectorText)) problems.push(`Duplicate selector in same scope: ${rule.selectorText}`);
      seen.add(rule.selectorText);
     }
     if(rule.cssRules) check(rule.cssRules);
    }
   }
   check(sheet.cssRules);
   return problems;
  },css);
  assert.deepEqual(problems,[],name+': CSS problems');
  console.log(`PASS ${name}: CSS declarations and duplicate rules`);
 }
 for (const width of [375,768,920,1440]) {
  await page.setViewportSize({width,height:900});
  for (const file of pages) {
   const source = await fs.readFile(path.join(root,file),'utf8');
   // Detect duplicate attributes before the browser normalizes malformed markup.
   for (const tag of source.matchAll(/<[a-z][^>]*>/gi)) {
    const attrs = [...tag[0].matchAll(/\s+([^\s=/>]+)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g)].map(m=>m[1].toLowerCase());
    assert.equal(new Set(attrs).size, attrs.length, `${file}: duplicate attribute ${tag[0]}`);
   }
   await page.goto(`${origin}/${file}`);
   await page.evaluate(async () => {
    await Promise.all([...document.images].map(async image => {
     image.loading = 'eager';
     try { await image.decode(); } catch { /* Report failed images below. */ }
    }));
   });
   const report = await page.evaluate(() => {
    const all = [...document.querySelectorAll('*')];
    const ids = all.filter(e=>e.id).map(e=>e.id);
    return {duplicateIds:ids.filter((v,i)=>ids.indexOf(v)!==i),
     overflow:document.documentElement.scrollWidth > innerWidth+1,
     brokenImages:[...document.images].filter(i=>!i.complete || !i.naturalWidth).map(i=>i.src),
     badCss:[...document.styleSheets].flatMap(sheet=> {
      if (sheet.href && new URL(sheet.href).origin !== location.origin) return [];
      const bad=[];
      function visit(rules) {for(const rule of rules) {
       if(rule.style) for(const property of rule.style) {
        const value = rule.style.getPropertyValue(property);
        // Variable-based shorthands expose empty longhands until computed.
        if(value && !property.startsWith('--') && !CSS.supports(property,value)) bad.push(property);
       }
       if(rule.cssRules) visit(rule.cssRules);
      }}
      visit(sheet.cssRules); return bad;
     })};
   });
   assert.deepEqual(report.duplicateIds,[],`${file}: duplicate IDs`);
   assert.equal(report.overflow,false,`${file}: horizontal overflow at ${width}`);
   assert.deepEqual(report.brokenImages,[],`${file}: broken images`);
   assert.deepEqual(report.badCss,[],`${file}: unsupported CSS`);
   if(file !== '404.html' && width === 375) {
    await page.locator('.menu-button').click();
    await assert.doesNotReject(()=>page.locator('#primary-navigation').waitFor({state:'visible'}));
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('.menu-button').getAttribute('aria-expanded'),'false');
   }
  }
  console.log(`PASS ${pages.length} pages at ${width}px: duplicates, images, CSS, overflow, menu`);
 }
 await page.goto(`${origin}/contact.html`);
 await page.route('https://api.web3forms.com/submit',r=>r.fulfill({status:200,contentType:'application/json',body:'{"success":true}'}));
 await page.locator('#name').fill('Local automated test');
 await page.locator('#email').fill('test@example.com');
 await page.locator('#service').selectOption('Business Websites');
 await page.locator('#details').fill('Local test. This request must never reach a live email service.');
 await page.locator('#budget').fill('$1,750');
 await page.locator('[type=submit]').first().click();
 await page.locator('#inquiry-confirmation').waitFor({state:'visible'});
 assert.match(await page.locator('#confirmation-number').innerText(),/^ACW-/);
 await page.locator('#inquiry-confirmation .confirmation-close').click();
 await page.locator('.apex-chat-toggle').click();
 await page.locator('#apex-chat-question').fill('PayPal integration');
 await page.locator('.apex-chat-send').click();
 assert.match(await page.locator('.apex-chat-log').innerText(),/Stripe and PayPal payment integrations/);
 const blockedStorage = await browser.newPage();
 blockedStorage.on('pageerror',e=>errors.push(e.message));
 await blockedStorage.route('https://fonts.googleapis.com/**',r=>r.abort());
 await blockedStorage.route('https://fonts.gstatic.com/**',r=>r.abort());
 await blockedStorage.addInitScript(() => {
  Storage.prototype.setItem = () => { throw new DOMException('Storage blocked','SecurityError'); };
  Storage.prototype.getItem = () => { throw new DOMException('Storage blocked','SecurityError'); };
 });
 await blockedStorage.goto(origin);
 await blockedStorage.locator('.service-card').first().click();
 assert.match(blockedStorage.url(),/custom-websites\.html$/);
 await blockedStorage.goto(`${origin}/contact.html`);
 assert.equal(await blockedStorage.locator('#project-form [type=submit]').isEnabled(),true);
 await blockedStorage.close();
 assert.deepEqual(errors,[],'Browser runtime errors');
 console.log('PASS mocked form submission, confirmation, chatbot, blocked storage, and no runtime errors');
} finally {
 await browser?.close();
 await new Promise(resolve=>server.close(resolve));
}
