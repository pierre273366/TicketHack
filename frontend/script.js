const URL = "http://localhost:3000";

function getTrips(departure, arrival, date) {
  return fetch(`${URL}/trips/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      departure: departure,
      arrival: arrival,
      date: date,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

function getInputsValues() {
  const departure = document.querySelector("#inputDeparture").value;
  const arrival = document.querySelector("#inputArrival").value;
  const date = document.querySelector("#inputDate").value;
  return { departure, arrival, date };
}

function createTripRow(trip) {
  const date = new Date(trip.date);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  return `
    <div class="tripList_row">
        <p>${trip.departure} > ${trip.arrival}</p>
        <p>${dateHours}:${dateMinutes}</p>
        <p>${trip.price}€</p>
        <button class="bookButton button" data-id="${trip._id}">Book</button>
    </div>
    `;
}

function addTripsToList(trips) {
  const tripList = document.querySelector("#tripsList");
  tripList.innerHTML = "";
  for (const trip of trips) {
    tripList.innerHTML += createTripRow(trip);
  }
}

function displayAndHideElements(displayElementId, hideElementIdArr) {
  const displayElement = document.querySelector(`#${displayElementId}`);
  displayElement.classList.remove("hidden");
  for (const hideElementId of hideElementIdArr) {
    const hideElement = document.querySelector(`#${hideElementId}`);
    hideElement.classList.add("hidden");
  }
}

function searchTrips() {
  const searchButton = document.querySelector("#searchTrip");
  searchButton.addEventListener("click", async () => {
    const { departure, arrival, date } = getInputsValues();
    const trips = await getTrips(departure, arrival, date);
    console.log(trips.result);
    if (trips.result) {
      displayAndHideElements("tripsList", ["noTripFound", "timeToBook"]);
      addTripsToList(trips.trips);
    } else {
      displayAndHideElements("noTripFound", ["tripsList", "timeToBook"]);
    }
  });
}

searchTrips();

// Un bouton book va permettr d'ajouter le voyage correspondant à la base de donnée Cart, il redirige sur la page cart
// l-> POST dans /carts => ajoute
//
// ----- Cart
// l-> GET dans /carts
//     l-> On affiche un message si la Collection Carts est vide
//     l-> Si il y a des éléments dans le cart, on les affiches

// Un bouton supprimé permet de supprimer individuellement un voyage de la base donnée cart
// l-> DELETE one dans /carts

// -- Un footer
// Le total des tarifs (met à jour lors de la suppression et de l'ajout)
// Bouton purchase
//  l-> Ajouter les éléments du carts à booking -> POST dans /bookings
//  l-> Supprimer tous les éléments du carts -> DELETE many dans /carts
//  l-> Rediriger sur bookings

// ---- Bookings
// l-> GET dans /bookings
//     l-> On affiche un message si la Collection Bookings est vide
//     l-> Si il y a des éléments dans le booking, on les affiches
// On affiche la durée entre "tout de suite" et le départ
