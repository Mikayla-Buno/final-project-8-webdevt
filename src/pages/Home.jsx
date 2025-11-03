import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { mockFlights } from "../data/mockData";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const goToFlight = (origin, destination) => {
    navigate(`/flights?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);
  };

  return (
    <div className="home" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero + Features Section */}
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
        }}
      >
        {/* Hero Text */}
        <div
          style={{
            padding: "3rem 2rem",
            borderRadius: "1rem",
            maxWidth: "700px",
            marginBottom: "3rem",
          }}
        >
          <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem", letterSpacing: "1px" }}>
            Welcome to Ohana Airlines
          </h1>
          <p style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "#E5E7EB" }}>
            Experience premium air travel with utmost safety, comfort, and professionalism. Our expert staff ensures that
            every journey is seamless, secure, and memorable.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  style={{
                    background: "#F59E0B",
                    color: "#1F2937",
                    padding: "0.8rem 2rem",
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
                    padding: "0.8rem 2rem",
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
                    padding: "0.8rem 2rem",
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
                    padding: "0.8rem 2rem",
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

        {/* Features - Formal Layout */}
        <div
          style={{
            maxWidth: "1200px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            width: "100%",
          }}
        >
          {[
            { title: "Efficient Booking", desc: "Smooth and structured booking process with minimal effort and maximum clarity." },
            { title: "Safety & Reliability", desc: "Adherence to the highest aviation standards ensuring passenger safety and operational reliability." },
            { title: "Professional Service", desc: "Expert staff providing courteous, attentive, and consistent service throughout your journey." },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: "rgba(0,0,0,0.65)",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
                textAlign: "left",
                color: "#E5E7EB",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>{feature.title}</h3>
              <p style={{ fontSize: "1rem", lineHeight: 1.7 }}>{feature.desc}</p>
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
            fontSize: "2rem",
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
          background: "#1E3A8A",
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>Ready to Take Off?</h2>
          <p style={{ fontSize: "1.125rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            Join thousands of satisfied travelers and experience the difference with Ohana Airlines.
          </p>
          <button
            onClick={() => navigate(isAuthenticated ? "/flights" : "/register")}
            style={{
              background: "#F59E0B",
              color: "#1F2937",
              padding: "1rem 2rem",
              borderRadius: "0.5rem",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isAuthenticated ? "Book Your Flight" : "Create Account"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
