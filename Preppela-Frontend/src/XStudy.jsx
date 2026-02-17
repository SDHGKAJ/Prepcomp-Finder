import React from "react";
import { useNavigate } from "react-router-dom";

const groupsData = [
  { id: 1, title: "GRE Quant Practice", exam: "GRE", mode: "Online", members: 18, next: "Today • 8 PM IST" },
  { id: 2, title: "SAT Math Intensive", exam: "SAT", mode: "Online", members: 24, next: "Sat • 10 AM GMT" },
  { id: 3, title: "MCAT Full-Length Review", exam: "MCAT", mode: "In-person", members: 12, next: "Sun • 3 PM" },
  { id: 4, title: "IIT-JEE Physics Doubt Solving", exam: "IIT-JEE", mode: "Online", members: 32, next: "Weekdays • 7 PM IST" },
  { id: 5, title: "NEET Organic Chem Study Group", exam: "NEET", mode: "In-person", members: 9, next: "Sun • 9 AM" }
];

export default function XStudy() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0d", color: "#e6eefc", fontFamily: "Inter, system-ui, Arial", padding: 24 }}>
      <header style={{ maxWidth: 1100, margin: "0 auto 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => navigate("/")}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#4d6bff,#7aa2ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>P</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Preppela</div>
            <div style={{ fontSize: 12, color: "#9aa7c7" }}>Find study partners • Prep smarter</div>
          </div>
        </div>

        <nav style={{ display: "flex", gap: 16 }}>
          <button style={{ background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }} onClick={() => navigate("/")}>Home</button>
          <button style={{ background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }} onClick={() => navigate("/browse")}>Browse</button>
          <button style={{ background: "transparent", border: 0, color: "#cfe3ff", cursor: "pointer" }} onClick={() => navigate("/create")}>Create</button>
        </nav>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 28 }}>
        <section style={{ background: "#07070a", padding: 22, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
          <h1 style={{ margin: 0, fontSize: 28, lineHeight: 1.02 }}>XStudy — Groups & quick join</h1>
          <p style={{ color: "#9aa7c7", marginTop: 10 }}>View featured groups and quick-create "Group in X study" actions in one place.</p>

          <div style={{ marginTop: 18 }}>
            {groupsData.map(g => (
              <div key={g.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, background: "#0f1724", borderRadius: 10, marginBottom: 12 }}>
                <div style={{ width: 8, height: 40, background: "#4d6bff", borderRadius: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#eaf2ff" }}>{g.title}</div>
                      <div style={{ color: "#9aa7c7", fontSize: 13 }}>{g.exam} • {g.mode} • {g.next}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#9aa7c7", fontSize: 13 }}>{g.members} members</div>
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button onClick={() => navigate(`/group/${g.id}/join`)} style={{ background: "#00b894", border: "none", color: "#051014", padding: "8px 12px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Join</button>
                        <button onClick={() => navigate(`/group/${g.id}`)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#cfe3ff", padding: "7px 10px", borderRadius: 8, cursor: "pointer" }}>Details</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside style={{ background: "#071022", padding: 18, borderRadius: 12, textAlign: "center" }}>
          <div style={{ background: "#0f1724", borderRadius: 10, padding: 12 }}>
            <div style={{
              width: "100%",
              height: 180,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
              background: "linear-gradient(135deg,#0b1220,#071022)"
            }}>
              <div style={{
                width: 96,
                height: 96,
                borderRadius: 12,
                background: "linear-gradient(135deg,#4d6bff,#7aa2ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 28,
                boxShadow: "0 8px 30px rgba(77,107,255,0.12)"
              }}>P</div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ color: "#eaf2ff" }}>Featured groups</strong>
            <button onClick={() => navigate("/browse")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#cfe3ff", padding: "6px 10px", borderRadius: 8 }}>See all</button>
          </div>

          <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
            {groupsData.slice(0, 3).map(g => (
              <div key={g.id} style={{ background: "#0b1320", padding: 12, borderRadius: 10, textAlign: "left" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#eaf2ff" }}>{g.title}</div>
                    <div style={{ color: "#9aa7c7", fontSize: 13 }}>{g.exam} • {g.mode}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button onClick={() => navigate(`/group/${g.id}/join`)} style={{ background: "#00b894", border: "none", padding: "6px 10px", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Join</button>
                    <button onClick={() => navigate(`/group/${g.id}`)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "#cfe3ff", padding: "6px 10px", borderRadius: 8 }}>Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}