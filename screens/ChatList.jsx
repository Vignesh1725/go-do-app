import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { navigate } from "../Navigation/RootNavigation";
import BottomNavBar from "./BottomNavBar";

const chats = [
  { id: 1, name: "Alice", lastMessage: "See you soon!", time: "10:45 AM" },
  { id: 2, name: "Bob", lastMessage: "Okay, I’m coming!", time: "9:30 AM" },
  {
    id: 3,
    name: "Charlie",
    lastMessage: "Thanks for helping me!",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "David",
    lastMessage: "Let’s start the job tomorrow.",
    time: "Yesterday",
  },
];

export default function ChatList() {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatRow}
      activeOpacity={0.7}
      onPress={() => navigate("Chat", { userName: item.name })}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <BottomNavBar active={"Home"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  chatRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#00C853",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
    color: "#222",
  },
  lastMessage: {
    color: "#777",
    fontSize: 14,
  },
  time: {
    color: "#999",
    fontSize: 12,
  },
});
