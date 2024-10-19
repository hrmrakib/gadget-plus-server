import { ObjectId } from "mongodb";
import { productsCollection } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await productsCollection.find().limit(16).toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// get a single product
export const getProductById = async (req, res) => {
  const { id } = req.query;
  try {
    const product = await productsCollection.findOne({ _id: new ObjectId(id) });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// get product by collectionType
export const getProductsByCollectionType = async (req, res) => {
  const { type } = req.query;
  try {
    const products = await productsCollection
      .find({ collectionType: type })
      .toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// get all collections
export const getAllCollections = async (req, res) => {
  try {
    const { productLimit } = req.query;
    const limited = Number(productLimit);
    const result = await productsCollection.find().limit(limited).toArray();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Error fetching collections" });
  }
};

// filtering product based on category category, stock, price, brand, collectionType,
export const getProductsByCategory = async (req, res) => {
  try {
    const {
      category,
      stock,
      price: { minPrice, maxPrice },
      brand,
      collectionType,
    } = req.query;

    let min = Number(minPrice);
    let max = Number(maxPrice);

    let stockQuery = {};
    let priceQuery = {};
    let brandQuery = {};
    let collectionTypeQuery = {};

    if (stock !== undefined) {
      if (stock === "true") {
        stockQuery = { stock: { $gt: 0 } };
      }
      if (stock === "false") {
        stockQuery = { stock: 0 };
      }
    }

    // Handle price query
    if (min && max) {
      priceQuery = {
        price: { $gte: Number(min), $lte: Number(max) },
      };
    } else if (min) {
      priceQuery = { price: { $gte: Number(min) } };
    } else if (max) {
      priceQuery = { price: { $lte: Number(max) } };
    }

    // handle brand query
    if (brand) {
      brandQuery = { brand };
    }

    // handle collection type
    if (collectionType) {
      collectionTypeQuery = { collectionType };
    }

    const query = {
      category,
      ...stockQuery,
      ...priceQuery,
      ...brandQuery,
      ...collectionTypeQuery,
    };

    const products = await productsCollection.find(query).toArray();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};
