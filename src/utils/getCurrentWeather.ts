import { CurrentWeather } from "./CurrentWeather";
import { WeatherModel } from "../models/WeatherModel";

const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;
const LANG = "ja";

/**
 * 現在の天気データを取得するエンドポイントを返す
 * @see https://openweathermap.org/current
 * @param query
 * @returns
 */
function getCurrentWeatherEndPoint(query: string): string {
  return `${BASE_URL}weather?q=${query}&appid=${API_KEY}&lang=${LANG}`;
}

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const endPoint = getCurrentWeatherEndPoint(city);
  console.log("endPoint", endPoint);
  const response = await fetch(endPoint);
  console.log("response", response);
  if (response.ok) {
    const json = (await response.json()) as WeatherModel;
    console.log("json", json);
    const currentWeather = new CurrentWeather(json);
    return currentWeather;
  } else {
    const json = await response.json();
    throw new Error("Failed to get weather data: " + json.message);
  }
}
