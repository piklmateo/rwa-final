let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
    poruka = document.getElementById("poruka");
    dajSerije(1);

    document.getElementById("filter").addEventListener("keyup", (event) => {
        let slova = event.target.value.trim();
        if (slova.length >= 3) {
            dajSerije(1);
        }
    });
});


async function dajSerije(str) {
	let parametri = { method: "POST" };
	parametri = await dodajToken(parametri);
	let odgovor = await fetch(
		"/pocetna?str=" + str + "&filter=" + dajFilter(),
		parametri
	);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziSerije(podaci.results);
		prikaziStranicenje(podaci.page, podaci.total_pages, "dajSerije");
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "potrebna prijava";
	} else {
		poruka.innerHTML = "Greška u dohvatu serija!";
	}
}

function prikaziSerije(serije) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Naslov</th><th>Opis</th><th>Detalji</th></tr>";
	for (let s of serije) {
		tablica += "<tr>";
		tablica += "<td>" + s.name + "</td>";
		tablica += "<td>" + s.overview + "</td>";
		tablica +=
			"<td><button onClick='redirectDetalji(" +
			s.id +
			")'>Detalji</button></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	sessionStorage.dohvaceneSerije = JSON.stringify(serije);

	glavna.innerHTML = tablica;
}

function redirectDetalji(IdSerije) {
	window.location.href = "/serijaDetalji?id=" + IdSerije;
}

function dajFilter() {
	return document.getElementById("filter").value;
}
