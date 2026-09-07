import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vape-and-more.ma';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: 'Vape & More - Produits de vape officiels',
	description: 'Vape & More propose des produits de vape officiels, des conseils en boutique et un catalogue avec commande WhatsApp.',
	robots: {
		index: true,
		follow: true,
	},
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<html lang="fr">
		<body>{children}</body>
	</html>
);

export default RootLayout;
