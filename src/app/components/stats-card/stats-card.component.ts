import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss',
})
export class StatsCardComponent implements OnInit {
  @Input() statsTitle: string = 'Stats Title';
  @Input() statsData: number = 0;

  constructor() {}

  ngOnInit(): void {}
}
