// app/services.tsx
import { Ionicons } from "@expo/vector-icons";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Services() {
  const services = [
    {
      icon: "person-outline",
      title: "Recommendation",
      desc: "We provide personalized recommendations and support for families.",
    },
    {
      icon: "chatbubble-ellipses-outline",
      title: "Consultation",
      desc: "Connect with IT specialists and get expert recommendations.",
    },
    {
      icon: "document-text-outline",
      title: "Details Info",
      desc: "Receive real-time diagnostic insights and health info.",
    },
    {
      icon: "medkit-outline",
      title: "Emergency Care",
      desc: "Get 24/7 urgent care support for your children and family.",
    },
    {
      icon: "compass-outline",
      title: "Tracking",
      desc: "Track and access your medical history and health data.",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Our Services</Text>
      <Text style={styles.subtitle}>
        At Chrom AI, we provide groundbreaking tools for early detection of Down Syndrome.
      </Text>

      {services.map((service, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons name={service.icon as any} size={26} color="#fff" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDesc}>{service.desc}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1E90FF",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: "#555",
    lineHeight: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: width - 40,
    alignSelf: "center",
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4, color: "#333" },
  cardDesc: { fontSize: 13, color: "#555", lineHeight: 18 },
});
