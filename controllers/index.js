//used to collect the PACKAGED group of API endpoints and prefixing them with the path /api
//when import the routes to server.js, it is already packaged and ready to go on this one file

const router = require('express').Router();

//access the api files
const apiRoutes = require('./api');
router.use('/api', apiRoutes);

//uses the home-routes.js file
const homeRoutes = require('./home-routes.js');
router.use('/', homeRoutes);

//uses the dashboard-routes.js file
const dashboardRoutes = require('./dashboard-routes.js');
router.use('/dashboard', dashboardRoutes);

// uses the admin-routes.js file
const adminRoutes = require('./admin-routes.js');
router.use('/admin', adminRoutes);

//uses the cart-routes.js file //
const cartRoutes = require('./cart-routes');
router.use('/cart', cartRoutes);

//in case of error, then state it, all else just return
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
