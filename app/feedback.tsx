import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!feedback) return;
    // ✅ Save to backend / DB, abhi dummy
    console.log("Feedback:", feedback);

    setFeedback("");
    router.push("/testimonials"); // Redirect to Testimonials
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Give Your Feedback</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your feedback..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    minHeight: 100,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
