import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const source=await fs.readFile(new URL('chatbot.js',import.meta.url),'utf8');
const context={};
vm.runInNewContext(source.slice(source.indexOf('  const TOPICS'),source.indexOf('  function element'))+';this.topics=TOPICS;this.match=match;',context);
const cases=[
 ['Take me home','home'],['What services do you offer?','home'],
 ['Show me your work','examples'],['High Desert Development','examples'],['Wall Street Watchers','examples'],['Italian Pickup','examples'],
 ['Tell me about your qualifications','about'],['How does the process work?','process'],
 ['Where do I apply for the payment plan?','application'],['Take me to the credit application','application'],
 ['I don’t know my credit score','score'],['Is this a credit check?','score'],
 ['Explain the monthly payments','payment-plan'],['Can I pay over time?','payment-plan'],
 ['How much does it cost?','quote'],['What does the $150 cover?','care'],
 ['How do I cancel my care plan?','faq-cancel-care'],['Is monthly care refundable?','faq-cancel-care'],
 ['I need to cancel my website project','faq-cancel-project'],['When do I pay?','faq-deposit'],
 ['How long does a website take?','faq-timeline'],['How quickly will you respond?','faq-response'],
 ['Pay Pal integration','payments'],['Can I add Stripe checkout?','payments'],
 ['The submit button is gray','form-help'],['I can’t submit the form','form-help'],['Where is I agree?','form-help'],
 ['Where is my confirmation number?','confirmation'],['What happens to my private information?','privacy'],
 ['I want to read the terms','terms'],['Explain the court trial waiver','arbitration'],
 ['Can you guarantee Google indexing?','faq-results'],['Can I edit the website myself?','faq-editing'],
 ['Can I keep the source code?','ownership'],['Automate my workflow','automation'],
 ['What do you need from me?','faq-materials'],['Who pays domain fees?','faq-costs'],
 ['Talk to a real person','contact'],['Are you hiring?','careers'],['Save a desktop icon','shortcut']
];
for(const [question,id] of cases) assert.equal(context.match(question)[0]?.id,id,question);
assert.equal(context.match('purple pancake constellation').length,0);
const ids=new Set();
for(const topic of context.topics) {
 assert(!ids.has(topic.id),'Duplicate topic '+topic.id); ids.add(topic.id);
 assert(topic.links?.length,'Missing links '+topic.id);
 for(const [label,href] of topic.links) {
  assert(label && href,'Empty link '+topic.id);
  if(/^https:\/\//.test(href)) continue;
  const [file,fragment]=href.split('#');
  const html=await fs.readFile(new URL('../'+file,import.meta.url),'utf8');
  if(fragment) assert(html.includes(`id="${fragment}"`),'Missing anchor '+href);
 }
}
console.log(`PASS ${cases.length} natural-language routes and ${context.topics.length} topic link destinations`);
