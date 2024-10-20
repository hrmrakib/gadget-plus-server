import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = "mongodb://localhost:27017";

const uri = `mongodb+srv://gadget-plus:wskOg8LMuMwVZm5P@cluster0.dmwxvyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let productsCollection;
let blogCollection;

const connectDB = async () => {
  try {
    await client.connect();
    const db = client.db("gadget-plus");
    productsCollection = db.collection("products");
    blogCollection = db.collection("blogs");
    console.log("Connected to the MongoDB database.");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
};

export { connectDB, productsCollection, blogCollection };
