const URL_API = "https://xp41-soundgarden-api.herokuapp.com/bookings";

var headers = new Headers();
  headers.append("Content-Type", "application/json");

const newBooking = {
    owner_name: "Vinicius",
    owner_email: "email@email.com",
    number_tickets: 1,
    event_id: "",
};
  
var requestOptions = {
    method: "POST",
    body: JSON.stringify(newBooking),
    redirect: "follow",
};
  
fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  