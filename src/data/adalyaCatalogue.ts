import type { LanguageCode } from '@/data/translations';

type AdalyaProduct = {
	id: string;
	name: string;
	accent: string;
	group: 'ag' | 'hm' | 'nz';
	descriptions: Record<LanguageCode, string>;
};

export const adalyaProducts = [
	{
		id: 'blue-ice',
		name: 'Blue Ice',
		accent: '#84c9fc',
		group: 'ag',
		descriptions: {
			fr: 'Blue Ice associe des notes de myrtille à une sensation glacée. Son profil combine une base fruitée et un effet frais.',
			en: 'Blue Ice pairs blueberry notes with an icy sensation. Its profile combines a fruity base with a cooling effect.',
			es: 'Blue Ice combina notas de arándano con una sensación helada. Su perfil une una base afrutada con un efecto refrescante.',
			ar: 'تجمع Blue Ice بين نكهات التوت الأزرق وإحساس مثلج. يمزج طابعها بين قاعدة فاكهية وتأثير منعش.',
		},
	},
	{
		id: 'cactus-splash',
		name: 'Cactus Splash',
		accent: '#ffb36e',
		group: 'ag',
		descriptions: {
			fr: 'Cactus Splash présente un arôme de fruit de cactus. Une note glacée complète ce profil fruité.',
			en: 'Cactus Splash features a cactus fruit flavour. An icy note completes this fruity profile.',
			es: 'Cactus Splash presenta un aroma de fruto de cactus. Una nota helada completa este perfil afrutado.',
			ar: 'تقدم Cactus Splash نكهة فاكهة الصبار. وتكمل لمسة مثلجة هذا الطابع الفاكهي.',
		},
	},
	{
		id: 'cola-dragon',
		name: 'Cola Dragon',
		accent: '#e5999c',
		group: 'ag',
		descriptions: {
			fr: 'Cola Dragon associe des notes de cola et de boisson énergisante. Son profil aromatique s’inspire de ces deux saveurs de boissons.',
			en: 'Cola Dragon pairs cola and energy drink notes. Its flavour profile draws on these two drink flavours.',
			es: 'Cola Dragon combina notas de cola y de bebida energética. Su perfil aromático se inspira en estos dos sabores de bebidas.',
			ar: 'تجمع Cola Dragon بين نكهات الكولا ومشروبات الطاقة. ويستوحي طابعها العطري مذاقه من هذين المشروبين.',
		},
	},
	{
		id: 'grape-berry',
		name: 'Grape Berry',
		accent: '#bd9af7',
		group: 'ag',
		descriptions: {
			fr: 'Grape Berry réunit des arômes de raisin et de baies. Ces deux notes composent son profil fruité.',
			en: 'Grape Berry brings together grape and berry flavours. These two notes make up its fruity profile.',
			es: 'Grape Berry reúne aromas de uva y de bayas. Estas dos notas componen su perfil afrutado.',
			ar: 'تجمع Grape Berry بين نكهات العنب والتوت. وتشكل هاتان النكهتان طابعها الفاكهي.',
		},
	},
	{
		id: 'grape-drop',
		name: 'Grape Drop',
		accent: '#aa93ea',
		group: 'ag',
		descriptions: {
			fr: 'Grape Drop présente un profil aromatique au raisin. Cette référence met ce fruit au centre de son identité.',
			en: 'Grape Drop features a grape flavour profile. This variety places that fruit at the heart of its identity.',
			es: 'Grape Drop presenta un perfil aromático de uva. Esta referencia sitúa esta fruta en el centro de su identidad.',
			ar: 'تقدم Grape Drop طابعا عطريا بنكهة العنب. ويضع هذا الصنف هذه الفاكهة في صميم هويته.',
		},
	},
	{
		id: 'grape-mint',
		name: 'Grape Mint',
		accent: '#a6d77d',
		group: 'ag',
		descriptions: {
			fr: 'Grape Mint associe des notes de raisin à la menthe. Son profil réunit ainsi une composante fruitée et une note menthée.',
			en: 'Grape Mint pairs grape notes with mint. Its profile brings together a fruity element and a minty note.',
			es: 'Grape Mint combina notas de uva con menta. Su perfil reúne así un componente afrutado y una nota mentolada.',
			ar: 'تجمع Grape Mint بين نكهات العنب والنعناع. وهكذا يمزج طابعها بين مكون فاكهي ولمسة نعناعية.',
		},
	},
	{
		id: 'hawaii',
		name: 'Hawaii',
		accent: '#edd07d',
		group: 'hm',
		descriptions: {
			fr: 'Hawaii réunit des notes d’ananas et de mangue. La menthe complète cette association de fruits tropicaux.',
			en: 'Hawaii brings together pineapple and mango notes. Mint completes this combination of tropical fruits.',
			es: 'Hawaii reúne notas de piña y de mango. La menta completa esta combinación de frutas tropicales.',
			ar: 'تجمع Hawaii بين نكهات الأناناس والمانجو. ويكمل النعناع هذا المزيج من الفواكه الاستوائية.',
		},
	},
	{
		id: 'lady-killer',
		name: 'Lady Killer',
		accent: '#f1ad91',
		group: 'hm',
		descriptions: {
			fr: 'Lady Killer associe des arômes de pêche et de mangue. Des notes de menthe et un effet glacé complètent le mélange.',
			en: 'Lady Killer pairs peach and mango flavours. Mint notes and an icy effect complete the blend.',
			es: 'Lady Killer combina aromas de melocotón y de mango. Notas de menta y un efecto helado completan la mezcla.',
			ar: 'تجمع Lady Killer بين نكهات الخوخ والمانجو. وتكمل المزيج لمسات النعناع وتأثير مثلج.',
		},
	},
	{
		id: 'love-66',
		name: 'Love 66',
		accent: '#e391d1',
		group: 'hm',
		descriptions: {
			fr: 'Love 66 repose sur une recette aromatique confidentielle d’Adalya. La marque ne communique pas le détail des notes qui composent ce mélange.',
			en: 'Love 66 is based on a confidential Adalya flavour recipe. The brand does not disclose the individual notes in this blend.',
			es: 'Love 66 se basa en una receta aromática confidencial de Adalya. La marca no comunica el detalle de las notas que componen esta mezcla.',
			ar: 'تعتمد Love 66 على وصفة عطرية سرية من Adalya. ولا تكشف العلامة عن تفاصيل النكهات التي يتكون منها هذا المزيج.',
		},
	},
	{
		id: 'mango',
		name: 'Mango',
		accent: '#f4c472',
		group: 'hm',
		descriptions: {
			fr: 'Mango présente un arôme de mangue. Son profil est centré sur ce fruit tropical.',
			en: 'Mango features a mango flavour. Its profile centres on this tropical fruit.',
			es: 'Mango presenta un aroma de mango. Su perfil se centra en esta fruta tropical.',
			ar: 'تقدم Mango نكهة المانجو. ويتمحور طابعها حول هذه الفاكهة الاستوائية.',
		},
	},
	{
		id: 'mi-amor',
		name: 'Mi Amor',
		accent: '#efa8b4',
		group: 'hm',
		descriptions: {
			fr: 'Mi Amor réunit des arômes de banane et de framboise. Une note de menthe complète cette association fruitée.',
			en: 'Mi Amor brings together banana and raspberry flavours. A mint note completes this fruity combination.',
			es: 'Mi Amor reúne aromas de plátano y de frambuesa. Una nota de menta completa esta combinación afrutada.',
			ar: 'تجمع Mi Amor بين نكهات الموز وتوت العليق. وتكمل لمسة النعناع هذا المزيج الفاكهي.',
		},
	},
	{
		id: 'moscow-evenings',
		name: 'Moscow Evenings',
		accent: '#e997bb',
		group: 'hm',
		descriptions: {
			fr: 'Moscow Evenings associe des notes de pastèque et de pêche. La menthe complète ce duo de fruits.',
			en: 'Moscow Evenings pairs watermelon and peach notes. Mint completes this fruit duo.',
			es: 'Moscow Evenings combina notas de sandía y de melocotón. La menta completa este dúo de frutas.',
			ar: 'تجمع Moscow Evenings بين نكهات البطيخ والخوخ. ويكمل النعناع هذا الثنائي من الفواكه.',
		},
	},
	{
		id: 'passion-fruit-guava-kiwi',
		name: 'Passion Fruit Guava Kiwi',
		accent: '#c8d59a',
		group: 'nz',
		descriptions: {
			fr: 'Cette référence réunit des arômes de fruit de la passion, de goyave et de kiwi. Son profil repose sur l’association de ces trois fruits.',
			en: 'This variety brings together passion fruit, guava and kiwi flavours. Its profile is based on the combination of these three fruits.',
			es: 'Esta referencia reúne aromas de maracuyá, guayaba y kiwi. Su perfil se basa en la combinación de estas tres frutas.',
			ar: 'يجمع هذا الصنف بين نكهات فاكهة العاطفة والجوافة والكيوي. ويقوم طابعه على مزيج هذه الفواكه الثلاث.',
		},
	},
	{
		id: 'strawberry-cherry',
		name: 'Strawberry Cherry',
		accent: '#e98c9c',
		group: 'nz',
		descriptions: {
			fr: 'Strawberry Cherry annonce une association de fraise et de cerise. Son intitulé correspond à un duo d’arômes fruités.',
			en: 'Strawberry Cherry indicates a combination of strawberry and cherry. Its name describes a duo of fruit flavours.',
			es: 'Strawberry Cherry anuncia una combinación de fresa y de cereza. Su nombre corresponde a un dúo de aromas afrutados.',
			ar: 'تشير Strawberry Cherry إلى مزيج من الفراولة والكرز. ويعبر اسمها عن ثنائي من النكهات الفاكهية.',
		},
	},
	{
		id: 'strawberry-kiwi',
		name: 'Strawberry Kiwi',
		accent: '#b5ce7b',
		group: 'nz',
		descriptions: {
			fr: 'Strawberry Kiwi annonce des notes de fraise et de kiwi. Ces deux fruits constituent l’association indiquée dans son nom.',
			en: 'Strawberry Kiwi indicates strawberry and kiwi notes. These two fruits make up the combination described in its name.',
			es: 'Strawberry Kiwi anuncia notas de fresa y de kiwi. Estas dos frutas constituyen la combinación indicada en su nombre.',
			ar: 'تشير Strawberry Kiwi إلى نكهات الفراولة والكيوي. وتشكل هاتان الفاكهتان المزيج المذكور في اسمها.',
		},
	},
	{
		id: 'strawberry-watermelon-bubble-gum',
		name: 'Strawberry Watermelon Bubble Gum',
		accent: '#f2a4c4',
		group: 'nz',
		descriptions: {
			fr: 'Cette référence annonce des notes de fraise et de pastèque. Un arôme de chewing-gum complète l’association indiquée dans son nom.',
			en: 'This variety indicates strawberry and watermelon notes. A bubble gum flavour completes the combination described in its name.',
			es: 'Esta referencia anuncia notas de fresa y de sandía. Un aroma de chicle completa la combinación indicada en su nombre.',
			ar: 'يشير هذا الصنف إلى نكهات الفراولة والبطيخ. وتكمل نكهة العلكة المزيج المذكور في اسمه.',
		},
	},
	{
		id: 'two-apple',
		name: 'Two Apple',
		accent: '#afc976',
		group: 'nz',
		descriptions: {
			fr: 'Two Apple associe des notes de pomme verte et de pomme rouge. Son profil repose sur cette combinaison de deux arômes de pomme.',
			en: 'Two Apple pairs green apple and red apple notes. Its profile is based on this combination of two apple flavours.',
			es: 'Two Apple combina notas de manzana verde y de manzana roja. Su perfil se basa en esta combinación de dos aromas de manzana.',
			ar: 'تجمع Two Apple بين نكهات التفاح الأخضر والتفاح الأحمر. ويقوم طابعها على هذا المزيج من نكهتي التفاح.',
		},
	},
	{
		id: 'very-berry',
		name: 'Very Berry',
		accent: '#bb9dda',
		group: 'nz',
		descriptions: {
			fr: 'Very Berry présente un mélange de notes de mûres. Un effet glacé complète son profil aromatique.',
			en: 'Very Berry features a blend of blackberry notes. An icy effect completes its flavour profile.',
			es: 'Very Berry presenta una mezcla de notas de moras. Un efecto helado completa su perfil aromático.',
			ar: 'تقدم Very Berry مزيجا من نكهات التوت الأسود. ويكمل تأثير مثلج طابعها العطري.',
		},
	},
] satisfies AdalyaProduct[];
