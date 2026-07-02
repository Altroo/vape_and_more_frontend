import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vape-and-more.ma').replace(/\/$/, '');

const toUrl = (path: string) => `${siteUrl}${path}`;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const lastModified = new Date();

	return [
		{
			url: toUrl('/'),
			lastModified,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: toUrl('/catalogue'),
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
	];
};

export default sitemap;
