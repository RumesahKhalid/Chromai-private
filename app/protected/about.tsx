// app/about.tsx
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={{ paddingBottom: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Image */}
      <Image
        source={require("../../assets/images/about.png")}
        style={styles.heroImage}
      />

      {/* Title */}
      <Text style={styles.title}>About Chrom AI</Text>

      {/* Intro Paragraph */}
      <Text style={styles.text}>
        Chrom AI is committed to empowering families with early detection and
        accessible healthcare solutions for Down Syndrome. Through AI-powered
        tools, we provide timely insights, personalized recommendations, and
        support from trusted medical professionals.
      </Text>

      {/* Mission & Vision */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Our Mission</Text>
          <Text style={styles.cardText}>
            To make early detection of Down Syndrome affordable, accessible,
            and reliable for every family around the globe.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌍 Our Vision</Text>
          <Text style={styles.cardText}>
            A world where technology bridges the gap between families and
            healthcare, ensuring equal care opportunities for all children.
          </Text>
        </View>
      </View>

      {/* Additional Image */}
      <Image
        source={require("../../assets/images/team.jpg")}
        style={styles.bottomImage}
      />

      {/* Closing Note */}
      <Text style={styles.text}>
        With Chrom AI, families gain confidence, doctors get reliable insights,
        and children receive the timely care they deserve.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 18 },

  // Hero
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: "cover",
  },

  // Title
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E90FF",
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  // Paragraphs
  text: {
    fontSize: 15,
    color: "#444",
    marginBottom: 20,
    lineHeight: 22,
    textAlign: "center",
  },

  // Cards
  cardWrapper: { marginVertical: 20, gap: 16 },
  card: {
    backgroundColor: "#f8fbff",
    padding: 18,
    borderRadius: 14,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#1E90FF", 
    marginBottom: 8 
  },
  cardText: { 
    fontSize: 14, 
    color: "#333", 
    lineHeight: 20 
  },

  // Bottom image
  bottomImage: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: "cover",
  },
});
