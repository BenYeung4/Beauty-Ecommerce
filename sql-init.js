// ** this file just brings up the model **
const sequelize = require('./config/connection');

const { User, Product, Cart } = require('./models');


sequelize.sync({ force: true });

