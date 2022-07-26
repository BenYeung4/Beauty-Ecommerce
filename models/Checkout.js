// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Checkout extends Model {}

// Checkout.init(
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             allowNull: false,
//         },
//         url: {
//             type: DataTypes.STRING,
//             allowNull: true,
//         },
//         description: {
//             type: DataTypes.TEXT,
//             allowNull: true,
//         },
//         manufacturer: {
//             type: DataTypes.STRING,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         price: {
//             type: DataTypes.DECIMAL(7, 2),
//             allowNull: false,
//         },
//         weight: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         category_id: {
//             type: DataTypes.INTEGER,
//             references: { model: 'category', key: 'id' },
//         },
//         quantity: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'checkout',
//     }
// );

// module.exports = Checkout;
