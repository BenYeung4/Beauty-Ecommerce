const router = require('express').Router()
const { User, Product, Cart} = require('../../models');

// Get all products in cart for user_id
router.get('/', (req, res) => {
    Cart.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: Product
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCartData => res.json(dbCartData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one item in cart by cart.id for user_id
router.get('/:id', (req, res) => {
    Cart.findAll({
        where: {
            // id is unique but use user_id to make sure we get the right cart item
            user_id: req.session.user_id,
            id: req.params.id
        },
        include: [
            {
                model: Product
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbCartData => {
        if (!dbCartData) {
            res.json(404).json({ message: 'No cart item found for this user id' });
            return;
        }
        res.json(dbCartData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Add product id to cart
router.post('/:id', (req, res) => {
    Cart.create({
        product_id: req.params.id,
        user_id: req.session.user_id,
        quantity: req.body.quantity
    })
    .then(dbCartData => res.json(dbCartData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update quantity of item in cart
router.put('/:id', (req, res) => {
    Cart.update(
        {
            quantity: req.body.quantity
        },
        {
            where: {
                id: req.params.product_id,
                user_id: req.session.user_id
            }
        }
    )
    .then(dbCartData => {
        if (!dbCartData) {
            res.status(404).json({ message: 'No cart item found with this id'});
            return;
        }
        res.json(dbCartData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete item from cart by cart.id
router.delete('/:id', (req, res) => {
    Cart.destroy({
        where: {
            id: req.params.product_id,
            user_id: req.session.user_id
        }
    })
    .then(dbCartData => {
        if (!dbCartData) {
            res.status(404).json({ message: 'No cart item found with this id' });
            return;
        }
        res.json(dbCartData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;