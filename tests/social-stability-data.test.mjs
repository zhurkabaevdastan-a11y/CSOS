import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { srsYears, srsSeries, srsParticipation, irParticipation, irResults, appealTotals, appealOutcomes, socialActivities, socialStabilityTranslations, renderSocialStabilityContent } from '../app/social-stability-content.ts';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const paths = ['social-stability', 'social-stability/research', 'social-stability/srs', 'social-stability/appeals'];

test('SRS years follow the chart labels and the confirmed 2025 correction', () => {
  assert.deepEqual(srsYears, [2020, 2021, 2022, 2023, 2024, 2025]);
  assert.deepEqual(srsSeries.map(row => row.values), [
    [75, 72, 65, 66, 69, 73], [79, 77, 67, 62, 66, 74],
    [50, 44, 40, 55, 59, 58], [88, 83, 82, 78, 83, 87],
  ]);
  assert.deepEqual(srsParticipation, [{year:2024,respondents:17478,share:16},{year:2025,respondents:15562,share:10}]);
  for (const series of srsSeries) for (const value of series.values) assert.ok(value >= 0 && value <= 100);
});

test('IR uses reported coverage and does not infer missing 2024 percentages', () => {
  assert.deepEqual(irParticipation, [{year:2024,respondents:23642},{year:2025,respondents:40218}]);
  assert.deepEqual(irResults.map(row => row.values), [[86,86],[80,81],[91,92],[null,90],[null,84]]);
});

test('Appeal outcomes reconcile with both totals after the user clarification', () => {
  assert.deepEqual(appealTotals, [{year:2024,total:307,laborRights:136},{year:2025,total:246,laborRights:163}]);
  for (const [index, total] of appealTotals.entries()) assert.equal(appealOutcomes.reduce((sum,row)=>sum+(row.values[index]??0),0),total.total);
  assert.deepEqual(appealOutcomes.find(row=>row.label==='Другое').values,[null,7]);
  assert.doesNotMatch(renderSocialStabilityContent('social-stability/appeals'), /25%|снизилось на/);
});

test('Activities preserve the source counts and training breakdown', () => {
  assert.deepEqual(socialActivities.map(row=>row.values), [['219','1 621'],['16 585','49 тыс'],['621','1 136'],['676','576'],['456','384'],['220','192']]);
});

test('Both site variants use the same data and retain accessible responsive markup', () => {
  for (const path of paths) {
    const content = renderSocialStabilityContent(path);
    const html = read(`vercel-static/${path}/index.html`);
    assert.ok(html.includes(content), path);
    assert.match(html,/kpPageHero--social/);
    assert.doesNotMatch(html,/kpHeroVisual|kpFooter|kpRelated|Раздел наполняется|Данные за последние 10 лет/);
    if (content.includes('<table')) {
      assert.match(content,/<caption>/);
      assert.match(content,/scope="col"/);
      assert.match(content,/scope="row"/);
    } else assert.match(content,/<ol class="kpSrsBars">/);
  }
  const research = read('vercel-static/social-stability/research/index.html');
  assert.equal((research.match(/data-series=/g)??[]).length,4);
  assert.match(research,/Шкала: 0–100%/);
  assert.doesNotMatch(research,/<iframe|<canvas|Serikov_Z/);
  assert.equal(renderSocialStabilityContent('sport/instructors'),'');
  assert.equal(read('app/globals.css'),read('vercel-static/app.css'));
  assert.match(read('app/globals.css'),/@media\(max-width:760px\)\{\s*\.kpSrsCharts/);
});

test('Every new content string is available in Kazakh without changing the translator', () => {
  const dict = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for (const [ru,kk] of Object.entries(socialStabilityTranslations)) assert.equal(dict[ru],kk,ru);
  assert.equal(read('public/language.js'),read('vercel-static/language.js'));
});
