import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherIcons: {id: string, weatherIcon: string}[] = [
    {
      id: '01d',
      weatherIcon: 'wi-day-sunny'
    },
    {
      id: '02d',
      weatherIcon: 'wi-day-cloudy'
    },
    {
      id: '03d',
      weatherIcon: 'wi-cloud'
    },
    {
      id: '04d',
      weatherIcon: 'wi-cloudy'
    },
    {
      id: '09d',
      weatherIcon: 'wi-rain-wind'
    },
    {
      id: '10d',
      weatherIcon: 'wi-day-rain-mix'
    },
    {
      id: '11d',
      weatherIcon: 'wi-day-thunderstorm'
    },
    {
      id: '13d',
      weatherIcon: 'wi-snowflake-cold'
    },
    {
      id: '50d',
      weatherIcon: 'wi-fog'
    },
    {
      id: '01n',
      weatherIcon: 'wi-night-clear'
    },
    {
      id: '02n',
      weatherIcon: 'wi-night-alt-cloudy'
    },
    {
      id: '03n',
      weatherIcon: 'wi-night-cloudy'
    },
    {
      id: '04n',
      weatherIcon: 'wi-cloudy'
    },
    {
      id: '09n',
      weatherIcon: 'wi-showers'
    },
    {
      id: '10n',
      weatherIcon: 'wi-night-rain'
    },
    {
      id: '11n',
      weatherIcon: 'wi-night-thunderstorm'
    },
    {
      id: '13n',
      weatherIcon: 'wi-night-snow'
    },
    {
      id: '50n',
      weatherIcon: 'wi-night-fog'
    },
  ];

  constructor(private http: HttpClient) { }

  public async getWeatherData(city): Promise<any>{
    return this.http.get('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b8a0e128c6f0a28674557665f654bca1').toPromise()
      .then((weather: any) => {

        if (!weather || !weather.main || !weather.main.temp) {
          return;
        }

        weather.temp = weather.main.temp - 273;

        if (!weather.weather || !weather.weather.length) {
          return;
        }

        const weatherDetailsData = weather.weather[0];
        weather.icon = this.mapWeatherIcon(weatherDetailsData.icon);
        weather.weatherDetailName = weatherDetailsData.main;

        return weather;
      });
  }

  private mapWeatherIcon(code: string): string {
    return this.weatherIcons.find(icon => icon.id === code)?.weatherIcon;
  }

}
