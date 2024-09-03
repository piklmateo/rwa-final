const session = require("express-session");
const Baza = require("../baza.js");

class DnevnikDAO {

	constructor() {
		this.baza = new Baza("RWA2023mpikl20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM dnevnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (stranica) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM dnevnik WHERE stranica=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [stranica]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (dnevnik) {
		let sql = 
        `INSERT INTO dnevnik (datum, vrijeme, tip_zahtjeva, resurs, tijelo, korisnik_id_korisnika) 
        VALUES (?,?,?,?,?,?)`;
        let podaci = [
			dnevnik.datum,
			dnevnik.vrijeme,
			dnevnik.tip_zahtjeva,
            dnevnik.resurs,
			dnevnik.tijelo,
			2
		];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = DnevnikDAO;
