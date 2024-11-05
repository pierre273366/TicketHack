var express = require("express");
var router = express.Router();
const Trip = require("../model/trips");
const { compareDates, compareStrings } = require("../modules/compareElements");

// GET All trips corresponding to body elements
router.post("/", (req, res) => {
  // Récupération de departure, arrival, date dans le body
  const { departure, arrival, date } = req.body;

  // Si l'un est manquant, return false
  if (!departure || !arrival || !date) {
    return res.json({ result: false });
  }

  // Je vais chercher tous les trips
  Trip.find().then((trips) => {
    // Je filtre le tableau de trips où les éléments correspondent grâce au modules
    const tripsByDate = trips.filter(
      (trip) =>
        compareDates(trip.date, date) &&
        compareStrings(trip.departure, departure) &&
        compareStrings(trip.arrival, arrival)
    );
    // S'il reste des trips je retournes true et j'envoie les trips correspondants
    if (tripsByDate.length > 0) {
      return res.json({ result: true, trips: tripsByDate });
    }
    // Sinon je rtourne false
    res.json({ result: false });
  });
});

module.exports = router;
