import { useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Theme</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Profile Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={[styles.optionText, { color: "red" }]}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  label: { fontSize: 16 },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: { fontSize: 16 },
});
