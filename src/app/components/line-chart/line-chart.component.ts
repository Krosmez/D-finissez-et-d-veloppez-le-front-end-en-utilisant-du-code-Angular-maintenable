import Chart from 'chart.js/auto';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() years: number[] = [];
  @Input() medalsData: string[] = [];
  @Input() chartId: string = 'lineChart';

  private chart!: Chart<'line', string[], number>;
  private viewInitialized = false;

  ngAfterViewInit(): void {
    // this.buildPieChart();
    this.viewInitialized = true;
    if (this.medalsData.length > 0) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitialized && changes['medalsData']) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.buildChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private buildChart(): void {
    this.chart = new Chart(this.chartId, {
      type: 'line',
      data: {
        labels: this.years,
        datasets: [
          {
            label: 'medals',
            data: this.medalsData,
            backgroundColor: '#0b868f',
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
