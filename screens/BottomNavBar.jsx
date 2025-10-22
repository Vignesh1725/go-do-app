import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../Navigation/RootNavigation";

export default function BottomNavBar({ active }) {
  return (
    <View style={styles.container}>
      <View style={styles.sideTabs}>
        <TouchableOpacity style={styles.tab} onPress={() => navigate("Home")}>
          <Ionicons
            name={active === "Home" ? "home" : "home-outline"}
            size={26}
            color={active === "Home" ? "#2ECC71" : "#A0A0A0"}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab} onPress={() => navigate("MyJobs")}>
          <Ionicons
            name={active === "MyJobs" ? "briefcase" : "briefcase-outline"}
            size={26}
            color={active === "MyJobs" ? "#2ECC71" : "#A0A0A0"}
          />
        </TouchableOpacity>

        <View style={{ width: 70 }} />

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigate("ChatList")}
        >
          <Ionicons
            name={active === "Chat" ? "chatbubbles" : "chatbubbles-outline"}
            size={26}
            color={active === "Chat" ? "#2ECC71" : "#A0A0A0"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigate("Profile")}
        >
          <Ionicons
            name={active === "Profile" ? "person" : "person-outline"}
            size={26}
            color={active === "Profile" ? "#2ECC71" : "#A0A0A0"}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigate("PostJob")}
      >
        <View style={styles.postIconContainer}>
          <Ionicons name="add" size={32} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderTopWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 10,
    backdropFilter: "blur(15px)",
  },
  sideTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
    paddingBottom: 5,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  postButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    zIndex: 20,
  },
  postIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2ECC71",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
