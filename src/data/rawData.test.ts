import assert from 'node:assert/strict';
import test from 'node:test';
import { af15kCopy, af15kFlavours, emptySiteContent, fallbackHeroImages, footerCopy, imagePathAliases } from './rawData';
import { languages } from './translations';

test('localized site data covers every supported language and flavour family', () => {
	const families = new Set(af15kFlavours.map(({ family }) => family));
	for (const { code } of languages) {
		assert.ok(footerCopy[code]);
		assert.ok(af15kCopy[code]);
		for (const family of families) assert.ok(af15kCopy[code].families[family]);
	}
});

test('fallback site data points to available content', () => {
	assert.ok(fallbackHeroImages.length > 0);
	assert.equal(emptySiteContent.defaultLang, 'fr');
	assert.equal(imagePathAliases['/assets/promos/DUO PACK + DRINK.png'], '/assets/promos/duo_pack_drink.png');
});
