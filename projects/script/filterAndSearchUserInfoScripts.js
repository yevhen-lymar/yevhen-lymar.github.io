async function fetchUsers() {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  return result.json();
}

async function renderList() {
  const users = await fetchUsers();
  const ul = document.querySelector(".users-list");
  //   console.log(users);
  for (const user of users) {
    const datalist = document.getElementById("userName");
    const option = document.createElement("option");
    option.value = user.name;
    datalist.appendChild(option);
    const li = document.createElement("li");
    li.classList.add("users-list-item");
    li.innerHTML = `${user.name} `;
    ul.appendChild(li);
  }
}

const btn = document.getElementById("btn");
const modal = document.getElementById("myModal");

async function infoForUserInModal() {
  const users = await fetchUsers();
  console.log(users);
  btn.addEventListener("click", () => {
    console.log(inputText.value);

    let userFound = false;

    for (const user of users) {
      if (inputText.value === user.name) {
        modal.innerHTML = ` 
            <div class="modal-content">
              <span class="close">&times;</span>
              <h2>Info for User: ${user.name}</h2>
              <div class="user-info-container" id="user-info-container">
              <h3>UserId: ${user.id}</h3>
              <h3>Username: ${user.username}</h3>
              <h3>Email: ${user.email}</h3>
              <h3>Phone: ${user.phone}</h3>
              <h3>Website: ${user.website}</h3>
              </div>
            </div>`;
        modal.style.display = "block";

        modal.querySelector(".close").addEventListener("click", () => {
          modal.style.display = "none";
        });
        userFound = true;
        inputText.value = "";

        const usersListItems =
          document.getElementsByClassName("users-list-item");
        for (const user of usersListItems) {
          user.classList.remove("hidden");
        }
        break;
      }
    }
    if (!userFound) {
      alert("Oops! Something went wrong!");
    }
  });
  // Close Modal Window
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
}

function filterUsers(e) {
  const usersListItems = document.getElementsByClassName("users-list-item");
  if (e.target.value.length === 0) {
    [...document.getElementsByClassName("hidden")].forEach((item) => {
      item.classList.remove("hidden");
    });
    return;
  }
  for (const user of usersListItems) {
    if (!user.innerHTML.startsWith(e.target.value)) {
      user.classList.add("hidden");
    } else {
      user.classList.remove("hidden");
    }
  }
}

renderList();
infoForUserInModal();

const inputText = document.getElementById("userNameText");
inputText.addEventListener("keyup", filterUsers);
