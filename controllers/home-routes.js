const router = require('express').Router();
const { Product } = require('../models');

router.get('/', (req, res) => {
    Product.findAll()
        .then((dbProductData) => {
            // Serialize each product
            const products = dbProductData.map((product) =>
                product.get({ plain: true })
            );
            // Render
            res.render('homepage', {
                products,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
});

// Login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
