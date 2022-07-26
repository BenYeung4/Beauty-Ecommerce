const router = require('express').Router();
// const sequelize = require('../config/connection');
const { User, Product, Cart, Checkout } = require('../models');
const { apiAuth } = require('../utils/auth');
// const path = require('path');
// const fs = require('fs');

// Get all products in cart for user_id
router.get('/', apiAuth, (req, res) => {
    Checkout.findAll({
        where: {
            user_id: req.session.user_id,
        },
        include: [
            {
                model: Product,
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbCartData) => res.json(dbCartData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one item in cart by cart.id for user_id
router.get('/:id', apiAuth, (req, res) => {
    Checkout.findAll({
        where: {
            // id is unique but use user_id to make sure we get the right cart item
            user_id: req.session.user_id,
            id: req.params.id,
        },
        include: [
            {
                model: Product,
            },
            {
                model: User,
                attributes: ['username'],
            },
        ],
    })
        .then((dbCartData) => {
            if (!dbCartData) {
                res.json(404).json({
                    message: 'No cart item found for this user id',
                });
                return;
            }
            res.json(dbCartData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Add product id to checkout
router.post('/:id', apiAuth, (req, res) => {
    Checkout.create({
        product_id: req.params.id,
        user_id: req.session.user_id,
        quantity: req.body.quantity,
    })
        .then((dbCartData) => res.json(dbCartData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Update quantity of item in checkout
router.put('/:id', apiAuth, (req, res) => {
    Checkout.update(
        {
            quantity: req.body.quantity,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        }
    )
        .then((dbCartData) => {
            if (!dbCartData) {
                res.status(404).json({
                    message: 'No cart item found with this id',
                });
                return;
            }
            res.json(dbCartData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete item from checkout by cart.id
router.delete('/:id', apiAuth, (req, res) => {
    Checkout.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
    })
        .then((dbCartData) => {
            if (!dbCartData) {
                res.status(404).json({
                    message: 'No cart item found with this id',
                });
                return;
            }
            res.json(dbCartData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Clear checkout completely
router.delete('/', apiAuth, (req, res) => {
    Checkout.destroy({
        where: {
            user_id: req.session.user_id,
        },
    })
        .then((dbCartData) => {
            if (!dbCartData) {
                res.status(404).json({
                    message: 'No cart items found for this user',
                });
                return;
            }
            res.json(dbCartData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
