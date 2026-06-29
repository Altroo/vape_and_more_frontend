'use client';

import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { languages, translations, type LanguageCode } from '@/data/translations';
import type { Brand, Product, PromotionPack, Shop, SiteContent } from '@/utils/siteApi';

type VapeSiteProps = {
	siteContent: SiteContent;
	catalogOnly?: boolean;
};

type TranslationTree = (typeof translations)[LanguageCode];

const ageStorageKey = 'vape_more_age_verified_until';
const langStorageKey = 'vape_more_lang';
const fallbackHeroImages = [
	{ key: 'fallback-1', image: '/assets/photo-01.png', alt: '', sort_order: 1 },
	{ key: 'fallback-2', image: '/assets/photo-02.png', alt: '', sort_order: 2 },
	{ key: 'fallback-3', image: '/assets/photo-03.png', alt: '', sort_order: 3 },
];

const footerCopy = {
	fr: {
		navigation: 'Navigation',
		promotions: 'Promotions',
		brands: 'Nos marques',
		contact: 'Contact',
		city: 'Casablanca, Maroc',
		newsletterTitle: 'Rejoignez notre newsletter',
		newsletterLabel: 'Adresse e-mail',
		newsletterPlaceholder: 'Votre e-mail',
		newsletterJoin: 'Rejoindre',
		newsletterSuccess: "Merci. Votre demande d'inscription est prête à être envoyée.",
		newsletterError: 'Veuillez entrer une adresse e-mail valide.',
		newsletterSubject: 'Inscription newsletter Vape & More',
		newsletterBody: 'Bonjour, veuillez ajouter cette adresse à la newsletter Vape & More : {email}',
		rights: '© 2026 Vape & More — Tous droits réservés',
	},
	ar: {
		navigation: 'التنقل',
		promotions: 'العروض',
		brands: 'علاماتنا التجارية',
		contact: 'التواصل',
		city: 'الدار البيضاء، المغرب',
		newsletterTitle: 'انضموا إلى نشرتنا البريدية',
		newsletterLabel: 'البريد الإلكتروني',
		newsletterPlaceholder: 'بريدك الإلكتروني',
		newsletterJoin: 'انضم',
		newsletterSuccess: 'شكرا. طلب الاشتراك جاهز للإرسال.',
		newsletterError: 'يرجى إدخال بريد إلكتروني صحيح.',
		newsletterSubject: 'اشتراك في نشرة Vape & More',
		newsletterBody: 'مرحبا، يرجى إضافة هذا البريد الإلكتروني إلى نشرة Vape & More: {email}',
		rights: '© 2026 Vape & More — جميع الحقوق محفوظة',
	},
	en: {
		navigation: 'Navigation',
		promotions: 'Promotions',
		brands: 'Brands',
		contact: 'Contact',
		city: 'Casablanca, Morocco',
		newsletterTitle: 'Join our newsletter',
		newsletterLabel: 'Email address',
		newsletterPlaceholder: 'Your email',
		newsletterJoin: 'Join',
		newsletterSuccess: 'Thank you. Your subscription request is ready to send.',
		newsletterError: 'Please enter a valid e-mail address.',
		newsletterSubject: 'Vape & More newsletter subscription',
		newsletterBody: 'Hello, please add this e-mail address to the Vape & More newsletter: {email}',
		rights: '© 2026 Vape & More — All rights reserved',
	},
	es: {
		navigation: 'Navegación',
		promotions: 'Promociones',
		brands: 'Marcas',
		contact: 'Contacto',
		city: 'Casablanca, Marruecos',
		newsletterTitle: 'Únete a nuestra newsletter',
		newsletterLabel: 'Correo electrónico',
		newsletterPlaceholder: 'Tu e-mail',
		newsletterJoin: 'Suscribirme',
		newsletterSuccess: 'Gracias. Tu solicitud de suscripción está lista para enviarse.',
		newsletterError: 'Introduce un e-mail válido.',
		newsletterSubject: 'Suscripción newsletter Vape & More',
		newsletterBody: 'Hola, por favor añade este e-mail a la newsletter de Vape & More: {email}',
		rights: '© 2026 Vape & More — Todos los derechos reservados',
	},
} satisfies Record<LanguageCode, Record<string, string>>;

const isLanguageCode = (value: string | null): value is LanguageCode =>
	languages.some((language) => language.code === value);

const getStoredLanguage = (fallback: LanguageCode) => {
	if (typeof window === 'undefined') return fallback;
	const saved = window.localStorage.getItem(langStorageKey);
	if (isLanguageCode(saved)) return saved;
	const browserLanguage = window.navigator.language.slice(0, 2);
	return isLanguageCode(browserLanguage) ? browserLanguage : fallback;
};

const localized = <T,>(values: Partial<Record<LanguageCode, T>> | undefined, language: LanguageCode, fallback: T): T =>
	values?.[language] ?? values?.fr ?? fallback;

const imageSrc = (source: string | undefined, fallback = '/assets/logo-vm.png') => source || fallback;

const waHref = (phone: string, message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const homeAnchor = (id: string, catalogOnly?: boolean) => (catalogOnly ? `/#${id}` : `#${id}`);

const brandListFromProducts = (products: Product[]) => {
	const brands = new Map<string, string>();
	products.forEach((product) => brands.set(product.brand_key, product.brand));
	return Array.from(brands.entries()).map(([key, label]) => ({ key, label }));
};

const PhoneIcon = () => (
	<svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
		<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.24 1.01l-2.21 2.2Z" />
	</svg>
);

const MailIcon = () => (
	<svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
		<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.07 4.72a1 1 0 0 1-1.1 0L4.4 8.25V6.9l7.6 5.08 7.6-5.08Z" />
	</svg>
);

const InstagramIcon = () => (
	<svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
		<path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 1.8A3.96 3.96 0 0 0 3.8 7.75v8.5a3.96 3.96 0 0 0 3.95 3.95h8.5a3.96 3.96 0 0 0 3.95-3.95v-8.5a3.96 3.96 0 0 0-3.95-3.95Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.2A5.8 5.8 0 1 1 6.2 12 5.8 5.8 0 0 1 12 6.2Zm0 1.8A4 4 0 1 0 16 12a4 4 0 0 0-4-4Z" />
	</svg>
);

const TikTokIcon = () => (
	<svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 24 24" width="24">
		<path d="M15.57 2h2.92a4.57 4.57 0 0 0 3.51 3.52v2.94a7.38 7.38 0 0 1-3.83-1.08v7.08a6.46 6.46 0 1 1-6.47-6.46c.34 0 .68.03 1.01.08v3.01a3.59 3.59 0 1 0 2.86 3.52Z" />
	</svg>
);

const AgeGate = ({ t }: { t: TranslationTree }) => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const savedUntil = Number(window.localStorage.getItem(ageStorageKey) || 0);
		setIsVisible(savedUntil <= Date.now());
	}, []);

	if (!isVisible) return null;

	const confirmAge = () => {
		const thirtyDays = 30 * 24 * 60 * 60 * 1000;
		window.localStorage.setItem(ageStorageKey, String(Date.now() + thirtyDays));
		setIsVisible(false);
	};

	return (
		<div className="age-gate" id="ageGate" role="dialog" aria-modal="true" aria-labelledby="ageGateTitle">
			<div className="age-gate-card">
				<div className="age-gate-top">{t.age.top}</div>
				<div className="age-gate-body">
					<img className="age-gate-logo" src="/assets/logo-vm.png" alt="Vape & More" />
					<h2 id="ageGateTitle">VAPE & MORE</h2>
					<p>{t.age.copy}</p>
					<div className="age-gate-actions">
						<button className="age-yes" type="button" onClick={confirmAge}>
							{t.age.yes}
						</button>
						<button className="age-no" type="button" onClick={() => window.location.assign('https://www.google.com')}>
							{t.age.no}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = ({
	language,
	t,
	catalogOnly,
	onLanguageChange,
}: {
	language: LanguageCode;
	t: TranslationTree;
	catalogOnly?: boolean;
	onLanguageChange: (language: LanguageCode) => void;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const closeMenu = () => setIsOpen(false);

	return (
		<nav aria-label="Navigation principale">
			<a aria-label="Vape and More — Accueil" className="nav-logo" href={catalogOnly ? '/' : '#accueil'} onClick={closeMenu}>
				<img alt="Logo VM Vape and More" src="/assets/logo-vm.png" />
				<div className="nav-logo-text">
					<strong>Vape & More</strong>
					<span>{t.nav.tagline}</span>
				</div>
			</a>
			<button
				aria-controls="main-navigation"
				aria-expanded={isOpen}
				aria-label="Ouvrir le menu"
				className={`nav-toggle${isOpen ? ' is-open' : ''}`}
				type="button"
				onClick={() => setIsOpen((current) => !current)}
			>
				<span aria-hidden="true" />
			</button>
			<ul className={`nav-links${isOpen ? ' is-open' : ''}`} id="main-navigation">
				<li>
					<a href={catalogOnly ? '/' : '#accueil'} onClick={closeMenu}>
						{t.nav.home}
					</a>
				</li>
				<li>
					<a href={homeAnchor('a-propos', catalogOnly)} onClick={closeMenu}>
						{t.nav.about}
					</a>
				</li>
				<li>
					<a href={homeAnchor('nos-marques', catalogOnly)} onClick={closeMenu}>
						{t.nav.brands}
					</a>
				</li>
				<li>
					<a href={homeAnchor('boutiques', catalogOnly)} onClick={closeMenu}>
						{t.nav.shops}
					</a>
				</li>
				<li>
					<a href="/catalogue" aria-current={catalogOnly ? 'page' : undefined} onClick={closeMenu}>
						{t.nav.catalog}
					</a>
				</li>
				<li>
					<a href={homeAnchor('promotion', catalogOnly)} onClick={closeMenu}>
						{t.nav.promo}
					</a>
				</li>
				<li>
					<a href={homeAnchor('contact', catalogOnly)} onClick={closeMenu}>
						{t.nav.contact}
					</a>
				</li>
			</ul>
			<div className="language-switcher" id="languageSwitcher" aria-label="Sélecteur de langue">
				{languages.map((item) => (
					<button
						className={`lang-option${item.code === language ? ' is-active' : ''}`}
						type="button"
						key={item.code}
						onClick={() => onLanguageChange(item.code)}
						aria-pressed={item.code === language}
					>
						<span aria-hidden="true">{item.flag}</span>
						<span>{item.short}</span>
					</button>
				))}
			</div>
		</nav>
	);
};

const Marquee = ({ t }: { t: TranslationTree }) => (
	<div className="vm-marquee">
		<div className="vm-marquee-track">
			{Array.from({ length: 3 }).map((_, index) => (
				<span key={`age-${index}`}>{t.tickerAge}</span>
			))}
			{Array.from({ length: 3 }).map((_, index) => (
				<span key={`ticker-${index}`}>{t.ticker}</span>
			))}
		</div>
	</div>
);

const Hero = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => {
	const images = siteContent.heroImages.length > 0 ? siteContent.heroImages : fallbackHeroImages;
	const slides = images;
	const slideSeconds = 6;
	const animationDuration = `${slides.length * slideSeconds}s`;

	return (
		<section className="hero hero-photo" id="accueil">
			<div className="hero-photo-stage" aria-hidden="true">
				{slides.map((image, index) => (
					<img
						className={`hero-photo-slide${index === 0 ? ' is-active' : ''}`}
						src={imageSrc(image.image)}
						alt={image.alt || ''}
						key={image.key}
						style={{
							animationDelay: `${index * slideSeconds}s`,
							animationDuration,
						}}
					/>
				))}
			</div>
			<div className="hero-photo-shade" aria-hidden="true" />
			<div className="hero-copy">
				<div className="hero-kicker">{t.hero.eyebrow}</div>
				<h1 className="hero-title">
					{t.hero.titleLines.map((line) => (
						<span key={line}>{line}</span>
					))}
				</h1>
				<p className="hero-desc">{t.hero.description}</p>
				<div className="hero-cta">
					<a className="hero-aurora-button" href="/catalogue">
						<span>{t.hero.primaryCta}</span>
					</a>
				</div>
			</div>
		</section>
	);
};

const Features = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => {
	const brandCount = siteContent.counts.officialBrands || siteContent.brands.length;
	const shopCount = siteContent.counts.officialShops || siteContent.shops.filter((shop) => shop.current).length;

	return (
		<div aria-label="Points forts" className="features">
			<div className="features-inner">
				<div className="feat">
					<div className="feat-mark" />
					<div className="feat-num">{brandCount}</div>
					<div className="feat-label">{t.features.brands}</div>
				</div>
				<div className="feat">
					<div className="feat-mark" />
					<div className="feat-num">{shopCount}</div>
					<div className="feat-label">{t.features.store}</div>
				</div>
				<div className="feat">
					<div className="feat-mark" />
					<div className="feat-num">100%</div>
					<div className="feat-label">{t.features.authentic}</div>
				</div>
			</div>
		</div>
	);
};

const About = ({ t }: { t: TranslationTree }) => (
	<section className="section about reveal visible" id="a-propos">
		<div className="about-layout">
			<div className="about-visual">
				<img alt="Boutique Vape & More" loading="lazy" src="/assets/STORE.png" />
			</div>
			<div className="about-content">
				<div className="section-label">Vape & More</div>
				<h2 className="about-title">{t.about.title}</h2>
				<p className="about-lead">
					<strong>{t.about.lead}</strong>
				</p>
				<p>{t.about.copy1}</p>
				<p>{t.about.copy2}</p>
				<a className="btn-primary about-button" href="#contact">
					{t.nav.contact}
				</a>
			</div>
		</div>
	</section>
);

const Brands = ({ brands, language, t }: { brands: Brand[]; language: LanguageCode; t: TranslationTree }) => (
	<section className="brands-dark-section reveal visible" id="nos-marques">
		<div className="section-kicker">{t.brands.kicker}</div>
		<h2>{t.brands.title}</h2>
		<p className="brands-dark-intro">{t.brands.intro}</p>
		<div className="brands-dark-grid" id="brandGrid" aria-live="polite">
			{brands.map((brand) => {
				const copy = localized(brand.texts, language, { headline: brand.label, copy: '' });
				return (
					<article className="brand-dark-card" key={brand.key}>
						<div className="brand-dark-top">
							<img className="brand-logo" src={imageSrc(brand.logo || brand.image)} alt={copy.headline || brand.label} loading="lazy" />
						</div>
						<div className="brand-dark-content">
							<h3>{copy.headline || brand.label}</h3>
							<p>{copy.copy}</p>
						</div>
					</article>
				);
			})}
		</div>
	</section>
);

const Shops = ({ shops, language, t }: { shops: Shop[]; language: LanguageCode; t: TranslationTree }) => (
	<section className="location shops-section reveal visible" id="boutiques">
		<div className="section-label">{t.shops.kicker}</div>
		<h2 className="section-title">{t.shops.title}</h2>
		<p className="shops-intro">{t.shops.intro}</p>
		<div className="shops-grid" id="shopsGrid" aria-live="polite">
			{shops.map((shop) => {
				const copy = localized(shop.texts, language, { name: shop.key, address: '', hours: '' });
				const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(shop.map_query || copy.address)}&output=embed`;
				return (
					<article className="shop-card" key={shop.key}>
						<div className="shop-info">
							<span className="shop-status">{shop.current ? t.shops.current : t.shops.comingSoon}</span>
							<h3>{copy.name}</h3>
							<div className="location-address">
								<div className="addr-row">
									<div className="addr-label">{t.shops.address}</div>
									<div className="addr-text">{copy.address}</div>
								</div>
								<div className="addr-row">
									<div className="addr-label">{t.shops.hours}</div>
									<div className="addr-text">
										<strong>{copy.hours}</strong>
									</div>
								</div>
							</div>
							<a className="btn-primary" href={shop.directions} rel="noopener" target="_blank">
								{t.common.directions}
							</a>
						</div>
						<div className="map-frame">
							<iframe allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc} title={copy.name} />
						</div>
					</article>
				);
			})}
		</div>
	</section>
);

const PromotionPacks = ({
	packs,
	language,
	t,
	phone,
}: {
	packs: PromotionPack[];
	language: LanguageCode;
	t: TranslationTree;
	phone: string;
}) => (
	<section className="promo-packs reveal visible" id="promotion">
		<div className="section-kicker">{t.promo.kicker}</div>
		<h2>{t.promo.title}</h2>
		<p className="promo-intro">{t.promo.intro}</p>
		<div className="promo-grid final-promo-grid">
			{packs.map((pack, index) => {
				const copy = localized(pack.texts, language, { title: pack.key, target: '', description: '' });
				const message = localized(pack.whatsapp_messages, language, copy.title);
				const gallery = pack.images.length > 0 ? pack.images.map((item) => item.image) : [pack.image];
				const isSolo = gallery.length > 1;
				return (
					<article className={`promo-card${isSolo ? ' solo-pack' : ''}`} key={pack.key}>
						{pack.discount_label ? <span className={`discount${pack.is_best_offer ? ' best' : ''}`}>{pack.discount_label}</span> : null}
						{isSolo ? (
							<div className="solo-slider" aria-label="Vapes Solo Nerd 20K disponibles">
								{gallery.map((image, imageIndex) => (
									<div className="solo-slide" key={`${image}-${imageIndex}`}>
										<img src={imageSrc(image)} alt={copy.title} loading="lazy" />
									</div>
								))}
							</div>
						) : (
							<div className={`pack-visual single-pack${index === 1 ? ' trio' : ''}`}>
								<img src={imageSrc(gallery[0])} alt={copy.title} loading="lazy" />
							</div>
						)}
						<div className="promo-content">
							<h3>{copy.title}</h3>
							<p className="target">{copy.target}</p>
							<p>{copy.description}</p>
							<div className="price-row">
								{pack.old_price ? <del>{pack.old_price}</del> : null}
								<strong>{pack.price}</strong>
							</div>
							<a className="btn-primary" href={waHref(phone, message)} target="_blank" rel="noopener">
								{t.common.whatsappOrder}
							</a>
						</div>
					</article>
				);
			})}
		</div>
	</section>
);

const ProductCatalog = ({
	products,
	language,
	t,
	phone,
}: {
	products: Product[];
	language: LanguageCode;
	t: TranslationTree;
	phone: string;
}) => {
	const brands = useMemo(() => brandListFromProducts(products), [products]);
	const [activeBrand, setActiveBrand] = useState('all');
	const visibleProducts = activeBrand === 'all' ? products : products.filter((product) => product.brand_key === activeBrand);

	return (
		<main className="catalog-page-main">
			<section className="catalog-section catalog-page-section reveal visible" id="catalogue">
				<div className="section-kicker">{t.catalog.kicker}</div>
				<h1>{t.catalog.title}</h1>
				<p className="catalog-intro">{t.catalog.intro}</p>
				<div className="catalog-toolbar" id="catalogFilters" aria-label="Filtres catalogue">
					<button className={`catalog-filter${activeBrand === 'all' ? ' is-active' : ''}`} type="button" onClick={() => setActiveBrand('all')}>
						{t.common.all}
					</button>
					{brands.map((brand) => (
						<button
							className={`catalog-filter${activeBrand === brand.key ? ' is-active' : ''}`}
							type="button"
							key={brand.key}
							onClick={() => setActiveBrand(brand.key)}
						>
							{brand.label}
						</button>
					))}
				</div>
				<div className="catalog-grid" id="catalogGrid" aria-live="polite">
					{visibleProducts.map((product) => {
						const copy = localized(product.texts, language, { name: product.key, description: '', flavors: [] });
						const price = localized(product.price, language, '');
						const message = t.common.whatsappProduct.replace('{product}', copy.name);
						return (
							<article className="catalog-card" key={product.key}>
								<div className="catalog-image">
									<img src={imageSrc(product.image)} alt={copy.name} loading="lazy" />
								</div>
								<div className="catalog-content">
									<div className="product-brand">{product.brand}</div>
									<h3>{copy.name}</h3>
									<p>{copy.description}</p>
									<div className="catalog-flavors">
										<strong>{t.common.flavors}</strong>
										<span>{copy.flavors.join(' / ')}</span>
									</div>
									<div className="catalog-bottom">
										<div className="catalog-price">
											<span>{t.common.price}</span>
											<strong>{price}</strong>
										</div>
										<a className="btn-primary" href={waHref(phone, message)} target="_blank" rel="noopener">
											{t.common.whatsappOrder}
										</a>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
};

const Contact = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => (
	<section className="social-section contact-section reveal visible" id="contact">
		<div className="section-label">{t.contact.kicker}</div>
		<h2 className="section-title">{t.contact.title}</h2>
		<p>{t.contact.intro}</p>
		<div className="social-cards">
			<a className="social-card" href={waHref(siteContent.phone, 'Bonjour, je souhaite contacter Vape & More.')} target="_blank" rel="noopener">
				<span aria-hidden="true" className="social-logo">
					<PhoneIcon />
				</span>
				<div className="social-name">{t.contact.phone}</div>
				<div className="social-handle">07 64 37 51 56</div>
			</a>
			<a className="social-card" href={`mailto:${siteContent.email}`}>
				<span aria-hidden="true" className="social-logo">
					<MailIcon />
				</span>
				<div className="social-name">{t.contact.email}</div>
				<div className="social-handle">{siteContent.email}</div>
			</a>
			<a className="social-card" href="https://www.instagram.com/vapeandmoreofficial" rel="noopener" target="_blank">
				<span aria-hidden="true" className="social-logo">
					<InstagramIcon />
				</span>
				<div className="social-name">Instagram</div>
				<div className="social-handle">@vapeandmoreofficial</div>
			</a>
			<a className="social-card" href="https://www.tiktok.com/@vapeandmoreofficial" rel="noopener" target="_blank">
				<span aria-hidden="true" className="social-logo">
					<TikTokIcon />
				</span>
				<div className="social-name">TikTok</div>
				<div className="social-handle">@vapeandmoreofficial</div>
			</a>
		</div>
		<p className="legal-note">{t.legal}</p>
	</section>
);

const CatalogFab = ({ t }: { t: TranslationTree }) => (
	<a className="catalog-fab" href="/catalogue" aria-label={t.nav.catalog}>
		<span className="catalog-fab-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" width="20" height="20" fill="none">
				<path d="M5 6.5h14M5 12h14M5 17.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				<path d="M4.5 4.5h15a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
			</svg>
		</span>
		<span>{t.nav.catalog}</span>
	</a>
);

const Footer = ({
	siteContent,
	language,
	t,
	catalogOnly,
}: {
	siteContent: SiteContent;
	language: LanguageCode;
	t: TranslationTree;
	catalogOnly?: boolean;
}) => {
	const footer = footerCopy[language];
	const [email, setEmail] = useState('');
	const [status, setStatus] = useState('');
	const [isError, setIsError] = useState(false);
	const brandLinks = siteContent.brands.length > 0 ? siteContent.brands : [];

	const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const trimmed = email.trim();
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
		if (!isValid) {
			setIsError(true);
			setStatus(footer.newsletterError);
			return;
		}
		setIsError(false);
		setStatus(footer.newsletterSuccess);
		const subject = encodeURIComponent(footer.newsletterSubject);
		const body = encodeURIComponent(footer.newsletterBody.replace('{email}', trimmed));
		window.location.href = `mailto:${siteContent.email}?subject=${subject}&body=${body}`;
	};

	return (
		<footer className="premium-footer">
			<div className="footer-glow" />
			<div className="premium-footer-grid">
				<div className="footer-brand-block">
					<img src="/assets/logo-vm.png" alt="Vape & More" className="footer-logo-white" />
					<p>{t.nav.tagline}</p>
				</div>
				<div className="footer-links-grid">
					<div className="footer-col">
						<h4>{footer.navigation}</h4>
						<a href={catalogOnly ? '/' : '#accueil'}>{t.nav.home}</a>
						<a href={homeAnchor('a-propos', catalogOnly)}>{t.nav.about}</a>
						<a href={homeAnchor('nos-marques', catalogOnly)}>{t.nav.brands}</a>
						<a href={homeAnchor('boutiques', catalogOnly)}>{t.nav.shops}</a>
						<a href="/catalogue">{t.nav.catalog}</a>
						<a href={homeAnchor('promotion', catalogOnly)}>{footer.promotions}</a>
						<a href={homeAnchor('contact', catalogOnly)}>{footer.contact}</a>
					</div>
					<div className="footer-col">
						<h4>{footer.brands}</h4>
						{brandLinks.map((brand) => (
							<a href={homeAnchor('nos-marques', catalogOnly)} key={brand.key}>
								{brand.label}
							</a>
						))}
					</div>
					<div className="footer-col">
						<h4>{footer.contact}</h4>
						<a href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
						<a href={waHref(siteContent.phone, 'Bonjour, je souhaite contacter Vape & More.')} target="_blank" rel="noopener">
							+212 764 37 51 56
						</a>
						<span>{footer.city}</span>
					</div>
				</div>
			</div>
			<div className="footer-newsletter" aria-labelledby="footerNewsletterTitle">
				<h3 id="footerNewsletterTitle">{footer.newsletterTitle}</h3>
				<form className="footer-newsletter-form" noValidate onSubmit={submitNewsletter}>
					<label className="footer-newsletter-label" htmlFor="footerNewsletterEmail">
						{footer.newsletterLabel}
					</label>
					<div className="footer-newsletter-row">
						<input
							id="footerNewsletterEmail"
							name="email"
							type="email"
							autoComplete="email"
							required
							placeholder={footer.newsletterPlaceholder}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<button className="footer-newsletter-button" type="submit" aria-label={footer.newsletterJoin}>
							<span aria-hidden="true">→</span>
							<strong>{footer.newsletterJoin}</strong>
						</button>
					</div>
					<p className={`footer-newsletter-status${isError ? ' is-error' : ''}`} aria-live="polite">
						{status}
					</p>
				</form>
			</div>
			<div className="footer-bottom">{footer.rights}</div>
		</footer>
	);
};

export const VapeSite = ({ siteContent, catalogOnly = false }: VapeSiteProps) => {
	const defaultLang = siteContent.defaultLang || 'fr';
	const [language, setLanguage] = useState<LanguageCode>(defaultLang);

	useEffect(() => {
		setLanguage(getStoredLanguage(defaultLang));
	}, [defaultLang]);

	useEffect(() => {
		const dir = languages.find((item) => item.code === language)?.dir || 'ltr';
		document.documentElement.lang = language;
		document.documentElement.dir = dir;
		document.body.dir = dir;
		if (catalogOnly) {
			document.body.dataset.page = 'catalogue';
		} else {
			document.body.removeAttribute('data-page');
		}
		document.body.classList.toggle('is-rtl', dir === 'rtl');
		window.localStorage.setItem(langStorageKey, language);
		return () => {
			document.body.classList.remove('is-rtl');
			document.body.removeAttribute('data-page');
		};
	}, [catalogOnly, language]);

	const t = translations[language];

	return (
		<>
			{catalogOnly ? null : <AgeGate t={t} />}
			<div className="content">
				<Header language={language} t={t} catalogOnly={catalogOnly} onLanguageChange={setLanguage} />
				<Marquee t={t} />
				{catalogOnly ? (
					<ProductCatalog products={siteContent.catalog} language={language} t={t} phone={siteContent.phone} />
				) : (
					<>
						<Hero siteContent={siteContent} t={t} />
						<Features siteContent={siteContent} t={t} />
						<About t={t} />
						<Brands brands={siteContent.brands} language={language} t={t} />
						<Shops shops={siteContent.shops} language={language} t={t} />
						<PromotionPacks packs={siteContent.promotionPacks} language={language} t={t} phone={siteContent.phone} />
						<Contact siteContent={siteContent} t={t} />
						<CatalogFab t={t} />
					</>
				)}
				<Footer siteContent={siteContent} language={language} t={t} catalogOnly={catalogOnly} />
			</div>
		</>
	);
};
