let form = document.querySelector("form")

const urlParams = new URLSearchParams(window.location.search);
const idEvent = urlParams.get("id");

function getEvent() {
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvent}`)
        .then(response => response.json())
        .then(event => fillForm(event))
        .catch(error => console.log("Não foi possível encontrar o evento"));
}

function fillForm(event) {
    for (const input of form.elements) {
        if (input.name != "") {
            input.value = event[input.name];
        }
    }

    form.elements['scheduled'].value = event.scheduled.substring(0, event.scheduled.length - 8);
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    deleteEvent();
});

function deleteEvent() {
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events/${idEvent}`, {
        method: 'DELETE',
    })
    .then(response => { 
        let path = location.pathname.split("/");
            path = path.filter((el) => el);
            path = path[0].includes("html") ? "" : path[0];
            let origin = path != "" ? `${location.origin}/${path}` : location.origin;
            
            window.location.href = `${origin}/admin.html`;
    })
    .catch(error => console.log(error));
}

getEvent();

console.log();