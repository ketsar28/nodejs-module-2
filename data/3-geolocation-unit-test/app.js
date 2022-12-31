const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  res.send("Got a POST request");

  const data = req.body;

  res.json({
    status: "success",
    latitude: data.lat,
    longitude: data.lon,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
