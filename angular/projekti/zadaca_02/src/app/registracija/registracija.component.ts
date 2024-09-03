import { Component, OnInit } from '@angular/core';
import { AutentifikacijaService } from '../../servisi/autentifikacija.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { UlogeService } from '../../servisi/uloge.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrl: './registracija.component.scss',
})
export class RegistracijaComponent implements OnInit{
  ime: string = '';
  prezime: string = '';
  adresa: string = '';
  postanski_broj: number = 0;
  broj_mobitela: number = 0;
  korime: string = '';
  email: string = '';
  lozinka: string = '';

  recaptchaSiteKey = environment.recaptchaSiteKey;
  recaptchaToken: string = '';

  constructor(
    private autentifikacijaServis: AutentifikacijaService,
    private router: Router,
    private recaptchaV3Servis: ReCaptchaV3Service,
    private ulogeServis: UlogeService,
  ) {}

  ngOnInit() {
    let tip_korisnika = this.ulogeServis.dohvatiTipKorisnika();
    if(tip_korisnika == '0' || tip_korisnika == '2' || tip_korisnika == '3') {
      console.log("Zabranjen pristup");
      this.router.navigate(["/pocetna"]);
      alert("Zabranjen pristup");
    }
  }

  async registracija() {
    try {
      // Execute the reCAPTCHA and obtain the token
      this.recaptchaV3Servis.execute(this.recaptchaSiteKey).subscribe((token) => {
        console.log('recaptcha Token: ', token);
  
        // Now you can use the token for user registration
        const korisnik = {
          ime: this.ime,
          prezime: this.prezime,
          adresa: this.adresa,
          postanski_broj: this.postanski_broj,
          broj_mobitela: this.broj_mobitela,
          korime: this.korime,
          email: this.email,
          lozinka: this.lozinka,
          recaptchaToken: token,
        };
  
        // Pass the token to the registerUser function
        this.autentifikacijaServis.registracija(korisnik, token).then((uspjeh) => {
          if (uspjeh) {
            console.log('Uspješna registracija');
            alert('Uspješna registracija');
            this.router.navigate(['/prijava']);
          } else {
            alert('Greška prilikom registracije');
            console.log('Greška prilikom registracije');
          }
        });
      });
    } catch (error) {
      alert('Greška prilikom registracije');
      console.error('Greška prilikom registracije: ', error);
    }
  } 
}
