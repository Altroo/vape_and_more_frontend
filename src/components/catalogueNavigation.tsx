import Link from 'next/link';
import { catalogues, catalogueCopy } from '@/data/catalogue';
import { translations, type LanguageCode } from '@/data/translations';
import type { CatalogueBrand } from '@/types/catalogue';
import styles from './catalogue.module.css';

export const CatalogueNavigation = ({ language, brand }: { language: LanguageCode; brand?: CatalogueBrand }) => (
	<div className={styles.brandNavigation} role="navigation" aria-label={translations[language].nav.catalog}>
		<Link href="/catalogue" aria-current={brand === undefined ? 'page' : undefined}>
			{catalogueCopy[language].chooseBrand}
		</Link>
		{Object.entries(catalogues).map(([key, catalogue]) => (
			<Link key={key} href={catalogue.path} aria-current={brand === key ? 'page' : undefined}>
				<bdi dir="ltr">{catalogue.name}</bdi>
			</Link>
		))}
	</div>
);
