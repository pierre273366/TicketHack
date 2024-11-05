var express = require("express");
var router = express.Router();

// route get qui retourne tous les trips si le body contient {depart, arrival, date} et que ça coorespond à un élément de notre Collection Trip
// l-> Si aucune correspondance => result : false
// l-> Sinon renvoies LES voyages trouvées

module.exports = router;
