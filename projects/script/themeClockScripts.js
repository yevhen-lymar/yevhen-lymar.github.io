// const hourEl = document.querySelector(".hour");
const hourEl = document.getElementById("hour");
// const minuteEl = document.querySelector(".minute");
const minuteEl = document.getElementById("minute");
// const secondEl = document.querySelector(".second");
const secondEl = document.getElementById("second");
const timeEl = document.querySelector(".time");
const dateEl = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light mode";
  }
});

function setTime() {
  const time = new Date();
  //   console.log(time);
  const date = time.getDate();
  const month = time.getMonth();
  const day = time.getDay();
  const hours = time.getHours();
  const hoursForClock = hours % 12 || 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  //   console.log(month);
  //   console.log(day);
  //   console.log(hours);
  //   console.log(hoursForClock);
  //   console.log(minutes);
  //   console.log(seconds);
  //   console.log(scale(hoursForClock, 0, 11, 0, 360));

  hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(
    minutes,
    0,
    59,
    0,
    360
  )}deg)`;

  // Спеціальна обробка для секундної стрілки
  if (seconds === 0) {
    secondEl.style.transition = "none"; // Забираємо анімацію
    secondEl.style.transform = `translate(-50%, -100%) rotate(0deg)`;
  } else {
    secondEl.style.transition = "transform 0.05s linear"; // Відновлюємо анімацію
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(
      seconds,
      0,
      59,
      0,
      360
    )}deg)`;
  }

  timeEl.innerHTML = `${hoursForClock}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(setTime, 1000);
