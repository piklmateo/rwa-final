import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeriesService } from '../../servisi/serije.service';
import { SerijaTmdbI } from '../../servisi/SerijeTmdbI';

@Component({
  selector: 'app-serija-detalji',
  templateUrl: './serija-detalji.component.html',
  styleUrls: ['./serija-detalji.component.scss'],
})
export class SerijaDetaljiComponent implements OnInit {
  seriesDetails: SerijaTmdbI | undefined;

  constructor(
    private route: ActivatedRoute,
    private seriesService: SeriesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let idSerije = params['id'];
      if (idSerije) {
        this.dohvatiDetaljeSerije(+idSerije);
      }
    });
  }

  async dohvatiDetaljeSerije(idSerije: number): Promise<void> {
    try {
      this.seriesDetails = await this.seriesService.dohvatiDetaljeSerije(idSerije);
    } catch (error) {
      console.error('Greška prilikom dohvaćanja detalja:', error);
    }
  }
}
