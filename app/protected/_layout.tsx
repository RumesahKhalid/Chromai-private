// app/protected/_layout.tsx
import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="about" />
      <Stack.Screen name="predict" />
      <Stack.Screen name="services" />
      <Stack.Screen name="testimonials" />
      <Stack.Screen name="articles" />

      {/* 👇 Add this */}
      <Stack.Screen name="games" />
    </Stack>
  );
}
