import { emptySiteContent } from '@/data/rawData';
import type { SiteContent } from '@/types/site';
export type { Brand, HeroImage, Product, PromotionPack, Shop, SiteContent } from '@/types/site';

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
