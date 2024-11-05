// ----- Home - Recherche de trips
// l-> Récupérer les inputs
// l-> GET dans /trips
//     l-> Si le départ ou l'arrivée ou la date ne correspondent à rien ça retourne "Aucun voyage trouvé"
//     l-> Sinon ça va afficher tous les voyages correspondants

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
