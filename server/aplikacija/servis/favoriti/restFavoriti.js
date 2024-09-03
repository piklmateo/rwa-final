const FavoritiDAO = require("./favoritiDAO.js")

//baza/favoriti
exports.getFavoriti = function (zahtjev, odgovor) {
  odgovor.type("application/json")
  let fdao = new FavoritiDAO()
  fdao.dajSve().then((favoriti) => {
    odgovor.status(200);
    console.log(favoriti);
    odgovor.send(JSON.stringify(favoriti));
  });
};

exports.postFavoriti = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    console.log("POST podaci:");
    console.log(podaci);
    let fdao = new FavoritiDAO()
    fdao.dodaj(podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
    odgovor.status(201);
  })
}

exports.putFavoriti = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    odgovor.status(501);
    let poruka = { opis: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteFavoriti = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = { opis: "metoda nije implementirana" }
    odgovor.send(JSON.stringify(poruka))
}

//baza/favoriti/korime

exports.getFavorit = function (zahtjev, odgovor) {
    odgovor.type("application/json")
    let fdao = new FavoritiDAO()
    let id = zahtjev.params.id
    fdao.daj(id).then((favorit) => {
    console.log(favorit)
    odgovor.send(JSON.stringify(favorit))
  });
};

exports.postFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteFavorit = function (zahtjev, odgovor) {
	odgovor.type("application/json")
    odgovor.status(201);
    let id = zahtjev.params.id
    let fdao = new FavoritiDAO()
    fdao.obrisi(id).then((poruka) => {
    odgovor.send(JSON.stringify(poruka))
  })
};