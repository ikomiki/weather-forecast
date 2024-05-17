import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import CITIES from "../json/cities.json";
import { router, useNavigation } from "expo-router";
import { City } from "../models/City";

const CityListScreen = (): JSX.Element => {
  const handlePress = (city: City) => {
    console.log("onPress", city);
    router.push({
      pathname: "weather",
      params: { name: city.name, en: city.en },
    });
  };

  return (
    <FlatList
      data={CITIES as City[]}
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
