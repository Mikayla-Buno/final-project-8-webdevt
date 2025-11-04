import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { mockFlights } from "../data/mockData";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [animateHero, setAnimateHero] = useState(false);
  const [animateFeatures, setAnimateFeatures] = useState(false);

  const goToFlight = (origin, destination) => {
    navigate(
      `/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`
    );
  };

  useEffect(() => {
    const heroTimeout = setTimeout(() => setAnimateHero(true), 100); // animate hero
    const featuresTimeout = setTimeout(() => setAnimateFeatures(true), 500); // animate features after hero
    return () => {
      clearTimeout(heroTimeout);
      clearTimeout(featuresTimeout);
    };
  }, []);

  const features = [
    {
      title: "Efficient Booking",
      desc: "Smooth and structured booking process with minimal effort and maximum clarity.",
    },
    {
      title: "Safety & Reliability",
      desc: "Adherence to the highest aviation standards ensuring passenger safety and operational reliability.",
    },
    {
      title: "Professional Service",
      desc: "Expert staff providing courteous, attentive, and consistent service throughout your journey.",
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
            backgroundColor: "rgba(0,0,0,0.75)",
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
                    background: "#F59E0B",
                    color: "#1F2937",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Create Account
                </button>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    border: "2px solid #FFFFFF",
                    color: "#FFFFFF",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.5rem",
                    background: "transparent",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/flights")}
                  style={{
                    background: "#F59E0B",
                    color: "#1F2937",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.5rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Book a Flight
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  style={{
                    border: "2px solid #FFFFFF",
                    color: "#FFFFFF",
                    padding: "1rem 2.5rem",
                    borderRadius: "0.5rem",
                    background: "transparent",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
              style={{
                background: "rgba(0,0,0,0.65)",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                textAlign: "left",
                color: "#E5E7EB",
                opacity: animateFeatures ? 1 : 0,
                transform: animateFeatures ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.8s ease-out ${index * 0.2}s`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: "1.1rem", lineHeight: 1.7 }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Available Flights Section */}
      <section
        style={{
          padding: "4rem 2rem",
          backgroundImage: 'url("/images/Aflights.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "#FFFFFF",
            textShadow: "0 2px 6px rgba(0,0,0,0.6)",
          }}
        >
          Available Flights
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mockFlights.map((flight) => (
            <div
              key={flight.id}
              onClick={() => goToFlight(flight.origin, flight.destination)}
              style={{
                cursor: "pointer",
                borderRadius: "1rem",
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={flight.image}
                alt={`${flight.origin} to ${flight.destination}`}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#FFF",
                  padding: "0.5rem",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                }}
              >
                {flight.origin} → {flight.destination}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
     <section
  style={{
    padding: "6rem 2rem",
    backgroundImage: 'url("/loginregister.png")', // background image from public folder
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
  {/* Optional dark overlay for readability */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent overlay
      zIndex: 0,
      borderRadius: "1rem",
    }}
  />

  <div
    style={{
      maxWidth: "700px",
      width: "100%",
      background: "rgba(255, 255, 255, 0.05)", // subtle card effect
      borderRadius: "1rem",
      padding: "3rem 2rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
      backdropFilter: "blur(10px)",
      transition: "transform 0.3s, box-shadow 0.3s",
      position: "relative", // to stay above overlay
      zIndex: 1,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
    }}
  >
    <h2
      style={{
        fontSize: "3rem",
        fontWeight: 800,
        marginBottom: "1rem",
        letterSpacing: "1px",
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
        background: "#F59E0B",
        color: "#1F2937",
        padding: "1rem 3rem",
        borderRadius: "0.75rem",
        fontWeight: 700,
        border: "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {isAuthenticated ? "Book Your Flight" : "Create Account"}
    </button>
  </div>
</section>


    </div>
  );
};

export default Home;
