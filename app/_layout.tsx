import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { OnboardingProvider } from "../store/onboarding";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <OnboardingProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="email" />
          <Stack.Screen name="name" />
          <Stack.Screen name="intent" />
          <Stack.Screen name="journal" />
          <Stack.Screen name="frequency" />
          <Stack.Screen name="wow" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </OnboardingProvider>
  );
}