const URL_API = "https://xp41-soundgarden-api.herokuapp.com/events";
let form = document.querySelector("form");

form.addEventListener('submit', createEvent);

function createEvent(event) {
    event.preventDefault();
    let name = document.getElementById("nome").value;
    let poster = "link imagem";
    let attractions = document.getElementById("atracoes").value.split(",");
    let description = document.getElementById("descricao").value;
    let scheduled = new Date(document.getElementById("data").value);
    let number_tickets = document.getElementById("lotacao").value;

    postEvent({ name, poster, attractions, description, scheduled, number_tickets });
};

function postEvent(data) {
    console.log(data)

    fetch(URL_API, {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.text())
        .then(result => {
            let path = location.pathname.split("/");
            path = path.filter((el) => el);
            path = path[0].includes("html") ? "" : path[0];
            let origin = path != "" ? `${location.origin}/${path}` : location.origin;

            window.location.href = `${origin}/admin.html`;
        })
        .catch(error => console.log('error', error));
}