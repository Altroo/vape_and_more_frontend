'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { adalyaProducts } from '@/data/adalyaCatalogue';
import { translations, type LanguageCode } from '@/data/translations';
import { WhatsAppOrderButton } from '@/components/whatsAppOrderButton';
import styles from './adalyaCatalogue.module.css';

const alphabetFilters = [
	{ key: 'ag', label: 'A - G' },
	{ key: 'hm', label: 'H - M' },
	{ key: 'nz', label: 'N - Z' },
] as const;

const normalize = (value: string) =>
	value
		.toLocaleLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim();

const SearchIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="10.8" cy="10.8" r="6.8" />
		<path d="m16 16 4.5 4.5" />
	</svg>
);

const ExpandIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M7 17 17 7M7 7h10v10" />
	</svg>
);

export const AdalyaCatalogue = ({ language, phone }: { language: LanguageCode; phone: string }) => {
	const copy = translations[language].catalog;
	const orderButton = (name: string) => {
		const productName = `ADALYA 15K - ${name}`;
		return (
			<WhatsAppOrderButton
				phone={phone}
				message={copy.whatsappMessage.replace('{product}', productName)}
				label={copy.order}
				ariaLabel={`${translations[language].common.whatsappOrder}: ${productName}`}
				className={styles.orderButton}
			/>
		);
	};
	const [query, setQuery] = useState('');
	const [activeFilter, setActiveFilter] = useState('all');
	const [currentPhoto, setCurrentPhoto] = useState(0);
	const [isPhotoOpen, setIsPhotoOpen] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const total = adalyaProducts.length;
	const filteredProducts = adalyaProducts.filter(
		(product) =>
			(activeFilter === 'all' || product.group === activeFilter) &&
			normalize(`${product.name} ${product.descriptions[language]}`).includes(normalize(query)),
	);
	const selectedProduct = adalyaProducts[currentPhoto];
	const photoAlt = (name: string) => copy.imageAlt.replace('{product}', name);
	const resultStatus = copy.resultStatus
		.replace('{count}', String(filteredProducts.length))
		.replace('{total}', String(total));

	useEffect(() => {
		const focusSearch = (event: KeyboardEvent) => {
			const target = event.target;
			if (
				isPhotoOpen ||
				event.key !== '/' ||
				event.ctrlKey ||
				event.metaKey ||
				event.altKey ||
				(target instanceof HTMLElement && (target.matches('input, textarea, select') || target.isContentEditable))
			)
				return;
			event.preventDefault();
			searchRef.current?.focus();
		};
		window.addEventListener('keydown', focusSearch);
		return () => window.removeEventListener('keydown', focusSearch);
	}, [isPhotoOpen]);

	useEffect(() => {
		if (!isPhotoOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isPhotoOpen]);

	const openPhoto = (index: number) => {
		setCurrentPhoto(index);
		dialogRef.current?.showModal();
		setIsPhotoOpen(true);
	};
	const changePhoto = (offset: number) => setCurrentPhoto((index) => (index + offset + total) % total);
	const closePhoto = () => dialogRef.current?.close();
	const resetSearch = () => {
		setQuery('');
		setActiveFilter('all');
		searchRef.current?.focus();
	};

	return (
		<main className={styles.main}>
			<section className={styles.section} id="catalogue" aria-labelledby="catalogue-title">
				<div className={styles.wrap}>
					<div className={styles.intro}>
						<div>
							<p className={styles.eyebrow}>
								VAPE & MORE <span aria-hidden="true">/</span> {copy.kicker}
							</p>
							<h1 id="catalogue-title" className={styles.title} dir="ltr">
								ADALYA <span>15K</span>
							</h1>
							<p className={styles.introDescription}>{copy.intro}</p>
						</div>
						<div className={styles.edition}>
							<p className={styles.eyebrow}>
								{copy.index} <ExpandIcon />
							</p>
							<strong>
								{total}
								<span>{copy.references}</span>
							</strong>
						</div>
					</div>

					<div className={styles.heading}>
						<div>
							<p className={styles.eyebrow}>{copy.collection}</p>
							<h2>
								{copy.allFlavours}
								<span>{filteredProducts.length}</span>
							</h2>
						</div>
						<label className={styles.search}>
							<SearchIcon />
							<span className={styles.srOnly}>{copy.search}</span>
							<input
								ref={searchRef}
								type="search"
								placeholder={copy.searchPlaceholder}
								autoComplete="off"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
							/>
							<kbd aria-hidden="true">/</kbd>
						</label>
					</div>
					<div className={styles.controls}>
						<div className={styles.filters} role="group" aria-label={copy.filterLabel}>
							<button type="button" aria-pressed={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
								{copy.all}
								<span>{total}</span>
							</button>
							{alphabetFilters.map((filter) => (
								<button
									type="button"
									key={filter.key}
									aria-pressed={activeFilter === filter.key}
									onClick={() => setActiveFilter(filter.key)}
									dir="ltr"
								>
									{filter.label}
								</button>
							))}
						</div>
						<p className={styles.hint}>
							<ExpandIcon />
							{copy.photoHint}
						</p>
					</div>

					{filteredProducts.length > 0 ? (
						<div className={styles.grid}>
							{filteredProducts.map((product, index) => {
								const productIndex = adalyaProducts.indexOf(product);
								return (
									<article
										className={styles.card}
										key={product.id}
										style={{ '--product-accent': product.accent } as CSSProperties}
									>
										<button
											className={styles.photo}
											type="button"
											aria-label={copy.enlarge.replace('{product}', product.name)}
											onClick={() => openPhoto(productIndex)}
										>
											<Image
												src={`/assets/catalogue/adalya-15k/${product.id}.webp`}
												alt={photoAlt(product.name)}
												width={1254}
												height={1254}
												loading={index < 4 ? 'eager' : 'lazy'}
											/>
											<span className={styles.number} aria-hidden="true">
												{String(productIndex + 1).padStart(2, '0')}
											</span>
											<span className={styles.expand} aria-hidden="true">
												<ExpandIcon />
											</span>
										</button>
										<div className={styles.info}>
											<p className={styles.meta} dir="ltr">
												ADALYA / 15K
											</p>
											<h3 dir="auto">{product.name}</h3>
											<p className={styles.description}>{product.descriptions[language]}</p>
											{orderButton(product.name)}
										</div>
									</article>
								);
							})}
						</div>
					) : (
						<div className={styles.empty}>
							<SearchIcon />
							<h3>{copy.emptyTitle}</h3>
							<p>{copy.emptyCopy}</p>
							<button type="button" onClick={resetSearch}>
								{copy.reset.replace('{total}', String(total))}
							</button>
						</div>
					)}
					<p className={styles.srOnly} role="status" aria-live="polite">
						{resultStatus}
					</p>
					<div className={styles.end}>
						<span />
						ADALYA 15K / {total} {copy.references}
						<span />
					</div>
				</div>
			</section>

			<dialog
				ref={dialogRef}
				className={styles.dialog}
				aria-labelledby="catalogue-photo-title"
				onClose={() => setIsPhotoOpen(false)}
				onClick={(event) => {
					if (event.target !== event.currentTarget) return;
					const bounds = event.currentTarget.getBoundingClientRect();
					if (
						event.clientX < bounds.left ||
						event.clientX > bounds.right ||
						event.clientY < bounds.top ||
						event.clientY > bounds.bottom
					)
						closePhoto();
				}}
				onKeyDown={(event) => {
					if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
						event.preventDefault();
						changePhoto(event.key === 'ArrowRight' ? 1 : -1);
					}
				}}
			>
				<div className={styles.dialogContent}>
					<button className={styles.close} type="button" aria-label={copy.close} onClick={closePhoto}>
						<svg viewBox="0 0 24 24" aria-hidden="true">
							<path d="m6 6 12 12M6 18 18 6" />
						</svg>
					</button>
					<div className={styles.dialogPhoto}>
						<Image
							src={`/assets/catalogue/adalya-15k/${selectedProduct.id}.webp`}
							alt={photoAlt(selectedProduct.name)}
							width={1254}
							height={1254}
						/>
					</div>
					<div className={styles.dialogDetails}>
						<p className={styles.eyebrow} dir="ltr">
							ADALYA / 15K
						</p>
						<h2 id="catalogue-photo-title" dir="auto">
							{selectedProduct.name}
						</h2>
						<p className={styles.description}>{selectedProduct.descriptions[language]}</p>
						{orderButton(selectedProduct.name)}
						<span className={styles.dialogNumber} dir="ltr">
							{String(currentPhoto + 1).padStart(2, '0')} / {total}
						</span>
					</div>
					<div className={styles.dialogNavigation}>
						<button type="button" onClick={() => changePhoto(-1)}>
							{copy.previous}
						</button>
						<span>{copy.keyboardHint}</span>
						<button type="button" onClick={() => changePhoto(1)}>
							{copy.next}
						</button>
					</div>
				</div>
			</dialog>
		</main>
	);
};
