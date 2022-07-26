const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product, Cart, Checkout } = require('../models');
const { withAuth } = require('../utils/auth');
//allProducts

router.get('/', (req, res) => {
    Checkout.findAll({
        where: {
            user_id: req.session.user_id,
        },
        include: Product,
    })
        .then((dbCartData) => {
            // Serialize each product //
            const checkout = dbCartData.map((item) =>
                item.get({ plain: true })
            );
            // Render //
            res.render('checkout', {
                checkout,
                loggedIn: req.session.loggedIn,
                isAdmin: req.session.isAdmin,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });

    // Delete one product
    router.get('/delete/:id', withAuth, (req, res) => {
        Checkout.destroy({
            where: { id: req.params.id },
        })
            .then(() => {
                res.redirect('/checkout');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    });
});

module.exports = router;
