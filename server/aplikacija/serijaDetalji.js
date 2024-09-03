const url = "http://localhost:12000/api";
const kodovi = require("./moduli/kodovi.js");
class SerijePretrazivanje {
	async dohvatiSerije(stranica, kljucnaRijec = "") {
		let putanja =
			url + "/tmdb/serije?stranica=" + stranica + "&trazi=" + kljucnaRijec;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serije = JSON.parse(podaci);
		console.log(serije);
		return serije;
	}

	async dohvatiSeriju(id) {
		let putanja =
			url + "/tmdb/serija?id=" + id;
		console.log(putanja);
		let odgovor = await fetch(putanja);
		let podaci = await odgovor.text();
		let serije = JSON.parse(podaci);
		console.log(serije);
		return serije;
	}
}

module.exports = SerijePretrazivanje;
