const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.render("index", {
    title: "Index Page",
    header: "Main Page",
    lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ipsam quod alias qui itaque! Nihil.",
  });
});
app.get("/second", (req, res) => {
  res.render("second", {
    title: "Second Page",
    header: "Bench Page",
    lorem: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ipsam quod alias qui itaque! Nihil.",
  });
});

app.use((req, res) => {
  res.send(`Path: ${req.originalUrl} Tidak Ditemukan... `);
  console.log(req.originalUrl);
});

app.listen(port, () => {
  console.log(`listening at ${port} | https://localhost:${port}/`);
});
