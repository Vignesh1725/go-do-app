import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import api from "../api";
import SecureStorage from "../secureStorage";
import { useUser } from "../context/UserContext";
import { navigate } from "../Navigation/RootNavigation";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  // const [role, setRole] = useState("Customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { saveUser } = useUser();

  const handleAuth = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter your name, email and password");
    }

    try {
      if (isLogin) {
        const data = await api.login({ email, password });

        if (data?.token) {
          const userData = {
            token: data?.token,
            name: data.user?.name,
            email: data.user?.email,
          };
          saveUser(userData);

          api.setToken(data.token);
          Alert.alert("Success", "Login successfully");
          navigate("Home");
        }
      } else {
        if (!name) {
          return Alert.alert(
            "Error",
            "Please enter your name, email and password"
          );
        }
        const data = await api.register({ name, email, password });
        if (data?.user.email) {
          Alert.alert("Success", "Registration successful! Please login.");
          setIsLogin(true);
        }
      }
    } catch (err) {
      Alert.alert("Error: ", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GoDo</Text>

      <View style={styles.toggleRow}>
        <TouchableOpacity onPress={() => setIsLogin(true)}>
          <Text style={[styles.toggleText, isLogin && styles.activeTab]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsLogin(false)}>
          <Text style={[styles.toggleText, !isLogin && styles.activeTab]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* <Text style={styles.label}>I am a...</Text>
      <View style={styles.roleRow}>
        <TouchableOpacity
          style={[styles.roleBtn, role === "Customer" && styles.roleSelected]}
          onPress={() => setRole("Customer")}
        >
          <Text style={styles.roleText}>Customer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleBtn, role === "Worker" && styles.roleSelected]}
          onPress={() => setRole("Worker")}
        >
          <Text style={styles.roleText}>Worker</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.primaryBtn} onPress={handleAuth}>
        <Text style={styles.primaryText}>{isLogin ? "Login" : "Sign Up"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={{ fontWeight: "500" }}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.policyText}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  toggleText: { fontSize: 16, marginHorizontal: 20, color: "#777" },
  activeTab: { color: "#00C853", borderBottomWidth: 2, borderColor: "#00C853" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  label: { marginTop: 10, marginBottom: 5, fontWeight: "500" },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  roleBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "40%",
    alignItems: "center",
  },
  roleSelected: { borderColor: "#00C853", backgroundColor: "#E8FEEB" },
  roleText: { color: "#000" },
  primaryBtn: {
    backgroundColor: "#00C853",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  primaryText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  googleBtn: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  policyText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    marginTop: 20,
  },
});
