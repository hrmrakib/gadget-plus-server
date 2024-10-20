import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCollectionType,
  getProductsByCategory,
  getAllCollections,
  getProductByTitle,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/product", getProductById);

router.get("/collectionType", getProductsByCollectionType);

router.get("/category", getProductsByCategory);

router.get("/allCollection", getAllCollections);

router.get("/product-by-title", getProductByTitle);

export default router;
