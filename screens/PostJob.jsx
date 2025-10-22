import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomNavBar from "./BottomNavBar";
import { navigate } from "../Navigation/RootNavigation";

export default function PostJob({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAddress] = useState("");
  const [fileName, setFileName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
    });

    if (result.type === "success") {
      setFileName(result.name);
      Alert.alert("File Uploaded", `Selected: ${result.name}`);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !budget || !address) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }
    Alert.alert("Success", "Job Posted Successfully!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.header}>🧰 Post a New Job</Text>

          <TextInput
            style={styles.input}
            placeholder="Job Title (e.g. Lawn Mowing)"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Describe the job in detail..."
            value={description}
            onChangeText={setDescription}
          />

          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.budgetInput]}
              placeholder="Budget ($)"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
            />
            <TouchableOpacity
              style={styles.dateBtn}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Address / Location"
            value={address}
            onChangeText={setAddress}
          />

          <TouchableOpacity style={styles.uploadBox} onPress={handleUpload}>
            <Text style={styles.uploadText}>
              {fileName ? `📎 ${fileName}` : "📤 Upload Image or Document"}
            </Text>
            <Text style={styles.uploadHint}>Max: 800x400px</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigate("Payment")}
          >
            <Text style={styles.secondaryBtnText}>Proceed to Payment 💳</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Job</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNavBar navigation={navigation} active="PostJob" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    height: 110,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  budgetInput: {
    flex: 0.48,
  },
  dateBtn: {
    height: 50,
    flex: 0.48,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
  dateText: {
    color: "#333",
    fontWeight: "500",
  },
  uploadBox: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
  },
  uploadHint: {
    fontSize: 12,
    color: "#888",
  },
  secondaryBtn: {
    backgroundColor: "#E8F5E9",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 15,
  },
  secondaryBtnText: {
    color: "#00C853",
    fontWeight: "600",
  },
  submitBtn: {
    backgroundColor: "#00C853",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
