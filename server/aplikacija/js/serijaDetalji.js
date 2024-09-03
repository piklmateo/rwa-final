let url = "http://localhost:12000/baza";
let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
    poruka = document.getElementById("poruka");
    dajSeriju(poruka.innerHTML);
});

async function dajSeriju(idSerije) {
	let url = window.location.href;
    let searchParameters = new URLSearchParams(new URL(url).search);
    idSerije = searchParameters.get('id');
	let parametri = { method: "POST"};
	parametri = await dodajToken(parametri);
	let odgovor = await fetch(
		"/serijaDetalji?id=" + idSerije, parametri);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		console.log(podaci);
		prikaziSeriju(podaci);
	} else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "potrebna prijava";
	} else {
		poruka.innerHTML = "Greška u dohvatu serija!";
	}
}

function prikaziSeriju(s) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Naslov</th><th>Opis</th><th>Broj sezona</th><th>Broj epizoda</th><th>Popularnost</th><th>Poster</th><th>Poveznica</th><th>Dodaj</th></tr>";

	tablica += "<tr>";
	tablica += "<td>" + s.name + "</td>";
	tablica += "<td>" + s.overview + "</td>";
	tablica += "<td>" + s.number_of_seasons + "</td>";
	tablica += "<td>" + s.number_of_episodes + "</td>";
	tablica += "<td>" + s.popularity + "</td>";
	tablica +=
		"<td><img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
		s.poster_path +
		"' width='100' alt='slika_" +
		s.name +
		"'/></td>";
		tablica += "<td>" + s.homepage + "</td>";
		tablica += "<td><button onClick='dodajUbazu(\"" + s.id + "\")'>Dodaj u bazu</button></td>";
	tablica += "</tr>";
	tablica += "</table>";

	glavna.innerHTML = tablica;
}

/*async function dodajUbazu(idSerije) {
	let serije = JSON.parse(sessionStorage.dohvaceneSerije);
	for (let s of serije) {
		if (idSerije == s.id) {
			console.log("ID SERIJE: ", idSerije);
			let parametri = { 
				method: "POST", 
				body: JSON.stringify({id: idSerije}) 
			};
			parametri = await dodajToken(parametri);
			let odgovor = await fetch("/baza/serije", parametri);
			if (odgovor.status == 200) {
				let podaci = await odgovor.text();
				console.log(podaci);
				poruka.innerHTML = "Serija dodana u bazu!";
				alert("Serija dodana u bazu!!!!");
			} else if (odgovor.status == 401) {
				poruka.innerHTML = "potrebna prijava";
			} else {
				poruka.innerHTML = "Greška u dodavanju serija!";
				alert("Greška u dodavanju serija");
			}
			break;
		}
	}
}*/
