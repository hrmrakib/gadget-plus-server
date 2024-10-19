import { blogCollection } from "../config/db.js";

export const getBlogs = async (req, res) => {
  try {
    const result = await blogCollection.find().toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

export const blogController = { getBlogs };
