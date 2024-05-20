import { FlatList } from "react-native";
import WeatherForecast from "../utils/WeatherForecast";
import ForecastListItem from "./ForecastListItem";

type WeatherForecastFlatListProps = {
  forecasts: WeatherForecast[];
};

const WeatherForecastFlatList = (
  props: WeatherForecastFlatListProps
): JSX.Element => {
  const { forecasts } = props;
  return (
    <FlatList
      data={forecasts}
      renderItem={({ item }) => <ForecastListItem item={item} />}
      keyExtractor={(item) => item.date.toString()}
    />
  );
};

export default WeatherForecastFlatList;
