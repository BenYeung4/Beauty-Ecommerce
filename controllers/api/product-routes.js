const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { User, Product, Cart, Category } = require('../../models');
//allProducts
const { apiAuth, isAdmin } = require('../../utils/auth');

// Multer to upload product images in multipart forms
const multer = require('multer');

// Configuration for multer - public/images
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `images/${file.originalname}`);
    },
});

// Filter for multer - allow only jpg files
const multerFilter = (req, file, cb) => {
    if (
        (file.mimetype.split('/')[1] === 'jpeg') |
        (file.mimetype.split('/')[1] === 'png')
    ) {
        cb(null, true);
    } else {
        cb(new Error('Not a jpeg or png file!'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

// Get all products
router.get('/', (req, res) => {
    Product.findAll({
        order: [['name', 'ASC']],
    })
        .then((dbPostData) => res.json(dbPostData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one product with id
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'name', 'price', 'stock'],
        include: [
            {
                model: Category,
                attributes: ['category_name'],
            },
        ],
    })
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Make new product
router.post('/', isAdmin, upload.single('product_image'), (req, res) => {
    // expects {url, description, manufacturer, name, stock, price, meight}
    Product.create({
        url: req.body.product_url
            ? '/images/' + req.body.product_url
            : '/images/' + req.body.product_choice,
        description: req.body.product_description,
        manufacturer: req.body.product_manufacturer,
        name: req.body.product_name,
        stock: req.body.product_stock,
        price: req.body.product_price,
        weight: req.body.product_weight,
        category_id: req.body.product_category,
    })
        .then((dbProductData) => res.json(dbProductData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Change product details, by id
router.put('/:id', isAdmin, upload.single('product_image'), (req, res) => {
    console.log(req.body.product_url);
    Product.update(
        {
            url: req.body.product_url
                ? '/images/' + req.body.product_url
                : '/images/' + req.body.product_choice,
            description: req.body.product_description,
            manufacturer: req.body.product_manufacturer,
            name: req.body.product_name,
            stock: req.body.product_stock,
            price: req.body.product_price,
            weight: req.body.product_weight,
            category_id: req.body.product_category,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Delete product by id - we no longer sell product
router.delete('/:id', isAdmin, (req, res) => {
    Product.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbProductData) => {
            if (!dbProductData) {
                res.status(404).json({
                    message: 'No product found with this id',
                });
                return;
            }
            res.json(dbProductData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
