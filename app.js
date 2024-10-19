import express from "express";
import productRoutes from "./routes/productRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import corsOptions from "./middlewares/corsConfig.js";

const app = express();

// Middleware
app.use(express.json());
app.use(corsOptions);

// Register product routes
app.use("/api", productRoutes);
app.use("/api", blogRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello, I am running!");
});

export default app;
