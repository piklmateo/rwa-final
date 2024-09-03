const Baza = require("../baza.js");

class FavoritDAO {
	constructor() {
		this.baza = new Baza("RWA2023mpikl20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = 
		`SELECT s.* FROM serija s JOIN favoriti f ON s.id_serije = f.serija_id_serije WHERE f.korisnik_id_korisnika = ?;`
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = `SELECT s.* FROM serija s JOIN favoriti f ON s.id_serije = f.serija_id_serije WHERE f.korisnik_id_korisnika = ? AND f.id_favorita = ?;`
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (favorit) {
		let sql = `INSERT INTO favoriti (korisnik_id_korisnika, serija_id_serije) VALUES (?, ?);`;
        let podaci = [
			favorit.korisnik_id_korisnika,
			favorit.serija_id_serije
		];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = FavoritDAO;
