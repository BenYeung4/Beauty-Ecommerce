const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart, allProducts } = require('../models');

router.get('/', (req, res) => {
    allProducts.findAll()
    .then(dbProductData => {
        // Serialize each product //
        const allProducts = dbProductData.map(allProducts => allProducts.get({ plain: true }));
        // Render //
        res.render('product', {
            allProducts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;