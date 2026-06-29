import type { Metadata } from 'next';
import { VapeSite } from '@/components/vapeSite';
import { fetchSiteContent } from '@/utils/siteApi';

export const metadata: Metadata = {
	title: 'Catalogue produits - Vape & More',
	description: 'Catalogue Vape & More avec produits officiels, prix, saveurs et commande WhatsApp.',
};

const CataloguePage = async () => {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} catalogOnly />;
};

export default CataloguePage;
