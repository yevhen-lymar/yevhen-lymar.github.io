const display = document.getElementById("display");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const input = document.querySelectorAll("input");

input.forEach((el) => {
  el.addEventListener("click", (e) => {
    const value = e.target.value;
    display.value += value;

    // if (el.value === "+") {
    //   console.log(display.value.slice(0, 1));
    // }
  });
});

clear.addEventListener("click", () => {
  display.value = "";
});

equal.addEventListener("click", () => {
  // console.log(display.value);
  if (display.value === "") {
    display.value = "";
  } else {
    display.value = math.evaluate(display.value);
  }
});
