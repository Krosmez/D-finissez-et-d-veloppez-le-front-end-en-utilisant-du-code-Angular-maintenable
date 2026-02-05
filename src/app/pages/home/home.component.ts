import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Olympic } from 'src/app/models/Olympic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public totalCountries: number = 0;
  public totalJOs: number = 0;
  public error!: string;
  public isError: boolean = false;
  public titlePage: string = '';
  public statsInputs: { title: string; data: number }[] = [];

  public countries: string[] = [];
  public medalsData: number[] = [];
  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.loadOlympicsData();
  }

  private setOlympicData(data: Olympic[]): void {
    this.titlePage = 'Medals Per Country';
    this.totalJOs = this.dataService.getTotalJOs(data);
    this.countries = this.dataService.getCountries(data);
    this.totalCountries = this.dataService.getCountries(data).length;
    this.medalsData = this.dataService.getTotalCountryMedals(data);

    this.statsInputs = [
      { title: 'Number of Countries', data: this.totalCountries },
      { title: 'Total JOs', data: this.totalJOs },
    ];
  }

  private loadOlympicsData(): void {
    this.isLoading = true;
    this.dataService.getOlympics().subscribe(
      (data: Olympic[]) => {
        this.isLoading = false;
        if (data && data.length > 0) {
          this.setOlympicData(data);
        }
      },

      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.error = error.message;
      },
    );
  }

  onPieClick(country: string): void {
    this.router.navigate(['country', country]);
  }

  retryLoad(): void {
    this.loadOlympicsData();
  }
}
