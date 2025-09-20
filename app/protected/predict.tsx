import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PredictScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number;
    notes: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const predictImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "input.jpg",
    } as any);

    try {
      const response = await fetch("http://10.242.48.92:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.prediction) {
        setResult({
          prediction: data.prediction,
          confidence: data.confidence,
          notes: data.notes,
        });
      } else {
        setResult(null);
      }
    } catch (error) {
      setResult({
        prediction: "⚠️ Error",
        confidence: 0,
        notes: "Error connecting to server.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title Section */}
      <Text style={styles.title}>AI Down Syndrome Detection</Text>
      <Text style={styles.subtitle}>
        Upload a child’s face photo and let our AI assist you with early
        insights.
      </Text>

      {/* Image Picker Section */}
      <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
        <Text style={styles.pickButtonText}>
          {image ? "Choose Another Image" : "Pick an Image"}
        </Text>
      </TouchableOpacity>

      {/* Image Preview */}
      <View style={styles.imageWrapper}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      {/* Predict Button */}
      {loading ? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={{ marginTop: 10, color: "#555" }}>
            Analyzing image...
          </Text>
        </View>
      ) : (
        image && (
          <TouchableOpacity style={styles.predictButton} onPress={predictImage}>
            <Text style={styles.predictButtonText}>🔍 Predict</Text>
          </TouchableOpacity>
        )
      )}

      {/* Result Section */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Result</Text>
          <Text style={styles.resultText}>
            {result.prediction} (Confidence: {result.confidence}%)
          </Text>

          {/* Notes */}
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>{result.notes}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#fff" },

  // Title
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5, color: "#1E90FF" },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },

  // Pick Button
  pickButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginBottom: 15,
  },
  pickButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Image Wrapper
  imageWrapper: {
    width: 220,
    height: 220,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
  image: { width: "100%", height: "100%", borderRadius: 10 },
  placeholderText: { color: "#999" },

  // Predict Button
  predictButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  predictButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Result
  resultCard: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f1f9ff",
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  resultLabel: { fontSize: 16, fontWeight: "bold", color: "#1E90FF" },
  resultText: { marginTop: 10, fontSize: 18, fontWeight: "bold", color: "#333" },

  // Notes
  notesBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#fff8e1",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffe082",
    width: "100%",
  },
  notesText: { fontSize: 14, color: "#555", textAlign: "center" },
});
