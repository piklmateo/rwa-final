import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  restServis = environment.restServis;

  constructor() { }

  async dohvatiKorisnike(): Promise<any> {
    let odgovor = await fetch(this.restServis + 'baza/korisnici/');
    if (odgovor.status == 200) {
      return odgovor.json();
    } 
    else {
      throw new Error('Greška u dohvaćanju korisnika');
    }
  }

  async dohvatiKorisnika(korime: string): Promise<any> {
    let odgovor = await fetch(this.restServis + 'baza/korisnici/' + korime);
    if (odgovor.status == 200) {
      return odgovor.json();
    } else {
      throw new Error('Greška u dohvaćanju korisnika');
    }
  }

  async obrisiKorisnika(korime: string): Promise<void> {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    const parametri = {
      method: 'DELETE',
      headers: zaglavlje,
    };

    let odgovor = await fetch(this.restServis + 'baza/korisnici/' + korime, parametri);
    if (!odgovor.ok) {
      throw new Error('Error deleting korisnik');
    }
  }

  async spremiIzmjene(
    korime: string,
    novoIme: string,
    novoPrezime: string,
    noviPostanskiBroj: number,
    novaAdresa: string,
    noviBrojMobitela: number
  ): Promise<any> {
    let zaglavlje = new Headers();
    zaglavlje.set('Content-Type', 'application/json');

    let tijelo = {
      ime: novoIme,
      prezime: novoPrezime,
      adresa: novaAdresa,
      postanski_broj: noviPostanskiBroj,
      broj_mobitela: noviBrojMobitela
    };

    let parametri = {
      method: 'PUT',
      body: JSON.stringify(tijelo),
      headers: zaglavlje
    };

    let odgovor = await fetch(this.restServis + 'baza/korisnici/' + korime, parametri);
    if (odgovor.ok) {
      return odgovor.json();
    } 
    else {
      throw new Error('Greška u dohvaćanju korisnika');
    }
  }
}
