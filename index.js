const users = document.getElementById("user");
const list = document.createElement("ul");
const btnList = document.createElement("button");
const containerUserRigth = document.createElement("div");
const containerUserLeft = document.createElement("div");
const btnAddUsers = document.createElement("button");
btnAddUsers.textContent = "Add User";
btnList.textContent = "show button user";
list.classList.add("hiden");
btnAddUsers.classList.add("hiden");
users.append(containerUserRigth, containerUserLeft);

containerUserLeft.append(list, btnList, btnAddUsers);

const baseUrl = "https://64608ee7ca2d89f7e75a6688.mockapi.io";

btnList.addEventListener("click", getUsers);
function getUsers() {
  fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((users) => {
      console.log(users);
      const markup = users
        .map(({ name, id }) => `<li id="${id}"><p>${name}</p></li>`)
        .join("");
      list.innerHTML = "";
      list.insertAdjacentHTML("afterbegin", markup);
      btnAddUsers.classList.remove("hiden");
      list.classList.remove("hiden");
      btnList.classList.add("hiden");
    });
}
list.addEventListener("click", showUserInfo);
function showUserInfo(e) {
  let id;
  console.log(e);
  if (e.target.nodeName === "LI") {
    id = e.target.id;
  } else if (e.target.nodeName === "P") {
    id = e.target.parentNode.id;
  } else {
    return;
  }
  fetch(`${baseUrl}/users/${id}`)
    .then((response) => response.json())
    .then((user) => {
      const markup = createUserMarckUp(user);
      containerUserRigth.innerHTML = "";
      containerUserRigth.insertAdjacentHTML("afterbegin", markup);
      const btnDelite = document.querySelector(".btnDelite");
      btnDelite.addEventListener("click", delitUser);
      const btnUpdate = document.querySelector(".btnUpdate");
      btnUpdate.addEventListener("click", upDateUser);
    });
}

function createUserMarckUp({ name, avatar, mail, phone, id }) {
  return `<div data-id = '${id}'>
      <p class=" user-name">${name}</p>
      <img class="user-img" src="${avatar}" alt="${name}" />
      <p class=" user-mail">${mail}</p>
      <p class=" user-phone">${phone}</p>
      <button class = 'btnDelite' type = 'button'>delite</button>
      <button class = 'btnUpdate' type = 'button'>update</button>
      </div>
    `;
}
function delitUser(e) {
  const id = e.target.parentNode.dataset.id;
  console.log(id);
  fetch(`${baseUrl}/users/${id}`, { method: "DELETE" }).then(() => {
    getUsers();
    containerUserRigth.innerHTML = "";
  });
}
btnAddUsers.addEventListener("click", addUser);
function addUser() {
  const addUserForm = creatMarkUp({});
  containerUserRigth.insertAdjacentHTML("afterbegin", addUserForm);
  const formUser = document.querySelector("form");
  formUser.addEventListener("submit", submitHundler);
  function submitHundler(e) {
    e.preventDefault();
    const dateUser = {
      name: e.target.elements.name.value,
      avatar: e.target.elements.avatar.value,
      mail: e.target.elements.mail.value,
      phone: e.target.elements.phone.value,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(dateUser),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    };
    fetch(`${baseUrl}/users`, options)
      .then(() => {
        getUsers();
        containerUserRigth.innerHTML = "";
        containerUserRigth.innerHTML = "<p>контакт додано </p>";
      })
      .catch((error) => console.log(error));
  }
}
function creatMarkUp({ name = "", avatar = "", mail = "", phone = "" }) {
  return `<form>
      <label>name
        <input type="text" name="name"  value = '${name}'/>
      </label>
      <label>
        avatar
        <input type="text" name="avatar" value = '${avatar}' />
      </label>
      <label>mail<input type="text" name="mail"  value = '${mail}'/></label>
      <label>phone<input type="text" name="phone"  value = '${phone}'/></label>
      <button type="submit">save</button>
    </form>`;
}

function upDateUser(e) {
  const id = e.target.parentNode.dataset.id
  
  const upDateNewUser = {
      name: e.target.parentNode.querySelector('.user-name').textContent,
      avatar: e.target.parentNode.querySelector('.user-img').src,
      mail: e.target.parentNode.querySelector('.user-mail').textContent,
    phone: e.target.parentNode.querySelector('.user-phone').textContent,
      
  };
  const upDateNewUserMarkUp = creatMarkUp(upDateNewUser)
  containerUserRigth.innerHTML=''
  containerUserRigth.insertAdjacentHTML("afterbegin", upDateNewUserMarkUp);
  const formUser = document.querySelector("form");
  formUser.addEventListener('submit', editUser)
  function editUser(e) {
     e.preventDefault();
    const dateUser = {
      name: e.target.elements.name.value,
      avatar: e.target.elements.avatar.value,
      mail: e.target.elements.mail.value,
      phone: e.target.elements.phone.value,
    };
    const options = {
  method: "PUT",
  body: JSON.stringify(dateUser),
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
    };
    fetch(`${baseUrl}/users/${id}`, options)
      .then(() => {
        console.log(123);
    getUsers()
  } )
  .catch(error => console.log("ERROR" + error));
  }
}
users.style.display = "flex";
