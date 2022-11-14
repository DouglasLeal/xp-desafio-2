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
        
    postEvent({name, poster, attractions, description, scheduled, number_tickets});    
};

function postEvent(data) {
    fetch(URL_API, {
    method: 'POST',
    body: JSON.stringify(data),
    redirect: 'follow',
    headers: {
        'Content-Type': 'application/json'
    },
})
.then(response => response.text())
.then(result => {window.location.href = '/admin.html'})
.catch(error => console.log('error', error));
}