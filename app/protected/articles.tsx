// app/articles.tsx
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const articles = [
  {
    id: "1",
    title: "Understanding Down Syndrome",
    desc: "Learn about the causes, genetics, and key facts behind Down Syndrome caused by an extra chromosome 21.",
    image: require("../../assets/images/article1.jpeg"), // 👈 apni image add karo
  },
  {
    id: "2",
    title: "Early Detection and Diagnosis",
    desc: "Explore how AI-powered tools help families and healthcare professionals in early screening and diagnosis.",
    image: require("../../assets/images/article2.jpg"),
  },
  {
    id: "3",
    title: "Health and Care Guidelines",
    desc: "Comprehensive guidelines for doctors, caregivers, and families to provide the best care possible.",
    image: require("../../assets/images/article3.jpg"),
  },
];

export default function Articles() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>📚 Articles & Resources</Text>
      <Text style={styles.subHeader}>
        Explore valuable insights, guides, and expert tips.
      </Text>

      {/* Article List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  // Header
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 5,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },

  // Article Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
  },
  image: { width: "100%", height: 150, resizeMode: "cover" },
  textWrapper: { padding: 15 },
  title: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 5 },
  desc: { fontSize: 14, color: "#666", lineHeight: 20 },
});
