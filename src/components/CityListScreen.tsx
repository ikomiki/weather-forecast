import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import CITIES from "../json/cities.json";
import { City } from "../models/City";
import { getCoordinates } from "../utils/GeolocationService";

const CityListScreen = (): JSX.Element => {
  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    (async () => {
      const coord = await getCoordinates();
      const { latitude, longitude } = coord;
      // 現在地を都市リストの最上段に置く
      const currentLocation = {
        name: "現在地",
        en: "",
        latitude,
        longitude,
      };

      const cities = [currentLocation, ...(CITIES as City[])];
      setCities(cities);
    })();
  }, []);

  const handlePress = (city: City) => {
    console.log("onPress", city);
    router.push({
      pathname: "weather",
      params: {
        name: city.name,
        en: city.en,
        latitude: String(city.latitude),
        longitude: String(city.longitude),
      },
    });
  };

  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.en}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={styles.itemContainer}
        >
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 8,
    height: 48,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default CityListScreen;
