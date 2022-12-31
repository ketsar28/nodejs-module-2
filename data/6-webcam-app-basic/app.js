const express = require("express");
const app = express();
const port = 3000;
const fs = require("node:fs");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const uri = "mongodb://127.0.0.1:27017";
const dbName = "coords";
const cls = "latlon";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api", (request, response) => {
  const db = client.db(dbName);
  client.connect((err, res) => {
    db.collection(cls)
      .find()
      .toArray()
      .then((result) => {
        console.log(result);
        response.json(result);
      })
      .catch((err) => console.log("error"));
  });
});

app.post("/api", (req, res) => {
  res.send("Got a POST request");

  const data = req.body;
  const time = Date.now();
  data.timestamp = time;
  const { timestamp, daerah, lat, lon, imgCode } = data;
  const content = {
    imgCode,
    timestamp,
    daerah,
    latitude: lat,
    longitude: lon,
  };

  console.log(content);
  client.connect((error, result) => {
    // pilih database
    const db = client.db(dbName);
    // == menambahkan 1 data ==

    db.collection(cls)
      .insertOne(content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // == showing one data ==
    console.log(
      db
        .collection(cls)
        .find()
        .toArray()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err))
    );

    // == hapus data ==
    // db.collection(cls)
    //   .deleteOne({ _id: ObjectId("639c4840ca72feb01d96889a") })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
