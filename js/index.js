let divNextEvents = document.querySelector(".nextevt");

function getEvents(){
    fetch(`https://xp41-soundgarden-api.herokuapp.com/events`)
    .then(response => response.json())
    .then(events => nextEventsIndex(events))
    .catch(error => console.log("Erro ao obter eventos."))        
}

function nextEventsIndex(events){
    let mainEvents = events.slice(0, 3);

    mainEvents.forEach(data => {
        let dateEvent = new Date(data.scheduled);
        let newDate = `${dateEvent.getDate()}/${dateEvent.getMonth()}/${dateEvent.getFullYear()}`;
        
        let cardEvents = `
        <article class="evento card p-5 m-3">
            <h2>${data.name} - ${newDate}</h2>
            <h4>${data.attractions}</h4>
            <p>${data.description}</p>
            <a href="#" class="btn btn-primary">reservar ingresso</a>
        </article>
        `;    
    
        divNextEvents.innerHTML += cardEvents;
    });
} 

getEvents();