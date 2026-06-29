import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
	title: 'Vape & More - Produits de vape officiels',
	description: 'Vape & More propose des produits de vape officiels, des conseils en boutique et un catalogue avec commande WhatsApp.',
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
	<html lang="fr">
		<head>
			<link href="/css/fonts.css" rel="stylesheet" />
			<link href="/css/style.css" rel="stylesheet" />
		</head>
		<body>{children}</body>
	</html>
);

export default RootLayout;
