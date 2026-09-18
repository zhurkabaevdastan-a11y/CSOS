import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { marathonEmbedUrl, marathonRegistrationUrl, sportCalendar } from '../app/content.ts';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const limit = 'Общий лимит — 500 участников, в том числе не более 100 иногородних';
const documentPath = 'documents/marathon-2026-waiver-kz-ru.docx';

test('Both versions show updated limits, WhatsApp group and downloadable waiver', () => {
  for (const path of ['app/[...slug]/page.tsx', 'vercel-static/sport/marathon-registration/index.html']) {
    const source = read(path).replaceAll('&amp;', '&');
    assert.ok(source.includes(limit), path);
    assert.ok(source.includes('https://chat.whatsapp.com/CWZZEGUEsre9SwFCeRYVNr?s=cl&p=i&mlu=4'), path);
    assert.ok(source.includes(`href="/${documentPath}" download="Расписка каз-рус.docx"`), path);
    assert.ok(!source.includes('B5InlZWFveAFozbG4cojZz'), path);
    assert.ok(!source.includes('600 человек'), path);
  }
  assert.deepEqual(readFileSync(new URL(`../public/${documentPath}`, import.meta.url)), readFileSync(new URL(`../vercel-static/${documentPath}`, import.meta.url)));
});

test('New copy has a Kazakh translation and shared styles remain synchronized', () => {
  const dictionary = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  assert.ok(dictionary[limit]?.includes('500'));
  assert.ok(dictionary[limit]?.includes('100'));
  assert.equal(dictionary['Скачать расписку'], 'Қолхатты жүктеу');
  assert.equal(read('public/language.js'), read('vercel-static/language.js'));
  assert.equal(read('app/globals.css'), read('vercel-static/app.css'));
});

test('Existing Microsoft registration is preserved for 2026 only', () => {
  assert.equal(marathonRegistrationUrl, 'https://forms.cloud.microsoft/r/watNzKnHrC');
  const html = read('vercel-static/sport/marathon-registration/index.html').replaceAll('&amp;', '&');
  assert.ok(html.includes(marathonEmbedUrl));
  assert.ok(html.includes(marathonRegistrationUrl));
  assert.equal(sportCalendar.find((season) => season.year === 2026).events.filter((event) => event.registration).length, 1);
  assert.equal(sportCalendar.find((season) => season.year === 2027).events.filter((event) => event.registration).length, 0);
});

test('The 2026 route map is available in both sites without cropping', () => {
  const asset = 'sports/marathon-2026-route.jpg';
  for (const path of ['app/[...slug]/page.tsx', 'vercel-static/sport/marathon-registration/index.html']) {
    const source = read(path);
    assert.equal((source.match(/id="marathon-route-map"/g) || []).length, 1);
    assert.ok(source.includes(`src="/${asset}" width="1280" height="824"`), path);
    assert.ok(source.includes('loading="lazy" decoding="async"'), path);
    assert.ok(source.includes('download="marathon-qtj-2026-route.jpg"'), path);
    assert.ok(source.includes('1 круг — 2,5 км, 2 круга — 5 км, 4 круга — 10 км'), path);
    assert.ok(!source.includes('Точная схема движения будет опубликована'), path);
  }
  const image = readFileSync(new URL(`../public/${asset}`, import.meta.url));
  assert.equal(image.subarray(0, 3).toString('hex'), 'ffd8ff');
  assert.deepEqual(image, readFileSync(new URL(`../vercel-static/${asset}`, import.meta.url)));
  assert.match(read('app/globals.css'), /\.kpMarathonMapImage img\s*\{[^}]*height:\s*auto[^}]*object-fit:\s*contain/s);
  const dictionary = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for (const label of ['Карта забега', 'Открыть карту крупнее', 'Скачать карту', 'Открыть карту забега в полном размере']) assert.ok(dictionary[label], label);
});

test('September 19 program starts at noon with ten translated events in both sites', () => {
  const dictionary = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  const expectedTimes = ['12:00', '12:05', '12:10', '12:15', '12:25', '12:30', '12:40', '12:50', '12:50–13:30', '13:30–14:00'];
  const schedules = [];
  for (const path of ['app/[...slug]/page.tsx', 'vercel-static/sport/marathon-registration/index.html']) {
    const source = read(path).replaceAll('className=', 'class=');
    const program = source.match(/<section class="kpContentSection kpMarathonProgram">[\s\S]*?<\/section>/)[0];
    assert.deepEqual([...program.matchAll(/<time>(.*?)<\/time>/g)].map(match => match[1]), expectedTimes, path);
    for (const match of program.matchAll(/<(?:h3|p|span)>([^<]+)<\/(?:h3|p|span)>/g)) {
      assert.ok(dictionary[match[1]], `Missing Kazakh translation: ${match[1]}`);
    }
    assert.ok(source.includes('Ботанический сад со стороны улицы Бухар жырау — открытие стартового городка в 12:00'), path);
    assert.ok(!/07:50|08:30|08:40|09:00–11:00|11:30/.test(source), path);
    schedules.push(program.replace(/\s+/g, ' '));
  }
  assert.equal(schedules[0], schedules[1]);
});
