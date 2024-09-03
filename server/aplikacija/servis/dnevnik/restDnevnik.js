const DnevnikDAO = require("./dnevnikDAO.js");

//baza/korisnici
exports.getLogovi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let ddao = new DnevnikDAO();
	ddao.dajSve().then((logovi) => {
		odgovor.status(200);
		console.log(logovi);
		odgovor.send(JSON.stringify(logovi));
	});
};

exports.postLogovi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putLogovi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteLogovi = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};


//baza/korisnici/korime
exports.getLog = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let ddao = new DnevnikDAO();
	let stranica = zahtjev.query.stranica;
	ddao.daj(stranica).then((log) => {
		odgovor.status(200);
		odgovor.send(JSON.stringify(log));
		console.log(log);
	});
};

exports.postLog = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.putLog = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};

exports.deleteLog = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "metoda nije implementirana" };
	odgovor.send(JSON.stringify(poruka));
};