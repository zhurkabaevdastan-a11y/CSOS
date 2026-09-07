// Apply the same archive photo selection to the Vercel static pages.
import { readFileSync, writeFileSync } from 'node:fs';
import { sitePages } from '../app/content.ts';
import { getSportBanner } from '../app/sport-banners.ts';

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
let count = 0;
for (const key of Object.keys(sitePages)) {
  const photo = getSportBanner(key);
  if (!photo) continue;
  const path = `vercel-static/${key}/index.html`;
  const html = readFileSync(path, 'utf8');
  const visual = /<div class="kpHeroVisual kpHeroVisual--sport">[\s\S]*?<\/div>|<figure class="kpSportPhoto">[\s\S]*?<\/figure>/;
  if (!visual.test(html)) throw new Error(`Missing sports hero in ${key}`);
  const banner = `<figure class="kpSportPhoto"><picture><img src="${escape(photo.src)}" srcset="${escape(photo.srcSet)}" sizes="(max-width: 760px) 100vw, 92vw" width="${photo.width}" height="${photo.height}" alt="${escape(photo.alt)}" style="object-position:${escape(photo.position)}" decoding="async"></picture><figcaption><span><span>Фото из спортивного архива</span> · ${photo.year}</span><a href="${escape(photo.album)}" target="_blank" rel="noreferrer"><span>Открыть фотоальбом</span> ↗</a></figcaption></figure>`;
  writeFileSync(path, html.replace(visual, banner));
  count++;
}
for (const [source, target] of [['app/globals.css', 'vercel-static/app.css'], ['public/language.js', 'vercel-static/language.js']]) writeFileSync(target, readFileSync(source));
console.log(`Archive photos synchronized on ${count} sports pages`);
