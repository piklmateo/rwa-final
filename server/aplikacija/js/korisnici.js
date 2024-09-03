let poruka = document.getElementById("poruka");

window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
	dajKorisnike();
});

async function dajKorisnike() {
    let parametri = { method: "GET" };
	parametri = await dodajToken(parametri);
	let odgovor = await fetch("/baza/korisnici", parametri);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		prikaziKorisnike(podaci);
	} 
    else if (odgovor.status == 401) {
		document.getElementById("sadrzaj").innerHTML = "";
		poruka.innerHTML = "potrebna prijava";
	} else {
		poruka.innerHTML = "Greška u dohvatu korisnika!";
	}
}

async function obrisiKorisnika(korime) {
    let zaglavlje = new Headers();
    zaglavlje.set("Content-Type", "application/json");
  
    let parametri = {
      method: "DELETE",
      body: JSON.stringify({ korime: korime }),
      headers: zaglavlje,
    };
    parametri = await dodajToken(parametri);
  
    try {
        let odgovor = await fetch("/baza/korisnici/" + korime, parametri);
  
        if (odgovor.status === 201) {
            alert("Uspješno brisanje");
            location.reload();
        }
        else {
            throw new Error("Greška kod brisanja");
        }
    }
    catch (error) {
        alert("Greška kod brisanja" + error);
    }
}

function prikaziKorisnike(korisnici) {
    let glavna = document.getElementById("sadrzaj");

    let tablica = "<table class=korisnici-table border=1>";
    tablica += "<tr><th>ID</th><th>ime</th><th>prezime</th><th>adresa</th><th>Postanski broj</th><th>Broj mobitela</th><th>korime</th><th>lozinka</th><th>email</th><th>tip korisnika</th><th>DELETE</th></tr>";

    for (let k of korisnici) {
        tablica += "<tr>";
        tablica += "<td>" + k.id_korisnika + "</td>";
        tablica += "<td>" + k.ime + "</td>";
        tablica += "<td>" + k.prezime + "</td>";
        tablica += "<td>" + k.adresa + "</td>";
        tablica += "<td>" + k.postanski_broj + "</td>";
        tablica += "<td>" + k.broj_mobitela + "</td>";
        tablica += "<td>" + k.korime + "</td>";
        tablica += "<td>" + k.lozinka + "</td>";
        tablica += "<td>" + k.email + "</td>";
        tablica += "<td>" + k.tip_korisnika_id + "</td>";
        tablica += "<td><button onClick='obrisiKorisnika(\"" + k.korime + "\")'>Obrisi</button></td>";
        tablica += "</tr>";
    }

    tablica += "</table>";

    sessionStorage.dohvaceniKorisnici = JSON.stringify(korisnici);

    glavna.innerHTML = tablica;
}
