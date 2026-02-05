import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Stats } from 'src/app/models/Stats';

@Component({
  selector: 'app-stats-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-header.component.html',
  styleUrl: './stats-header.component.scss',
})
export class StatsHeaderComponent {
  @Input() titlePage: string = '';
  @Input() title: string = '';
  @Input() stats: Stats[] = [];
}
