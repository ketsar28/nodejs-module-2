const express = require("express");
const app = express();
const port = 3000;
const fs = require("node:fs");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const url = "mongodb://127.0.0.1:27017";
const db_name = "coords";
const cls = "latlon";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.get("/api", (req, res) => {
  const db = client.db(db_name);
  client.connect((err, res) => {
    const result = db
      .collection(cls)
      .find({})
      .toArray()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log("error"));
  });
});

app.post("/api", (req, res) => {
  res.send("Got a POST request");

  const data = req.body;
  const { nama, lat, lon } = data;
  const content = {
    nama,
    latitude: lat,
    longitude: lon,
  };

  console.log(content);
  const dir = "./data";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync("./data");
  }
  const path = "./data/data.json";
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, `[]`, "utf-8");
  }

  const file = fs.readFileSync("./data/data.json", "utf-8");
  const parsing = JSON.parse(file);
  // console.log(file);
  // //   json = push array, masukan data yang telah tersimpan di obj ke array
  parsing.push(content);
  ``;

  // //  semua data yang sudah ada di array supaya di tuliskan ke file json secara otomatis
  fs.writeFileSync(path, JSON.stringify(parsing));

  console.log(`loading...`);
  setTimeout(() => {
    //   berikan pesan tambahan
    console.log("data sudah masuk ke file .json, silakan di cek");
  }, 3000);

  // res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
