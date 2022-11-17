let eventId = location.search.replace('?id=', '');

const URL_API = "https://xp41-soundgarden-api.herokuapp.com/events/" + eventId;

let form = document.querySelector("form");
let getRequest = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

let name = document.querySelector("#nome");
let poster = document.querySelector("#banner");
let attractions = document.querySelector("#atracoes");
let description = document.querySelector("#descricao");
let scheduled = document.querySelector("#data");
let number_tickets = document.querySelector("#lotacao");

async function getEvent() {
    try {
        let response = await fetch(URL_API, getRequest);
        let data = await response.json();

        name.value = data.name;
        poster.value = data.poster;
        attractions.value = data.attractions;
        description.value = data.description;
        scheduled.value = new Date(data.scheduled).toLocaleString('pt-BR', {timeZone: "America/Sao_Paulo", dateStyle: "short", timeStyle: "short"});
        number_tickets.value = data.number_tickets;

        if (response.status !== 200) {
            throw Error(data.detail);
        }
    } catch (error) {
            console.log(error);
    }
}

form.addEventListener('submit', editEvent);

function editEvent(ev) {
    ev.preventDefault();
    let event = {}
    event.name = name.value;
    event.poster = poster.value;
    event.attractions = attractions.value.split(",");
    event.description = description.value;
    event.scheduled = new Date(scheduled.value);
    event.number_tickets = number_tickets.value;

    console.log(event)

    putEvent(event)
        .then(response => response.json())
        .then(result => { 
            let path = location.pathname.split("/");
            path = path.filter((el) => el);
            path = path[0].includes("html") ? "" : path[0];
            let origin = path != "" ? `${location.origin}/${path}` : location.origin;
            
            window.location.href = `${origin}/admin.html`;
         })
        .catch(error => console.log("Erro ao editar evento"));    
}

async function putEvent(event) {
    try {
        let response = await fetch(URL_API, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event)
        });

        if (response.status !== 200) {
            console.log(response)
            throw Error();
        }

        return response;
    } catch (error) {
        console.log(error)
    }    
}


getEvent();

