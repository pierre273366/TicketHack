const URL = "http://localhost:3000";

function getBookings() {
  return fetch(`${URL}/bookings`)
    .then((response) => response.json())
    .then((data) => data);
}

function departureDelay(dateHours) {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const departureInHours = dateHours - currentHours;
  if (departureInHours > 0) {
    return `Departure in ${departureInHours} hours`;
  }
  if (departureInHours > 0) {
    return `Departure in ${departureInHours} hours`;
  }
  if (departureInHours === 0) {
    return `Leaving now`;
  }
  if (departureInHours < 0) {
    return `Already gone`;
  }
}

function createTripRow(trip) {
  const date = new Date(trip.tripId.date);
  const dateHours = date.getHours();
  const dateHoursDisplay = dateHours >= 10 ? dateHours : `0${dateHours}`;
  let dateMinutes = date.getMinutes();
  dateMinutes = dateMinutes >= 10 ? dateMinutes : `0${dateMinutes}`;

  return `
    <div class="tripList_row">
        <p>${trip.tripId.departure} > ${trip.tripId.arrival}</p>
        <p>${dateHoursDisplay}:${dateMinutes}</p>
        <p>${trip.tripId.price}€</p>
        <p>${departureDelay(dateHours)}</p>
    </div>
    `;
}

function addTripsToList(trips) {
  const tripList = document.querySelector("#bookingList");
  trips = trips.sort((a, b) => a.tripId.date - b.tripId.date);
  tripList.innerHTML = "";
  for (const trip of trips) {
    tripList.innerHTML += createTripRow(trip);
  }
}

function disaplayHideElements(displayElementId, hideElementId) {
  const displayElement = document.querySelector(`#${displayElementId}`);
  const hideElement = document.querySelector(`#${hideElementId}`);
  displayElement.classList.remove("hidden");
  hideElement.classList.add("hidden");
}

async function displayBookings() {
  const bookings = await getBookings();
  if (bookings.result) {
    addTripsToList(bookings.trips);
    disaplayHideElements("myBookings", "cardBooking");
  } else {
    disaplayHideElements("cardBooking", "myBookings");
  }
}

displayBookings();
