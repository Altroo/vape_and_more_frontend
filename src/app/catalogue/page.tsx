import type { Metadata } from 'next';
import { VapeSite } from '@/components/vapeSite';
import { fetchSiteContent } from '@/utils/siteApi';

export const metadata: Metadata = {
	title: 'Catalogue Adalya 15K - Vape & More',
	description:
		'Découvrez les 18 références Adalya 15K, leurs photographies et leurs profils aromatiques dans le catalogue Vape & More.',
};

const CataloguePage = async () => {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} catalogOnly />;
};

export default CataloguePage;
