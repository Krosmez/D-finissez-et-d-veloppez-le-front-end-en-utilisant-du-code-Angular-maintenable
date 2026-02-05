import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  getOlympics() {
    return this.http.get<Olympic[]>(this.olympicUrl);
  }
  getOlympicsByCountry(country: string) {
    return this.http
      .get<Olympic[]>(this.olympicUrl)
      .pipe(
        map((olympics) =>
          olympics.filter((olympic) => olympic.country === country),
        ),
      );
  }

  getTotalJOs(olympics: Olympic[]): number {
    return Array.from(
      new Set(
        olympics
          .map((olympic: Olympic) =>
            olympic.participations.map((participation) => participation.year),
          )
          .flat(),
      ),
    ).length;
  }

  getCountries(olympics: Olympic[]): string[] {
    return olympics.map((olympic) => olympic.country);
  }

  getTotalCountryMedals(olympics: Olympic[]): number[] {
    return olympics.map((olympic) => this.sumCountryMedals(olympic));
  }

  sumCountryMedals(olympics: Olympic): number {
    return olympics.participations.reduce(
      (total, participation) => total + participation.medalsCount,
      0,
    );
  }

  getTotalAthletes(olympic: Olympic): number {
    return olympic.participations.reduce(
      (total, participation) => total + participation.athleteCount,
      0,
    );
  }
}
