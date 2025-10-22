import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { navigate } from "../Navigation/RootNavigation";

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🎧</Text>
      <Text style={styles.title}>HelpLink</Text>
      <Text style={styles.subtitle}>Get help or offer help near you.</Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigate("Login")}
      >
        <Text style={styles.primaryText}>I Need Help</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryBtn}
        onPress={() => navigate("Login")}
      >
        <Text style={styles.secondaryText}>I Can Help</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Login</Text>
        <Text style={styles.footerText}>Register</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  logo: { fontSize: 60, marginBottom: 10 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 14, color: "#777", marginBottom: 40 },
  primaryBtn: {
    backgroundColor: "#00C853",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  secondaryBtn: {
    backgroundColor: "#DFFFD9",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryText: { color: "#00C853", fontWeight: "600", fontSize: 16 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 60,
  },
  footerText: { fontSize: 14, color: "#777" },
});
