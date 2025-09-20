import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthModal from "../components/AuthModal"; // 👈 apna modal import karo

export default function Footer() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  // Check login token
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  const handlePress = (path: string) => {
    if (!isLoggedIn && path.startsWith("/protected")) {
      setPendingPath(path);
      setShowAuth(true); // 👈 login/signup modal khol do
    } else {
      router.push(path);
    }
  };

  // Jab modal close hoga aur login ho gaya hoga
  const handleCloseAuth = async () => {
    setShowAuth(false);

    // dobara check karo login hua ya nahi
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);

      // agar koi protected path pending tha → ab jao wahan
      if (pendingPath) {
        router.push(pendingPath);
        setPendingPath(null);
      }
    }
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tab} onPress={() => handlePress("/")}>
          <Ionicons name="home-outline" size={24} color="#1E90FF" />
          <Text style={styles.label}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handlePress("/protected/services")}
        >
          <Ionicons name="apps-outline" size={24} color="#1E90FF" />
          <Text style={styles.label}>Services</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handlePress("/protected/predict")}
        >
          <Ionicons name="analytics-outline" size={24} color="#1E90FF" />
          <Text style={styles.label}>Analysis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => handlePress("/protected/about")}
        >
          <Ionicons name="person-outline" size={24} color="#1E90FF" />
          <Text style={styles.label}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Auth Modal */}
      <AuthModal visible={showAuth} onClose={handleCloseAuth} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tab: { alignItems: "center" },
  label: { fontSize: 12, color: "#1E90FF", marginTop: 2 },
});
