const Baza = require("../baza.js");

class SerijaDAO {
	constructor() {
		this.baza = new Baza("RWA2023mpikl20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM serija;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	dodaj = async function (s) {
        this.baza.spojiSeNaBazu();
		let sql = 
        `INSERT INTO serija(tmdb_id_serije, naziv, opis, popularnost, ocjena, slika, broj_sezona, broj_epizoda) VALUES (?,?,?,?,?,?,?,?)`;
        let podaci = [
			s.id,
			s.name,
            s.overview,
			s.popularity,
			s.vote_average,
			s.poster_path,
			s.number_of_seasons,
			s.number_of_episodes
		];
		await this.baza.izvrsiUpit(sql,podaci);
        this.baza.zatvoriVezu();
		return true;
	}
}

module.exports = SerijaDAO;
