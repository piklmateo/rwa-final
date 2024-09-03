import { Component } from '@angular/core';
import { AutentifikacijaService } from '../../servisi/autentifikacija.service';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../environments/environment';
import { GitHubAutetifikacijaService } from '../../servisi/git-hub-autetifikacija.service';
import { UlogeService } from '../../servisi/uloge.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrl: './prijava.component.scss',
})
export class PrijavaComponent {
  korimeInput: string = '';
  lozinkaInput: string = '';
  recaptchaSiteKey = environment.recaptchaSiteKey;
  recaptchaToken: string = '';

  constructor(
    private autentifikacijaServis: AutentifikacijaService,
    private router: Router,
    private recaptchaV3Servis: ReCaptchaV3Service,
    private githubAutetifikacijaServis: GitHubAutetifikacijaService,
    private ulogeServis: UlogeService,
  ) {}

  async Prijava() {
    try {
      this.recaptchaV3Servis
        .execute(this.recaptchaSiteKey)
        .subscribe(async (token) => {
          console.log('RECAPTCHA Token: ', token);
          this.recaptchaToken = token;

          const podaci = await this.autentifikacijaServis.prijaviKorisnika(this.korimeInput, this.lozinkaInput, this.recaptchaToken)
              if (podaci != "false") {
                console.log('Uspješna prijava');
                alert("Uspješna prijava");
                this.router.navigate(['/pocetna']);
                this.ulogeServis.postaviTipKorisnika(JSON.parse(podaci).tip_korisnika_id);
                sessionStorage.setItem('korime', JSON.parse(podaci).korime);
              } 
              else {
                alert('Pogrešno korisničko ime ili lozinka!');
                console.log('Greška prilikom prijave');
              }
            });
    } catch (error) {
      alert('Greška prilikom prijave');
      console.error('Greška prilikom prijave:', error);
    }
  }

  async loginWithGitHub() {
    const redirectUri = environment.restServis;
    const authURL = this.githubAutetifikacijaServis.dajGitHubAuthURL(redirectUri);
    this.ulogeServis.postaviTipKorisnika('3');
    window.location.href = authURL;
  }
}
