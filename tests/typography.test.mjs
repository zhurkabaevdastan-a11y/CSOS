import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import vm from 'node:vm';

const root=new URL('../',import.meta.url);
const read=path=>readFileSync(new URL(path,root),'utf8');
const css=read('app/globals.css');
function pages(dir='vercel-static/'){
  return readdirSync(new URL(dir,root),{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?pages(dir+entry.name+'/'):entry.name.endsWith('.html')?[dir+entry.name]:[]);
}

test('All published pages share the whole-word stylesheet without local breaking overrides',()=>{
  assert.equal(css,read('vercel-static/app.css'));
  assert.doesNotMatch(css,/(?:overflow-wrap|word-wrap)\s*:\s*(?:anywhere|break-word)|word-break\s*:\s*(?:break-all|break-word)|hyphens\s*:\s*auto/);
  assert.match(css,/body\{[^}]*word-break:normal;overflow-wrap:normal;-webkit-hyphens:none;hyphens:none/);
  const allPages=pages();assert.ok(allPages.length>=60);
  for(const path of allPages){
    const html=read(path);
    if(!/http-equiv="refresh"/i.test(html))assert.match(html,/href="\/app\.css(?:\?[^\"]*)?"/,path);
    assert.doesNotMatch(html,/\u00ad|&shy;|&#173;|&#x0*ad;|<wbr\b|(?:overflow-wrap|word-break)\s*:\s*(?:anywhere|break-word|break-all)|hyphens\s*:\s*auto/i,path);
  }
});

test('Route card headings receive the full desktop card width and compact mobile sizing',()=>{
  const rules=css.slice(css.indexOf('/* Whole-word wrapping:'));
  assert.match(rules,/\.kpDirectionList strong\{grid-column:1\/-1;grid-row:2;font-size:clamp\(1\.25rem,7\.2cqi,1\.75rem\)\}/);
  assert.match(rules,/\.kpDirectionList p\{grid-column:1\/-1;grid-row:3;margin:0\}/);
  assert.match(rules,/\.kpDirectionList strong\{font-size:clamp\(1rem,5\.5cqi,1\.375rem\)\}/);
  assert.match(rules,/\.kpDirectionList>a:hover\{padding-left:0\}/);
  const html=read('vercel-static/index.html');
  assert.match(html,/<strong>Корпоративная культура<\/strong>/);
  const dict=vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  assert.equal(dict['Корпоративная культура'],'Корпоративтік мәдениет');
  assert.doesNotMatch(dict['Корпоративная культура'],/\n|<br|\u00ad/);
});

test('Large labels use container-relative sizing and wide tables scroll instead of breaking names',()=>{
  assert.match(css,/\.kpHeroMobile h1,html\[lang="kk"\] \.kpHeroMobile h1\{font-size:clamp\(1\.75rem,7\.8cqi,6\.75rem\);line-height:1\.08\}/);
  assert.match(css,/\.kpPageHero h1\{font-size:clamp\(1\.375rem,5\.6cqi,3\.25rem\);line-height:1\.22\}/);
  assert.match(css,/\.kpSamrukTable table\{min-width:560px;table-layout:auto\}/);
  assert.match(css,/\.kpSocialTable\{min-width:560px;table-layout:auto\}/);
  assert.match(css,/\.kpYoungRoster table\{min-width:640px;table-layout:auto\}/);
  for(const selector of ['kpResultsTable','kpSocialTableWrap','kpYoungRoster']){
    assert.match(css,new RegExp(`\\.${selector}\\{[^}]*overflow(?:-x)?:auto`));
  }
});
