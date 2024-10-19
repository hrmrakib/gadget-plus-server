import express from "express";
import { getBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.get("/blogs", getBlogs);

export default router;
