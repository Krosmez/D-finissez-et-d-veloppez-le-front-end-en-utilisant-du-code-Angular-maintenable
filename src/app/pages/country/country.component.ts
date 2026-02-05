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
  public statsInputs: { title: string; data: number }[] = [];

  public medals: string[] = [];
  public years: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      const countryName = param.get('countryName');
      if (countryName) {
        this.loadCountryData(countryName);
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  private loadCountryData(countryName: string): void {
    this.dataService.getOlympicsByCountry(countryName).subscribe(
      (data: Olympic[]) => {
        if (data && data.length > 0) {
          console.log(data);
          this.setCountryData(data[0]);
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
      },
    );
  }

  private setCountryData(data: Olympic): void {
    this.titlePage = data.country;
    this.totalEntries = data.participations.length;
    this.totalMedals = this.dataService.sumCountryMedals(data);
    this.totalAthletes = this.dataService.getTotalAthletes(data);
    this.medals = data.participations.map((participation) =>
      participation.medalsCount.toString(),
    );
    this.years = data.participations.map((participation) => participation.year);

    this.statsInputs = [
      { title: 'Number of entries', data: this.totalEntries },
      { title: 'Total Number of medals', data: this.totalMedals },
      { title: 'Total Number of athletes', data: this.totalAthletes },
    ];
  }
}
