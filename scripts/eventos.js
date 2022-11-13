const divallEvents = document.querySelector(".allEvents");

let mevents = [];

async function getAllEvents(){
    let response = await fetch(`https://xp41-soundgarden-api.herokuapp.com/events`);
    mevents = await response.json();
    console.log(mevents);
    allEventsIndex();
}

function allEventsIndex(){
    mevents.forEach(data => {
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
    
        divallEvents.innerHTML += cardEvents;
    });
} 

getAllEvents();