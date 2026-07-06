import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecast, WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.css']
})
export class Weather implements OnInit {
  forecasts: WeatherForecast[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.fetchWeatherData();
  }

  fetchWeatherData(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.weatherService.getForecasts().subscribe({
      next: (data) => {
        console.log(data)
        this.forecasts = data;
        this.isLoading = false;
        console.log(this.forecasts)
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load weather data. Please ensure the API is online and try again.';
        this.isLoading = false;
      }
    });
  }
}