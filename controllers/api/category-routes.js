const router = require('express').Router();
const { Product, Category } = require('../../models');
const { apiAuth, isAdmin } = require('../../utils/auth');
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    Category.findAll({
        include: {
            model: Product,
            attributes: [
                'id',
                'product_name',
                'product_price',
                'product_stock',
                'category_id',
            ],
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No categories found, please enter a category',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne({
        where: {
            id: req.params.id,
        },
        include: {
            model: Product,
            attributes: [
                'id',
                'product_name',
                'product_price',
                'product_stock',
                'category_id',
            ],
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No categories found, please enter a category',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', isAdmin, (req, res) => {
    // create a new category
    Category.create({
        category_name: req.body.category_name,
    })
        .then((dbCategoryData) => res.json(dbCategoryData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', isAdmin, (req, res) => {
    // update a category by its `id` value
    Category.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No categories found with this id',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', isAdmin, (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCategoryData) => {
            if (!dbCategoryData) {
                res.status(404).json({
                    message: 'No categories found with this id',
                });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
