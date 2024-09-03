const SerijeDAO = require("./serijeDAO.js");

//baza/korisnici
exports.dodajSeriju = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let id = zahtjev.query.id;
	console.log("POST id:", id);
	let sdao = new SerijeDAO();
	sdao.dodaj(id).then((poruka) => {
		poruka = { opis: "izvrseno" };
		odgovor.send(JSON.stringify(poruka));
		odgovor.status(201);
	});
};