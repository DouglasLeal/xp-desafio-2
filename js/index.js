let divNextEvents = document.querySelector(".nextevt");
let form = document.querySelector("form");

let idEventClicked = null;

function getEvents() {
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`)
        .then(response => response.json())
        .then(events => nextEventsIndex(events))
        .catch(error => console.log("Erro ao obter eventos."))
}

function getEvent(id) {
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${id}`)
        .then(response => response.json())
        .then(event => {
            changeTitleModal(event.name)
        })
        .catch(error => console.log("Erro ao obter evento."))
}

function nextEventsIndex(events) {
    let mainEvents = events.slice(0, 3);

    mainEvents.forEach(data => {
        let dateEvent = new Date(data.scheduled);
        let newDate = `${dateEvent.getDate()}/${dateEvent.getMonth()}/${dateEvent.getFullYear()}`;

        let cardEvents = `
        <article class="evento card p-5 m-3">
            <h2>${data.name} - ${newDate}</h2>
            <h4>${data.attractions}</h4>
            <p>${data.description}</p>
            <a data-id="${data._id}" data-bs-toggle="modal" data-bs-target="#modalBooking" type="button" class="btn btn-primary">reservar ingresso</a>
        </article>
        `;

        divNextEvents.innerHTML += cardEvents;
    });

    addListenerBookingButton();
}

function addListenerBookingButton() {
    let buttons = document.querySelectorAll(".nextevt .btn-primary");

    buttons.forEach(b => {
        b.addEventListener('click', (ev) => {
            idEventClicked = ev.target.dataset.id;
            getEvent(idEventClicked);
        });
    });
}

function changeTitleModal(name) {
    let modalTitle = document.querySelector("#modalBookingLabel");
    modalTitle.innerText = "Event Title";
    modalTitle.innerText = name;
}

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let newBooking = { number_tickets: 1, event_id: idEventClicked };

    newBooking["owner_name"] = form.elements["owner_name"].value;
    newBooking["owner_email"] = form.elements["owner_email"].value;

    postBooking(newBooking);
});

function postBooking(newBooking) {
    fetch(`https://xp41-soundgarden-api.herokuapp.com/bookings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBooking)
    })
        .then(response => response.json())
        .then(result => { window.location.href = '/' })
        .catch(error => console.log("Erro ao criar reserva"));
}



getEvents();