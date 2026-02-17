import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filterExam, setFilterExam] = useState("All");
  const [mode, setMode] = useState("All");

  // Mock data
  const exams = ["All", "GRE", "GMAT", "SAT", "ACT", "LSAT"];
  const modes = ["All", "Online", "Offline", "Hybrid"];
  
  const mockGroups = [
    { id: 1, title: "GRE Quant Prep", exam: "GRE", mode: "Online", members: 24 },
    { id: 2, title: "GMAT Data Insights", exam: "GMAT", mode: "Hybrid", members: 18 },
    { id: 3, title: "SAT Reading Group", exam: "SAT", mode: "Online", members: 32 },
    { id: 4, title: "ACT Science Masters", exam: "ACT", mode: "Offline", members: 15 },
    { id: 5, title: "LSAT Logic Games", exam: "LSAT", mode: "Online", members: 28 },
    { id: 6, title: "GRE Verbal Clinic", exam: "GRE", mode: "Online", members: 22 },
  ];

  const filtered = useMemo(() => {
    return mockGroups.filter(g => {
      const matchExam = filterExam === "All" || g.exam === filterExam;
      const matchMode = mode === "All" || g.mode === mode;
      const matchQuery = query === "" || g.title.toLowerCase().includes(query.toLowerCase());
      return matchExam && matchMode && matchQuery;
    });
  }, [query, filterExam, mode]);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a23,#23235b 80%)", color: "#eaf2ff", fontFamily: "Inter, system-ui, Arial" }}>
      <style>{`
        body { margin: 0; padding: 0; }
        .pp-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(10, 10, 35, 0.92);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px 0;
          z-index: 1000;
        }
        .pp-navbar .inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pp-navbar .brand {
          display: flex;
          gap: 12px;
          align-items: center;
          cursor: pointer;
        }
        .pp-navbar .logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #4d6bff, #2dd4bf);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: #001029;
          font-size: 1.2rem;
        }
        .pp-navbar .nav {
          display: flex;
          gap: 20px;
        }
        .pp-navbar a {
          cursor: pointer;
          color: #b7c7de;
          text-decoration: none;
          transition: color 0.2s;
          font-weight: 500;
        }
        .pp-navbar a:hover {
          color: #eaf2ff;
        }
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 24px;
          margin-top: 60px;
        }
        .hero {
          background: linear-gradient(120deg, #23235b 60%, #2dd4bf 100%);
          padding: 40px;
          border-radius: 18px;
          margin-top: 20px;
          box-shadow: 0 18px 40px rgba(2, 6, 23, 0.6);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero h1 {
          font-size: 2.4rem;
          font-weight: 900;
          color: #fff;
          margin: 0 0 8px 0;
          letter-spacing: 1px;
        }
        .hero p {
          color: #b7c7de;
          font-size: 1.1rem;
          margin: 0 0 18px 0;
          max-width: 600px;
        }
        .searchRow {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          max-width: 700px;
        }
        .input, .select {
          padding: 12px 16px;
          border-radius: 12px;
          border: none;
          background: #18182f;
          color: #eaf2ff;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .input { flex: 1 1 220px; min-width: 180px; }
        .input::placeholder { color: #6b7a99; }
        .btnPrimary {
          background: linear-gradient(135deg, #4d6bff, #2dd4bf);
          color: #fff;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btnPrimary:hover {
          background: linear-gradient(135deg, #2dd4bf, #4d6bff);
        }
        .features {
          margin-top: 24px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }
        .feature {
          background: #18182f;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          display: flex;
          gap: 16px;
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .feature:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 8px 24px rgba(45, 212, 191, 0.18);
        }
        .icon {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: linear-gradient(135deg, #2dd4bf, #4d6bff);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #001029;
          font-size: 1.7rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .ft-title { font-weight: 700; color: #eaf2ff; font-size: 1.1rem; margin: 0; }
        .ft-desc { color: #b7c7de; font-size: 1rem; margin: 0; }
        .featured {
          margin-top: 40px;
        }
        .groupRow {
          display: flex;
          gap: 18px;
          overflow-x: auto;
          padding-bottom: 8px;
          margin-top: 18px;
        }
        .groupCard {
          min-width: 260px;
          background: linear-gradient(120deg, #23235b 60%, #2dd4bf 100%);
          padding: 18px;
          border-radius: 14px;
          box-shadow: 0 4px 16px rgba(45, 212, 191, 0.12);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .groupCard:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 8px 24px rgba(45, 212, 191, 0.18);
        }
        .groupTitle { font-weight: 800; color: #fff; margin: 0 0 8px 0; font-size: 1.15rem; }
        .groupMeta { color: #9fb0cf; font-size: 14px; margin: 0; }
        .groupInfo { margin-top: 14px; display: flex; justify-content: space-between; align-items: center; }
        .footer { margin-top: 40px; text-align: center; color: #9fb0cf; padding-bottom: 24px; font-size: 1rem; }
      `}</style>

      {/* Navbar */}
      <header className="pp-navbar" role="banner">
        <div className="inner">
          <div className="brand" onClick={() => navigate("/")} aria-label="Preppela home">
            <div className="logo">P</div>
            <div>
              <div style={{ fontWeight: 800, color: "#eaf2ff" }}>Preppela</div>
              <div style={{ fontSize: 12, color: "#9fb0cf" }}>Find study partners • Prep smarter</div>
            </div>
          </div>

          <nav className="nav" aria-label="Main navigation">
            <a onClick={() => navigate("/")}>Home</a>
            <a onClick={() => navigate("/browse")}>Browse</a>
            <a onClick={() => navigate("/create")}>Create</a>
            <a onClick={() => navigate("/profile")}>Profile</a>
            <a onClick={() => navigate("/xstudy")}>XStudy</a>
          </nav>
        </div>
      </header>

      <div className="wrap">
        <main>
          {/* Hero Section */}
          <section className="hero">
            <h1>Connect. Study. Succeed.</h1>
            <p>Simple, focused collaboration for prep exams — find groups, create sessions, and join live study events.</p>

            <div className="searchRow" role="search">
              <input
                className="input"
                placeholder="Search exam, subject or topic (e.g., GRE Quant)"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <select
                className="select"
                value={filterExam}
                onChange={e => setFilterExam(e.target.value)}
              >
                {exams.map(ex => (
                  <option key={ex} value={ex}>{ex}</option>
                ))}
              </select>
              <select
                className="select"
                value={mode}
                onChange={e => setMode(e.target.value)}
              >
                {modes.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <button className="btnPrimary">Find</button>
            </div>

            {/* Features */}
            <div style={{ marginTop: 24, width: "100%", maxWidth: 900 }}>
              <small style={{ color: "#9fb0cf", display: "block", marginBottom: 16 }}>Core features — quick overview</small>
              <div className="features" aria-label="Core features">
                <div className="feature">
                  <div className="icon">🔍</div>
                  <div>
                    <div className="ft-title">Find groups</div>
                    <div className="ft-desc">Search by exam, subject or level.</div>
                  </div>
                </div>
                <div className="feature">
                  <div className="icon">⚡</div>
                  <div>
                    <div className="ft-title">Quick match</div>
                    <div className="ft-desc">Auto-match with suitable study partners.</div>
                  </div>
                </div>
                <div className="feature">
                  <div className="icon">＋</div>
                  <div>
                    <div className="ft-title">Create group</div>
                    <div className="ft-desc">Start public or private sessions in seconds.</div>
                  </div>
                </div>
                <div className="feature">
                  <div className="icon">🗓️</div>
                  <div>
                    <div className="ft-title">Schedule</div>
                    <div className="ft-desc">Calendar slots and reminders for live sessions.</div>
                  </div>
                </div>
                <div className="feature">
                  <div className="icon">💬</div>
                  <div>
                    <div className="ft-title">Chat & resources</div>
                    <div className="ft-desc">Group chat and shared notes/files.</div>
                  </div>
                </div>
                <div className="feature">
                  <div className="icon">📈</div>
                  <div>
                    <div className="ft-title">Progress</div>
                    <div className="ft-desc">Track attendance and study streaks.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Groups */}
          <section className="featured">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ color: "#eaf2ff", fontSize: "1.2rem" }}>Featured groups</strong>
              <button
                onClick={() => navigate("/browse")}
                style={{
                  background: "linear-gradient(135deg, #4d6bff, #2dd4bf)",
                  border: "none",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "1rem"
                }}
              >
                See all
              </button>
            </div>

            <div className="groupRow" aria-label="Featured groups list">
              {filtered.slice(0, 5).map(g => (
                <div key={g.id} className="groupCard" onClick={() => navigate(`/group/${g.id}`)}>
                  <div className="groupTitle">{g.title}</div>
                  <div className="groupMeta">{g.exam} • {g.mode}</div>
                  <div className="groupInfo">
                    <div className="groupMeta">{g.members} members</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/group/${g.id}/join`);
                      }}
                      style={{
                        background: "linear-gradient(135deg, #2dd4bf, #4d6bff)",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: 8,
                        fontWeight: 700,
                        cursor: "pointer",
                        color: "#fff",
                        fontSize: "1rem"
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <div className="footer">
          © {new Date().getFullYear()} Preppela — Simple collaboration for prep exams.
        </div>
      </div>
    </div>
  );
}

export default Home;
