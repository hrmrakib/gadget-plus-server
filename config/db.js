import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let productsCollection;
let blogCollection;

const connectDB = async () => {
  try {
    await client.connect();
    const db = client.db("gadget");
    productsCollection = db.collection("products");
    blogCollection = db.collection("blogs");
    console.log("Connected to the MongoDB database.");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export { connectDB, productsCollection, blogCollection };
