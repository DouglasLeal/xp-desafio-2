let eventId = location.search.replace('?id=','');

const URL_API = "https://xp41-soundgarden-api.herokuapp.com/events/" + eventId;

let form = document.querySelector("form");
let getRequest = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},   
  }; 

  let Name = document.querySelector("#nome");
  let poster = document.querySelector("#banner");
  let attractions = document.querySelector("#atracoes");
  let description = document.querySelector("#descricao");
  let scheduled = document.querySelector("#data");
  let number_tickets = document.querySelector("#lotacao");

    async function getEvent(){
        let response = await fetch(URL_API, getRequest);
        let data = await response.json();
       
        Name.value = data.name;
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
    
    function editEvent() {
        event.preventDefault();
        Name.value;
        poster.value;
        attractions.value.split(",");
        description.value;
        scheduled.value.toISOString();
        number_tickets.value;
    
        putEvent({name, poster, attractions, description, scheduled, number_tickets});
    }
    
    async function putEvent(data) {
        let response = await fetch(URL_API, { 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
    });               
        return response;
    }
    
    getEvent();
    
    