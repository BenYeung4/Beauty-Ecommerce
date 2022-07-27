const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart } = require('../models');

//allProducts

router.get('/', (req, res) => {
    Cart.findAll({
        where: {
            user_id: req.session.user_id,
        },
        include: Product,
        attributes: { include: [['(quantity*product.price)', 'subtotal']] }
    })
        .then((dbCartData) => {
            // Add subtotal for each item
            // dbCartData = dbCartData.map((item) => item.subtotal = item.quantity*item.product.price);
            // Serialize each product //
            const cart = dbCartData.map((item) => item.get({ plain: true }));
            // Calculate total in cart
            const total = dbCartData.reduce((tot, item) => tot += item.quantity*item.product.price, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD'});
            // Calculate total number of items in cart
            const totalitems = dbCartData.reduce((tot, item) => tot += item.quantity, 0);
            // Render //
            res.render('cart', {
                cart,
                total,
                totalitems,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
