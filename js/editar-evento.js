let eventId = location.search.replace('?id=','');

const URL_API = "https://xp41-soundgarden-api.herokuapp.com/events/" + eventId;

let form = document.querySelector("form");
let getRequest = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},   
  }; 

  let name = document.querySelector("#nome");
  let poster = document.querySelector("#banner");
  let attractions = document.querySelector("#atracoes");
  let description = document.querySelector("#descricao");
  let scheduled = document.querySelector("#data");
  let number_tickets = document.querySelector("#lotacao");

    async function getEvent(){
        let response = await fetch(URL_API, getRequest);
        let data = await response.json();
       
        name.value = data.name;
        poster.value = data.poster;
        attractions.value = data.attractions;
        description.value = data.description;
        scheduled.value = new Date(data.scheduled).toLocaleString();
        number_tickets.value = data.number_tickets;

        if (response.status !== 200) {
            throw Error(data.detail);
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
        event.scheduled = new Date(scheduled.value).toISOString();
        event.number_tickets = number_tickets.value;
    
        putEvent(event);
    }
    
    async function putEvent(event) {
        let response = await fetch(URL_API, { 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(event)
    });               
        return response;
    }
    
    getEvent();
    
    