import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthModal from "../components/AuthModal"; // 👈 modal import
import { useAuth } from "../providers/AuthProvider"; // 👈 firebase auth hook

export default function Home() {
  const router = useRouter();
  const { user } = useAuth(); // 👈 check if logged in
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.title}>EARLY INSIGHTS, EQUAL CARE</Text>
        <Text style={styles.subtitle}>
          Welcome to Chrom AI – your trusted platform for Down syndrome detection and support.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (user) {
              router.push("/protected/services"); // 👈 already logged in → go services
            } else {
              setShowAuthModal(true); // 👈 open modal
            }
          }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <Image
          source={require("../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>

      {/* Services Section */}
      <View style={styles.firstSection}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <Text style={styles.sectionText}>
          We offer AI-powered tools for early detection of Down Syndrome.
        </Text>

        <View style={styles.cardsWrapper}>
          {/* 👇 Recommendation Card with external link */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (user) {
                Linking.openURL("https://www.kdsp.org.pk/"); // 👈 open external site
              } else {
                setShowAuthModal(true); // 👈 ask login first
              }
            }}
          >
            <Text style={styles.cardTitle}>Recommendation</Text>
            <Text style={styles.cardText}>
              Personalized recommendations & support for families.
            </Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Emergency Care</Text>
            <Text style={styles.cardText}>
              24/7 urgent care support for your child and family.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Consulting Doctors</Text>
            <Text style={styles.cardText}>
              Connect with specialists & pediatricians anytime.
            </Text>
          </View>

          {/* 👇 New Games Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (user) {
                router.push("/protected/games"); // 👈 go to games screen
              } else {
                setShowAuthModal(true); // 👈 ask login
              }
            }}
          >
            <Text style={styles.cardTitle}>Games</Text>
            <Text style={styles.cardText}>
              Fun and interactive games for learning & engagement.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Us Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Chrom AI</Text>
        <Text style={styles.sectionText}>
          Chrom AI is committed to empowering families with early detection,
          timely recommendations, and expert consultations for Down Syndrome.
        </Text>
        <Image
          source={require("../assets/images/about.png")}
          style={styles.aboutImage}
        />
      </View>

      {/* Testimonials Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Parents Say</Text>
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialText}>
            "Chrom AI helped us identify early signs and gave us the confidence
            to seek the right care for our child. A true lifesaver!"
          </Text>
          <Text style={styles.testimonialAuthor}>– Ushna Tasleem</Text>
        </View>
        <View style={styles.testimonialCard}>
          <Text style={styles.testimonialText}>
            "The personalized recommendations made everything easier for our
            family. Thank you Chrom AI!"
          </Text>
          <Text style={styles.testimonialAuthor}>– Ali Khan</Text>
        </View>
      </View>

      {/* Call to Action */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>Ready to take the first step?</Text>
        <Text style={styles.ctaText}>
          Book your free consultation with our AI-powered platform today!
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => {
            if (user) {
              router.push("/protected/services"); // 👈 logged in → go services
            } else {
              setShowAuthModal(true); // 👈 open modal
            }
          }}
        >
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Auth Modal */}
      <AuthModal
        visible={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={() => router.push("/protected/services")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Hero
  hero: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "#000" },
  subtitle: { fontSize: 15, textAlign: "center", marginBottom: 15, color: "#555" },
  button: { backgroundColor: "#1E90FF", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  heroImage: { width: "100%", height: 220, marginTop: 20, resizeMode: "contain" },

  // Sections
  section: { paddingHorizontal: 20, marginTop: 40 },
  firstSection: { paddingHorizontal: 20, marginTop: 10 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  sectionText: { fontSize: 14, marginBottom: 20, color: "#555", lineHeight: 20 },

  // Cards
  cardsWrapper: { flexDirection: "column" },
  card: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5, color: "#1E90FF" },
  cardText: { fontSize: 14, color: "#555" },

  // About
  aboutImage: { width: "100%", height: 180, marginTop: 15, borderRadius: 12, resizeMode: "cover" },

  // Testimonials
  testimonialCard: {
    backgroundColor: "#f1f9ff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  testimonialText: { fontSize: 14, fontStyle: "italic", color: "#333" },
  testimonialAuthor: { marginTop: 8, fontSize: 13, fontWeight: "bold", color: "#1E90FF" },

  // Call to Action
  cta: {
    marginTop: 50,
    padding: 25,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    marginHorizontal: 20,
    alignItems: "center",
  },
  ctaTitle: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  ctaText: { fontSize: 14, color: "#f1f1f1", textAlign: "center", marginBottom: 15 },
  ctaButton: { backgroundColor: "#fff", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  ctaButtonText: { color: "#1E90FF", fontWeight: "bold" },
});
