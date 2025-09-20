import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../providers/AuthProvider";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [authModal, setAuthModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setDrawerOpen(false);
    await logout();
    router.replace("/"); // ✅ logout hone ke baad Home page par redirect
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.nav}>
        {/* App Logo */}
        <Text style={styles.logo}>CHROM AI</Text>

        {/* Right Icons */}
        <View style={styles.rightIcons}>
          {/* Notification Button */}
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="notifications-outline" size={22} color="#1E90FF" />
          </TouchableOpacity>

          {/* Account Button */}
          {user ? (
            <TouchableOpacity
              style={styles.accountBtn}
              onPress={() => setDrawerOpen(true)}
            >
              <Ionicons name="person-circle-outline" size={24} color="#1E90FF" />
              <Text style={styles.accountText}>
                {user.username || "Account"}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.accountBtn}
              onPress={() => setAuthModal(true)}
            >
              <Ionicons name="person-circle-outline" size={24} color="#1E90FF" />
              <Text style={styles.accountText}>Login / Signup</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Auth Modal */}
      <AuthModal visible={authModal} onClose={() => setAuthModal(false)} />

      {/* Right Drawer */}
      <Modal visible={drawerOpen} transparent animationType="fade">
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <Text style={styles.drawerTitle}>Account Menu</Text>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                setDrawerOpen(false);
                router.push("/settings");
              }}
            >
              <Ionicons name="settings-outline" size={22} color="#1E90FF" />
              <Text style={styles.drawerText}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerItem}
              onPress={() => {
                setDrawerOpen(false);
                router.push("/feedback");
              }}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={22}
                color="#1E90FF"
              />
              <Text style={styles.drawerText}>Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="red" />
              <Text style={[styles.drawerText, { color: "red" }]}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setDrawerOpen(false)}>
              <Text style={styles.closeBtn}>✕ Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: { fontSize: 20, fontWeight: "bold", color: "#1E90FF" },
  rightIcons: { flexDirection: "row", alignItems: "center" },
  iconBtn: { marginLeft: 15 },
  accountBtn: { flexDirection: "row", alignItems: "center", marginLeft: 15 },
  accountText: { marginLeft: 5, fontSize: 14, color: "#1E90FF" },

  // Drawer
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  drawer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  drawerTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerText: { marginLeft: 10, fontSize: 16, color: "#1E90FF" },
  closeBtn: { marginTop: 20, textAlign: "center", color: "gray" },
});
