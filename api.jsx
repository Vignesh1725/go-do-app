import { Alert } from "react-native";

const API_URL = "http://192.168.43.227:5000/api";

let token = null;
export const setToken = (userToken) => {
  token = userToken;
};

const request = async (endpoint, method = "GET", body = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) {
      Alert.alert("Error in API:", data.error || "Something went wrong");
      return null;
    }
    return data;
  } catch (err) {
    Alert.alert("Error in API:", err.message);
    return null;
  }
};

export default {
  setToken,

  register: (user) => request("/auth/register", "POST", user),
  login: (user) => request("/auth/login", "POST", user),
  getProfile: () => request("/users/me", "GET"),
  updateProfile: (updates) => request("/users/me", "PUT"),
  getAppliedJobs: () => request("/users/me/applied-jobs", "GET"),

  getJobs: () => request("/jobs", "GET"),
  getJobById: (id) => request(`/jobs/${id}`, "GET"),
  postJob: (job) => request("/jobs", "POST", job),
  updateJob: (id, updates) => request(`/jobs/${id}`, "PUT", updates),
  deleteJob: (id) => request(`/jobs/${id}`, "DELETE"),
  applyJob: (id) => request(`/jobs/${id}/apply`, "POST"),
};
