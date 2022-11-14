const divAllEvents = document.querySelector(".allEvents");

function getEvents(){
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`)
    .then(response => response.json())
    .then(events => listAllEvents(events))
    .catch(error => console.log("Erro ao obter eventos."))        
}

function listAllEvents(events){
    events.forEach(data => {
        let dateEvent = new Date(data.scheduled);
        let newDate = `${dateEvent.getDate()}/${dateEvent.getMonth()}/${dateEvent.getFullYear()}`;
        
        let cardEvents = `
        <article class="evento card p-5 m-3">
            <h2>${data.name} - ${newDate}</h2>
            <h4>${data.attractions}</h4>
            <p>${data.description}</p>
            <a href="scripts/evento-reserva.js" class="btn btn-primary">reservar ingresso</a>
        </article>
        `; 
    
        divAllEvents.innerHTML += cardEvents;
    });
} 

getEvents();