const requestOptions = {
    method: "GET",
    redirect: "follow"
};

let heroes = document.getElementById('heroes');
let pagination = document.getElementById('image');

fetch("https://dragonball-api.com/api/characters", requestOptions)
    .then((response) => response.json())
    .then((result) => mostrarGuerreros(result))
    .catch((error) => console.error(error));

function mostrarGuerreros(result) {
    result.items.forEach(element => {
        heroes.innerHTML += `
            <div class="Guerreros__z">
                <p>${element.name}, 
                ${element.race}</p>
                <img src="${element.image}" alt="">
            </div>
        `;
    });
    
    
}