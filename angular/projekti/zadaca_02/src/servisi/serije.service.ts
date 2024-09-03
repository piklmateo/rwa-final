import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { SerijaTmdbI, SerijeTmdbI } from './SerijeTmdbI';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  restServis = environment.restServis;

  constructor() {}

  async dohvatiSerije(stranica: number, filter: string): Promise<any> {
    let url =
      this.restServis + 'pocetna?str=' + stranica + '&filter=' + filter;

    try {
      let odgovor = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!odgovor.ok) {
        throw new Error("Greška: " + odgovor.status);
      }
      let podaci = await odgovor.json();
      return podaci;
    } 
    catch (error) {
      throw error;
    }
  }

  async dohvatiDetaljeSerije(seriesId: number): Promise<SerijaTmdbI> {
    let url = this.restServis + 'serijaDetalji?id=' + seriesId;

    try {
      let odgovor = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!odgovor.ok) {
        throw new Error("Greška: " + odgovor.status);
      }

      let podaci: SerijaTmdbI = await odgovor.json();
      return podaci;
    } 
    catch (error) {
      throw error;
    }
  }
}
