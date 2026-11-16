import type { Metadata } from 'next';
import { VapeSite } from '@/components/vapeSite';
import { adalyaProducts } from '@/data/adalyaCatalogue';
import { alFakherProducts } from '@/data/alFakherCatalogue';
import { fetchSiteContent } from '@/utils/siteApi';

export const metadata: Metadata = {
	title: 'Catalogue - Vape & More',
	description: `Les deux collections Vape & More : ${adalyaProducts.length} arômes Adalya 15K et ${alFakherProducts.length} arômes Al Fakher 8K, avec photos et descriptions.`,
};

const CataloguePage = async () => {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} catalogOnly />;
};

export default CataloguePage;
