const sliderContainer = document.querySelector(".slider-container");
const sliderRight = document.querySelector(".right-slide");
const sliderLeft = document.querySelector(".left-slide");
// const upButton = document.querySelector(".up-button");
const upButton = document.getElementById("up");
// const downButton = document.querySelector(".down-button");
const downButton = document.getElementById("down");
const slidesLength = sliderRight.querySelectorAll("div").length;

console.log(slidesLength);
console.log(sliderContainer.clientHeight);

let activeSlideIndex = 0;

sliderLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;
  console.log(sliderHeight);
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > slidesLength - 1) {
      activeSlideIndex = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }

  sliderRight.style.transform = `translateY(-${
    activeSlideIndex * sliderHeight
  }px)`;
  sliderLeft.style.transform = `translateY(${
    activeSlideIndex * sliderHeight
  }px)`;
};

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));
