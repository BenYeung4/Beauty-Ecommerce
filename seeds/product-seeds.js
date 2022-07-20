const sequelize = require('../config/connection');
const { Product } = require('../models');

const productdata = [
    {
        url: '/images/655439020107.jpg',
        description: 'Paulas Choice--SKIN PERFECTING 2% BHA Liquid Salicylic Acid Exfoliant--Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles & Fine Lines, 4 oz Bottle',
        manufacturer: 'Paulas Choice',
        name: 'SKIN PERFECTING 2% BHA Liquid Salicylic Acid Exfoliant--Facial Exfoliant for Blackheads, Enlarged Pores, Wrinkles & Fine Lines, 4 oz Bottle',
        stock: 100,
        price: 30.40
    },
    {
        url: '/images/071249403839.jpg',
        description: "L’Oreal Paris Skincare Revitalift Triple Power Anti-Aging Face Moisturizer with Pro Retinol, Hyaluronic Acid & Vitamin C to reduce wrinkles, firm and brighten skin, 2.55 Oz",
        manufacturer: "L'Oreal Paris",
        name: 'Skincare Revitalift Triple Power Anti-Aging Face Moisturizer with Pro Retinol, Hyaluronic Acid & Vitamin C to reduce wrinkles, firm and brighten skin, 2.55 Oz',
        stock: 100,
        price: 31.34
    },
    {
        url: '/images/707129677518.jpg',
        description: 'New York Biology Dead Sea Mud Mask for Face and Body - Spa Quality Pore Reducer for Acne, Blackheads and Oily Skin, Natural Skincare for Women, Men - Tightens Skin for A Healthier Complexion - 8.8 oz',
        manufacturer: 'NEW YORK BIOLOGY THE ULTIMATE COSMECEUTICALS',
        name: 'Dead Sea Mud Mask for Face and Body - Spa Quality Pore Reducer for Acne, Blackheads and Oily Skin, Natural Skincare for Women, Men - Tightens Skin for A Healthier Complexion - 8.8 oz',
        stock: 100,
        price: 16.95
    }
];

const seedProducts = () => Product.bulkCreate(productdata, {individualHooks: true});

module.exports = seedProducts;