const router = require('express').Router();

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const cartRoutes = require('./cart-routes');
const categoryRoutes = require('./category-routes');
// const checkoutRoutes = require('./checkout-routes');
//const allProductsRoutes = require('./allProducts-routes');

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);
// router.use('/checkout', checkoutRoutes);

module.exports = router;
