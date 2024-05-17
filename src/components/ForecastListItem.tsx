import { Image, StyleSheet, Text, View } from "react-native";
import WeatherForecast from "../utils/WeatherForecast";

type ForecastListItemProps = {
  item: WeatherForecast;
};

const ForecastListItem = (props: ForecastListItemProps): JSX.Element => {
  const { item } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${item.date.getHours()}時`}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Image source={{ uri: item.iconURL }} style={styles.icon} />
      <Text style={styles.text}>{`${item.temperature}℃`}</Text>
      <Text style={styles.text}>{`${item.humidity}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  text: {
    fontSize: 18,
    width: 48,
    marginHorizontal: 8,
  },
  icon: {
    width: 48,
    height: 48,
    marginHorizontal: 8,
  },
});

export default ForecastListItem;
