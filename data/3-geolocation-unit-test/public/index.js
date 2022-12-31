if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(async (position) => {
    console.log(position.coords);

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.querySelector(".latitude").textContent = lat;
    document.querySelector(".longitude").textContent = lon;

    const sendDatas = { lat, lon };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDatas),
    };

    const content = await fetch("/api", options);
    const run = await content.json();
    console.log(run);
  });
} else {
  console.log("not supporting");
}
