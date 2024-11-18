"use strict"

//seleccionar elementos html
const list = document.querySelector(".js-list");
const buttonSave = document.querySelector(".js-button-save");
const buttonRecover = document.querySelector(".js-button-save");
//array people
let users = [];


//OBTENER 10 USUARIOS DE LA API
function getRandomUser (){
    fetch("https://randomuser.me/api/?results=10")
    .then(response => response.json())
    .then((data) => {
        const users = data.results;
    
        //renderUsers(users);

        for(const user of users){
            //console.log(user);
            
            list.innerHTML += `
            <div class="friend-result">
                <img src="${user.picture.large}" alt="${user.name.first}">
                <p>${user.name.first}</p>
                <p>${user.location.city}</p>
                <p>${user.login.username}</p>
            </div>
            `
        }
    
    
    });
}
getRandomUser() //llamo a la función para que me aparezcan los datos en la consola 


// PINTAR USUARIOS HTML



// Función para guardar los usuarios en localStorage
// function saveUsers() {
//     localStorage.setItem('randomFriends', JSON.stringify(randomFriends));
//     alert("Usuarios guardados en localStorage.");
//   }

//   // Función para cargar los usuarios desde localStorage
// function loadUsers() {
//     const storedUsers = localStorage.getItem('randomFriends');
//     if (storedUsers) {
//       randomFriends = JSON.parse(storedUsers);
//       paintUsers();
//     } else {
//       alert("No hay usuarios guardados.");
//     }
//   }

// buttonSave.addEventListener('click', saveUsers);
// buttonRecover.addEventListener('click', loadUsers);