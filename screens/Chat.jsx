import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "./BottomNavBar";

export default function Chat({ route }) {
  const userName = route?.params?.userName || "Unknown User";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! This is ${userName}`,
      sender: "other",
      time: "10:00 AM",
    },
    {
      id: 2,
      text: `Good morning bro!`,
      sender: "me",
      time: "10:10 AM",
    },
    {
      id: 3,
      text: `What's going on bro?`,
      sender: "other",
      time: "10:15 AM",
    },
    {
      id: 4,
      text: "Nothing much, just working on a project. You?",
      sender: "me",
      time: "10:18 AM",
    },
    {
      id: 5,
      text: "Same here, finishing some frontend tasks.",
      sender: "other",
      time: "10:20 AM",
    },
    {
      id: 6,
      text: "Nice! Using React Native, right?",
      sender: "me",
      time: "10:21 AM",
    },
    {
      id: 7,
      text: "Yep! Trying to fix the keyboard issue 😅",
      sender: "other",
      time: "10:22 AM",
    },
    {
      id: 8,
      text: "Haha same problem here. It hides my input field sometimes.",
      sender: "me",
      time: "10:23 AM",
    },
    {
      id: 9,
      text: "Exactly! Especially on Android devices.",
      sender: "other",
      time: "10:24 AM",
    },
    {
      id: 10,
      text: "I heard setting adjustResize helps fix that.",
      sender: "me",
      time: "10:25 AM",
    },
    {
      id: 11,
      text: "Yeah, and wrapping the chat in KeyboardAvoidingView too.",
      sender: "other",
      time: "10:26 AM",
    },
    {
      id: 12,
      text: "Cool. Let’s test that after lunch!",
      sender: "me",
      time: "10:27 AM",
    },
    {
      id: 13,
      text: "Sure bro. Catch you later 👋",
      sender: "other",
      time: "10:28 AM",
    },
    {
      id: 14,
      text: "Bye!",
      sender: "me",
      time: "10:29 AM",
    },
  ]);

  const scrollRef = useRef();

  const handleSend = () => {
    if (!message.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === "me" ? styles.messageRowRight : styles.messageRowLeft,
      ]}
    >
      {item.sender === "other" && (
        <View style={styles.avatarLeft}>
          <Text style={styles.avatarText}>{userName[0]}</Text>
        </View>
      )}
      <View
        style={[
          styles.bubble,
          item.sender === "me" ? styles.bubbleRight : styles.bubbleLeft,
        ]}
      >
        <Text
          style={
            item.sender === "me"
              ? styles.bubbleTextRight
              : styles.bubbleTextLeft
          }
        >
          {item.text}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {item.sender === "me" && (
        <View style={styles.avatarRight}>
          <Text style={styles.avatarText}>Y</Text>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <View style={styles.headerRow}>
        <Text style={styles.header}>{userName}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="call-outline" size={24} color="#00C853" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="videocam-outline" size={24} color="#00C853" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#00C853"
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={scrollRef}
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 15, paddingBottom: 0 }}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.attachBtn}>
          <Ionicons name="attach-outline" size={22} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : 25,
  },
  header: {
    paddingTop: 10,
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  iconBtn: { marginLeft: 15 },

  messageRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  messageRowLeft: { justifyContent: "flex-start" },
  messageRowRight: { justifyContent: "flex-end" },
  avatarLeft: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#00C853",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarRight: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  avatarText: { color: "#fff", fontWeight: "700" },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    maxWidth: "70%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  bubbleLeft: { backgroundColor: "#fff", borderTopLeftRadius: 0 },
  bubbleRight: { backgroundColor: "#00C853", borderTopRightRadius: 0 },
  bubbleTextLeft: { color: "#333", fontSize: 15 },
  bubbleTextRight: { color: "#fff", fontSize: 15 },
  timeText: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
  },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  attachBtn: {
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    backgroundColor: "#F2F2F2",
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: "#00C853",
    width: 45,
    height: 45,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});
