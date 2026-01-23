import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Olympic } from 'src/app/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private olympicUrl = './assets/mock/olympic.json';
  public totalCountries: number = 0;
  public totalJOs: number = 0;
  public error!: string;
  public titlePage: string = 'Medals per Country';

  public countries: string[] = [];
  public medalsData: number[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.http
      .get<Olympic[]>(this.olympicUrl)
      .pipe()
      .subscribe(
        (data: Olympic[]) => {
          if (data && data.length > 0) {
            this.totalJOs = Array.from(
              new Set(
                data
                  .map((olympic: Olympic) =>
                    olympic.participations.map(
                      (participation) => participation.year,
                    ),
                  )
                  .flat(),
              ),
            ).length;

            this.countries = data.map((olympic: Olympic) => olympic.country);

            this.totalCountries = this.countries.length;

            const medals = data.map((olympic: Olympic) =>
              olympic.participations.map(
                (participation) => participation.medalsCount,
              ),
            );
            this.medalsData = medals.map((medalCounts) =>
              medalCounts.reduce(
                (acc: number, count: number) => acc + count,
                0,
              ),
            );
          }
        },

        (error: HttpErrorResponse) => {
          this.error = error.message;
        },
      );
  }

  onPieClick(country: string): void {
    this.router.navigate(['country', country]);
  }
}
