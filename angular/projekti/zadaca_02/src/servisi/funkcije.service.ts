import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FunkcijeService {
  constructor() {}

  async dodajToken(parametri: any): Promise<any> {
    let zaglavlje = new Headers();

    if (parametri.headers != null) zaglavlje = parametri.headers;

    let token = await this.dajToken();
    console.log(token);
    zaglavlje.set('Authorization', token);
    zaglavlje.append('Content-Type', 'application/json');
    parametri.headers = zaglavlje;
    console.log('NOVI PARAMETRI -> ' + parametri);
    console.log('FUNKCIJE HEADERS -> ', parametri.headers);
    return parametri;
  }

  async dajToken(): Promise<string> {
    let odgovor = await fetch('http://localhost:12000/getJWT');
    let tekst = JSON.parse(await odgovor.text());
    if (tekst.ok != null) return tekst.ok;
    else return '0000';
  }
}
