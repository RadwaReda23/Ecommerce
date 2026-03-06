// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterAndLogin from "./pages/RegisterAndLogin";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterAndLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/home" element={<h1>Home Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;