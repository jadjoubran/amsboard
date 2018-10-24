setInterval(() => {
  window.location.reload();
}, 60000 * 5);

const getFerries = () => {
  fetch(
    "https://admin.pontveer.nl/api/departures?line=Buiksloterweg%20-%20Centraal%20Station"
  )
    .then(response => response.json())
    .then(ferries => {
      ferries.forEach(ferry => {
        setInterval(() => {
          getDiff(ferry.expected_departure_time);
        }, 1000);
      });
    });
};

const getDiff = departure => {
  const time = departure.split(":");

  const date = new Date();
  date.setHours(+time[0]);
  date.setMinutes(time[1]);
  date.setSeconds(time[2]);
  const diff = Math.round((date.getTime() - new Date().getTime()) / 1000);
  console.log(diff);
};

const getBeerOClock = () => {
  const date = new Date();

  const options = { weekday: "long" };

  const day = new Intl.DateTimeFormat("en-US", options).format(date);
  const hour = date.getHours();
  const el = document.querySelector("#beer-clock");

  el.innerHTML = "No.";
  if (day === "Friday") {
    if (hour >= 14) {
      el.innerHTML = "<h2>Almost 🍺!</h2>";
    }
    if (hour >= 16) {
      el.innerHTML = "<h2>Yes!!!! 🍺🍻🍺🍻!</h2>";
    }
  }
};

getFerries();

getBeerOClock();
