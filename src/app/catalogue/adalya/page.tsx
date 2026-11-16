import type { Metadata } from 'next';
import { VapeSite } from '@/components/vapeSite';
import { adalyaProducts } from '@/data/adalyaCatalogue';
import { fetchSiteContent } from '@/utils/siteApi';

export const metadata: Metadata = {
	title: 'Catalogue Adalya 15K - Vape & More',
	description: `Les ${adalyaProducts.length} arômes Adalya 15K, leurs photos et leurs descriptions.`,
};

export default async function AdalyaCataloguePage() {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} catalogOnly catalogueBrand="adalya" />;
}
