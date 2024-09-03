let poruka = document.getElementById("poruka")

window.addEventListener("load", async () => {
  poruka = document.getElementById("poruka");
  let btnSpremi = document.getElementById("spremi_promjene");

  btnSpremi.addEventListener("click", async () => {
    spremiPromjene()
    poruka.innerHTML = "Uspješno ažuriranje";
  })

  dohvatiKorisnika(poruka.innerHTML)
  poruka.innerHTML = " ";
})

async function dohvatiKorisnika(korime) {
  let zaglavlje = new Headers();
  zaglavlje.set("Content-Type", "application/json");
  let parametri = {
    method: "GET",
    headers: zaglavlje,
  };
  parametri = await dodajToken(parametri);
  let odgovor = await fetch("/baza/korisnici/" + korime, parametri);
  if (odgovor.status == 200) {
    let podaci = await odgovor.text();
    podaci = JSON.parse(podaci);
    console.log("OVO GLEDAJ: ", podaci);
    prikaziKorisnika(podaci);
  } 
    else if (odgovor.status == 401) {
      document.getElementById("sadrzaj").innerHTML = "";
      poruka.innerHTML = "potrebna prijava";
  } else {
      poruka.innerHTML = "Greška u dohvatu korisnika!";
  }
}

function prikaziKorisnika(korisnik) {
  let ime = document.getElementById("ime");
  let prezime = document.getElementById("prezime");
  let adresa = document.getElementById("adresa");
  let postanski_broj = document.getElementById("postanski_broj");
  let broj_mobitela = document.getElementById("broj_mobitela");
  let korime = document.getElementById("korime");
  let email = document.getElementById("email");

  ime.value = korisnik.ime;
  prezime.value = korisnik.prezime;
  adresa.value = korisnik.adresa;
  postanski_broj.value = korisnik.postanski_broj;
  broj_mobitela.value = korisnik.broj_mobitela;
  korime.value = korisnik.korime;
  email.value = korisnik.email;
}

async function spremiPromjene() {
  let novoIme = document.getElementById("ime").value;
  let novoPrezime = document.getElementById("prezime").value;
  let novaAdresa = document.getElementById("adresa").value;
  let noviPostanskiBroj = document.getElementById("postanski_broj").value;
  let noviBrojMobitela = document.getElementById("broj_mobitela").value;
  let korime = document.getElementById("korime").value;

  let zaglavlje = new Headers();
  zaglavlje.set("Content-Type", "application/json");


  console.log("PODACI -> ", korime, novoIme, novoPrezime)

  let parametri = {
    method: "PUT",
    body: JSON.stringify({
      ime: novoIme,
      prezime: novoPrezime,
      adresa: novaAdresa,
      postanski_broj: noviPostanskiBroj,
      broj_mobitela: noviBrojMobitela,
    }),
    headers: zaglavlje,
  };
  
  parametri = await dodajToken(parametri)

  try {
    let odgovor = await fetch("/baza/korisnici/" + korime, parametri);

    if (odgovor.status == 201) {
      console.log("Korime: ", korime)
      let podaci = await odgovor.text()
      podaci = JSON.parse(podaci)
      location.reload();
    } else if (odgovor.status === 401) {
      document.getElementById("sadrzaj").innerHTML = "";
      poruka.innerHTML = "Neautorizirani pristup! Prijavite se!";
    } else {
      console.log("Greška kod spremanja promjena. Status: " + odgovor.status);
      poruka.innerHTML = "Greška kod spremanja promjena!";
    }
  } catch (greska) {
    console.log("Error:", greska);
    poruka.innerHTML = "Čudan error prilikom spremanja podataka.";
  }
}
