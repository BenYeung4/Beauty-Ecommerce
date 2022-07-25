const seedUsers = require('./user-seeds.js');
const seedProducts = require('./product-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async () => {
    // Drop all tables and recreate empty
    await sequelize.sync({ force: true });

    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedProducts();
    console.log('--------------');

    await seedCategories();
    console.log('Categories Seeded');

    process.exit(0);
};

seedAll();
