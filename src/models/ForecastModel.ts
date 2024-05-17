export type ForecastWeather = {
  icon: string;
  description: string;
};

export type ForecastMain = {
  temp: number;
  humidity: number;
};

export type ForecastModel = {
  dt: number;
  main: ForecastMain;
  weather: ForecastWeather[];
};

export type ForecastListModel = {
  list: ForecastModel[];
};
