import { fallbackHeroImages } from '@/data/rawData';
import type { HeroImage } from '@/types/site';

const discountBanner: HeroImage = {
	key: 'black-friday-discount',
	image: '/assets/discount-banner.png',
	alt: '',
	sort_order: 4,
};

export const getHeroSlides = (configuredSlides: HeroImage[]): HeroImage[] => {
	const slides = configuredSlides.length > 0 ? configuredSlides : fallbackHeroImages;
	return [
		...slides.filter((slide) => slide.key !== discountBanner.key && slide.image !== discountBanner.image),
		discountBanner,
	];
};
