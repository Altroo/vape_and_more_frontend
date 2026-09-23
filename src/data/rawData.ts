import type { LanguageCode } from '@/data/translations';
import type { SiteContent } from '@/types/site';

export const ageStorageKey = 'vape_more_age_verified_until';
export const langStorageKey = 'vape_more_lang';
export const preferencesEvent = 'vape-more-preferences-change';

export const instagramUrl = 'https://www.instagram.com/vapeandmore.official/';
export const fallbackHeroImages = [
	{ key: 'fallback-1', image: '/assets/hero-rectif-022.png', alt: '', sort_order: 1 },
	{ key: 'fallback-2', image: '/assets/photo-02.png', alt: '', sort_order: 2 },
	{ key: 'fallback-3', image: '/assets/photo-03.png', alt: '', sort_order: 3 },
];

export const footerCopy = {
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

export const imagePathAliases: Record<string, string> = {
	'/assets/promos/DUO PACK + DRINK.png': '/assets/promos/duo_pack_drink.png',
};

export const catalogueMode: 'image-sheets' | 'products' = 'image-sheets';

export const af15kFlavours = [
	{ name: 'Berry Bleu', family: 'berries' },
	{ name: 'Berry Ice', family: 'berries' },
	{ name: 'Blue Razz Blast', family: 'berries' },
	{ name: 'Blue Razz Lemonade', family: 'berries' },
	{ name: 'Blueberry Mint', family: 'berries' },
	{ name: 'Blueberry Raspberry', family: 'berries' },
	{ name: 'Blue Sour Raspberry', family: 'berries' },
	{ name: 'Cherry Ice', family: 'berries' },
	{ name: 'Hubba', family: 'sweet' },
	{ name: 'Ice Blue', family: 'fresh' },
	{ name: 'Lemon Lime', family: 'citrus' },
	{ name: 'Lemon Lime Cherry Fizz', family: 'citrus' },
	{ name: 'Mango Pineapple', family: 'tropical' },
	{ name: 'Mixed Berry', family: 'berries' },
	{ name: 'Orange Mint', family: 'citrus' },
	{ name: 'Space Dream', family: 'sweet' },
	{ name: 'Summer Dream', family: 'tropical' },
	{ name: 'Watermelon Pineapple', family: 'tropical' },
] as const;

export const af15kCopy = {
	fr: {
		kicker: 'Offre limitée',
		subtitle: 'Choisissez votre saveur et profitez de l’offre.',
		badge: '20 jours seulement',
		imageNote: 'AF 15K • Tous les arômes disponibles',
		product: 'Vape AF 15K',
		choice: '1 vape AF 15K au choix',
		fieldLabel: 'Choisissez votre arôme',
		all: 'Tous les arômes disponibles',
		available: 'Disponible',
		order: 'Commander',
		footnote: 'Offre valable pendant 20 jours • Dans la limite des stocks disponibles',
		message: 'Bonjour, je souhaite commander 1 Vape AF 15K à 200 DH, arôme : {flavour}.',
		families: {
			berries: 'Fruits rouges',
			sweet: 'Gourmands',
			fresh: 'Frais',
			citrus: 'Agrumes',
			tropical: 'Tropicaux',
		},
	},
	ar: {
		kicker: 'عرض محدود',
		subtitle: 'اختاروا النكهة واستفيدوا من العرض.',
		badge: '20 يوما فقط',
		imageNote: 'AF 15K • جميع النكهات متوفرة',
		product: 'Vape AF 15K',
		choice: 'جهاز AF 15K واحد من اختياركم',
		fieldLabel: 'اختاروا النكهة',
		all: 'جميع النكهات المتوفرة',
		available: 'متوفر',
		order: 'اطلب الآن',
		footnote: 'العرض صالح لمدة 20 يوما • في حدود المخزون المتوفر',
		message: 'مرحبا، أريد طلب جهاز Vape AF 15K بسعر 200 درهم، النكهة: {flavour}.',
		families: {
			berries: 'الفواكه الحمراء',
			sweet: 'نكهات حلوة',
			fresh: 'منعشة',
			citrus: 'حمضيات',
			tropical: 'استوائية',
		},
	},
	en: {
		kicker: 'Limited offer',
		subtitle: 'Choose your flavour and enjoy the offer.',
		badge: '20 days only',
		imageNote: 'AF 15K • All flavours available',
		product: 'AF 15K Vape',
		choice: '1 AF 15K vape of your choice',
		fieldLabel: 'Choose your flavour',
		all: 'All available flavours',
		available: 'Available',
		order: 'Order now',
		footnote: 'Offer valid for 20 days • While stocks last',
		message: 'Hello, I would like to order 1 AF 15K Vape for 200 DH, flavour: {flavour}.',
		families: { berries: 'Berries', sweet: 'Sweet', fresh: 'Fresh', citrus: 'Citrus', tropical: 'Tropical' },
	},
	es: {
		kicker: 'Oferta limitada',
		subtitle: 'Elige tu sabor y disfruta de la oferta.',
		badge: 'Solo 20 días',
		imageNote: 'AF 15K • Todos los sabores disponibles',
		product: 'Vape AF 15K',
		choice: '1 vape AF 15K a elegir',
		fieldLabel: 'Elige tu sabor',
		all: 'Todos los sabores disponibles',
		available: 'Disponible',
		order: 'Pedir ahora',
		footnote: 'Oferta válida durante 20 días • Hasta agotar existencias',
		message: 'Hola, quiero pedir 1 Vape AF 15K por 200 DH, sabor: {flavour}.',
		families: {
			berries: 'Frutos rojos',
			sweet: 'Dulces',
			fresh: 'Frescos',
			citrus: 'Cítricos',
			tropical: 'Tropicales',
		},
	},
} satisfies Record<
	LanguageCode,
	{
		kicker: string;
		subtitle: string;
		badge: string;
		imageNote: string;
		product: string;
		choice: string;
		fieldLabel: string;
		all: string;
		available: string;
		order: string;
		footnote: string;
		message: string;
		families: Record<(typeof af15kFlavours)[number]['family'], string>;
	}
>;

export const emptySiteContent: SiteContent = {
	phone: '212764375156',
	email: 'contact@vape-and-more.ma',
	defaultLang: 'fr',
	counts: {
		officialBrands: 0,
		officialShops: 0,
	},
	heroImages: [],
	brands: [],
	shops: [],
	promotionPacks: [],
	catalog: [],
};
