import { WeatherModel } from "../models/WeatherModel";

export class CurrentWeather {
  readonly main: string;
  readonly iconURL: string;

  constructor(data: WeatherModel) {
    const { weather } = data;
    this.main = weather[0].main;
    this.iconURL = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  }
}
