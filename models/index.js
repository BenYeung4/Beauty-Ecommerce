const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart');
const Category = require('./Category');
const Checkout = require('./Checkout');

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

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Checkout.belongsToMany(User, {
    through: Cart,
    as: 'cart_items',
    foreignKey: 'product_id',
});

Checkout.belongsTo(Category, {
    foreignKey: 'category_id',
});

Checkout.belongsToMany(Product, {
    through: Cart,
    as: 'cart_items',
    foreignKey: 'user_id',
});

module.exports = { User, Product, Cart, Category, Checkout };
