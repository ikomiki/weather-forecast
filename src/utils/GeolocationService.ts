import * as Location from "expo-location";
import { Alert } from "react-native";

export async function getCoordinates(): Promise<Location.LocationObjectCoords> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("位置情報の取得が許可されていません");
    throw new Error("位置情報の取得が許可されていません");
  }
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}
