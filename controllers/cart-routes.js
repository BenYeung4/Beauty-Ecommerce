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
    })
        .then((dbCartData) => {
            // Serialize each product //
            const cart = dbCartData.map((item) => item.get({ plain: true }));
            // Render //
            res.render('cart', {
                cart,
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
