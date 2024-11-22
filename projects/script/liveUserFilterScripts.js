const resultCont = document.getElementById("result");
const filter = document.getElementById("filter");

// const API_KEY = "4JOF-OJV1-UNMI-BQBC";

const listItems = [];

async function getData() {
  const response = await fetch("https://randomuser.me/api?results=50");

  const { results } = await response.json();

  //   console.log(results);
  // Clear results
  resultCont.innerHTML = "";

  results.forEach((user) => {
    const li = document.createElement("li");

    listItems.push(li);

    li.innerHTML = `
    <img src="${user.picture.large}" alt="${user.name.first}" />
    <div class="user-info">
        <h4>${user.name.first} ${user.name.last}</h4>
        <p>${user.location.city}, ${user.location.country}</p>
    </div>
    `;

    resultCont.appendChild(li);
  });
}

getData();

filter.addEventListener("input", (e) => {
  filterData(e.target.value);
});

function filterData(searchTerm) {
//   console.log(searchTerm);
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
