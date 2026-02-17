import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    school: "",
    subject: "",
    targetScore: ""
  });
  const [status, setStatus] = useState({ loading: false, saved: false, error: "" });

  useEffect(() => {
    // try localStorage first
    try {
      const raw = localStorage.getItem("profile");
      if (raw) {
        const parsed = JSON.parse(raw);
        setForm(prev => ({ ...prev, ...parsed }));
      }
    } catch (e) {}

    // if we have an email (from localStorage or auth), load server profile
    const savedEmail = localStorage.getItem("profileEmail") || (localStorage.getItem("profile") && (() => { try { return JSON.parse(localStorage.getItem("profile")).email; } catch { return ""; }})());
    if (savedEmail) {
      (async () => {
        try {
          const res = await fetch(`${API}/api/profile?email=${encodeURIComponent(savedEmail)}`);
          if (!res.ok) return;
          const data = await res.json();
          setForm({
            name: data.name || "",
            age: data.age || "",
            phone: data.phone || "",
            email: data.email || "",
            school: data.school || "",
            subject: data.subject || "",
            targetScore: data.targetScore || ""
          });
        } catch (err) {
          // ignore load error; user can still edit locally
        }
      })();
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    if (!form.name.trim()) return "Name is required.";
    if (form.age && (isNaN(Number(form.age)) || Number(form.age) <= 0)) return "Enter a valid age.";
    if (form.phone && !/^\+?[\d\s\-]{7,15}$/.test(form.phone)) return "Enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setStatus({ loading: false, saved: false, error: v }); return; }

    setStatus({ loading: true, saved: false, error: "" });

    try {
      const res = await fetch(`${API}/api/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Save failed:", res.status, data);
        throw new Error(data?.message || res.statusText || "Save failed");
      }

      localStorage.setItem("profile", JSON.stringify(form));
      setStatus({ loading: false, saved: true, error: "" });
      setTimeout(() => setStatus(s => ({ ...s, saved: false })), 2200);
    } catch (err) {
      console.error("Network / fetch error:", err);
      setStatus({ loading: false, saved: false, error: err.message || "Network error" });
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#07070a", color: "#eaf2ff", fontFamily: "Inter, system-ui, Arial", padding: 28 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", padding: 22, borderRadius: 12 }}>
        <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 12 }}>
          <div style={{ width: 84, height: 84, borderRadius: 14, background: "linear-gradient(135deg,#4d6bff,#7aa2ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff" }}>
            {form.name ? form.name.trim().charAt(0).toUpperCase() : "P"}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 20 }}>Your profile</h2>
            <div style={{ color: "#9fb0cf", marginTop: 4 }}>Provide a few details to improve matches and suggestions.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name*" style={inputStyle} />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" min="1" style={inputStyle} />

          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (with country code)" type="tel" style={inputStyle} />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" style={inputStyle} />

          <input name="school" value={form.school} onChange={handleChange} placeholder="School / Institution" style={inputStyle} />
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject / Focus (e.g., Physics, Verbal)" style={inputStyle} />

          <input name="targetScore" value={form.targetScore} onChange={handleChange} placeholder="Target score (e.g., 330 for GRE)" style={{ ...inputStyle, gridColumn: "1 / -1" }} />

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
            <button type="submit" style={primaryBtn} disabled={status.loading}>{status.loading ? "Saving..." : "Save profile"}</button>
            <button type="button" style={outlineBtn} onClick={() => { localStorage.removeItem("profile"); setForm({ name: "", age: "", phone: "", email: "", school: "", subject: "", targetScore: "" }); }}>
              Reset
            </button>
            <button type="button" style={outlineBtn} onClick={() => navigate("/")}>Back</button>

            <div style={{ marginLeft: "auto", color: "#9fb0cf" }}>
              {status.error && <span style={{ color: "#ffb4b4" }}>{status.error}</span>}
              {status.saved && <span style={{ color: "#9ff0c3" }}>Saved ✓</span>}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.06)",
  background: "transparent",
  color: "#eaf2ff",
  outline: "none",
  fontSize: 15
};

const primaryBtn = {
  background: "linear-gradient(135deg,#4d6bff,#7aa2ff)",
  color: "#001029",
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  fontWeight: 700,
  cursor: "pointer"
};

const outlineBtn = {
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#cfe3ff",
  padding: "9px 12px",
  borderRadius: 10,
  cursor: "pointer"
};