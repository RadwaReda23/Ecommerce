// app/ForgetPassword.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { auth } from "./firebase";
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    setMessage("");

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      // تحقق من وجود الإيميل
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (methods.length === 0) {
        setMessage("Email not found");
        return;
      }

      // إرسال رابط إعادة تعيين كلمة المرور
      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        "Success",
        "Password reset email sent! Check your inbox (or spam).",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (err) {
      // أي خطأ من Firebase يظهر هنا
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.subtitle}>Enter your email to reset your password</Text>

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#667eea" },
  card: { backgroundColor: "#fff", padding: 30, borderRadius: 15, width: 320 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  subtitle: { textAlign: "center", color: "#666", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: "#667eea", padding: 12, borderRadius: 8, marginTop: 10 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  linkText: { color: "#667eea", textAlign: "center", textDecorationLine: "underline" },
  message: { color: "red", textAlign: "center", marginBottom: 10 },
});