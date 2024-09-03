import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GitHubAutetifikacijaService {

  constructor() {}

  dajGitHubAuthURL(povratniURL: string) {
    let url = 'https://github.com/login/oauth/authorize?client_id=' + environment.githubClientID + '&redirect_uri=' + povratniURL;
    return url;
  }

  /*async dajAccessToken(dobiveniKod: string) {
    let parametri = {
      client_id: environment.githubClientID,
      client_secret: environment.githubSecretKey,
      code: dobiveniKod,
    };

    let urlParametri = '?client_id=' + parametri.client_id + '&client_secret=' + parametri.client_secret + '&code=' + parametri.code;

    try {
      let odgovor = await fetch('https://github.com/login/oauth/access_token' + urlParametri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      if (odgovor.status == 200) {
        let podaci = await odgovor.json();
        return podaci.access_token;
      } 
      else {
        console.error('Greška u dohvaćanju tokena');
        return null;
      }
    } 
    catch (error) {
      console.error('Greška u dohvaćanju tokena: ', error);
      return null;
    }
  }

  async provjeriToken(token: string): Promise<any> {
    let parametri = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    };

    try {
      let odgovor = await fetch('https://api.github.com/user', parametri);

      if (odgovor.status == 200) {
        let podaci = await odgovor.json();
        return podaci;
      } 
      else {
        console.error('Greška pri provjeri tokena');
        return null;
      }
    } 
    catch (error) {
      console.error('Greška pri provjeri tokena: ', error);
      return null;
    }
  }*/
}
