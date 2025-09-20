import { Ionicons } from "@expo/vector-icons"; // 👈 arrow icon ke liye
import { useRouter } from "expo-router"; // 👈 back navigation ke liye
import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";

const cardItems = ["🍎", "🍎", "🐶", "🐶", "🚗", "🚗", "⭐", "⭐"];

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setCards(shuffleArray(cardItems));
  }, []);

  const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>🧠 Memory Match Game</Text>
      <Text style={styles.moves}>Moves: {moves}</Text>

      {/* Game Grid */}
      <FlatList
        data={cards}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        renderItem={({ item, index }) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <TouchableOpacity
              style={[styles.card, isFlipped && styles.flipped]}
              onPress={() => handleFlip(index)}
            >
              <Text style={[styles.cardText, isFlipped && styles.cardTextFlipped]}>
                {isFlipped ? item : "❓"}
              </Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.grid}
      />

      {matched.length === cards.length && (
        <Text style={styles.winText}>🎉 You Won in {moves} moves!</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 16 },
  backButton: {
    backgroundColor: "#1E90FF",
    padding: 8,
    borderRadius: 10,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", color: "#1E90FF" },
  moves: { fontSize: 16, textAlign: "center", marginVertical: 10, color: "#555" },
  grid: {
    justifyContent: "center",
    paddingVertical: 20,
  },
  card: {
    width: 70,
    height: 90,
    margin: 6,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  flipped: { backgroundColor: "#e6f2ff" },
  cardText: { fontSize: 28, color: "#fff" },
  cardTextFlipped: { color: "#1E90FF" },
  winText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#28a745",
  },
});
