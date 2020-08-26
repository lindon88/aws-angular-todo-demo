import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {

  public weather;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    this.getWeatherData('Podgorica');
  }

  private async getWeatherData(city): Promise<any> {
    this.weather = await this.weatherService.getWeatherData(city);
    console.log(this.weather);
  }
}
