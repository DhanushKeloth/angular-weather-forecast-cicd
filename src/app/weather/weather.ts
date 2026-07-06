import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.css']
})
export class Weather {

  forecasts = signal<WeatherForecast[]>([]);

  constructor(private weatherService: WeatherService) {}

  loadWeather() {
    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        console.log(data);
        this.forecasts.set(data);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}