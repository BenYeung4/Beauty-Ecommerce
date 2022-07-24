const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    manufacturer: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    low_stock: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('stock')<10;
      },
      set() {
        throw new Error('low_stock is virtual for stock');
      }
    },
    out_of_stock: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getDataValue('stock')===0;
      },
      set() {
        throw new Error('out_of_stock is virtual for stock');
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
