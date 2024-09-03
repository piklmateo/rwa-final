const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js");
const totp = require("./moduli/totp.js");
const Autentifikacija = require("./autentifikacija.js");
const github = require("./moduli/github.js");

class HtmlUpravitelj {
	constructor(tajniKljucJWT) {
		this.tajniKljucJWT = tajniKljucJWT;
		console.log(this.tajniKljucJWT);
		this.auth = new Autentifikacija();
	}

	text_error_registracija = async function (zahtjev, odgovor) {
		let registracija = await ucitajStranicu("/html/", "registracija", "Pogrešan format imena ili prezimena(Unesi samo slova)", zahtjev.session.tip_korisnika);
		odgovor.send(registracija);
	}

	korime_error_registracija = async function (zahtjev, odgovor) {
		let registracija = await ucitajStranicu("/html/", "registracija", "Pogrešan format korisničkog imena(example: johndoe20)", zahtjev.session.tip_korisnika);
		odgovor.send(registracija);
	}

	korime_error_prijava = async function (zahtjev, odgovor) {
		let prijava = await ucitajStranicu("/html/", "prijava", "Pogrešan format korisničkog imena(example: johndoe20)", zahtjev.session.tip_korisnika);
		odgovor.send(prijava);
	}

	email_error_registracija = async function (zahtjev, odgovor) {
		let registracija = await ucitajStranicu("/html/", "registracija", "Pogrešan format email adrese(example: john.doe@example.com)", zahtjev.session.tip_korisnika);
		odgovor.send(registracija);
	}

	/*pocetna = async function (zahtjev, odgovor) {
		let pocetna = await ucitajStranicu("/html/", "pocetna", "", zahtjev.session.tip_korisnika);
		odgovor.send(pocetna);
	};*/

	/*dokumentacija = async function (zahtjev, odgovor) {
		let dokumentacija = await ucitajStranicu("/dokumentacija/", "dokumentacija", "", zahtjev.session.tip_korisnika);
		odgovor.send(dokumentacija);
	};*/

	/*profil = async function (zahtjev, odgovor) {
		if(zahtjev.session.tip_korisnika == undefined) {
			odgovor.redirect("/");
			return;
		}
		let profil = await ucitajStranicu("/html/", "profil", zahtjev.session.korime, zahtjev.session.tip_korisnika);
		odgovor.send(profil);
	};*/

	registracija = async function (zahtjev, odgovor) {
		/*if(zahtjev.session.tip_korisnika == undefined) {
			odgovor.redirect("/");
			return;
		}*/
		console.log(zahtjev.body);
		let greska = "";
		if (zahtjev.method == "POST") {

			let ime_regex = /^[A-Za-z]+$/;
			let prezime_regex = /^[A-Za-z]+$/;
			if (!ime_regex.test(zahtjev.body.ime) || !prezime_regex.test(zahtjev.body.prezime)) {
				odgovor.redirect("/text_error_registracija");
				return;
			}

			let korime_regex = /^[a-zA-Z0-9]+$/;
			if(!korime_regex.test(zahtjev.body.korime)) {
				odgovor.redirect("/korime_error_registracija");
				return;
			}

			let email_regex = /^[a-zA-Z0-9]{3,}@[a-zA-Z]+\.[a-zA-Z]+$/;
			if(!email_regex.test(zahtjev.body.email)) {
				odgovor.redirect("/email_error_registracija");
				return;
			}

			let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
			if (uspjeh) {
				//odgovor.redirect("/prijava");
				odgovor.send("true")
				return;
			} else {
				greska = "Dodavanje nije uspjelo provjerite podatke!";
			}
		}
		/*console.log("TIP KORISNIKA: ", zahtjev.session.tip_korisnika);
		let stranica = await ucitajStranicu("/html/", "registracija", greska, zahtjev.session.tip_korisnika);
		odgovor.send(stranica);*/
	};

	odjava = async function (zahtjev, odgovor) {
		zahtjev.session.korisnik = null;
		zahtjev.session.tip_korisnika = null;
		odgovor.redirect("/prijava");
	};

	/*prijava = async function (zahtjev, odgovor) {
		let greska = "";
		if (zahtjev.method == "POST") {
			var korime = zahtjev.body.korime;
			var lozinka = zahtjev.body.lozinka;
			var korisnik = await this.auth.prijaviKorisnika(korime, lozinka);

			let korime_regex = /^[a-zA-Z0-9]+$/;
			if(!korime_regex.test(zahtjev.body.korime)) {
				odgovor.redirect("/korime_error_prijava");
				return;
			}

			if (korisnik) {
				console.log(korisnik);
				korisnik = await JSON.parse(korisnik);
				//let totpKljuc = korisnik.totp_kljuc;
				//let totpKod = zahtjev.body.totp;

				if(!totp.provjeriTOTP(totpKod, totpKljuc)) {
					greska = "Totp nije valjan";
				}
				//else {
					console.log(korisnik);
					zahtjev.session.jwt = jwt.kreirajToken(korisnik, this.tajniKljucJWT);
					zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
					zahtjev.session.korime = korisnik.korime;
					zahtjev.session.tip_korisnika = korisnik.tip_korisnika_id;
					zahtjev.session.id_korisnika = korisnik.id_korisnika;
					odgovor.redirect("/");
					return;
				//}	
			} else {
				greska = "Netocni podaci!";
			}
		}

		let stranica = await ucitajStranicu("/html/", "prijava", greska, zahtjev.session.tip_korisnika);
		odgovor.send(stranica);
	};*/

	prijava = async function (zahtjev, odgovor) {
		let greska = "";
		if (zahtjev.method == "POST") {
			var korime = zahtjev.body.korime;
			var lozinka = zahtjev.body.lozinka;
			var token = zahtjev.body.recaptchaToken;
			var korisnik = await this.auth.prijaviKorisnika(korime, lozinka, token);

			let korime_regex = /^[a-zA-Z0-9]+$/;
			if(!korime_regex.test(zahtjev.body.korime)) {
				odgovor.redirect("/korime_error_prijava");
				return;
			}

			if (korisnik) {
				console.log(korisnik);
				korisnik = JSON.parse(korisnik);
				console.log(korisnik);
				zahtjev.session.jwt = jwt.kreirajToken(korisnik, this.tajniKljucJWT);
				zahtjev.session.korisnik = korisnik.ime + " " + korisnik.prezime;
				zahtjev.session.korime = korisnik.korime;
				zahtjev.session.tip_korisnika = korisnik.tip_korisnika_id;
				zahtjev.session.id_korisnika = korisnik.id_korisnika;
				//odgovor.redirect("/");
				odgovor.send(korisnik);
				return;
			} else {
				greska = "Netocni podaci!";
				odgovor.send(false);
				return;
			}
		}

		/*let stranica = await ucitajStranicu("/html/", "prijava", greska, zahtjev.session.tip_korisnika);
		odgovor.send(stranica);*/
	};

	githubPovratno = async function(zahtjev,odgovor){
		console.log(zahtjev.query);
		let token = await github.dajAccessToken(zahtjev.query.code);
		zahtjev.session.githubToken = token;
		odgovor.send(await github.provjeriToken(zahtjev.session.githubToken));
		odgovor.redirect("/pocetna");
	}

	/*serijaDetalji = async function (zahtjev, odgovor) {
		let stranica = await ucitajStranicu("/html/", "SerijaDetalji", "", zahtjev.session.tip_korisnika);
		odgovor.send(stranica);
	};*/

	/*korisnici = async function (zahtjev, odgovor) {
		if(zahtjev.session.tip_korisnika == undefined) {
			odgovor.redirect("/");
			return;
		}
		let stranica = await ucitajStranicu("/html/", "korisnici", "", zahtjev.session.tip_korisnika);
		zahtjev.session.jwt = jwt.kreirajToken(zahtjev.session.korisnik, this.tajniKljucJWT)
		odgovor.send(stranica);
	};*/
}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(folder, nazivStranice, poruka = "", tip_korisnika) {
	let stranice = [];
	if(tip_korisnika === 1) {
		stranice = [ucitajHTML(folder, nazivStranice), ucitajHTML("/html/", "admin_navigacija")];
	}
	else if(tip_korisnika === 2) {
		stranice = [ucitajHTML(folder, nazivStranice), ucitajHTML("/html/", "korisnik_navigacija")];
	}
	else {
		stranice = [ucitajHTML(folder, nazivStranice), ucitajHTML("/html/", "gost_navigacija")];
	}

	let [stranica, nav] = await Promise.all(stranice);
	stranica = stranica.replace("#navigacija#", nav);
	stranica = stranica.replace("#poruka#", poruka);
	return stranica;
}

function ucitajHTML(folder, htmlStranica) {
	return ds.readFile(__dirname + folder + htmlStranica + ".html", "UTF-8");
}

