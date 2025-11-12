import React from "react";

const AboutUs = () => {
  
  return (
    <div
      className="min-h-screen py-10 px-4"
      style={{
        backgroundImage: `url('images/home.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* About Banner */}
      <div
        className="mb-10 shadow-lg"
        style={{
          borderRadius: "24px",
          padding: "48px 32px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: "1280px",
          margin: "0 auto 40px",
          animation: "fadeSlideDown 0.6s ease-out",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
            fontWeight: "bold",
            marginBottom: "12px",
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          About Ohana Airlines 🏝️
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#ffffff",
            fontWeight: "500",
            textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
            maxWidth: "900px",
          }}
        >
          At Ohana Airlines, we believe every journey should feel like family —
          safe, joyful, and unforgettable. Our mission is to make air travel
          accessible and comfortable for everyone, connecting people and
          destinations with aloha spirit. ✈️
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "32px",
        }}
      >
        <InfoCard
          title="🌺 Our Mission"
          text="To provide a world-class air travel experience built on comfort, safety, and connection. We aim to bring people closer — one flight at a time."
        />
        <InfoCard
          title="🦅 Our Vision"
          text="To be the most trusted and loved airline in the Pacific, recognized for our hospitality, innovation, and sense of family — Ohana."
        />
        
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      > 
        <ValueCard
          title="Safety First ✈️"
        />
        <ValueCard
          title="Customer Satisfaction 🤝"
        />

        <ValueCard
          title="Innovation 💡"
        />  

        <ValueCard
          title="Sustainability 🌱"
        />  
        
      </div>

      {/* Meet the Team Section */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          borderRadius: "24px",
          padding: "48px 32px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          animation: "fadeSlideUp 0.8s ease-out",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "32px",
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          Meet the Team
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
            justifyItems: "center",
          }}
        >
          {[
            { name: "Richmond Arguelles", role: "System Analyst", img: "/images/profile1.jpg" },
            { name: "Mikayla Loera Marie Buno", role: "Lead Developer", img: "/images/profile2.jpg" },
            { name: "Athena Kurtney Brinas", role: "UI/UX Designer", img: "/images/profile3.jpg" },
            { name: "Jed Filip Sayat", role: "UI/UX Designer", img: "/images/profile4.jpg" },
          ].map((member, index) => (
            <div key={index} style={{ textAlign: "center", animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s` }}>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  margin: "0 auto 16px",
                  border: "3px solid rgba(255, 255, 255, 0.6)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#ffffff",
                  marginBottom: "4px",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: "500",
                }}
              >
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ title, text }) => {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "32px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        textAlign: "left",
        color: "#ffffff",
        textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "16px",
          color: "#ffffff",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "15px", lineHeight: "1.6" }}>{text}</p>
    </div>
  );
};

const ValueCard = ({ title, text }) => {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "32px",
        maxWidth: "500px", // limits the width
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        color: "#ffffff",
        textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#ffffff",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "15px", lineHeight: "1.6" }}>{text}</p>
    </div>
  );
};

export default AboutUs;
