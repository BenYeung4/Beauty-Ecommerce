const sequelize = require('../config/connection');
const { Product } = require('../models');

const productdata = [
    {
        url: '/images/CoconutOilCleansingPads.JPG',
        description:
            'With luxurious oversized cotton pads soaked in 100% virgin coconut oil imported directly from the farm, the Solved Skincare Coconut Oil Cleansing Pad removes stubborn makeup as well as oily impurities, dirt and SPF without causing irritation.',
        manufacturer: 'Solved',
        name: 'Coconut Oil Cleansing Pads',
        stock: 100,
        price: 28.0,
        weight: '40 Pads - 207ml',
        category_id: 2,
    },
    {
        url: '/images/SKINRxLAB.png',
        description:
            'MadeCera moisturizing cream is enriched with numerous hydrating and moisturizing nutrients like fermented ceramide complex, centella asiatica and madecassoside for calming & replenishing sensitive and dehydrated skin.',
        manufacturer: 'SKINRxLAB',
        name: 'MadeCera Cream',
        stock: 100,
        price: 31.0,
        weight: '50ml ',
        category_id: 2,
    },
    {
        url: '/images/TimeStopCollagenAmpoule.png',
        description:
            'Packed with 67% of hericium erinaceium and 3 other types of natural mushroom extracts, this ampoule offers a firming effect by restoring skin elasticity. It also prevents sun damage and reduces the appearance of wrinkles.',
        manufacturer: 'The Plant Base',
        name: 'Time Stop Collagen Ampoule',
        stock: 100,
        price: 18.0,
        weight: '20ml',
        category_id: 2,
    },
    {
        url: '/images/KLAVUU.png',
        description:
            'It is the viscous, essence or serum-like texture was what made them stood out from other toners in the market with main ingredients being beta-glucan, hyaluronic acid and centella asiatica that instantly calm & soothe the sensitive skin.',
        //In that sense, this product is good enough to replace a serum from your skincare routine if they are layered multiple times using bare hands.
        manufacturer: 'KLAVUU',
        name: 'Pure Pearlsation Revitalizing Facial Cleansing Foam',
        stock: 100,
        price: 27.0,
        weight: '130ml',
        category_id: 2,
    },
    {
        url: '/images/Klairs.png',
        description:
            'Gentle texture is what made this stood out from other toners in the market with main ingredients being beta-glucan, hyaluronic acid and centella asiatica that instantly calm & soothe the sensitive skin.',
        manufacturer: 'Klairs',
        name: 'Supple Preparation Facial Toner',
        stock: 100,
        price: 22.0,
        weight: '180ml',
        category_id: 2,
    },
    {
        url: '/images/BeautyofJoseon.png',
        description:
            'Fitted with broad-spectrum SPF 50+ PA++++ to fend off UVA and UVB rays, this organic Beauty of Joseon sunscreen comes in a lightweight and quick-absorbent texture that wont leave a white cast.',
        manufacturer: 'Beauty of Joseon',
        name: 'Relief Sun',
        stock: 100,
        price: 18.0,
        weight: '50ml',
        category_id: 2,
    },
    {
        url: '/images/HANSKIN.png',
        description:
            'Hanskin Pore Cleansing Oil is specially formulated with polyhydroxy acids (PHAs), a gentle acid suitable for sensitive skin types, to lightly exfoliate and help keep blackheads and dead skin cells at bay.',
        manufacturer: 'HANSKIN',
        name: 'Pore Cleansing Oil [PHA]',
        stock: 100,
        price: 27.0,
        weight: '300ml',
        category_id: 3,
    },
    {
        url: '/images/NEOGEN.png',
        description:
            'Lightweight and hydrating, this is the perfect water-based cleanser to use in your double-cleansing routine.',
        manufacturer: 'NEOGEN',
        name: 'Green Tea Real Fresh Foam Cleanser',
        stock: 100,
        price: 19.0,
        weight: '160ml',
        category_id: 3,
    },
    {
        url: '/images/SOMEBYMI.png',
        description:
            'A cult favorite, one bottle of this multi-tasking toner is sold every three seconds! As its name suggests, the formula boasts three types of chemical exfoliants (AHAs, BHAs, and PHAs) plus papaya and witch hazel extracts to effectively boost cell turnover and keep skin smooth and healthy.',
        manufacturer: 'SOME BY MI',
        name: 'AHA-BHA-PHA 30Days Miracle Toner',
        stock: 100,
        price: 23.0,
        weight: '150ml',
        category_id: 3,
    },
    {
        url: '/images/INWARD.png',
        description:
            'The Inward Agas ACue Serum is a toner, lotion, and essence in one—this highly concentrated liquid has been shown in clinical studies to help treat acne and visibly reduce the appearance of breakouts.',
        manufacturer: 'INWARD',
        name: 'Agas ACue Serum',
        stock: 100,
        price: 38.0,
        weight: '90ml',
        category_id: 3,
    },
    {
        url: '/images/ThePlantBase.png',
        description:
            '55% centella asiatica (cica) extract and green tea powder calm inflammation upon application, while murumuru seed butter deeply moisturizes skin, helping to soothe even the most sensitive or irritated skin barrier. ',
        manufacturer: 'The Plant Base',
        name: 'AC Clear Magic Cica Cream',
        stock: 100,
        price: 15.0,
        weight: '60ml',
        category_id: 3,
    },
    {
        url: '/images/Goodal.png',
        description:
            'Soothing hydrogel makes up the eye patch, effectively delivering the formula deeply into the delicate skin around the eyes. Revitalize dull, tired skin in one simple step!',
        manufacturer: 'Goodal',
        name: 'Green Tangerine Vita C Eye Gel Patch',
        stock: 100,
        price: 20.0,
        weight: '75ml - 60 Pads',
        category_id: 3,
    },
    {
        url: '/images/SKII.png',
        description:
            'A powerful treatment to visibly soften texture, reduce the appearance of dark spots and fine lines due to dryness, even the look of skin tone, and enhance visible radiance.',
        manufacturer: 'SKII',
        name: 'PITERA Essence Limited Edition',
        stock: 100,
        price: 247.0,
        weight: '228ml',
        category_id: 4,
    },
    {
        url: '/images/Sulwhasoo.png',
        description:
            'Korean red ginseng is the hero ingredient in this concentrated cream that works to firm skin, soften wrinkles, and visibly brighten the eye area for a more radiant glow. ',
        //Those with mature skin will benefit from the ginseng formula especially as it works to improve elasticity and reduce creepiness around the eyes, giving them a smoother and more youthful appearance.
        manufacturer: 'Sulwhasoo',
        name: 'Concentrated Ginseng Renewing Eye Cream',
        stock: 100,
        price: 180.0,
        weight: '20ml',
        category_id: 4,
    },
    {
        url: '/images/Peach&Lily.png',
        description:
            'A mask that will blast your skin with antioxidants, hydrate like a hero, help bring about that plump firmness while smoothing out the fine lines and wrinkles, brightening and providing super gentle exfoliating benefits.',
        manufacturer: 'Peach & Lily',
        name: 'Original Glow Sheet Mask Set',
        stock: 100,
        price: 80.0,
        weight: '25 ml - 20 Sheets',
        category_id: 4,
    },
    {
        url: '/images/TheHistory.png',
        description:
            'A luxury rejuvenating line that adds moisture and radiance to HwaHyun rejuvenation, balancing the skin condition and increasing skin resilience for a beautiful face to reach the state of HwaYul rejuvenation.',
        name: 'ULTIMATE REJUVENATING EMULSION',
        manufacturer: 'The History of WHOO CHEONYULDAN',
        stock: 100,
        price: 226.0,
        weight: '100ml',
        category_id: 4,
    },
];

const seedProducts = () =>
    Product.bulkCreate(productdata, { individualHooks: true });

module.exports = seedProducts;
