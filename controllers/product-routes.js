const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart, Category } = require('../models');
//allProducts

router.get('/', (req, res) => {
    // Check if category is passed in url like ?category=3
    let whereObject = {};
    if (req.query.category) {
        whereObject.category_id = req.query.category;
    }

    Product.findAll({
        where: whereObject,
        include: Category
    })
        .then((dbProductData) => {
            // Serialize each product //
            const products = dbProductData.map((products) =>
                products.get({ plain: true })
            );
            // Render //
            res.render('product', {
                products,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    
    Product.findOne({
        where: {
            id: req.params.id,
        },
        include: Category
    })
        .then((dbProductData) => {
            // Serialize each product //
            const product = dbProductData.get({ plain: true });
            // Render //
            res.render('single-product', {
                product,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
