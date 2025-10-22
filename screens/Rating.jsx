import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function Rating() {
  const [rating, setRating] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rate your experience</Text>
      <Text style={styles.subHeader}>
        How was your experience?{"\n"}Rate the service you received from the worker.
      </Text>

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <TouchableOpacity key={n} onPress={() => setRating(n)}>
            <Text style={[styles.star, rating >= n && styles.starActive]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tell us more about your experience..."
        multiline
      />

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subHeader: { color: "#666", textAlign: "center", marginBottom: 20 },
  starsRow: { flexDirection: "row", justifyContent: "center", marginBottom: 20 },
  star: { fontSize: 36, color: "#ccc", marginHorizontal: 5 },
  starActive: { color: "#00C853" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    height: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#00C853",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
