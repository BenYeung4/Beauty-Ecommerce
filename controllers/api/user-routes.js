const router = require('express').Router();
const { User, Product, Cart } = require('../../models');
const { apiAuth, isAdmin } = require('../../utils/auth');

// Get all users /api/users only for admins
router.get('/', isAdmin, (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password'],
        },
    })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Get one user /api/users/1 and items in their cart
//  if admin, any user id, if not admin, force the logged in user id
router.get('/:id', apiAuth, (req, res) => {
    User.findOne({
        where: { id: req.session.isAdmin ? req.params.id : req.session.user_id },
        attributes: {
            exclude: ['password'],
        },
        include: [
            {
                model: Product,
                attributes: [
                    'id',
                    'url',
                    'description',
                    'manufacturer',
                    'name',
                    'stock',
                    'price',
                    'weight',
                ],
                through: Cart,
                as: 'cart_items',
            },
        ],
    })
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users unsecured because this is a create new user
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    .then((dbUserData) => {
        // save uses a callback function
        req.session.save(() => {
            // Set session data
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            req.session.isAdmin = dbUserData.is_admin;
            // Respond with user data
            res.status(200).json(dbUserData);
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST login unsecured because this is login
router.post('/login', (req, res) => {
    // expects {email: 'lernantino@gmail.com', password: 'password1234'}
    User.findOne({
        where: {
            email: req.body.email,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(400).json({
                message: 'No user with that email address!',
            });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.isAdmin = dbUserData.is_admin;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST logout
router.post('/logout', apiAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// PUT /api/users user_id is in the session variable
//  if admin use params id otherwise force to use session user_id
router.put('/:id', apiAuth, (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.session.isAdmin ? req.params.id : req.session.user_id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', apiAuth, (req, res) => {
    // Allow user to delete only their own user_id except if this user is an admin
    if (
        req.session.user_id !== parseInt(req.params.id) &&
        !req.session.isAdmin
    ) {
        res.status(401).json({ message: 'Not authorized to this user id' });
        return;
    }

    User.destroy({
        where: {
            id: req.params.id,
        },
    })
    .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        // Destroy session if successful in deleting user
        req.session.destroy(() => {
            res.status(204).end();
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
