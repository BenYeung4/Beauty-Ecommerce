const router = require('express').Router();

const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const cartRoutes = require('./cart-routes');
<<<<<<< HEAD
const categoryRoutes = require('./category-routes');
const allProductsRoutes = require('./allProducts-routes');
=======
>>>>>>> 9035226bc2c13fb15b512841dd9bafc5047d9112

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
