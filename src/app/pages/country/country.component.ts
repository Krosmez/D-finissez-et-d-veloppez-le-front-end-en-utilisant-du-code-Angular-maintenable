import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Olympic } from 'src/app/models/Olympic';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;

  public medals: string[] = [];
  public years: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    let countryName: string | null = null;

    this.route.paramMap.subscribe(
      (param: ParamMap) => (countryName = param.get('countryName')),
    );

    if (countryName) {
      this.dataService.getOlympicsByCountry(countryName).subscribe(
        (data: Olympic[]) => {
          if (data && data.length > 0) {
            const selectedCountry = data[0]; // Since filtered, take the first (and only) item
            this.titlePage = selectedCountry.country;
            this.totalEntries = selectedCountry.participations.length;
            this.years = selectedCountry.participations.map(
              (participation) => participation.year,
            );
            this.medals = selectedCountry.participations.map((participation) =>
              participation.medalsCount.toString(),
            );
            this.totalMedals = this.medals.reduce(
              (accumulator: number, item: string) =>
                accumulator + parseInt(item),
              0,
            );
            const nbAthletes = selectedCountry.participations.map(
              (participation) => participation.athleteCount.toString(),
            );
            this.totalAthletes = nbAthletes.reduce(
              (accumulator: number, item: string) =>
                accumulator + parseInt(item),
              0,
            );
          }
        },

        (error: HttpErrorResponse) => {
          this.error = error.message;
        },
      );
    }
  }
}
