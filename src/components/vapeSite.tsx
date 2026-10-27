'use client';

import { type SubmitEvent, useEffect, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { languages, translations, type LanguageCode } from '@/data/translations';
import {
	ageStorageKey,
	langStorageKey,
	preferencesEvent,
	instagramUrl,
	fallbackHeroImages,
	footerCopy,
	imagePathAliases,
	af15kFlavours,
	af15kCopy,
} from '@/data/rawData';
import type { Af15kFamily, Af15kFlavour, Brand, Shop, SiteContent, VapeSiteProps } from '@/types/site';
import { AdalyaCatalogue } from '@/components/adalyaCatalogue';
import { WhatsAppOrderButton } from '@/components/whatsAppOrderButton';
import { waHref } from '@/utils/whatsapp';

type TranslationTree = (typeof translations)[LanguageCode];

const subscribeToPreferences = (onChange: () => void) => {
	window.addEventListener('storage', onChange);
	window.addEventListener(preferencesEvent, onChange);
	return () => {
		window.removeEventListener('storage', onChange);
		window.removeEventListener(preferencesEvent, onChange);
	};
};

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

const imageSrc = (source: string | undefined, fallback = '/assets/logo-vm.png') => {
	if (!source) return fallback;
	return imagePathAliases[source] ?? source;
};

const heroImageSrc = (source: string | undefined) => {
	if (source === '/assets/photo-01.png') return '/assets/hero-rectif-022.png';
	if (source === '/assets/photo-03.png') return '/assets/hero-bg-02.png';
	return imageSrc(source);
};

const homeAnchor = (id: string, catalogOnly?: boolean) => (catalogOnly ? `/#${id}` : `#${id}`);

const isNerdBrand = (brand: Brand) => brand.key.toLowerCase() === 'nerd' || brand.label.trim().toLowerCase() === 'nerd';

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

const AgeGate = ({ t }: { t: TranslationTree }) => {
	const isVisible = useSyncExternalStore(
		subscribeToPreferences,
		() => Number(window.localStorage.getItem(ageStorageKey) || 0) <= Date.now(),
		() => false,
	);

	if (!isVisible) return null;

	const confirmAge = () => {
		const thirtyDays = 30 * 24 * 60 * 60 * 1000;
		window.localStorage.setItem(ageStorageKey, String(Date.now() + thirtyDays));
		window.dispatchEvent(new Event(preferencesEvent));
	};

	return (
		<div className="age-gate" id="ageGate" role="dialog" aria-modal="true" aria-labelledby="ageGateTitle">
			<div className="age-gate-card">
				<div className="age-gate-top">{t.age.top}</div>
				<div className="age-gate-body">
					<Image className="age-gate-logo" src="/assets/logo-vm.png" alt="Vape & More" width={714} height={374} />
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
			<a
				aria-label="Vape and More — Accueil"
				className="nav-logo"
				href={catalogOnly ? '/' : '#accueil'}
				onClick={closeMenu}
			>
				<Image alt="Logo VM Vape and More" src="/assets/logo-vm.png" width={714} height={374} loading="eager" />
				<div className="nav-logo-text">
					<strong>
						<bdi dir="ltr">Vape & More</bdi>
					</strong>
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
			{[0, 1].map((copy) => (
				<div className="vm-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
					{[t.ticker, t.tickerAge, t.tickerArrivals, t.tickerAge].map((message, index) => (
						<span key={index} dir="auto">
							{message}
						</span>
					))}
				</div>
			))}
		</div>
	</div>
);

const Hero = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => {
	const slides = siteContent.heroImages.length > 0 ? siteContent.heroImages : fallbackHeroImages;
	const slideSeconds = 6;
	const animationDuration = `${slides.length * slideSeconds}s`;

	return (
		<section className="hero hero-photo" id="accueil">
			<div className="hero-photo-stage" aria-hidden="true">
				{slides.map((image, index) => (
					<Image
						fill
						preload={index === 0}
						sizes="100vw"
						className={`hero-photo-slide${index === 0 ? ' is-active' : ''}`}
						src={heroImageSrc(image.image)}
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
				<div className="hero-kicker">
					<bdi dir="ltr">{t.hero.eyebrow}</bdi>
				</div>
				<h1 className="hero-title">
					{t.hero.titleLines.map((line) => (
						<span key={line}>{line}</span>
					))}
				</h1>
				<p className="hero-desc">{t.hero.description}</p>
				<div className="hero-cta">
					<a className="hero-aurora-button" href="#promotion">
						<span>{t.hero.primaryCta}</span>
					</a>
				</div>
			</div>
		</section>
	);
};

const Features = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => {
	const brandCount = 2;
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
				<Image alt="Boutique Vape & More" loading="lazy" src="/assets/STORE.png" width={1254} height={1254} />
			</div>
			<div className="about-content">
				<div className="section-label">
					<bdi dir="ltr">Vape & More</bdi>
				</div>
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
							<Image
								className="brand-logo"
								src={imageSrc(brand.logo || brand.image)}
								alt={copy.headline || brand.label}
								loading="lazy"
								width={230}
								height={125}
							/>
						</div>
						<div className="brand-dark-content">
							<h3>
								<bdi dir="auto">{copy.headline || brand.label}</bdi>
							</h3>
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
							<iframe
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								src={mapSrc}
								title={copy.name}
							/>
						</div>
					</article>
				);
			})}
		</div>
	</section>
);

const Af15kOffer = ({ language, phone }: { language: LanguageCode; phone: string }) => {
	const copy = af15kCopy[language];
	const [activeFamily, setActiveFamily] = useState<Af15kFamily | 'all'>('all');
	const [selectedFlavour, setSelectedFlavour] = useState<Af15kFlavour>(af15kFlavours[0].name);
	const visibleFlavours =
		activeFamily === 'all' ? af15kFlavours : af15kFlavours.filter((flavour) => flavour.family === activeFamily);
	const families = Array.from(new Set(af15kFlavours.map((flavour) => flavour.family)));
	const message = copy.message.replace('{flavour}', selectedFlavour);

	const changeFamily = (nextFamily: Af15kFamily | 'all') => {
		setActiveFamily(nextFamily);
		const firstVisible =
			nextFamily === 'all' ? af15kFlavours[0] : af15kFlavours.find((flavour) => flavour.family === nextFamily);
		if (firstVisible) setSelectedFlavour(firstVisible.name);
	};

	return (
		<section className="promo-packs af15k-offer reveal visible" id="promotion" aria-labelledby="af15k-title">
			<header className="af15k-heading">
				<div className="section-kicker">{copy.kicker}</div>
				<h2 id="af15k-title">
					<bdi dir="ltr">Al Fakher Crown Bar</bdi>
				</h2>
				<p className="promo-intro">{copy.subtitle}</p>
			</header>
			<div className="af15k-card">
				<div className="af15k-product-panel">
					<p className="af15k-limited-badge">{copy.badge}</p>
					<Image
						className="af15k-vapes"
						src="/assets/promos/af15k-vapes.webp"
						alt="Al Fakher AF 15K"
						loading="lazy"
						width={1312}
						height={1199}
					/>
					<span className="af15k-shine" aria-hidden="true" />
					<p className="af15k-image-note">{copy.imageNote}</p>
				</div>

				<div className="af15k-details">
					<h3>{copy.product}</h3>
					<p className="af15k-product-choice">{copy.choice}</p>
					<label className="af15k-field-label" htmlFor="af15k-flavour-family">
						{copy.fieldLabel}
					</label>
					<div className="af15k-select-wrap">
						<select
							id="af15k-flavour-family"
							className="af15k-flavour-select"
							value={activeFamily}
							onChange={(event) => changeFamily(event.target.value as Af15kFamily | 'all')}
						>
							<option value="all">{copy.all}</option>
							{families.map((family) => (
								<option value={family} key={family}>
									{copy.families[family]}
								</option>
							))}
						</select>
					</div>
					<ul className="af15k-flavour-list" aria-live="polite">
						{visibleFlavours.map((flavour) => {
							const flavourIndex = af15kFlavours.indexOf(flavour);
							const backgroundPosition = `${(flavourIndex % 6) * 20}% ${Math.floor(flavourIndex / 6) * 50}%`;
							return (
								<li key={flavour.name}>
									<button
										className={`af15k-flavour-item${flavour.name === selectedFlavour ? ' is-selected' : ''}`}
										type="button"
										onClick={() => setSelectedFlavour(flavour.name)}
									>
										<span className="af15k-fruit-photo" style={{ backgroundPosition }} aria-hidden="true" />
										<span className="af15k-flavour-name">
											<bdi dir="ltr">{flavour.name}</bdi>
										</span>
										<span className="af15k-stock">{copy.available}</span>
									</button>
								</li>
							);
						})}
					</ul>
					<div className="af15k-price">
						<del dir="ltr">230 DH</del>
						<strong dir="ltr">200 DH</strong>
					</div>
					<WhatsAppOrderButton phone={phone} message={message} label={copy.order} />
				</div>
			</div>
			<p className="af15k-footnote">{copy.footnote}</p>
		</section>
	);
};

const Contact = ({ siteContent, t }: { siteContent: SiteContent; t: TranslationTree }) => (
	<section className="social-section contact-section reveal visible" id="contact">
		<div className="section-label">{t.contact.kicker}</div>
		<h2 className="section-title">{t.contact.title}</h2>
		<p>{t.contact.intro}</p>
		<div className="social-cards">
			<a
				className="social-card"
				href={waHref(siteContent.phone, 'Bonjour, je souhaite contacter Vape & More.')}
				target="_blank"
				rel="noopener"
			>
				<span aria-hidden="true" className="social-logo">
					<PhoneIcon />
				</span>
				<div className="social-name">{t.contact.phone}</div>
				<div className="social-handle phone-number" dir="ltr">
					07 64 37 51 56
				</div>
			</a>
			<a className="social-card" href={`mailto:${siteContent.email}`}>
				<span aria-hidden="true" className="social-logo">
					<MailIcon />
				</span>
				<div className="social-name">{t.contact.email}</div>
				<div className="social-handle">
					<bdi dir="ltr">{siteContent.email}</bdi>
				</div>
			</a>
			<a className="social-card" href={instagramUrl} rel="noopener noreferrer" target="_blank">
				<span aria-hidden="true" className="social-logo">
					<InstagramIcon />
				</span>
				<div className="social-name">Instagram</div>
				<div className="social-handle">
					<bdi dir="ltr">@vapeandmore.official</bdi>
				</div>
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
				<path
					d="M4.5 4.5h15a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z"
					stroke="currentColor"
					strokeWidth="1.6"
				/>
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
	const brandLinks = siteContent.brands.filter((brand) => !isNerdBrand(brand));

	const submitNewsletter = (event: SubmitEvent<HTMLFormElement>) => {
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
					<Image src="/assets/logo-vm.png" alt="Vape & More" className="footer-logo-white" width={714} height={374} />
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
								<bdi dir="auto">{brand.label}</bdi>
							</a>
						))}
					</div>
					<div className="footer-col">
						<h4>{footer.contact}</h4>
						<a href={`mailto:${siteContent.email}`}>
							<bdi dir="ltr">{siteContent.email}</bdi>
						</a>
						<a
							className="phone-number"
							dir="ltr"
							href={waHref(siteContent.phone, 'Bonjour, je souhaite contacter Vape & More.')}
							target="_blank"
							rel="noopener"
						>
							+212 764 37 51 56
						</a>
						<span>{footer.city}</span>
						<a
							aria-label="Instagram — Vape & More"
							className="footer-social-button"
							href={instagramUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							<InstagramIcon />
						</a>
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
							dir="auto"
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
	const language = useSyncExternalStore(
		subscribeToPreferences,
		() => getStoredLanguage(defaultLang),
		() => defaultLang,
	);

	const handleLanguageChange = (nextLanguage: LanguageCode) => {
		window.localStorage.setItem(langStorageKey, nextLanguage);
		window.dispatchEvent(new Event(preferencesEvent));
	};

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
		return () => {
			document.body.classList.remove('is-rtl');
			document.body.removeAttribute('data-page');
		};
	}, [catalogOnly, language]);

	const t = translations[language];
	const visibleBrands = siteContent.brands.filter((brand) => !isNerdBrand(brand));

	return (
		<>
			{catalogOnly ? null : <AgeGate t={t} />}
			<div className="content" lang={language} dir={language === 'ar' ? 'rtl' : 'ltr'}>
				<Header language={language} t={t} catalogOnly={catalogOnly} onLanguageChange={handleLanguageChange} />
				<Marquee t={t} />
				{catalogOnly ? (
					<AdalyaCatalogue language={language} phone={siteContent.phone} />
				) : (
					<>
						<Hero siteContent={siteContent} t={t} />
						<Features siteContent={siteContent} t={t} />
						<About t={t} />
						<Brands brands={visibleBrands} language={language} t={t} />
						<Shops shops={siteContent.shops} language={language} t={t} />
						<Af15kOffer language={language} phone={siteContent.phone} />
						<Contact siteContent={siteContent} t={t} />
						<CatalogFab t={t} />
					</>
				)}
				<Footer siteContent={siteContent} language={language} t={t} catalogOnly={catalogOnly} />
			</div>
		</>
	);
};
