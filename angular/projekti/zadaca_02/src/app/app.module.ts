// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterModule, Routes } from '@angular/router'; // Import Routes

import { AppComponent } from './app.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { APPDokumentacijaTableComponent } from './app-dokumentacija-table/app-dokumentacija-table.component';
import { RESTDokumentacijaTableComponent } from './rest-dokumentacija-table/rest-dokumentacija-table.component';
import { ZADACIDokumentacijaTableComponent } from './zadaci-dokumentacija-table/zadaci-dokumentacija-table.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { SerijaDetaljiComponent } from './serija-detalji/serija-detalji.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: '/pocetna', pathMatch: 'full' },
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'serija-detalji/:id', component: SerijaDetaljiComponent },
  { path: 'korisnici', component: KorisniciComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'profil', component: ProfilComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DokumentacijaComponent,
    APPDokumentacijaTableComponent,
    RESTDokumentacijaTableComponent,
    ZADACIDokumentacijaTableComponent,
    PocetnaComponent,
    ProfilComponent,
    SerijaDetaljiComponent,
    KorisniciComponent,
    RegistracijaComponent,
    PrijavaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaV3Module,
    RouterModule.forRoot(routes),
],
  providers: [
    ReCaptchaV3Service,
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.recaptchaSiteKey },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}