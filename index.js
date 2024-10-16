const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const { MongoClient, ServerApiVersion } = require("mongodb");

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
    const db = client.db("gadegt");

    // collections
    const productsCollection = db.collection("products");

    // home route
    app.get("/", (req, res) => {
      res.send("Hello, I am running!");
    });

    // get product for home page
    app.get("/api/products", async (req, res) => {
      const result = await db.collection("products").find().limit(16).toArray();
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
