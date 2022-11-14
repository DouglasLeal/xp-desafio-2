const URL_EVENTS = "https://xp41-soundgarden-api.herokuapp.com/events";

let tbody = document.querySelector("table tbody");

function getEvents(){
    fetch(URL_EVENTS)
    .then(response => response.json())
    .then(data => createTrEvents(data))
    .catch(error => console.log("Erro ao obter Eventos"));
}

function createTrEvents(events){
    events.forEach((event, index) => {
        tbody.innerHTML += createLayout(index, event);
    });
}

function createLayout(index, event){
    let formattedDate = new Date(event.scheduled).toLocaleString();

    let tr = `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${formattedDate.substring(0, formattedDate.length - 3)}</td>
        <td>${event.name}</td>
        <td>${event.attractions}</td>
        <td>
            <a href="reservas.html" class="btn btn-dark">ver reservas</a>
            <a href="editar-evento.html?id=${event._id}" class="btn btn-secondary">editar</a>
            <a href="excluir-evento.html?id=${event._id}" class="btn btn-danger">excluir</a>
        </td>
    </tr>`

    return tr;
}

getEvents();
