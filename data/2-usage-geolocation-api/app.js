if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords);

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.querySelector(".latitude").textContent = lat;
    document.querySelector(".longitude").textContent = lon;
  });
} else {
  console.log("not supporting");
}
