// src/pages/RegisterAndLogin.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => history("/home"))
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => history("/home"))
        .catch((err) => alert(err.code));
    }
  };

  const handleReset = () => history("/reset");

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.tabContainer}>
          <div style={login ? styles.tab : styles.activeTab} onClick={() => setLogin(false)}>SignUp</div>
          <div style={login ? styles.activeTab : styles.tab} onClick={() => setLogin(true)}>SignIn</div>
        </div>
        <h2>{login ? "SignIn" : "SignUp"}</h2>
        <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")} style={styles.form}>
          <input name="email" placeholder="Email" style={styles.input} />
          <input name="password" type="password" placeholder="Password" style={styles.input} />
          <p onClick={handleReset} style={{ cursor: "pointer", color: "blue" }}>Forgot Password?</p>
          <button type="submit" style={styles.button}>{login ? "SignIn" : "SignUp"}</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "350px",
    textAlign: "center",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
    cursor: "pointer",
  },
  tab: {
    padding: "10px 20px",
    color: "#666",
  },
  activeTab: {
    padding: "10px 20px",
    color: "#fff",
    backgroundColor: "#667eea",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#667eea",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RegisterAndLogin;