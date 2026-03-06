// src/pages/ResetPassword.js
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; // استيراد auth مباشرة
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox/spam.");
      // لو حابة ترجعي للصفحة الرئيسية بعد الإرسال
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setMessage("Email not found");
      } else {
        setMessage(err.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", width: "250px", marginBottom: "10px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;