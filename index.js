import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
