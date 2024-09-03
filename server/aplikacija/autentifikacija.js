const mail = require("./moduli/mail.js");
const kodovi = require("./moduli/kodovi.js");
const captcha = require("./moduli/reCaptcha.js")
//const portRest = 12443;

class Autentifikacija {
	async dodajKorisnika(korisnik) {
		let recaptchaToken = korisnik.recaptchaToken;
		console.log("RECAPTCHA Token received on the server: ", recaptchaToken);
		  
		let isRecaptchaValid = await captcha.provjeriRecaptchu(recaptchaToken);
	
		if (isRecaptchaValid) {
		  let tijelo = {
			ime: korisnik.ime,
			prezime: korisnik.prezime,
			adresa: korisnik.adresa,
			postanski_broj: korisnik.postanski_broj,
			broj_mobitela: korisnik.broj_mobitela,
			korime: korisnik.korime,
			lozinka: kodovi.kreirajSHA256(korisnik.lozinka, 'moja sol'),
			email: korisnik.email,
		  };
	
		  let aktivacijskiKod = kodovi.dajNasumceBroj(10000, 99999);
		  tijelo['aktivacijskiKod'] = aktivacijskiKod;
	
		  let zaglavlje = new Headers();
		  zaglavlje.set('Content-Type', 'application/json');
	
		  let parametri = {
			method: 'POST',
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		  };
		  let odgovor = await fetch(
			'http://localhost:12000/baza/korisnici',
			parametri
		  );
	
		  if (odgovor.status == 200) {
			console.log('Korisnik ubačen na servisu');
			let mailPoruka =
			  'Korisničko ime: ' + korisnik.korime + '\n' +
			  'Lozinka: ' + korisnik.lozinka + '\n';
	
			let poruka = await mail.posaljiMail(
			  'mpikl20@student.foi.hr',
			  korisnik.email,
			  'Podaci za prijavu',
			  mailPoruka
			);
			return true;
		  } else {
			console.log(odgovor.status);
			console.log(await odgovor.text());
			return false;
		  }
		} else {
		  console.error('reCAPTCHA validation failed');
		  return false;
		}
	  }

	async aktivirajKorisnickiRacun(korime, kod) {
		let zaglavlje = new Headers();
		zaglavlje.set("Content-Type", "application/json");
		let parametri = {
			method: "PUT",
			body: JSON.stringify({ aktivacijskiKod: kod }),
			headers: zaglavlje,
		};

		return await fetch(
			"http://localhost:12000/baza/korisnici/" + korime + "/aktivacija", parametri
		);
	}

	async prijaviKorisnika(korime, lozinka, recaptchaToken) {
		console.log("RECAPTCHA Token received on the server: ", recaptchaToken);
		  
		let isRecaptchaValid = await captcha.provjeriRecaptchu(recaptchaToken);
	  
		if (isRecaptchaValid) {
		  lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
	  
		  console.log("KODIRANA LOZINKA -> ", lozinka);
	  
		  let tijelo = {
			lozinka: lozinka,
		  };
	  
		  let zaglavlje = new Headers();
		  zaglavlje.set("Content-Type", "application/json");
	  
		  let parametri = {
			method: "POST",
			body: JSON.stringify(tijelo),
			headers: zaglavlje,
		  };
	  
		  let odgovor = await fetch(
			"http://localhost:12000/baza/korisnici/" + korime + "/prijava",
			parametri
		  );
	  
		  console.log("STATUS -> ", odgovor.status);
	  
		  if (odgovor.status == 200) {
			return await odgovor.text();
		  } else {
			return false;
		  }
		} else {
		  console.error("reCAPTCHA validation failed");
		  return false;
		}
	  }
}

module.exports = Autentifikacija;
