const URL = "http://localhost:3000";

function getCartElement() {
  return fetch(`${URL}/carts`)
    .then((response) => response.json())
    .then((data) => data);
}

function newCartTrip(cart) {
  const date = new Date(cart.tripId.date);
  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  return `
      <div class="tripList_row">
          <p>${cart.tripId.departure} > ${cart.tripId.arrival}</p>
          <p>${dateHours}:${dateMinutes}</p>
          <p>${cart.tripId.price}€</p>
          <button class="deleteCart button" data-id="${cart._id}">X</button>
      </div>
      `;
}

function addTripsToCarts(cartElements) {
  const panier = document.querySelector("#panier");
  panier.innerHTML = "";
  for (const cartElement of cartElements) {
    panier.innerHTML += newCartTrip(cartElement);
  }
}

function totalCart(cartElements) {
  let price = 0;
  for (const cartElement of cartElements) {
    const elementPrice = cartElement.tripId.price;
    price += elementPrice;
  }
  document.querySelector("#total").textContent = price;
}

function deleteCart(cartId) {
  return fetch(`${URL}/carts/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartId: cartId,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
}

function deleteTrip() {
  const buttons = document.querySelectorAll(".deleteCart");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", async (e) => {
      const cartId = e.currentTarget.dataset.id;
      const supp = await deleteCart(cartId);
      if (supp.result) {
        window.location.reload();
      }
    });
  }
}

function displayHideElements(displayElementId, hideElementId) {
  const displayElement = document.querySelector(`#${displayElementId}`);
  const hideElement = document.querySelector(`#${hideElementId}`);
  displayElement.classList.remove("hidden");
  hideElement.classList.add("hidden");
}

function addCartToBooking(tripId) {
  return fetch(`${URL}/bookings/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tripId: tripId,
    }),
  })
    .then((response) => response.json())
    .then((data) => data);
}

function addToBooking() {
  const button = document.querySelector(".purchase");
  button.addEventListener("click", async () => {
    const tripId = button.dataset.id;
    const add = await addCartToBooking(tripId);
    if (add.result === true) {
      window.location.replace("./bookings.html");
    }
  });
}

async function callCart() {
  const cartElements = await getCartElement();
  console.log(cartElements);
  if (cartElements.result) {
    addTripsToCarts(cartElements.trips);
    totalCart(cartElements.trips);
    deleteTrip();
    addToBooking(cartElements);
    displayHideElements("myCart", "noCartElement");
  } else {
    displayHideElements("noCartElement", "myCart");
  }
}

callCart();
