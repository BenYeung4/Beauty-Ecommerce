const sequelize = require('../config/connection');
const { User } = require('../models');

const userdata = [
    {
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin',
        is_admin: true
    }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;