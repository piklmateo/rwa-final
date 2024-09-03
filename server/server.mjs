import express from "express";
import sesija from "express-session";
import kolacici from "cookie-parser";
import Konfiguracija from "./aplikacija/konfiguracija.js";
//import portovi from "/var/www/RWA/2023/portovi.js";
import restKorisnik from "../server/aplikacija/servis/korisnik/restKorisnik.js";
import RestTMDB from "../server/aplikacija/servis/TMDB/restTMDB.js";
import restFavoriti from "../server/aplikacija/servis/favoriti/restFavoriti.js";
import HtmlUpravitelj from "./aplikacija/htmlUpravitelj.js";
import FetchUpravitelj from "./aplikacija/fetchUpravitelj.js";
import restSerije from "../server/aplikacija/servis/serije/restSerije.js";
import cors from "cors";
import path from 'path';


//const port = portovi.mpikl20;
const port = 12000;

const server = express();

let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		console.log(greska);
		if (process.argv.length == 2) {
			console.error("Molimo unesite naziv datoteke!");
		} else {
			console.error("Nije moguće otvoriti datoteku: " + greska.path);
		}
	});

function pokreniServer() {
	server.use(express.urlencoded({ extended: true }));
	server.use("/", express.static('./angular/browser'));
	server.use(express.json());
	server.use(cors({
		origin: 'http://localhost:4200',
		methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
		optionsSuccessStatus: 200 ,
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}));

	server.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.setHeader("Access-Control-Expose-Headers", "Authorization");
		res.setHeader("Access-Control-Allow-Credentials", "true");
		next();
	});

	server.use(kolacici());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);
	
	//server.use("/js", express.static("./aplikacija/js"));
	//server.use("/css", express.static("./aplikacija/css"));
	//server.use("/slike", express.static("./aplikacija/slike"));
	//server.use("/dokumentacija", express.static("./aplikacija/dokumentacija"));

	pripremiPutanjeKorisnik();
	pripremiPutanjeTMDB();
	pripremiPutanjePocetna();
	pripremiPutanjeSerijaDetalji();
	pripremiPutanjeAutentifikacija();
	//pripremiPutanjeDokumentacija();
	pripremiPutanjeProfil();
	pripremiPutanjeFavoriti();
	pripremiPutanjeKorisnici();

	server.get('*', (req, res) => {
		res.sendFile(path.resolve() + '/angular/browser/');
	});

	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});

	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}

function pripremiPutanjeTMDB() {
	let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
	
	server.get("/api/tmdb/serije", restTMDB.getSerije.bind(restTMDB));
	server.get("/api/tmdb/serija", restTMDB.getSerija.bind(restTMDB));
}

function pripremiPutanjeKorisnik() {
	server.get("/baza/korisnici", restKorisnik.getKorisnici);
	server.post("/baza/korisnici", restKorisnik.postKorisnici);
	server.delete("/baza/korisnici", restKorisnik.deleteKorisnici);
	server.put("/baza/korisnici", restKorisnik.putKorisnici);

	server.get("/baza/korisnici/:korime", restKorisnik.getKorisnik);
	server.post("/baza/korisnici/:korime", restKorisnik.postKorisnik);
	server.delete("/baza/korisnici/:korime", restKorisnik.deleteKorisnik);
	server.put("/baza/korisnici/:korime", restKorisnik.putKorisnik);

	server.post("/baza/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
	server.get("/baza/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
}

function pripremiPutanjeKorisnici() {
	//let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	//server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	//server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	server.get("/baza/korisnici", fetchUpravitelj.dohvatiKorisnike.bind(fetchUpravitelj));

	server.delete("/baza/korisnici/:korime", fetchUpravitelj.obrisiKorisnika.bind(fetchUpravitelj));
}

function pripremiPutanjeFavoriti() {
	server.get("/baza/favoriti", restFavoriti.getFavoriti);
	server.post("/baza/favoriti", restFavoriti.postFavoriti);
	server.put("/baza/favoriti", restFavoriti.putFavoriti);
	server.delete("/baza/favoriti", restFavoriti.deleteFavoriti);
  
	server.get("/baza/favoriti/:id", restFavoriti.getFavorit);
	server.post("/baza/favoriti/:id", restFavoriti.postFavorit);
	server.put("/baza/favoriti/:id", restFavoriti.putFavorit);
	server.delete("/baza/favoriti/:id", restFavoriti.deleteFavorit);
}

function pripremiPutanjePocetna() {
	//let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	//server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	server.post("/pocetna", fetchUpravitelj.pocetna.bind(fetchUpravitelj));
}

/*function pripremiPutanjeDokumentacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/dokumentacija", htmlUpravitelj.dokumentacija.bind(htmlUpravitelj));
}*/

function pripremiPutanjeProfil() {
	//let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	//server.get("/profil", htmlUpravitelj.profil.bind(htmlUpravitelj));
	server.get("/baza/korisnici/:korime", fetchUpravitelj.dohvatiKorisnika.bind(fetchUpravitelj));
	server.put("/baza/korisnici/:korime", fetchUpravitelj.spremiIzmjene.bind(fetchUpravitelj));

}

function pripremiPutanjeSerijaDetalji() {
	//let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	//server.get("/serijaDetalji", htmlUpravitelj.serijaDetalji.bind(htmlUpravitelj));
	server.post("/serijaDetalji", fetchUpravitelj.serijaDetalji.bind(fetchUpravitelj));
	server.post("/baza/serije", restSerije.dodajSeriju);
}

function pripremiPutanjeAutentifikacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);

	//server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.post("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.get('/githubPovratno',htmlUpravitelj.githubPovratno.bind(htmlUpravitelj));
	
	//validacija
	//server.get("/text_error_registracija", htmlUpravitelj.text_error_registracija.bind(htmlUpravitelj));
	//server.get("/korime_error_registracija", htmlUpravitelj.korime_error_registracija.bind(htmlUpravitelj));
	//server.get("/korime_error_prijava", htmlUpravitelj.korime_error_prijava.bind(htmlUpravitelj));
	//server.get("/email_error_registracija", htmlUpravitelj.email_error_registracija.bind(htmlUpravitelj));

	//server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));
	//server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));
}