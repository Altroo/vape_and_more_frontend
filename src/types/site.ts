import type { LanguageCode } from '@/data/translations';
import type { af15kFlavours } from '@/data/rawData';

export type LocalizedText<T> = Record<LanguageCode, T>;

export type HeroImage = {
	key: string;
	image: string;
	alt: string;
	sort_order: number;
};

export type Brand = {
	key: string;
	label: string;
	image: string;
	logo: string;
	texts: LocalizedText<{
		headline: string;
		copy: string;
	}>;
	sort_order: number;
};

export type Shop = {
	key: string;
	current: boolean;
	map_query: string;
	directions: string;
	texts: LocalizedText<{
		name: string;
		address: string;
		hours: string;
	}>;
	sort_order: number;
};

export type PromotionPack = {
	key: string;
	discount_label: string;
	is_best_offer: boolean;
	image: string;
	images: Array<{
		image: string;
		alt: LocalizedText<string>;
		sort_order: number;
	}>;
	old_price: string;
	price: string;
	texts: LocalizedText<{
		title: string;
		target: string;
		description: string;
	}>;
	whatsapp_messages: LocalizedText<string>;
	sort_order: number;
};

export type Product = {
	key: string;
	brand: string;
	brand_key: string;
	image: string;
	price: LocalizedText<string>;
	texts: LocalizedText<{
		name: string;
		description: string;
		flavors: string[];
	}>;
	sort_order: number;
};

export type SiteContent = {
	phone: string;
	email: string;
	defaultLang: LanguageCode;
	counts: {
		officialBrands: number;
		officialShops: number;
	};
	heroImages: HeroImage[];
	brands: Brand[];
	shops: Shop[];
	promotionPacks: PromotionPack[];
	catalog: Product[];
};

export type VapeSiteProps = {
	siteContent: SiteContent;
	catalogOnly?: boolean;
};

export type Af15kFamily = (typeof af15kFlavours)[number]['family'];
export type Af15kFlavour = (typeof af15kFlavours)[number]['name'];
