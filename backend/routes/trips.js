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

  const patternDeparture = new RegExp(departure, "i");
  const patternArrival = new RegExp(arrival, "i");

  let startDate = new Date(date);

  let endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const currentDate = new Date();

  if (compareDates(currentDate, startDate)) {
    startDate = currentDate;
  } else if (startDate < currentDate) {
    return res.json({ result: false });
  }

  // Je vais chercher tous les trips
  Trip.find({
    departure: patternDeparture,
    arrival: patternArrival,
    date: { $gte: startDate, $lt: endDate },
  }).then((trips) => {
    // S'il reste des trips je retournes true et j'envoie les trips correspondants
    if (trips.length > 0) {
      return res.json({ result: true, trips: trips });
    }
    // Sinon je rtourne false
    res.json({ result: false });
  });
});

module.exports = router;
