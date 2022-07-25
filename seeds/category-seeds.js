const { Category } = require('../models');

const categoryData = [
    {
        category_name: 'All Products',
    },
    {
        category_name: 'Day Skincare',
    },
    {
        category_name: 'Night Skincare',
    },
    {
        category_name: 'Featured Products',
    },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;
