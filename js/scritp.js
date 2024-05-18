const requestOptions = {
    method: "GET",
    redirect: "follow"
};

let heroes = document.getElementById('heroes');
let pagination = document.getElementById('image');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

makeRequest("https://dragonball-api.com/api/characters", 'mostrarGuerreros(result)')

function makeRequest(url, method) {
    fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => eval(method))
        .catch((error) => console.error(error));
}

function mostrarGuerreros(result) {
    console.log(result.links.previous);
    prev.dataset.prev = result.links.previous;
    next.dataset.next = result.links.next;

    result.items.forEach(element => {
        heroes.innerHTML += `
            <div class="Guerreros__z" onclick="showDetail('${element.name}', '${element.race}', '${element.ki}', '${element.maxKi}', '${element.image}', '${element.gender}')"> 
            <div class="card__title"><h1>${element.name}</h1></div>
                <img class="card__img" src="${element.image}" alt="">
            </div>
        `;
    });
}

prev.addEventListener('click', () => {
    update(prev.dataset.prev);
});

next.addEventListener('click', () => {
    update(next.dataset.next);
});

function update(url) {
    if (url !== 'null') {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        heroes.innerHTML = "";

        makeRequest(url, "mostrarGuerreros(result)")
    }
}

function showDetail(name, race, ki, maxKi, image, gender) {
    Swal.fire({
        title: name,
        html: `
            <p>Raza: ${race}</p>
            <p>Ki: ${ki}</p>
            <p>Máximo ki: ${maxKi}</p>
            <p>Genero: ${gender}</p>
        `,
        imageUrl: image,
        imageWidth: 400,
        imageHeight: 600,
        imageAlt: "Custom image",
        customClass: {
            popup: 'carta'
        }
    });
}