const User = require("./User");
const Product = require("./Product");

Gallery.hasMany(Product, {
  foreignKey: "product_id",
});

module.exports = { User, Product };
