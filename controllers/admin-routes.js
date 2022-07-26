const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { Product, Category } = require('../models');
const { isAdmin } = require('../utils/auth');

// Get all products
router.get('/', isAdmin, (req, res) => {
    Product.findAll({
        include: Category
    })
    .then((dbProductData) => {
        // serialize data before passing to template
        const products = dbProductData.map((product) => product.get({ plain: true }));
        res.render('admin', { products, loggedIn: true, isAdmin: true });
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
        },
        include: Category
    })
    .then((dbProductData) => {
        // serialize data before passing to template
        const product = dbProductData.get({ plain: true });
        const images = fs.readdirSync(path.join(__dirname,'../public/images'));
        const filename = dbProductData.url.split('/')[dbProductData.url.split('/').length-1];
        const imageOptions = '<option value=""></option>' + images.reduce((accum, curr) => accum += curr === filename ? `<option value="${curr}" selected>${curr}</option>` : `<option value="${curr}">${curr}</option>`, '');
        Category.findAll()
        .then((dbCategoryData) => {
            
            const categoryOptions = dbCategoryData.reduce((accum, curr) => accum += curr.id === dbProductData.category_id ? `<option value = "${curr.id}" selected>${curr.category_name}</option>` : `<option value = "${curr.id}">${curr.category_name}</option>`,'');
            res.render('edit-product', { product, imageOptions, categoryOptions, loggedIn: true, isAdmin: true});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add new product
router.get('/new', isAdmin, (req, res) => {
    const images = fs.readdirSync(path.join(__dirname,'../public/images'));
    const imageOptions = '<option value=""></option>' + images.reduce((accum, curr) => accum += `<option value="${curr}">${curr}</option>`, '');
    Category.findAll()
    .then((dbCategoryData) => {
        const categoryOptions = dbCategoryData.reduce((accum, curr) => accum += `<option value = "${curr.id}">${curr.category_name}</option>`,'');
        res.render('new-product', { imageOptions, categoryOptions, loggedIn: true, isAdmin: true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    })
})

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