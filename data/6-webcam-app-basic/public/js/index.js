function setup() {
  let capture;
  noCanvas();
  capture = createCapture(VIDEO);
  capture.size(320, 240);

  capture.loadPixels()
  const imgCode = capture.loadPixels().canvas.toDataURL();
  document.querySelector(".btn").addEventListener("click", () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords);

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        document.querySelector(".latitude").textContent = lat;
        document.querySelector(".longitude").textContent = lon;
        const daerah = document.querySelector("#name-data").value;

        if (daerah == "" || daerah == undefined) {
          alert("silahkan input nama daerah");
          return false;
        }

        const sendDatas = { daerah, lat, lon, imgCode };

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

        alert("sukses");
      });
    } else {
      console.log("not supporting");
    }
  });

  // capture.hide();
  // background(255, 0, 0);
}
