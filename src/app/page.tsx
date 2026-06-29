import { VapeSite } from '@/components/vapeSite';
import { fetchSiteContent } from '@/utils/siteApi';

const HomePage = async () => {
	const siteContent = await fetchSiteContent();
	return <VapeSite siteContent={siteContent} />;
};

export default HomePage;
