let eventId = location.search.replace('?id=', '');

const URL_API = "https://xp41-soundgarden-api.herokuapp.com/bookings/event/" + eventId;

let getRequest = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
};

let tbody = document.querySelector("table tbody");
let tittle = document.getElementById("tittle");

function getBookings() {
    fetch(URL_API, getRequest)
    .then(response => response.json())
    .then(data => bookingList(data))
    .catch(error => console.log("Erro ao obter reservas"));
} 

function bookingList(bookings){
    tittle.innerHTML = bookings[1].event.name;
    bookings.forEach((booking, index) => {
        tbody.innerHTML += createLayout(index, booking);
    });   
}

function createLayout(index, booking){
    let formattedDate = new Date(booking.created_at).toLocaleString();

    let tr = `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${formattedDate.substring(0, formattedDate.length - 3)}</td>
        <td>${booking.owner_name}</td>
        <td>${booking.owner_email}</td>
    </tr>`

    return tr;
}

getBookings();