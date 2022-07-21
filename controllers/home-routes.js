const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart} = require('../models');

router.get('/', (req, res) => {
    Product.findAll()
    .then(dbProductData => {
        // Serialize each product
        const products = dbProductData.map(product => product.get({ plain: true }));
        // Render
        res.render('homepage', {
            products,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;