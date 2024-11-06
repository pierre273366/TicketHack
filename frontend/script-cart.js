const URL = "http://localhost:3000";

return fetch(`${URL}/carts`, {
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    departure: departure,
    arrival: arrival,
    date: date,
  }),
})
  .then((response) => response.json())
  .then((data) => data);
