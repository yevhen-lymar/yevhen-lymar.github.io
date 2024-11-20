const USER_ID = 5;
const END_POINT = "https://jsonplaceholder.typicode.com";

function getUserInfo(id) {
  const result = {
    id,
    name: "",
    email: "",
    posts: [],
  };

  return new Promise((resolve, reject) => {
    fetch(`${END_POINT}/users`)
      .then((data) => data.json())
      .then((users) => {
        const foundUser = users.find((user) => user.id === id);
        // console.log(1, foundUser);
        result.name = foundUser.name;
        result.email = foundUser.email;
        // console.log(2, result);
        fetch(`${END_POINT}/posts`)
          .then((data) => data.json())
          .then((posts) => {
            const foundPost = posts.filter((post) => post.userId === id);
            // console.log(3, foundPost);
            result.posts = foundPost;
            // console.log(4, result);
            resolve(result);
          });
      });
  });
}

// getUserInfo(USER_ID);

// console.log(5, getUserInfo(USER_ID));

// getUserInfo(USER_ID).then((data) => console.log(6, data));

// function sayHello() {
//   getUserInfo(USER_ID).then((data) => {
//     alert(`Hello ${data.name}`);
//   });
// }

// async function sayHello() {
//   const user = await getUserInfo(USER_ID);
//   console.log(`Hello ${user.name}`);
// }

async function sayHello() {
  try {
    const user = await getUserInfo(USER_ID);
    console.log(`Hello ${user.name}`);
  } catch (error) {
    console.log(error.message);
  }
}

sayHello();
