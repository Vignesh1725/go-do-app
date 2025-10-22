import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import BottomNavBar from "./BottomNavBar";
import { useUser } from "../context/UserContext";

const screenWidth = Dimensions.get("window").width;

const categories = [
  { title: "All", emoji: "📋" },
  { title: "Cleaning", emoji: "🧹" },
  { title: "Decoration", emoji: "🎨" },
  { title: "Gardening", emoji: "🌿" },
  { title: "Electrician", emoji: "⚡" },
  { title: "Plumbing", emoji: "🚿" },
  { title: "Others", emoji: "➕" },
];

const sampleJobs = [
  {
    id: 1,
    title: "Home Cleaning",
    category: "Cleaning",
    location: "New York",
    salary: "$50",
    featured: true,
  },
  {
    id: 2,
    title: "Garden Maintenance",
    category: "Gardening",
    location: "Los Angeles",
    salary: "$40",
    featured: false,
  },
  {
    id: 3,
    title: "Birthday Decoration",
    category: "Decoration",
    location: "Chicago",
    salary: "$100",
    featured: true,
  },
  {
    id: 4,
    title: "Plumbing Repair",
    category: "Plumbing",
    location: "Houston",
    salary: "$60",
    featured: false,
  },
  {
    id: 5,
    title: "Electric Wiring",
    category: "Electrician",
    location: "Miami",
    salary: "$70",
    featured: true,
  },
];

export default function Home() {
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(sampleJobs);

  const handleSearch = (text) => {
    setSearch(text);
    const filtered = sampleJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(text.toLowerCase()) ||
        job.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleCategoryPress = (category) => {
    if (category === "All") {
      setFilteredJobs(sampleJobs);
      return;
    }
    const filtered = sampleJobs.filter((job) => job.category === category);
    setFilteredJobs(filtered);
  };

  const featuredJobs = sampleJobs.filter((job) => job.featured);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.header}>Hello {user?.name},</Text>
          <Text style={styles.subHeader}>What do you need today?</Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Search for a service or category..."
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#888"
        />

        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryContainer}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryBox}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(cat.title)}
            >
              <Text style={styles.emoji}>{cat.emoji}</Text>
              <Text style={styles.catText}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {featuredJobs.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>⭐ Featured Jobs</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 20 }}
            >
              {featuredJobs.map((job) => (
                <TouchableOpacity
                  key={job.id}
                  style={styles.jobCard}
                  activeOpacity={0.8}
                >
                  <Text style={styles.jobTitle}>{job.title}</Text>
                  <Text style={styles.jobSub}>{job.category}</Text>
                  <Text style={styles.jobSub}>
                    {job.location} • {job.salary}
                  </Text>
                  <View style={styles.applyBtn}>
                    <Text style={styles.applyText}>Apply</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        <Text style={styles.sectionTitle}>🕒 Recent Jobs</Text>
        <FlatList
          data={filteredJobs}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.jobCard} activeOpacity={0.8}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobSub}>{item.category}</Text>
              <Text style={styles.jobSub}>
                {item.location} • {item.salary}
              </Text>
              <View style={styles.applyBtn}>
                <Text style={styles.applyText}>Apply</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      <BottomNavBar active={"Home"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: { fontSize: 24, fontWeight: "bold", color: "#333" },
  subHeader: { fontSize: 18, color: "#555", marginTop: 4 },
  search: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  categoryContainer: { paddingBottom: 15 },
  categoryBox: {
    width: 100,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  emoji: { fontSize: 32, lineHeight: 36, marginBottom: 6 },
  catText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
    color: "#444",
  },
  jobCard: {
    width: screenWidth - 60,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 4,
  },
  jobTitle: { fontSize: 16, fontWeight: "700", color: "#222" },
  jobSub: { fontSize: 14, color: "#666", marginVertical: 2 },
  applyBtn: {
    backgroundColor: "#00C853",
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00C853",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  applyText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
