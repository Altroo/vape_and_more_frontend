import type { Metadata } from 'next';
import { VapeSite } from '@/components/vapeSite';
import { alFakherProducts } from '@/data/alFakherCatalogue';
import { fetchSiteContent } from '@/utils/siteApi';

export const metadata: Metadata = {
	title: 'Catalogue Al Fakher 8K - Vape & More',
	description: `Les ${alFakherProducts.length} arômes Al Fakher 8K, leurs photos et leurs descriptions.`,
};

export default async function AlFakherCataloguePage() {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} catalogOnly catalogueBrand="al-fakher-8k" />;
}
