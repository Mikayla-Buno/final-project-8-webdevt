import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const heroTimeout = setTimeout(() => setAnimateHero(true), 100);
    const featuresTimeout = setTimeout(() => setAnimateFeatures(true), 500);
    return () => {
      clearTimeout(heroTimeout);
      clearTimeout(featuresTimeout);
    };
  }, []);

  const features = [
    {
      title: "Efficient Booking",
      desc: "Smooth and structured booking process with minimal effort and maximum clarity.",
      emoji: "✈️",
      gradient: "linear-gradient(135deg, #1E88E5 0%, #A9D6E5 100%)",
      shadow: "0 10px 30px rgba(30, 136, 229, 0.3)",
    },
    {
      title: "Safety & Reliability",
      desc: "Adherence to the highest aviation standards ensuring passenger safety and operational reliability.",
      emoji: "🛡️",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #FAD5A5 100%)",
      shadow: "0 10px 30px rgba(245, 158, 11, 0.3)",
    },
    {
      title: "Professional Service",
      desc: "Expert staff providing courteous, attentive, and consistent service throughout your journey.",
      emoji: "👨‍✈️",
      gradient: "linear-gradient(135deg, #2C3333 0%, #1E88E5 100%)",
      shadow: "0 10px 30px rgba(44, 51, 51, 0.3)",
    },
  ];

  return (
    <div className="home" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          backgroundImage: 'url("/images/home.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          textAlign: "center",
          position: "relative",
          padding: "4rem 2rem",
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
            marginBottom: "3rem",
            opacity: animateHero ? 1 : 0,
            transform: animateHero ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s ease-out",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 700,
              letterSpacing: "1px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            Welcome to Ohana Airlines
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              lineHeight: 1.9,
              color: "#E5E7EB",
              marginTop: "1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            Experience premium air travel with utmost safety, comfort, and professionalism. Our expert staff ensures
            that every journey is seamless, secure, and memorable.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
              marginTop: "2.5rem",
            }}
          >
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #FAD5A5 100%)",
                    color: "#1F2937",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
                    fontSize: "1.05rem",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(245, 158, 11, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(245, 158, 11, 0.4)";
                  }}
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    border: "2px solid #A9D6E5",
                    color: "#FFFFFF",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.75rem",
                    background: "rgba(169, 214, 229, 0.1)",
                    backdropFilter: "blur(10px)",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1.05rem",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.background = "rgba(169, 214, 229, 0.2)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(169, 214, 229, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(169, 214, 229, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/flights")}
                  style={{
                    background: "linear-gradient(135deg, #F59E0B 0%, #FAD5A5 100%)",
                    color: "#1F2937",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.75rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
                    fontSize: "1.05rem",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(245, 158, 11, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(245, 158, 11, 0.4)";
                  }}
                >
                  Book a Flight
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  style={{
                    border: "2px solid #A9D6E5",
                    color: "#FFFFFF",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.75rem",
                    background: "rgba(169, 214, 229, 0.1)",
                    backdropFilter: "blur(10px)",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1.05rem",
                    letterSpacing: "0.5px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.background = "rgba(169, 214, 229, 0.2)";
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(169, 214, 229, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.background = "rgba(169, 214, 229, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Dashboard
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: hoveredCard === index 
                  ? feature.gradient
                  : "rgba(255, 255, 255, 0.08)",
                padding: "2.5rem",
                borderRadius: "1.25rem",
                boxShadow: hoveredCard === index 
                  ? feature.shadow
                  : "0 6px 15px rgba(0,0,0,0.2)",
                textAlign: "left",
                color: "#FFFFFF",
                opacity: animateFeatures ? 1 : 0,
                transform: hoveredCard === index 
                  ? "translateY(-10px) scale(1.02)" 
                  : animateFeatures 
                    ? "translateY(0) scale(1)" 
                    : "translateY(30px) scale(1)",
                transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                border: hoveredCard === index 
                  ? "2px solid rgba(255, 255, 255, 0.3)"
                  : "2px solid transparent",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Emoji Icon with Animation */}
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  display: "inline-block",
                  transform: hoveredCard === index ? "scale(1.2) rotate(10deg)" : "scale(1) rotate(0deg)",
                  transition: "all 0.3s ease",
                }}
              >
                {feature.emoji}
              </div>
              
              {/* Shine Effect on Hover */}
              {hoveredCard === index && (
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "-50%",
                    width: "200%",
                    height: "200%",
                    background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                    animation: "shine 1.5s ease-in-out infinite",
                  }}
                />
              )}
              
              <h3 
                style={{ 
                  fontSize: "1.75rem", 
                  fontWeight: 700, 
                  marginBottom: "0.75rem",
                  color: hoveredCard === index ? "#FFFFFF" : "#E5E7EB",
                  transition: "color 0.3s ease",
                }}
              >
                {feature.title}
              </h3>
              <p 
                style={{ 
                  fontSize: "1.1rem", 
                  lineHeight: 1.7,
                  color: hoveredCard === index ? "#F3F4F6" : "#D1D5DB",
                  transition: "color 0.3s ease",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "6rem 2rem",
          backgroundImage: 'url("/images/loginregister.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#FFFFFF",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Overlay with gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            width: "100%",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(169, 214, 229, 0.05) 100%)",
            border: "2px solid rgba(169, 214, 229, 0.2)",
            borderRadius: "1.5rem",
            padding: "3rem 2rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            backdropFilter: "blur(20px)",
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 25px 70px rgba(0,0,0,0.5)";
            e.currentTarget.style.borderColor = "rgba(169, 214, 229, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.4)";
            e.currentTarget.style.borderColor = "rgba(169, 214, 229, 0.2)";
          }}
        >
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              marginBottom: "1rem",
              letterSpacing: "1px",
              background: "linear-gradient(135deg, #FFFFFF 0%, #A9D6E5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ready to Take Off?
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              lineHeight: 1.7,
              color: "#F3F4F6",
            }}
          >
            Join thousands of satisfied travelers and experience the difference with Ohana Airlines. Book your flights with confidence and enjoy premium service.
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? "/flights" : "/register")}
            style={{
              background: "linear-gradient(135deg, #F59E0B 0%, #FAD5A5 100%)",
              color: "#1F2937",
              padding: "1.25rem 3rem",
              borderRadius: "0.875rem",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              fontSize: "1.15rem",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)",
              letterSpacing: "0.5px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.08)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(245, 158, 11, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(245, 158, 11, 0.4)";
            }}
          >
            {isAuthenticated ? "Book Your Flight" : "Create Account"}
          </button>
        </div>
      </section>

      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;