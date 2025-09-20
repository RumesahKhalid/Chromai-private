// app/testimonials.tsx
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const testimonials = [
  {
    id: "1",
    name: "Ushna Tasleem",
    feedback:
      "Chrom AI has been a game-changer for our family. Its non-invasive approach made screening easy and stress-free.",
    avatar: require("../../assets/images/avatar1.png"), // apni image lagani hai
  },
  {
    id: "2",
    name: "Ali Khan",
    feedback:
      "Truly remarkable innovation for accessible healthcare. Highly recommended for families!",
    avatar: require("../../assets/images/avatar2.png"),
  },
];

export default function Testimonials() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Our Customers Say</Text>

      <FlatList
        data={testimonials}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.cardContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.feedback}>{item.feedback}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  cardContent: { flex: 1 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  feedback: { fontSize: 14, color: "#555" },
});
