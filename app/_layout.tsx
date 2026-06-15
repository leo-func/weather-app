import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{backgroundColor: "#020817", flex: 1}}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>

  );
}