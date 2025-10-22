import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "./BottomNavBar";
import { useUser } from "../context/UserContext";
import { navigate } from "../Navigation/RootNavigation";

export default function Profile() {
  const { user, logout } = useUser();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons
          name="settings-outline"
          size={22}
          color="#000"
          onPress={() => navigate("Settings")}
        />
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>Customer</Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigate("EditProfile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.accountSection}>
        <Text style={styles.sectionTitle}>Account</Text>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigate("MyJobs")}
        >
          <Ionicons name="briefcase-outline" size={22} color="#2ECC71" />
          <Text style={styles.optionText}>View My Jobs</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#999"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={22} color="#2ECC71" />
          <Text style={styles.optionText}>Settings</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#999"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => logout()}>
          <Ionicons name="log-out-outline" size={22} color="#2ECC71" />
          <Text style={styles.optionText}>Logout</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#999"
            style={{ marginLeft: "auto" }}
          />
        </TouchableOpacity>
      </View>

      <BottomNavBar active={"Profile"}></BottomNavBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: "600" },
  role: { color: "#888", marginBottom: 15 },
  editButton: {
    backgroundColor: "#2ECC71",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  editButtonText: { color: "#fff", fontWeight: "600" },
  accountSection: { marginTop: 40 },
  sectionTitle: { fontWeight: "700", fontSize: 16, marginBottom: 15 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});
