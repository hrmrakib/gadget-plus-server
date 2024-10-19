import express from "express";
import {
  getAllProducts,
  getProductById,
  getProductsByCollectionType,
  getProductsByCategory,
  getAllCollections,
  //   getAllBlogs,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/product", getProductById);

router.get("/collectionType", getProductsByCollectionType);

router.get("/category", getProductsByCategory);

router.get("/allCollection", getAllCollections);

// router.get("/blogs", getAllBlogs);

export default router;
