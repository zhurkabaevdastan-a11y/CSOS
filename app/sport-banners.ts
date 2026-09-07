type SportBanner = {
  src: string;
  mobileSrc: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  position: string;
  album: string;
  resourcePath: string;
  year: number;
};

function photo(name: string, height: number, alt: string, position: string, album: string, resourcePath: string): SportBanner {
  const src = `/sports/banners/${name}-1600.webp`;
  const mobileSrc = `/sports/banners/${name}-800.webp`;
  return { src, mobileSrc, srcSet: `${mobileSrc} 800w, ${src} 1600w`, width: 1600, height, alt, position, album, resourcePath, year: 2025 };
}

// User-supplied public albums; dates identify the photos, not the page's event.
// Keep resource paths so each optimized local image can be traced to its original.
export const sportBannerPhotos = {
  marathon: photo('marathon', 1065, 'Участники массового забега у финишной арки', '50% 42%', 'https://disk.yandex.kz/d/h8GjngcSflKBEQ', '/1751.jpg'),
  competition: photo('competition', 1065, 'Волейболисты во время атаки у сетки', '58% 20%', 'https://disk.yandex.kz/d/4Df-19C9LPsQ2Q', '/финал/2781.JPG'),
  team: photo('team', 900, 'Участники волейбольного турнира на общей фотографии', '50% 45%', 'https://disk.yandex.kz/d/4Df-19C9LPsQ2Q', '/финал/3051.JPG'),
  awards: photo('awards', 1064, 'Волейбольная команда с медалями и кубком', '50% 26%', 'https://disk.yandex.kz/d/4Df-19C9LPsQ2Q', '/финал/3046.JPG'),
  atmosphere: photo('atmosphere', 1067, 'Зрители на трибунах спортивного зала', '55% 28%', 'https://disk.yandex.kz/d/HDbR4i_rnm_jTg', '/Spartakiada 2025/Spartakiada 10.08.2025/_64A1369.jpg'),
};

export function getSportBanner(key: string): SportBanner | undefined {
  if (key === 'sport/marathon-registration') return sportBannerPhotos.marathon;
  if (key === 'sport/calendar') return sportBannerPhotos.competition;
  if (key === 'sport/instructors' || key.startsWith('sport/instructors/')) return sportBannerPhotos.team;
  if (key === 'sport/results/samruk-2026') return sportBannerPhotos.atmosphere;
  if (key === 'sport/results' || key.startsWith('sport/results/')) return sportBannerPhotos.awards;
  if (key === 'sport/photos' || key.startsWith('sport/photos/')) return sportBannerPhotos.atmosphere;
  if (key === 'sport') return sportBannerPhotos.team;
  return undefined;
}
