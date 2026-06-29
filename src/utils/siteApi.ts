import type { LanguageCode } from '@/data/translations';

type LocalizedText<T> = Record<LanguageCode, T>;

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

export const emptySiteContent: SiteContent = {
	phone: '212764375156',
	email: 'contact@vape-and-more.ma',
	defaultLang: 'fr',
	counts: {
		officialBrands: 0,
		officialShops: 0,
	},
	heroImages: [],
	brands: [],
	shops: [],
	promotionPacks: [],
	catalog: [],
};

const getApiRoot = () => process.env.NEXT_PUBLIC_ROOT_API_URL ?? 'http://127.0.0.1:8007/api';

export const fetchSiteContent = async (): Promise<SiteContent> => {
	try {
		const response = await fetch(`${getApiRoot()}/website/content/`, {
			cache: 'no-store',
			next: { revalidate: 0 },
		});
		if (!response.ok) return emptySiteContent;
		return (await response.json()) as SiteContent;
	} catch {
		return emptySiteContent;
	}
};
