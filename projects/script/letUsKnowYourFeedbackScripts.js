const sendBtn = document.getElementById("sendBtn");
const ratings = document.querySelectorAll(".rating");
const ratingsContainer = document.querySelector(".ratings-container");
const panel = document.getElementById("panel");

let selectedRating = "Satisfied";

ratingsContainer.addEventListener("click", (e) => {
  //   console.log(e);
  if (e.target.parentNode.classList.contains("rating")) {
    // console.log(e.target);
    removeActive();
    e.target.parentNode.classList.add("active");
    selectedRating = e.target.nextElementSibling.innerHTML;
    // console.log(selectedRating);
  }
});

function removeActive() {
  for (let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove("active");
  }
}

sendBtn.addEventListener("click", (e) => {
  console.log(e.target);
  panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br />
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our customer support</p>
    `;
});
