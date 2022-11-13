let tableBody = document.querySelector("table tbody");

let mevents = [];

async function getBookings(){
    let response = await fetch("https://xp41-soundgarden-api.herokuapp.com/events");
    mevents = await response.json();
    console.log(mevents);
    menuBookings();
}

function menuBookings(){
    mevents.forEach((data, index) => {
        let book = displayBookings(data, index);

        tableBody.innerHTML += book;
    });
}

function displayBookings(data, index){
        let dateEvent = new Date(data.scheduled);
        let newDate = dateEvent.toLocaleString().substring(0, dateEvent.toLocaleString().length-3);
        
        let item = `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${newDate}</td>
            <td>${data.name}</td>
            <td>${data.attractions}</td>
            <td>
                <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?id=${data._id}" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?id=${data._id}" class="btn btn-danger">excluir</a>
            </td>
        </tr>`;

        return item;

    }

getBookings();