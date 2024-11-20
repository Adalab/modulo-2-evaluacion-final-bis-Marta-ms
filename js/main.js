"use strict";


const saveUsers = document.querySelector(".js-save-btn");
const recoverUsers = document.querySelector(".js-recover-btn");
const list = document.querySelector(".js-list-users");

let users = [];

//OBTENER 10 USUARIOS DE LA API
function getRandomUser(){
  fetch("https://randomuser.me/api/?results=10")
  .then(response => response.json())
  .then((data) => {
    for (const result of data.results) {
      //los usurios obtenidos los guardo en el array vacío users para luego utilizarlo
      users.push({ //selecciono los datos que quiero mostrar
        name: result.name.first,
        city: result.location.city,
        photo: result.picture.large,
        usrname: result.login.username,
        id: result.login.uuid,
        isFriend: false,
        number: result.phone, //por defecto no es amigo
      });
    }
    renderUsers();
  });


}
getRandomUser();//llamo a la función para que me aparezcan los datos en la consola


function addFriend(event) { //cuando el usuario hace click
  //event.preventDefault();
  const userId = event.currentTarget.id;
  //console.log(userId); //  id del usuario

  for (const user of users) {
    if (user.id === userId) { //si el id del usuario es igual al id del usuario seleccionado
      const isFriend = user.isFriend;
      if (isFriend === "True") {
        user.isFriend = "False";
      } else {
        user.isFriend = "True";
      }
    }
  }
  list.innerHTML = "";
  renderUsers();//función que pinta los usuarios
}

//MARCAR COMO AMIGOS
function addClassSelected() {
  for (const user of users) {
    const friend = document.querySelector(`#${user.id}`); //obtengo el elemento con el id del usuario
    //si el usuario es amigo isFriend:True añado clase friends
    if (user.isFriend === "True") { 
      friend.classList.add("friends");
    } else {
      friend.classList.remove("friends");
    }
  }
}

// PINTAR USUARIOS HTML
function renderUsers() {
  for (const user of users) { //recorre array users y cre elemento LI
    const liElement = document.createElement("li");

    liElement.innerHTML = `
    <li class="profile js-profile" id=${user.id}>
        <img src="${user.photo}" alt="${user.name}">
        <p>${user.name}</p>
        <p>${user.city}</p>
        <p>${user.username}</p>
        <p>${user.number}</p>
     </li>
     `;
      

    list.appendChild(liElement); //añado elemento hijo (li)
  }
  const profiles = document.querySelectorAll(".js-profile");
  for (const profile of profiles) {
    profile.addEventListener("click", addFriend);
    //console.log("ha hehco click");
  }
  addClassSelected();
}

//CARGAR USUARIOS EN LOCALSTOREAGE
function saveLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function recoverLocalStorage() {
  users = JSON.parse(localStorage.getItem("users"));
  list.innerHTML = "";
  renderUsers();
}

saveUsers.addEventListener("click", saveLocalStorage);
recoverUsers.addEventListener("click", recoverLocalStorage);




