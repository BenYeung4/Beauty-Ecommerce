const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart');

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

module.exports = { User, Product, Cart };
