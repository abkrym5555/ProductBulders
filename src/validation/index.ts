/**
 * Interface representing the product data to be validated.
 * @typedef {Object} IProductValditon
 * @property {string} title - The title of the product.
 * @property {string} description - A detailed description of the product.
 * @property {string} imageURL - A valid URL pointing to the product image.
 * @property {string} price - The price of the product as a string.
 */

import type { IProductValditon } from "../interfaces/intrface";

/**
 * Validates product data and returns an object containing error messages.
 * * @param {IProductValditon} product - The product object to validate.
 * @returns {IProductValditon} An object where each key corresponds to a product field
 * and the value is an error message (or an empty string if valid).
 * * @example
 * const errors = productValidation({ title: 'Short', ... });
 * if (errors.title) console.error(errors.title);
 */

export const productValidation = (product: IProductValditon) => {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters !";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 800
  ) {
    errors.description =
      "Product description must be between 10 and 800 characters !";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is require";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid Price is require";
  }

  return errors;
};
