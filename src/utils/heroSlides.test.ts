import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fallbackHeroImages } from '@/data/rawData';
import { getHeroSlides } from './heroSlides';

test('the discount banner follows the configured carousel without changing its existing slides', () => {
	const configured = fallbackHeroImages.map((slide, index) => ({
		...slide,
		key: `configured-${index}`,
		image: `/assets/configured-${index}.png`,
	}));
	const slides = getHeroSlides(configured);
	assert.deepEqual(slides.slice(0, 3), configured);
	assert.equal(slides.length, 4);
	assert.equal(slides[3].image, '/assets/discount-banner.png');
	assert.equal(configured.length, 3);
});

test('the discount banner is available when the carousel falls back to local images', () => {
	const slides = getHeroSlides([]);
	assert.deepEqual(slides.slice(0, 3), fallbackHeroImages);
	assert.equal(slides.length, 4);
	assert.ok(existsSync(path.join(process.cwd(), 'public', slides[3].image)));
});

test('an already configured discount banner is included only once, after the original slides', () => {
	const slides = getHeroSlides([]);
	assert.deepEqual(getHeroSlides(slides), slides);
});
