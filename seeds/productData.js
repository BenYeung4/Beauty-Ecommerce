const { Product } = require("../models");

const productdata = [
  {
    title: "First skin care product",
    brand: "First skin care products brand",
    price: "$40",
    size_diemnsions: "1.44 x 0.81 x 4.38 inches",
    weight: "0.21 Ounces",
    filename: "image.jpg name under publics/images",
    description:
      "FULL COVERAGE CONCEALER: This full coverage concealer makeup minimizes the appearance of dark under eye circles and conceals blemishes without caking, clumping, or flaking. Our lightweight concealer brightens the eye area and blends seamlessly",
  },
  {
    title: "Second skin care product",
    brand: "Second skin care products brand",
    price: "$654564",
    size_diemnsions: "1.44 x 0.81 x 4.38 inches",
    weight: "0.21 Ounces",
    filename: "image.jpg name under publics/images",
    description:
      "FULL COVERAGE CONCEALER: This full coverage concealer makeup minimizes the appearance of dark under eye circles and conceals blemishes without caking, clumping, or flaking. Our lightweight concealer brightens the eye area and blends seamlessly",
  },
  {
    title: "Third skin care product",
    brand: "Third skin care products brand",
    price: "$4044444",
    size_diemnsions: "1.44 x 0.81 x 4.38 inches",
    weight: "0.21 Ounces",
    filename: "image.jpg name under publics/images",
    description:
      "FULL COVERAGE CONCEALER: This full coverage concealer makeup minimizes the appearance of dark under eye circles and conceals blemishes without caking, clumping, or flaking. Our lightweight concealer brightens the eye area and blends seamlessly",
  },
  {
    title: "Fourth skin care product",
    brand: "Fourt skin care products brand",
    price: "$401111",
    size_diemnsions: "1.44 x 0.81 x 4.38 inches",
    weight: "0.21 Ounces",
    filename: "image.jpg name under publics/images",
    description:
      "FULL COVERAGE CONCEALER: This full coverage concealer makeup minimizes the appearance of dark under eye circles and conceals blemishes without caking, clumping, or flaking. Our lightweight concealer brightens the eye area and blends seamlessly",
  },
  {
    title: "Fifth skin care product",
    brand: "Fifth skin care products brand",
    price: "$5555",
    size_diemnsions: "1.44 x 0.81 x 4.38 inches",
    weight: "0.21 Ounces",
    filename: "image.jpg name under publics/images",
    description:
      "FULL COVERAGE CONCEALER: This full coverage concealer makeup minimizes the appearance of dark under eye circles and conceals blemishes without caking, clumping, or flaking. Our lightweight concealer brightens the eye area and blends seamlessly",
  },
];

const seedProducts = () => Product.bulkCreate(paintingdata);

module.exports = seedProducts;
