import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';

const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');

test('Council role removes the specified group photo but retains meeting photo and all four functions',()=>{
  const jsx=read('app/[...slug]/page.tsx');
  const council=jsx.split('{key === "pensioners/generations" && (')[1].split('{key === "pensioners/support"')[0];
  const html=read('vercel-static/pensioners/generations/index.html');
  for(const content of [council,html]){
    assert.doesNotMatch(content,/council-group\.jpg|kpVeteranPhotoPair/);
    assert.equal(content.split('/veterans/council-meeting.jpg').length-1,1);
    assert.match(content,/kpVeteranCouncilPhoto/);
    for(const title of ['Роль консультативного совета ҚТЖ','Экспертные рекомендации','Обсуждение решений','Наставничество','Сохранение истории','Структура советов ветеранов'])assert.ok(content.includes(title));
    assert.ok(content.includes('/veterans/regional-council.jpg'));
  }
});

test('The remaining photo is responsive and the source image is preserved for other uses',()=>{
  const css=read('app/globals.css');
  assert.match(css,/\.kpVeteranCouncilPhoto\{max-width:840px;margin:0 auto\}/);
  assert.match(css,/\.kpVeteranCouncilPhoto img\{[^}]*width:100%;height:auto/);
  assert.equal(css,read('vercel-static/app.css'));
  assert.ok(existsSync(new URL('../public/veterans/council-group.jpg',import.meta.url)));
  assert.ok(read('app/content.ts').includes('/veterans/council-group.jpg'));
});
