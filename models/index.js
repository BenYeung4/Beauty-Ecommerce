const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart');
const allProducts = require('./allProducts');

User.hasMany(Cart, {
    foreignKey: 'user_id',
});

Cart.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.belongsToMany(Product, {
    through: Cart,
    as: 'cart_items',
    foreignKey: 'user_id',
});

Product.belongsToMany(User, {
    through: Cart,
    as: 'cart_items',
    foreignKey: 'product_id',
});

Product.hasMany(Cart, {
    foreignKey: 'product_id',
});

Cart.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
});

allProducts.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'Cascade',
});

allProducts.belongsToMany(User, {
    through: Cart,
    as: 'cart_items',
    foreignKey: 'product_id',
});

allProducts.hasMany(Cart, {
    foreignKey: 'product_id',
});

module.exports = { User, Product, Cart, allProducts };
