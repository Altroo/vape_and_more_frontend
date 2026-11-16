'use client';

import Image from 'next/image';
import Link from 'next/link';
import { catalogues, catalogueCopy } from '@/data/catalogue';
import { translations, type LanguageCode } from '@/data/translations';
import { CatalogueNavigation } from '@/components/catalogueNavigation';
import styles from './catalogue.module.css';

export const CatalogueOverview = ({ language }: { language: LanguageCode }) => {
	const copy = translations[language].catalog;
	return (
		<main className={styles.main}>
			<section className={styles.section} aria-labelledby="catalogue-title">
				<div className={styles.wrap}>
					<div className={styles.intro}>
						<div>
							<p className={styles.eyebrow}>
								<bdi dir="ltr">VAPE & MORE</bdi>
							</p>
							<h1 id="catalogue-title" className={styles.title}>
								{copy.kicker}
							</h1>
							<p className={styles.introDescription}>{catalogueCopy[language].intro}</p>
						</div>
					</div>
					<CatalogueNavigation language={language} />
					<div className={styles.collections}>
						{Object.entries(catalogues).map(([key, catalogue]) => (
							<Link className={styles.collectionCard} href={catalogue.path} key={key}>
								<Image
									src={`/assets/catalogue/${catalogue.imageDirectory}/${catalogue.products[0].id}.webp`}
									alt={catalogue.name}
									width={1254}
									height={1254}
								/>
								<h2>
									<bdi dir="ltr">{catalogue.name}</bdi>
								</h2>
								<p>
									{catalogue.products.length} {copy.references}
								</p>
								<span className={styles.collectionCta}>{catalogueCopy[language].open}</span>
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};
