const router = require('express').Router()
const { User, Product, Cart} = require('../../models');
const { apiAuth, isAdmin } = require('../../utils/auth');

// Get all products
router.get('/', (req, res) => {
    Product.findAll({
        order: [['name', 'ASC']]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get one product with id
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id'});
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Make new product
router.post('/', isAdmin, (req, res) => {
    // expects {url, description, manufacturer, name, stock, price, meight}
    Product.create({
        url: req.body.url,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        weight: req.body.weight
    })
    .then(dbProductData => res.json(dbProductData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Change product details, by id
router.put('/:id', isAdmin, (req, res) => {
    Product.update(
        {
            url: req.body.url,
            description: req.body.description,
            manufacturer: req.body.manufacturer,
            name: req.body.name,
            stock: req.body.stock,
            price: req.body.price,
            weight: req.body.weight
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id'});
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete product by id - we no longer sell product
router.delete('/:id', isAdmin, (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbProductData => {
        if (!dbProductData) {
            res.status(404).json({ message: 'No product found with this id' });
            return;
        }
        res.json(dbProductData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;