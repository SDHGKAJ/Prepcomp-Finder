import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filterExam, setFilterExam] = useState("");
  const [mode, setMode] = useState("");

  const groupsData = [
    { id: 1, title: "GRE Quant Practice", exam: "GRE", mode: "Online", members: 18, next: "Today • 8 PM IST" },
    { id: 2, title: "SAT Math Intensive", exam: "SAT", mode: "Online", members: 24, next: "Sat • 10 AM GMT" },
    { id: 3, title: "MCAT Full-Length Review", exam: "MCAT", mode: "In-person", members: 12, next: "Sun • 3 PM" },
    { id: 4, title: "IIT-JEE Physics Doubt Solving", exam: "IIT-JEE", mode: "Online", members: 32, next: "Weekdays • 7 PM IST" },
    { id: 5, title: "NEET Organic Chem Study Group", exam: "NEET", mode: "In-person", members: 9, next: "Sun • 9 AM" }
  ];

  const exams = useMemo(() => ["All", ...Array.from(new Set(groupsData.map(g => g.exam)))], [groupsData]);
  const modes = ["Any", "Online", "In-person"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupsData.filter(g => {
      if (q && !(g.title.toLowerCase().includes(q) || g.exam.toLowerCase().includes(q))) return false;
      if (filterExam && filterExam !== "All" && g.exam !== filterExam) return false;
      if (mode && mode !== "Any" && g.mode !== mode) return false;
      return true;
    });
  }, [query, filterExam, mode, groupsData]);

  return (
    <div style={{ minHeight: "100vh", background: "#07070a", color: "#eaf2ff", fontFamily: "Inter, system-ui, Arial" }}>
      <style>{`
        /* new fixed navbar */
        .pp-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          background: linear-gradient(180deg, rgba(11,18,51,0.98), rgba(11,18,51,0.95));
          z-index: 1100;
          box-shadow: 0 6px 30px rgba(0,0,0,0.6);
        }
        .pp-navbar .inner { max-width:1100px; width:100%; display:flex; justify-content:space-between; align-items:center; }
        .pp-navbar .brand { display:flex; align-items:center; gap:12px; cursor:pointer; }
        .pp-navbar .logo { width:44px; height:44px; border-radius:10px; background:linear-gradient(135deg,#4d6bff,#7aa2ff); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; }
        .pp-navbar .nav { display:flex; gap:18px; align-items:center; }
        .pp-navbar .nav a { color:#cfe3ff; text-decoration:none; cursor:pointer; font-weight:600; }

        /* account for fixed nav: push page content down */
        .wrap {
          max-width:1100px;
          margin: 24px auto 0;
          padding: 18px;
          padding-top: 110px; /* ensures hero sits below navbar (72px nav + 38px gap) */
        }

        /* optionally add extra gap above hero as well */
        .hero {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          padding: 26px;
          border-radius: 14px;
          margin-top: 40px; /* increase this if you want even more space */
          box-shadow: 0 18px 40px rgba(2,6,23,0.6);
        }

        .header { display:flex; justify-content:space-between; align-items:center; }
        .brand { display:flex; gap:12px; align-items:center; cursor:pointer; }
        .logo { width:44px; height:44px; border-radius:10px; background:linear-gradient(135deg,#4d6bff,#7aa2ff); display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; }
        .nav { display:flex; gap:14px; }
        .nav a { color:#cfe3ff; cursor:pointer; text-decoration:none; font-weight:600; }

        .hero h1 { margin:0; font-size:1.9rem; color:#f8fbff; }
        .hero p { margin-top:8px; color:#b7c7de; }

        .searchRow { display:flex; gap:10px; margin-top:14px; flex-wrap:wrap; align-items:center; }
        .input, .select { padding:10px 12px; border-radius:10px; border:1px solid rgba(255,255,255,0.04); background:transparent; color:#eaf2ff; }
        .input { flex:1 1 280px; min-width:180px; }
        .btnPrimary { background:linear-gradient(135deg,#4d6bff,#7aa2ff); color:#001029; padding:10px 14px; border-radius:10px; border:none; font-weight:700; cursor:pointer; }

        .features { margin-top:20px; display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        @media (max-width:900px) { .features { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:600px) { .features { grid-template-columns:1fr; } }

        .feature { background:transparent; border-radius:10px; padding:12px; border:1px solid rgba(255,255,255,0.02); display:flex; gap:12px; align-items:center; }
        .icon { width:44px; height:44px; border-radius:8px; background:linear-gradient(135deg,#2dd4bf,#4d6bff); display:flex; align-items:center; justify-content:center; color:#001029; font-weight:800; }
        .ft-title { font-weight:700; color:#eaf2ff; }
        .ft-desc { color:#b7c7de; font-size:0.95rem; }

        .featured { margin-top:18px; }
        .groupRow { display:flex; gap:10px; overflow:auto; padding-bottom:6px; }
        .groupCard { min-width:220px; background:linear-gradient(180deg,#071022,#06101a); padding:12px; border-radius:10px; border:1px solid rgba(255,255,255,0.03); }
        .groupTitle { font-weight:800; color:#eaf2ff; margin-bottom:6px; }
        .footer { margin-top:26px; text-align:center; color:#9fb0cf; padding-bottom:24px; }
      `}</style>

      {/* fixed navbar at top */}
      <header className="pp-navbar" role="banner">
        <div className="inner">
          <div className="brand" onClick={() => navigate("/") } aria-label="Preppela home">
            <div className="logo">P</div>
            <div>
              <div style={{ fontWeight:800, color:"#eaf2ff" }}>Preppela</div>
              <div style={{ fontSize:12, color:"#9fb0cf" }}>Find study partners • Prep smarter</div>
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
          <section className="hero">
            <h1>Connect. Study. Succeed.</h1>
            <p>Simple, focused collaboration for prep exams — find groups, create sessions, and join live study events.</p>

            <div className="searchRow" role="search">
              <input className="input" placeholder="Search exam, subject or topic (e.g., GRE Quant)" value={query} onChange={e => setQuery(e.target.value)} />
              <select className="select" value={filterExam} onChange={e => setFilterExam(e.target.value)}>
                {exams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
              </select>
              <select className="select" value={mode} onChange={e => setMode(e.target.value)}>
                {modes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <button className="btnPrimary" onClick={() => { /* live filter already applies */ }}>Find</button>
            </div>

            <div style={{ marginTop: 18 }}>
              <small style={{ color:"#9fb0cf" }}>Core features — quick overview</small>
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

          <section className="featured">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16 }}>
              <strong style={{ color:"#eaf2ff" }}>Featured groups</strong>
              <button onClick={() => navigate("/browse")} style={{ background:"transparent", border:"1px solid rgba(255,255,255,0.04)", color:"#cfe3ff", borderRadius:8, padding:"6px 10px", cursor:"pointer" }}>See all</button>
            </div>

            <div className="groupRow" aria-label="Featured groups list" style={{ marginTop:12 }}>
              {filtered.slice(0,5).map(g => (
                <div key={g.id} className="groupCard" onClick={() => navigate(`/group/${g.id}`)}>
                  <div className="groupTitle">{g.title}</div>
                  <div style={{ color:"#9fb0cf", fontSize:13 }}>{g.exam} • {g.mode}</div>
                  <div style={{ marginTop:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ color:"#9fb0cf", fontSize:13 }}>{g.members} members</div>
                    <button onClick={(e)=>{ e.stopPropagation(); navigate(`/group/${g.id}/join`); }} style={{ background:"#00b894", border:"none", padding:"6px 10px", borderRadius:8, fontWeight:700, cursor:"pointer" }}>Join</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="footer">
          © {new Date().getFullYear()} Preppela — Simple collaboration for prep exams.
        </div>
      </div>
    </div>
  );
}

export default Home;
