const SerijaDetalji = require("./serijaDetalji.js");
const jwt = require("./moduli/jwt.js");
const Autentifikacija = require("./autentifikacija.js");
const Korisnici = require("./korisnici.js");
const Pocetna = require("./pocetna.js");

class FetchUpravitelj {
	constructor(tajniKljucJWT) {
		this.auth = new Autentifikacija();
		this.sd = new SerijaDetalji();
		this.s = new Pocetna();
		this.korisnici = new Korisnici();
		this.tajniKljucJWT = tajniKljucJWT;
	}

	getJWT = async function (zahtjev, odgovor) {
		odgovor.type("json");
		if (zahtjev.session.korime != null) {
			let k = { korime: zahtjev.session.korime };
			let noviToken = jwt.kreirajToken(k, this.tajniKljucJWT);
			odgovor.send({ ok: noviToken });
			return;
		}
		odgovor.status(401);
		odgovor.send({ opis: "nemam token!" });
	};
	

	//-----------POČETNA-----------//
	pocetna = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let str = zahtjev.query.str;
		let filter = zahtjev.query.filter;
		console.log(zahtjev.query);
		odgovor.json(await this.s.dohvatiSerije(str, filter));
	};
	//----------------------//

	//-----------SERIJA DETALJI-----------//
	serijaDetalji = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		let id = zahtjev.query.id;
		console.log(zahtjev.query);
		odgovor.json(await this.sd.dohvatiSeriju(id));
	};

	dodajSeriju = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		if (!jwt.provjeriToken(zahtjev, this.tajniKljucJWT)) {
			odgovor.status(401);
			odgovor.json({ opis: "potrebna prijava" });
		} else {
			odgovor.json({ ok: "OK" });
		}
	};
	//----------------------//

	//-----------KORISNICI-----------//
	dohvatiKorisnike = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		if (!jwt.provjeriToken(zahtjev, this.tajniKljucJWT)) {
			odgovor.status(401);
			odgovor.json({ opis: "potrebna prijava" });
		} else {
			odgovor.json(await this.korisnici.dohvatiKorisnike());
		}
	};

	obrisiKorisnika = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		if (!jwt.provjeriToken(zahtjev, this.tajniKljucJWT)) {
			odgovor.status(401);
			odgovor.json({ opis: "potrebna prijava" });
		} 
		else {
			let korime = zahtjev.params.korime;
			odgovor.json(await this.korisnici.obrisiKorisnika(korime));
		}
	};
	//----------------------//

	//-----------PROFIL-----------//
	dohvatiKorisnika = async function (zahtjev, odgovor) {
		console.log(zahtjev.body);
		if (!jwt.provjeriToken(zahtjev, this.tajniKljucJWT)) {
			odgovor.status(401);
			odgovor.json({ opis: "potrebna prijava" });
		} 
		else {
			odgovor.json(await this.korisnici.dohvatiKorisnika(zahtjev.params.korime));
		}
	};

	async spremiIzmjene(zahtjev, odgovor) {
		try {
		  let korime = zahtjev.params.korime
		  let ime = zahtjev.body.ime
		  let prezime = zahtjev.body.prezime
		  let adresa = zahtjev.body.adresa
		  let postanski_broj = zahtjev.body.postanski_broj
		  let broj_mobitela = zahtjev.body.broj_mobitela
	  
		  // Log the received data
		  console.log("Received data:", { korime, ime, prezime, adresa, postanski_broj, broj_mobitela });
	  
		  odgovor.json(await this.korisnici.spremiIzmjene(korime, ime, prezime, adresa, postanski_broj, broj_mobitela));
		} catch (error) {
		  console.error("Error during update:", error);
		  odgovor.status(500).json({ error: "Internal Server Error" });
		}
	  }
	  

	//----------------------//
}
module.exports = FetchUpravitelj;
