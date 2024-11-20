const btn = document.getElementById("btn");
const textTask = document.getElementById("textTask");
const listTask = document.querySelector(".todo-list");

// console.log(btn, textTask, listTask);

btn.addEventListener("click", () => {
  //   console.log(textTask.value);

  const li = document.createElement("li");
  li.classList.add("todo-list-item");
  li.innerText = textTask.value;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-button");
  deleteBtn.innerText = "Delete";

  if (textTask.value !== "") {
    li.appendChild(deleteBtn);
    listTask.appendChild(li);
    textTask.value = "";
  } else {
    alert("Please, write your task!");
  }

  deleteBtn.addEventListener("click", () => {
    listTask.removeChild(li);
  });
});
