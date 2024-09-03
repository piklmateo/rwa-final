const kodovi = require("./moduli/kodovi.js")

class Korisnici {

  async dohvatiKorisnike() {
    
    let putanja = "/baza/korisnici/";
    let odgovor = await fetch(putanja);
    let podaci = await odgovor.text();
    let korisnik = JSON.parse(podaci);
    return korisnik;
  }

  async dohvatiKorisnika(korime) {
    let putanja = "/baza/korisnici/" + korime;
    let odgovor = await fetch(putanja);
    let podaci = await odgovor.text();
    let korisnik = JSON.parse(podaci);
    return korisnik;
  }

  async obrisiKorisnika(korime) {
    let zaglavlje = new Headers()
    zaglavlje.set("Content-Type", "application/json")

    let parametri = {
      method: "DELETE",
      headers: zaglavlje,
    }
    let odgovor = await fetch("/baza/korisnici/" + korime, parametri)
    let podaci = await odgovor.text()
    let rezultat = JSON.parse(podaci)
    return rezultat
  }

  async spremiIzmjene(korime, novoIme, novoPrezime, noviPostanskiBroj, novaAdresa, noviBrojMobitela) {
    let zaglavlje = new Headers()
    zaglavlje.set("Content-Type", "application/json")
    
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
    }

    let odgovor = await fetch("/baza/korisnici/" + korime, parametri)
    let podaci = await odgovor.text()
    let rezultat = JSON.parse(podaci)
    return rezultat
  }
}

module.exports = Korisnici