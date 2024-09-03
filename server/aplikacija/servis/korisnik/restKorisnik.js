const KorisnikDAO = require("./korisnikDAO.js");
const jwt = require("../../moduli/jwt.js");
const captcha = require("../../moduli/reCaptcha");
const Konfiguracija = require("../../konfiguracija.js");

//baza/korisnici
exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		odgovor.status(200);
		console.log(korisnici);
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let podaci = zahtjev.body;
	console.log("POST podaci:");
	console.log(podaci);
	let kdao = new KorisnikDAO();
	kdao.dodaj(podaci).then((poruka) => {
		poruka = { opis: "izvrseno" };
		odgovor.send(JSON.stringify(poruka));
		odgovor.status(201);
	});
};

exports.putKorisnici = async function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};


//baza/korisnici/korime
exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		odgovor.status(200);
		odgovor.send(JSON.stringify(korisnik));
		console.log(korisnik);
	});
};

exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = async function (zahtjev, odgovor) {
	let token = await captcha.provjeriRecaptchu(zahtjev.body.token);
	console.log("token na serveru: ", JSON.stringify(token));
	if(token) {
		odgovor.type("application/json");
		let korime = zahtjev.params.korime;
		let podaci = zahtjev.body;
		let kdao = new KorisnikDAO();
		kdao.azuriraj(korime, podaci).then((poruka) => {
			poruka = { opis: "izvrseno" };
			odgovor.status(201);
			odgovor.send(JSON.stringify(poruka));
		});
	}
	else {
		console.error('reCAPTCHA validation failed');
		return false;
	}
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let kdao = new KorisnikDAO();
	kdao.obrisi(korime).then((poruka) => {
		poruka = { opis: "izvrseno" };
		odgovor.status(201);
		odgovor.send(JSON.stringify(poruka));
	})
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
  
	kdao.daj(korime).then((korisnik) => {
	  console.log(korisnik);
	  console.log(zahtjev.body);
	  if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka) {
		odgovor.status(200).send(JSON.stringify(korisnik));
	  } else {
		odgovor.status(401).send(JSON.stringify({ opis: "zabranjen pristup!" }));
	  }
	});
  };

exports.postKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json")
	let kdao = new KorisnikDAO()
	let korime = zahtjev.params.korime
	kdao.daj(korime).then((korisnik) => {
		console.log(korisnik)
		if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka) {
			odgovor.send(JSON.stringify(korisnik));
			console.log("Korisnik " + korime + " prijavljen");
	  	} else {
			odgovor.status(400);
			odgovor.send(JSON.stringify({ opis: "zabranjen pristup" }));
		}
	});
};

exports.putKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnikPrijava = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};