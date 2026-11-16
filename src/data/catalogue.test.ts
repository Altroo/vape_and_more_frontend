import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { catalogues } from './catalogue';
import { languages } from './translations';

test('catalogues keep 29 Adalya and 28 distinct Al Fakher flavours with translated copy and photos', () => {
	assert.equal(catalogues.adalya.products.length, 29);
	assert.equal(catalogues['al-fakher-8k'].products.length, 28);
	for (const catalogue of Object.values(catalogues)) {
		assert.equal(new Set(catalogue.products.map(({ id }) => id)).size, catalogue.products.length);
		assert.equal(new Set(catalogue.products.map(({ name }) => name)).size, catalogue.products.length);
		const names = catalogue.products.map(({ name }) => name);
		assert.deepEqual(
			names,
			[...names].sort((a, b) => a.localeCompare(b, 'en')),
		);
		const assetDirectory = path.join(process.cwd(), 'public/assets/catalogue', catalogue.imageDirectory);
		assert.equal(
			readdirSync(assetDirectory).filter((file) => file.endsWith('.webp')).length,
			catalogue.products.length,
		);
		for (const product of catalogue.products) {
			assert.ok(existsSync(path.join(assetDirectory, `${product.id}.webp`)), product.id);
			for (const { code } of languages) assert.ok(product.descriptions[code]?.trim(), `${product.id}: ${code}`);
			assert.match(product.descriptions.ar, /[\u0600-\u06ff]/);
			const firstLetter = product.name[0].toLowerCase();
			assert.equal(product.group, firstLetter <= 'g' ? 'ag' : firstLetter <= 'm' ? 'hm' : 'nz');
		}
	}
});

test('Lemon Lime and Lemon Lime Cherry Fizz remain separate flavours with separate assets', () => {
	const products = catalogues['al-fakher-8k'].products;
	assert.equal(products.filter(({ name }) => name === 'Lemon Lime').length, 1);
	assert.equal(products.filter(({ name }) => name === 'Lemon Lime Cherry Fizz').length, 1);
	assert.notEqual(
		products.find(({ name }) => name === 'Lemon Lime')?.id,
		products.find(({ name }) => name === 'Lemon Lime Cherry Fizz')?.id,
	);
});
