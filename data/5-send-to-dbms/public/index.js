document.querySelector(".btn").addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords);

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.querySelector(".latitude").textContent = lat;
      document.querySelector(".longitude").textContent = lon;
      const nama = document.querySelector("#name-data").value;

      const sendDatas = { nama, lat, lon };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendDatas),
      };

      fetch("/api", options)
        .then((res) => res.json())
        .then((data) => console.log(data));
    });
  } else {
    console.log("not supporting");
  }
});
