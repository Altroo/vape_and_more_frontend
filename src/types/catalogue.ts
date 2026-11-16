import type { LanguageCode } from '@/data/translations';

export type CatalogueBrand = 'adalya' | 'al-fakher-8k';

export type CatalogueProduct = {
	id: string;
	name: string;
	accent: string;
	group: 'ag' | 'hm' | 'nz';
	descriptions: Record<LanguageCode, string>;
};
