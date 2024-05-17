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
import { getCurrentWeather } from "../utils/getCurrentWeather";

const WeatherScreen = (): JSX.Element => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  useEffect(() => {
    if (!currentWeather) {
      (async () => {
        try {
          const nextWeather = await getCurrentWeather("tokyo");
          console.log("next weather", nextWeather);
          console.log("天気情報の取得完了");
          setCurrentWeather(nextWeather);
        } catch (error) {
          console.error(error);
          Alert.alert("Error", (error as Error).message);
        }
      })();
    }
  }, []);

  if (!currentWeather) {
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
