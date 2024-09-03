import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Korisnik } from './KorisnikI';

@Injectable({
  providedIn: 'root',
})
export class AutentifikacijaService {
  restServis = environment.restServis;

  constructor() {}

  async registracija(korisnik: Korisnik, recaptchaToken: string): Promise<any> {
    let tijelo = {
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      adresa: korisnik.adresa,
      postanski_broj: korisnik.postanski_broj,
      broj_mobitela: korisnik.broj_mobitela,
      korime: korisnik.korime,
      lozinka: korisnik.lozinka,
      email: korisnik.email,
      recaptchaToken: recaptchaToken,
    };

    let zaglavlje = new Headers({
      'Content-Type': 'application/json',
    });

    try {
      let odgovor = await fetch(this.restServis + 'registracija', {
        method: 'POST',
        headers: zaglavlje,
        body: JSON.stringify(tijelo),
      });

      if (odgovor.status === 200) {
        console.log('Korisnik ubačen na servisu');
        return true;
      } else {
        console.error('Greška prilikom registracije: ', odgovor.status);
        return false;
      }
    } catch (error) {
      console.error('Greška prilikom registracije:', error);
      return false;
    }
  }

  async prijaviKorisnika(korime: string, lozinka: string, recaptchaToken: string): Promise<any> {
    let tijelo = {
      korime: korime,
      lozinka: lozinka,
      recaptchaToken: recaptchaToken,
    };
  
    let zaglavlje = new Headers({
      'Content-Type': 'application/json',
    });
  
    try {
      let odgovor = await fetch(this.restServis + 'prijava', {
        method: 'POST',
        headers: zaglavlje,
        body: JSON.stringify(tijelo),
      });
  
      if (odgovor.status === 200) {
        console.log('Uspješna prijava');
        return await odgovor.text();
      } else {
        console.error('Greška prilikom prijave:', odgovor.status);
        return false;
      }
    } catch (error) {
      console.error('Greška prilikom prijave:', error);
      return false;
    }
  }
}
