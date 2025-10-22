import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "./BottomNavBar";

export default function MyJobs() {
  const [tab, setTab] = useState("Active");

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Plumbing Repair",
      desc: "Fixing a leaky faucet",
      image: "https://via.placeholder.com/80",
      status: "Active",
    },
    {
      id: 2,
      title: "Electrical Work",
      desc: "Installing a new light fixture",
      image: "https://via.placeholder.com/80",
      status: "Pending Payment",
    },
    {
      id: 3,
      title: "Gardening",
      desc: "Mowing the lawn and weeding",
      image: "https://via.placeholder.com/80",
      status: "Completed",
    },
  ]);

  const filteredJobs = jobs.filter((job) => job.status === tab);

  const handleMarkCompleted = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Pending Payment" } : job
      )
    );
    Alert.alert("Marked as Completed", "Awaiting payment confirmation.");
  };

  const handlePaymentDone = (id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Completed" } : job))
    );
    Alert.alert("Payment Confirmed", "Job moved to Completed tab.");
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.header}>My Jobs</Text>

        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, tab === "Active" && styles.tabActive]}
            onPress={() => setTab("Active")}
          >
            <Ionicons
              name={tab === "Active" ? "play-circle" : "play-circle-outline"}
              size={26}
              color={tab === "Active" ? "#00C853" : "#777"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, tab === "Completed" && styles.tabActive]}
            onPress={() => setTab("Completed")}
          >
            <Ionicons
              name={
                tab === "Completed"
                  ? "checkmark-done-circle"
                  : "checkmark-done-circle-outline"
              }
              size={26}
              color={tab === "Completed" ? "#00C853" : "#777"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, tab === "Pending Payment" && styles.tabActive]}
            onPress={() => setTab("Pending Payment")}
          >
            <Ionicons
              name={tab === "Pending Payment" ? "time" : "time-outline"}
              size={26}
              color={tab === "Pending Payment" ? "#00C853" : "#777"}
            />
          </TouchableOpacity>
        </View>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <View key={job.id} style={styles.jobCard}>
              <Image source={{ uri: job.image }} style={styles.jobImg} />
              <View style={styles.jobContent}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobDesc}>{job.desc}</Text>

                <Text style={styles.statusText}>Status: {job.status}</Text>

                {job.status === "Active" && (
                  <TouchableOpacity
                    style={styles.markBtn}
                    onPress={() => handleMarkCompleted(job.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.markText}>Mark as Completed ✓</Text>
                  </TouchableOpacity>
                )}

                {job.status === "Pending Payment" && (
                  <TouchableOpacity
                    style={[styles.markBtn, { backgroundColor: "#FFA000" }]}
                    onPress={() => handlePaymentDone(job.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.markText}>Confirm Payment 💰</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(job.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteText}>Remove ❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noJobText}>No {tab} jobs found.</Text>
        )}
      </ScrollView>

      <BottomNavBar active={"MyJobs"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
  },

  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "#E8F5E9",
  },

  jobCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  jobImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  jobContent: {
    flex: 1,
    justifyContent: "center",
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  jobDesc: {
    color: "#666",
    fontSize: 13,
    marginBottom: 4,
  },
  statusText: {
    color: "#00C853",
    fontWeight: "600",
    marginBottom: 6,
    fontSize: 13,
  },

  markBtn: {
    backgroundColor: "#00C853",
    paddingVertical: 7,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 6,
  },
  markText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  deleteBtn: {
    backgroundColor: "#E53935",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  noJobText: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
    fontSize: 15,
  },
});
