"use strict"

"use strict";


const saveDataButton = document.querySelector(".js-save-data");
const recoverDataButton = document.querySelector(".js-recover-data");
const list = document.querySelector(".js-list-users");

let users = [];

function getRandomUser(){
  fetch("https://randomuser.me/api/?results=10")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (const result of data.results) {
      users.push({
        name: result.name.first,
        city: result.location.city,
        photo: result.picture.large,
        usrname: result.login.username,
        id: result.login.uuid,
        isFriend: false,
      });
    }
    renderUsers();
  });


}
getRandomUser();


function addFriend(event) {
  event.preventDefault();
  const userId = event.currentTarget.id;

  for (const user of users) {
    if (user.id === userId) {
      const isFriend = user.isFriend;
      if (isFriend === "True") {
        user.isFriend = "False";
      } else {
        user.isFriend = "True";
      }
    }
  }
  list.innerHTML = "";
  renderUsers();
}

function addClassSelected() {
  for (const user of users) {
    const friend = document.getElementById(`${user.id}`);
    if (user.isFriend === "True") {
      friend.classList.add("friends");
    } else {
      friend.classList.remove("friends");
    }
  }
}
function renderUsers() {
  for (const user of users) {
    const liElement = document.createElement("li");

    liElement.innerHTML = `
    <li class="profile js-profile" id=${user.id}>
        <img src="${user.photo}" alt="${user.name}">
        <p>${user.name}</p>
        <p>${user.city}</p>
        <p>${user.username}</p>
     </li>
     `;
      

    list.appendChild(liElement);
  }
  const profiles = document.querySelectorAll(".js-profile");
  for (const profile of profiles) {
    profile.addEventListener("click", addFriend);
    console.log("ha hehco click");
  }
  addClassSelected();
}

function saveOnLocalStorage() {
  localStorage.setItem("users", JSON.stringify(users));
}

function recoverFromLocalStorage() {
  users = JSON.parse(localStorage.getItem("users"));
  list.innerHTML = "";
  renderUsers();
}

saveDataButton.addEventListener("click", saveOnLocalStorage);
recoverDataButton.addEventListener("click", recoverFromLocalStorage);




// //seleccionar elementos html
// const list = document.querySelector(".js-list");
// const buttonSave = document.querySelector(".js-button-save");
// const buttonRecover = document.querySelector(".js-button-save");
// //array people
// let users = [];
// let usersSelectedFriends = [];


// //OBTENER 10 USUARIOS DE LA API
// function getRandomUser (){
//     fetch("https://randomuser.me/api/?results=10")
//     .then(response => response.json())
//     .then((data) => {
//         const users = data.results;
    
//         //renderUsers(users);
        

//         // PINTAR USUARIOS HTML
//         for(const user of users){
//             //console.log(user);
            
//             list.innerHTML += `
            
//             <li class="friend-result" id=${user.login.uuid}>
//                 <img src="${user.picture.large}" alt="${user.name.first}">
//                 <p>${user.name.first}</p>
//                 <p>${user.location.city}</p>
//                 <p>${user.login.username}</p>

//             </li>
//             `

           
            
//         }

//         // const friendResults = document.querySelectorAll(".friend-result");
//         // for (const friend of friendResults){
          
//         handleClick();


//         // }

//         //addClassUserFriend();

//       });
//     }
    
// getRandomUser() //llamo a la función para que me aparezcan los datos en la consola 


// //MARCAR COMO AMIGOS
// // function addClassUserFriend() {
// //   for (const ser of users) {
// //     const friend = document.querySelector(`#${ser.login.uuid}`);
// //     if (user.isFriend ===  "True"){
// //       friend.classList.add("userFriend-selected");
// //     } else {
// //       friend.classList.remove("userFriend-selected");
// //     }
// //   }
// // }


// function handleClick(event) {
//   const userId = event.currentTarget.id;

//   for (const user of users) {
//     if (user.id === userId) {
//       const isFriend = user.isFriend;
//       if (isFriend === "True") {
//         user.isFriend = "False";
//       } else {
//         user.isFriend = "True";
//       }
//     }
//   }
//   //list.innerHTML = "";
//   getRandomUser();
// }

// function marcarComoAmigo(usuario) {
//   usuario.isFriend = !usuario.isFriend;  // Cambiamos el valor de isFriend
//   handleClick();
//    // Vuelvo a pintar la lista con los cambios
// }

// // function handleClick(event) {
// //     const userClicked = event.currentTarget.id;//click en cada div
// //     //console.log("clicked element:", userClicked);

// //     const userFriend = users.find((user) => {
// //       return user.login.uuid === userClicked;
// //     });
// //     console.log(event.currentTarget);

// //     event.currentTarget.classList.toggle("userFriend-selected");

//     // if (userFriend === null) {
//     //   userFriend.classList.toggle("userFriend-selected");
//     //   //console.log(userFriend);
//     // }
    
    
  
//     //const userFriend = users.find((user) => user.login.uuid === userClicked); //posición del objeto en el array
    

//     // if (userFriend !== -1) {
//     //     users[userClicked] = true;
//     //     event.currentTarget.classList.toggle("userFriend-selected");
//     //     console.log(users);

//     // }


// // list.addEventListener("click", handleClick); //escuchancl el click sobre cada usuario


// //Función para guardar los usuarios en localStorage
// function saveUsers() {
//     localStorage.setItem('friends', JSON.stringify(users));
//     alert("Usuarios guardados en localStorage.");
//     console.log(saveUsers);
//   }

//   // Función para cargar los usuarios desde localStorage
// function loadUsers() {
//     const storedUsers = localStorage.getItem('friends');
//     //console.log(storedUsers);
//     if (storedUsers) {
//       users = JSON.parse(storedUsers);
//       getRandomUser();
//     } else {
//       alert("No hay usuarios guardados.");
//     }
//   }

// buttonSave.addEventListener('click', saveUsers);
// buttonRecover.addEventListener('click', loadUsers);