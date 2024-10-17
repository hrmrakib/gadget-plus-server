const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://gadget-plus-ecom.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// const uri =
//   "mongodb+srv://airbnb:raeOVKfYhTXkr3Bh@cluster0.dmwxvyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // database
    const db = client.db("gadget");

    // home route
    app.get("/", (req, res) => {
      res.send("Hello, I am running!");
    });

    // get product for home page
    app.get("/api/products", async (req, res) => {
      const result = await db.collection("products").find().limit(16).toArray();
      res.send(result);
    });

    // get a single product for dynamic product page
    app.get("/api/product", async (req, res) => {
      const { id } = req.query;
      const result = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // get product based on the collectionType
    app.get("/api/collectionType", async (req, res) => {
      const { type } = req.query;
      const result = await db
        .collection("products")
        .find({ collectionType: type })
        .toArray();
      res.send(result);
    });

    // get product based on the category
    app.get("/api/category", async (req, res) => {
      const { category } = req.query;
      const result = await db
        .collection("products")
        .find({ category })
        .toArray();
      res.send(result);
    });

    // get product based on the category
    app.get("/api/allCollection", async (req, res) => {
      const { productLimit } = req.query;
      const limited = Number(productLimit);
      const result = await db
        .collection("products")
        .find()
        .limit(limited)
        .toArray();
      res.send(result);
    });

    // get all blogs
    app.get("/api/blogs", async (req, res) => {
      const result = await db.collection("blogs").find().toArray();
      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
