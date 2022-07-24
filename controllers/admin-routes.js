const router = require('express').Router();
const { Product } = require('../models');
const { isAdmin } = require('../utils/auth');

// Get all products
router.get('/', isAdmin, (req, res) => {
    Product.findAll()
    .then((dbProductData) => {
        // serialize data before passing to template
        const products = dbProductData.map((product) => product.get({ plain: true }));
        res.render('admin', { products, loggedIn: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Edit one product
router.get('/edit/:id', isAdmin, (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id,
        }
    })
    .then((dbProductData) => {
        // serialize data before passing to template
        const product = dbProductData.get({ plain: true });
        res.render('edit-product', { product, loggedIn: true });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete one product
router.get('/delete/:id', isAdmin, (req, res) => {
    Product.destroy({
        where: { id: req.params.id },
    })
    .then(() => {
        res.redirect('/admin');
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;