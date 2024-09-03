import { Component, OnInit } from '@angular/core';
import { SerijeTmdbI } from '../../servisi/SerijeTmdbI';
import { SeriesService } from '../../servisi/serije.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  listaSerija: SerijeTmdbI[] = [];
  filter: string = '';
  stranica: number = 1;

  constructor(private serijeServis: SeriesService, private router: Router) {}

  ngOnInit(): void {
    this.serije();
  }

  async serije(): Promise<void> {
    try {
      const podaci = await this.serijeServis.dohvatiSerije(this.stranica, this.filter);
      this.listaSerija = podaci.results;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja serija:', error);
    }
  }

  onFilterChange() {
    if (this.filter.length >= 3) {
      this.serije();
    }
    else if(this.filter.length == 0) {
      this.serije();
    }
  }

  redirectSerijeDetalji(idSerije: number) {
    this.router.navigate(['/serija-detalji', idSerije]);
  }
}
