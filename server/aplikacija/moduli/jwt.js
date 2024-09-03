const jwt = require("jsonwebtoken")
const Konfiguracija = require("../../aplikacija/konfiguracija.js")

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju();

exports.kreirajToken = function (korisnik) {
    try {
        let token = jwt.sign({ korime: korisnik.korime }, konf.dajKonf().jwtTajniKljuc, {
            expiresIn: konf.dajKonf().jwtValjanost,
        });
        console.log("TOKEN: ", token);
		console.log("EXPIRES: ", konf.dajKonf().jwtValjanost);
        return token;
    } catch (error) {
        console.error("GREŠKA KREIRANJA TOKENA: ", error);
        throw error;
    }
};


exports.provjeriToken = function(zahtjev, tajniKljucJWT) {
	console.log("Provjera tokena: "+zahtjev.headers.authorization);
    if (zahtjev.headers.authorization != null) {
        console.log(zahtjev.headers.authorization);
        let token = zahtjev.headers.authorization;
        try {
            let podaci = jwt.verify(token, tajniKljucJWT);
            console.log("JWT podaci: "+podaci);
			return true;
        } catch (e) {
            console.log(e)
            return false;
        }
    }
    return false;
}

exports.ispisiDijelove = function(token){
	let dijelovi = token.split(".");
	let zaglavlje =  dekodirajBase64(dijelovi[0]);
	console.log(zaglavlje);
	let tijelo =  dekodirajBase64(dijelovi[1]);
	console.log(tijelo);
	let potpis =  dekodirajBase64(dijelovi[2]);
	console.log(potpis);
}

exports.dajTijelo = function(token){
	let dijelovi = token.split(".");
	return JSON.parse(dekodirajBase64(dijelovi[1]));
}

function dekodirajBase64(data){
	let buff = new Buffer(data, 'base64');
	return buff.toString('ascii');
}
