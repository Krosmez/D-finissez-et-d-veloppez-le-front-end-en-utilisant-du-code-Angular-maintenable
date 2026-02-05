import { BrowserModule } from '@angular/platform-browser';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { NgModule } from '@angular/core';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { StatsHeaderComponent } from 'src/app/components/stats-header/stats-header.component';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CountryComponent } from './pages/country/country.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    CountryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PieChartComponent,
    LineChartComponent,
    StatsHeaderComponent,
    LoadingComponent,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
