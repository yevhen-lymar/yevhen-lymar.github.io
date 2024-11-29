const display = document.getElementById("display");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const input = document.querySelectorAll("input");

input.forEach((el) => {
  el.addEventListener("click", (e) => {
    const value = e.target.value;
    display.value += value;
    console.log(value);
  });
});

clear.addEventListener("click", () => {
  display.value = "";
});

equal.addEventListener("click", () => {
  console.log(+display.value);
  console.log(display.value);
  display.value = eval(display.value);
});
