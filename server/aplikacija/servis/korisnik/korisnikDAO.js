const Baza = require("../baza.js");

class KorisnikDAO {

	constructor() {
		this.baza = new Baza("RWA2023mpikl20.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

	daj = async function (korime) {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM korisnik WHERE korime=?;"
		var podaci = await this.baza.izvrsiUpit(sql, [korime]);
		this.baza.zatvoriVezu();
		if(podaci.length == 1)
			return podaci[0];
		else 
			return null;
	}

	dodaj = async function (korisnik) {
		let sql = `INSERT INTO korisnik (ime, prezime, adresa, postanski_broj, broj_mobitela, lozinka, email, korime, tip_korisnika_id, aktivan, totp_kljuc, aktivacijski_kod) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
        let podaci = [
			korisnik.ime,
			korisnik.prezime,
			korisnik.adresa,
			korisnik.postanski_broj,
			korisnik.broj_mobitela,
            korisnik.lozinka,
			korisnik.email,
			korisnik.korime,
			2,
			0,
			korisnik.TOTPkljuc,
			korisnik.aktivacijskiKod,
		];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}

	obrisi = async function (korime) {
		let sql = "DELETE FROM korisnik WHERE korime=?";
		await this.baza.izvrsiUpit(sql,[korime]);
		return true;
	}

	azuriraj = async function (korime, korisnik) {
		let sql = `UPDATE korisnik SET ime=?, prezime=?, adresa=?, postanski_broj=?, broj_mobitela=? WHERE korime=?`;
        let podaci = [korisnik.ime,
					  korisnik.prezime,
					  korisnik.adresa,
					  korisnik.postanski_broj,
					  korisnik.broj_mobitela,
					  korime,
					];
		await this.baza.izvrsiUpit(sql,podaci);
		return true;
	}
}

module.exports = KorisnikDAO;
