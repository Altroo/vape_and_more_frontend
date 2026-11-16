import { adalyaProducts } from '@/data/adalyaCatalogue';
import { alFakherProducts } from '@/data/alFakherCatalogue';
import type { CatalogueBrand, CatalogueProduct } from '@/types/catalogue';

type CatalogueDefinition = {
	name: string;
	path: string;
	imageDirectory: string;
	products: CatalogueProduct[];
};

export const catalogues = {
	adalya: {
		name: 'Adalya 15K',
		path: '/catalogue/adalya',
		imageDirectory: 'adalya-15k',
		products: adalyaProducts,
	},
	'al-fakher-8k': {
		name: 'Al Fakher 8K',
		path: '/catalogue/al-fakher-8k',
		imageDirectory: 'al-fakher-8k',
		products: alFakherProducts,
	},
} satisfies Record<CatalogueBrand, CatalogueDefinition>;

export const catalogueCopy = {
	fr: {
		intro: 'Découvrez nos collections et choisissez votre marque.',
		chooseBrand: 'Toutes les collections',
		open: 'Voir le catalogue',
	},
	en: {
		intro: 'Explore our collections and choose your brand.',
		chooseBrand: 'All collections',
		open: 'View catalogue',
	},
	es: {
		intro: 'Descubre nuestras colecciones y elige tu marca.',
		chooseBrand: 'Todas las colecciones',
		open: 'Ver catálogo',
	},
	ar: {
		intro: 'اكتشف تشكيلاتنا واختر علامتك التجارية المفضلة.',
		chooseBrand: 'جميع التشكيلات',
		open: 'اكتشف المنتجات',
	},
};
