const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://ebrahimmohammad297:6cOz2Df5zdvU5uXB@cluster0.q1w8m86.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const db = client.db("sample_mflix");
  const sampleMoviesCollection = db.collection("movies");
  const sampleUsersCollection = db.collection("users");
  try {
    // get movies data
    app.get("/movies", async (req, res) => {
      try {
        const query = {};
        const result = await sampleMoviesCollection
          .find(query)
          .limit(100)
          .toArray();
        res.status(200).json({
          status: "ok",
          message: "get movies data successfully",
          total: result?.length,
          data: result,
        });
        console.log(result);
      } catch (error) {
        res.status(500).json({
          status: "failed",
          message: error?.message,
          total: result?.length,
        });
        console.log(error.message);
      }
    });
    // get movies data
    app.get("/users", async (req, res) => {
      try {
        const query = {};
        const result = await sampleUsersCollection
          .find(query)
          // .limit(100)
          .toArray();
        res.status(200).json({
          status: "ok",
          message: "get movies data successfully",
          total: result?.length,
          data: result,
        });
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    });
  } finally {
  }
}
run();
// .catch(console.dir);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;

// 6cOz2Df5zdvU5uXB
