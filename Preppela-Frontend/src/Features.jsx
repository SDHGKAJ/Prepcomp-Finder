import { useNavigate } from "react-router-dom";

function Features() {
  const navigate = useNavigate();

  const page = {
    width: "100vw",
    minHeight: "100vh",
    padding: "60px 40px",
    background: "linear-gradient(135deg, #0f0f1f, #1a1a2e)",
    color: "white",
    overflowX: "hidden",
    position: "relative"
  };

  const backBtn = {
    position: "absolute",
    top: "25px",
    right: "35px",
    padding: "10px 18px",
    fontSize: "15px",
    borderRadius: "10px",
    background: "rgba(255, 255, 255, 0.15)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.25)",
    cursor: "pointer",
    transition: "0.3s",
    backdropFilter: "blur(6px)"
  };

  const heading = {
    fontSize: "48px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "50px",
    animation: "fadeDown 1.2s ease",
    letterSpacing: "1px"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "35px",
    padding: "20px"
  };

  const card = {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "18px",
    padding: "35px 25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
    backdropFilter: "blur(15px)",
    transition: "0.35s ease",
    cursor: "pointer"
  };

  const icon = {
    fontSize: "45px",
    marginBottom: "15px",
    display: "block",
    pointerEvents: "none"
  };

  const text = { pointerEvents: "none" };

  return (
    <div style={page}>
      <button
        style={backBtn}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(255,255,255,0.28)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(255,255,255,0.15)";
        }}
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>

      <h1 style={heading}>What Preppela Offers 🚀</h1>

      <div style={grid}>
        <div
          style={card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.55)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          }}
        >
          <span style={icon}>📘</span>
          <h3 style={text}>XSpace</h3>
          <p style={text}>Create collaborative learning rooms & study together.</p>
        </div>

        <div
          style={card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.55)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          }}
        >
          <span style={icon}>📊</span>
          <h3 style={text}>Progress Tracking</h3>
          <p style={text}>Track your goals & see your visual analytics.</p>
        </div>

        <div
          style={card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.55)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          }}
        >
          <span style={icon}>⚙️</span>
          <h3 style={text}>Smart Settings</h3>
          <p style={text}>Customize notifications & study preferences.</p>
        </div>

        <div
          style={card}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-12px)";
            e.currentTarget.style.boxShadow = "0 18px 40px rgba(0,0,0,0.55)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.3)";
          }}
        >
          <span style={icon}>👤</span>
          <h3 style={text}>Student Profiles</h3>
          <p style={text}>View achievements, badges, contributions & more.</p>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default Features;
