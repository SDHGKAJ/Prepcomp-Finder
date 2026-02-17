import "./App.css";
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Features from "./Features";
import Profile from "./Profile"; // <-- added import

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <nav className="navbar">
        <h2 className="logo">Preppela</h2>
        <button className="btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </nav>

      <section className="hero">
        <h1>Collaborate. Learn. Grow.</h1>
        <p>
          The complete student ecosystem for studying together, sharing notes,
          asking doubts, and finding tutors.
        </p>
        <button className="start-btn" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <h3>Find Study Partners</h3>
          <p>Match with students preparing for the same exam or subject.</p>
        </div>

        <div className="feature-card">
          <h3>Study Rooms</h3>
          <p>Join or create real-time group study rooms with chat and focus timers.</p>
        </div>

        <div className="feature-card">
          <h3>Share Notes</h3>
          <p>Upload and access notes from students across various subjects.</p>
        </div>

        <div className="feature-card">
          <h3>Ask Questions</h3>
          <p>Post doubts and get answers from peers or tutors instantly.</p>
        </div>

        <div className="feature-card">
          <h3>Find Tutors</h3>
          <p>Book free or paid tutors based on subject expertise.</p>
        </div>

        <div className="feature-card">
          <h3>Post Requests</h3>
          <p>Ask for help, study groups, past papers, or practice questions.</p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Preppela. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />  {/* <-- profile route */}
      <Route path="/features" element={<Features />} />
    </Routes>
  );
}

export default App;
