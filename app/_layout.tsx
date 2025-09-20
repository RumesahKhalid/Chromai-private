// app/_layout.tsx
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../providers/AuthProvider";

export default function Layout() {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <Navbar />
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="about" />
            <Stack.Screen name="predict" />
            <Stack.Screen name="services" />
            <Stack.Screen name="testimonials" />
            <Stack.Screen name="articles" />

            {/* 👇 Add this */}
            <Stack.Screen name="protected/games" />
          </Stack>
        </View>
        <Footer />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
});
