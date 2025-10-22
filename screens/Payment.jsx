import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

export default function Payment() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Details</Text>
        <Text style={styles.label}>Moving Help</Text>
        <Text style={styles.subLabel}>Help with moving</Text>
        <Text style={styles.label}>Location</Text>
        <Text style={styles.subLabel}>123 Elm Street, Anytown</Text>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.subLabel}>July 26, 2024</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Worker Details</Text>
        <View style={styles.workerRow}>
          <Image
            source={{ uri: "https://via.placeholder.com/60" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.workerName}>Ethan Carter</Text>
            <Text style={{ color: "#888" }}>4.8 (120 reviews)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <View style={styles.summaryRow}>
          <Text>Amount</Text>
          <Text>$150.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Service Fee</Text>
          <Text>$15.00</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={{ fontWeight: "700" }}>Total</Text>
          <Text style={{ fontWeight: "700" }}>$165.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payBtn}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  label: { fontWeight: "600" },
  subLabel: { color: "#666", marginBottom: 8 },
  workerRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  workerName: { fontSize: 16, fontWeight: "600" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  payBtn: {
    backgroundColor: "#00C853",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
