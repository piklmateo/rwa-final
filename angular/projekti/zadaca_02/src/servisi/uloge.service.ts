import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UlogeService {

  private tip_korisnika: string = '0';

  dohvatiTipKorisnika(): string {
    return sessionStorage.getItem(this.tip_korisnika) || '0';
  }
  
  postaviTipKorisnika(vrijednost: string): void {
    sessionStorage.setItem(this.tip_korisnika, vrijednost)
  }
  
  constructor() { }
}
