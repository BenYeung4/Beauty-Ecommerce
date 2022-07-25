const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart, allProducts } = require('../models');

module.exports = router;