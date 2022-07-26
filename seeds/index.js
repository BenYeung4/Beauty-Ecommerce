const seedUsers = require('./user-seeds.js');
const seedProducts = require('./product-seeds.js');
const seedCategories = require('./category-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async () => {
    // Drop all tables and recreate empty
    await sequelize.sync({ force: true });

    console.log('--------------');
    await seedUsers();
    console.log('-Users seeded-');
    await seedCategories();
    console.log('-Categories seeded-');
    await seedProducts();
    console.log('-Products seeded-');
    console.log('--------------');

    process.exit(0);
};

seedAll();
