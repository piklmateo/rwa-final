import { Component } from '@angular/core';
import { KorisniciService } from '../../servisi/korisnici.service';
import { Korisnik } from '../../servisi/KorisnikI';
import { environment } from '../../environments/environment';
import { UlogeService } from '../../servisi/uloge.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  restServis = environment.restServis;

  korisnik: Korisnik[] = [];
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  postanski_broj: number = 0;
  broj_mobitela: number = 0;
  korime: string = '';
  lozinka: string = '';
  email: string = '';

  recaptchaSiteKey = environment.recaptchaSiteKey;
  recaptchaToken: string = '';

  korimeSesija: string | null = '';

  constructor(
    private korisniciServis: KorisniciService,
    private recaptchaV3Servis: ReCaptchaV3Service,
    private ulogeServis: UlogeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.korimeSesija = sessionStorage.getItem('korime');
    let tip_korisnika = this.ulogeServis.dohvatiTipKorisnika();
    if (tip_korisnika == '0' || tip_korisnika == '3') {
      console.log('Zabranjen pristup');
      this.router.navigate(['/pocetna']);
      alert('Zabranjen pristup');
    }

    console.log('korimeSesija: ', this.korimeSesija);
    if (this.korimeSesija != null) {
      this.dohvatiKorisnika(this.korimeSesija);
    }
  }

  async dohvatiKorisnika(korime: string) {
    let odgovor = await fetch(this.restServis + 'baza/korisnici/' + korime);
    if (odgovor.status == 200) {
      let podaci = await odgovor.text();
      podaci = JSON.parse(podaci);
      console.log('podaci: ', podaci);
      this.postaviVrijednosti(podaci);
    } else if (odgovor.status == 401) {
      alert('Neautorizirani pristup! Prijavite se!');
    } else {
      alert('Greška u dohvatu podataka.');
    }
  }

  postaviVrijednosti(korisnik: any) {
    this.ime = korisnik.ime;
    this.prezime = korisnik.prezime;
    this.adresa = korisnik.adresa;
    this.postanski_broj = korisnik.postanski_broj;
    this.broj_mobitela = korisnik.broj_mobitela;
    this.korime = korisnik.korime;
    this.email = korisnik.email;
  }

  async spremiPromjene() {
    try {
      this.recaptchaV3Servis
        .execute(this.recaptchaSiteKey)
        .subscribe(async (token) => {
          console.log('recaptcha Token: ', token);

          const parametri = {
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify({
              ime: this.ime,
              prezime: this.prezime,
              adresa: this.adresa,
              broj_mobitela: this.broj_mobitela,
              postanski_broj: this.postanski_broj,
              token: token,
            }),
          };

          let odgovor = await fetch(
            this.restServis + 'baza/korisnici/' + this.korime,
            parametri
          );
          if (odgovor.status == 201) {
            let podaci = await odgovor.text();
            podaci = JSON.parse(podaci);
            console.log('podaci: ', podaci);
            this.dohvatiKorisnika(this.korime);
            alert('Uspješno spremanje promjena.');
          } else if (odgovor.status == 401) {
            alert('Neautoriziran pristup!');
          } else {
            alert('Greška kod spremanja promjena.');
          }
        });
    } catch (error) {
      alert('Greška recaptcha');
      console.error('Greška recaptcha: ', error);
    }
  }
}
