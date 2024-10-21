import express from "express";
import { getBlog, getBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.get("/blogs", getBlogs);
router.get("/blog", getBlog);

export default router;
