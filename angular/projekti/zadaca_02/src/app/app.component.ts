import { Component, OnInit } from '@angular/core';
import { AutentifikacijaService } from '../servisi/autentifikacija.service';
import { UlogeService } from '../servisi/uloge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zadaca_02';
  putanja = 'dokumentacija';

  constructor(private ulogeServis: UlogeService) {}

  dohvatiTipKorisnika() {
    return this.ulogeServis.dohvatiTipKorisnika();
  }

  odjava() {
    this.ulogeServis.postaviTipKorisnika('0');
  }
}
