import { Stack } from "expo-router";

const RootLayout = (): JSX.Element => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "都道府県一覧" }} />
      <Stack.Screen name="weather" />
    </Stack>
  );
};

export default RootLayout;
