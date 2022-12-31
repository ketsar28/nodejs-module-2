async function takeDatas() {
  const getAll = await fetch("/api");
  const items = await getAll.json();

  console.log(items);
  for (item of items) {
    const root = document.createElement("div");
    const loc = document.createElement("div");
    const date = document.createElement("div");
    const coord = document.createElement("div");
    const img = document.createElement("img");
    const dateString = new Date(item.timestamp).toLocaleString();

    coord.innerHTML = `<li>Latitude : ${item.latitude} & Longitude : ${item.longitude}</li><br>`;
    date.innerHTML = `<li>Tanggal ${dateString}</li>`;
    loc.innerHTML = `<li>Lokasi : ${item.daerah}</li>`;
    img.src = item.imgCode;
    img.alt = "Data Gambar";

    root.append(loc, date, coord, img);
    document.querySelector(".list").append(root);
  }
}

takeDatas();
