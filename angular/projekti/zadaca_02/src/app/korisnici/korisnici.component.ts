import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../../servisi/korisnici.service';
import { UlogeService } from '../../servisi/uloge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrl: './korisnici.component.scss',
})
export class KorisniciComponent implements OnInit {
  korisnici: any[] = [];

  constructor(private korisniciServis: KorisniciService, private ulogeServis: UlogeService, private router: Router) {}
  

  ngOnInit(): void {
    let tip_korisnika = this.ulogeServis.dohvatiTipKorisnika();
    if(tip_korisnika == '0' || tip_korisnika == '2' || tip_korisnika == '3') {
      console.log("Zabranjen pristup");
      this.router.navigate(["/pocetna"]);
      alert("Zabranjen pristup");
    }
    this.dajKorisnike();
  }

  async dajKorisnike() {
    try {
      const odgovor = await this.korisniciServis.dohvatiKorisnike();
      console.log('Odgovor:', odgovor);
      this.korisnici = odgovor;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja korisnika:', error);
    }
  }

  async obrisiKorisnika(korime: string) {
    try {
      if(korime == 'admin') {
        console.log("Zabranjeno brisanje admina!");
        alert("Zabranjeno brisanje admina");
      }
      else {
        await this.korisniciServis.obrisiKorisnika(korime);
        location.reload();
        alert('Uspješno obrisani korisnik');
      }
    } 
    catch (error) {
      console.error('Greška prilikom brisanja: ', error);
      alert('Greška prilikom brisanja');
    }
  }
}
