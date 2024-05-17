import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CurrentWeather } from "../utils/CurrentWeather";
import { getCurrentWeather, getWetherForecasts } from "../utils/WeatherService";
import WeatherForecast from "../utils/WeatherForecast";
import WeatherForecastFlatList from "./WeatherForecastFlatList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { City } from "../models/City";

const WeatherScreen = (): JSX.Element => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [weatherForecasts, setWeatherForecasts] = useState<
    WeatherForecast[] | null
  >(null);
  const navigation = useNavigation();

  const city = useLocalSearchParams<City>();
  if (city.en === undefined || city.name === undefined) {
    return <Text>都市情報の不正</Text>;
  }

  useEffect(() => {
    navigation.setOptions({
      title: `${city.name}の天気`,
    });
  }, [navigation, city.name]);

  useEffect(() => {
    if (!currentWeather) {
      (async () => {
        try {
          const currentWeather = await getCurrentWeather(city.en ?? "");
          console.log("current weather", currentWeather);
          console.log("天気情報の取得完了");
          setCurrentWeather(currentWeather);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", (error as Error).message);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (!weatherForecasts) {
      (async () => {
        try {
          const weatherForecasts = await getWetherForecasts(city.en ?? "");
          console.log("weather forecasts", weatherForecasts);
          console.log("天気予報の取得完了");
          setWeatherForecasts(weatherForecasts);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", (error as Error).message);
        }
      })();
    }
  }, []);

  if (!currentWeather || !weatherForecasts) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  const { main, iconURL } = currentWeather;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{main} </Text>
      <Image source={{ uri: iconURL }} style={styles.icon} />
      <WeatherForecastFlatList forecasts={weatherForecasts} />
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    marginVertical: 8,
  },
  icon: {
    width: 100,
    height: 100,
  },
});
