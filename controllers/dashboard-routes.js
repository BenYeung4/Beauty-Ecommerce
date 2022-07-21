const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart} = require('../models');

module.exports = router;