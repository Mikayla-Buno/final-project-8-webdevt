import React, { useState } from "react";

const AboutUs = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 16px",
        backgroundImage: `url('/images/home.jpg')`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        margin: "-8px",
        paddingTop: "48px",
        paddingBottom: "48px",
      }}
    >
      {/* Hero Banner */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
          borderRadius: "24px",
          padding: "64px 48px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          animation: "fadeSlideDown 0.6s ease-out",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(255, 107, 53, 0.2) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: "800",
            marginBottom: "24px",
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <span>🏝️</span>
          About Ohana Airlines
        </h1>
        <p
          style={{
            fontSize: "20px",
            color: "#ffffff",
            fontWeight: "500",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            lineHeight: "1.8",
            maxWidth: "900px",
            marginBottom: "32px",
          }}
        >
          At Ohana Airlines, we believe every journey should feel like family — safe, joyful, and unforgettable. 
          Our mission is to make air travel accessible and comfortable for everyone, connecting people and 
          destinations with the true spirit of aloha.
        </p>
        <div
          style={{
            display: "flex",
            gap: "48px",
            flexWrap: "wrap",
            marginTop: "32px",
          }}
        >
          <StatBadge number="10+" label="Years of Service" />
          <StatBadge number="500K+" label="Happy Travelers" />
          <StatBadge number="50+" label="Destinations" />
          <StatBadge number="98%" label="Safety Rating" />
        </div>
      </div>

      {/* Mission and Vision */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
        }}
      >
        <MissionVisionCard
          icon="🌺"
          title="Our Mission"
          description="To provide a world-class air travel experience built on comfort, safety, and connection. We aim to bring people closer — one flight at a time."
          color="linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)"
          delay="0s"
        />
        <MissionVisionCard
          icon="🦅"
          title="Our Vision"
          description="To be the most trusted and loved airline in the Pacific, recognized for our hospitality, innovation, and sense of family — Ohana."
          color="linear-gradient(135deg, #2A9D8F 0%, #A9D6E5 100%)"
          delay="0.1s"
        />
      </div>

      {/* Core Values */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "48px",
            color: "#ffffff",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
            textAlign: "center",
          }}
        >
          Our Core Values
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          <ValueCard
            icon="🛡️"
            title="Safety First"
            description="Your safety is our top priority. We maintain the highest standards with rigorous maintenance and training protocols."
            delay="0s"
          />
          <ValueCard
            icon="🤝"
            title="Customer Excellence"
            description="We go above and beyond to ensure every passenger feels valued, heard, and cared for throughout their journey."
            delay="0.1s"
          />
          <ValueCard
            icon="💡"
            title="Innovation"
            description="Embracing cutting-edge technology and sustainable practices to create the future of air travel."
            delay="0.2s"
          />
          <ValueCard
            icon="🌱"
            title="Sustainability"
            description="Committed to reducing our carbon footprint and protecting the beautiful destinations we connect."
            delay="0.3s"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto 60px",
          borderRadius: "24px",
          padding: "48px 32px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          animation: "fadeSlideUp 0.8s ease-out",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "40px",
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          Why Choose Ohana Airlines? ✨
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "32px",
          }}
        >
          <FeatureItem
            icon="⏱️"
            title="On-Time Performance"
            description="95% on-time arrival rate"
          />
          <FeatureItem
            icon="💺"
            title="Comfortable Seating"
            description="Extra legroom & premium comfort"
          />
          <FeatureItem
            icon="🍽️"
            title="Complimentary Meals"
            description="Fresh, locally-sourced cuisine"
          />
          <FeatureItem
            icon="📱"
            title="Free Wi-Fi"
            description="Stay connected at 30,000 feet"
          />
          <FeatureItem
            icon="🎬"
            title="Entertainment"
            description="Latest movies & music library"
          />
        </div>
      </div>

      {/* Meet the Team */}
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
          animation: "fadeSlideUp 0.9s ease-out",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#ffffff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          Meet Our Team 👥
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "16px",
            marginBottom: "48px",
            textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          The passionate individuals behind your seamless travel experience
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "40px",
            justifyItems: "center",
          }}
        >
          {[
            {
              name: "Richmond Arguelles",
              role: "System Analyst",
              img: "/images/profile1.jpg",
              color: "#FF6B35",
            },
            {
              name: "Mikayla Loera Marie Buno",
              role: "Lead Developer",
              img: "/images/profile2.jpg",
              color: "#2A9D8F",
            },
            {
              name: "Athena Kurtney Brinas",
              role: "UI/UX Designer",
              img: "/images/profile3.jpg",
              color: "#8B5CF6",
            },
            {
              name: "Jed Filip Sayat",
              role: "UI/UX Designer",
              img: "/images/profile4.jpg",
              color: "#F59E0B",
            },
          ].map((member, index) => (
            <TeamMember key={index} member={member} index={index} />
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
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

// Stat Badge Component
const StatBadge = ({ number, label }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "#FF9E4F",
          textShadow: "0 4px 16px rgba(255, 158, 79, 0.6)",
          marginBottom: "8px",
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontSize: "14px",
          color: "rgba(255, 255, 255, 0.9)",
          fontWeight: "600",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Mission/Vision Card Component
const MissionVisionCard = ({ icon, title, description, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "20px",
        padding: "40px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(0, 0, 0, 0.2)"
          : "0 8px 24px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeSlideUp 0.7s ease-out ${delay}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-30px",
          right: "-30px",
          width: "120px",
          height: "120px",
          background: color,
          opacity: 0.1,
          borderRadius: "50%",
          transition: "all 0.4s",
          transform: isHovered ? "scale(1.5)" : "scale(1)",
        }}
      />
      <div
        style={{
          fontSize: "48px",
          marginBottom: "20px",
          animation: isHovered ? "float 2s ease-in-out infinite" : "none",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "16px",
          color: "#ffffff",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "16px",
          lineHeight: "1.7",
          color: "rgba(255, 255, 255, 0.95)",
          textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        {description}
      </p>
    </div>
  );
};

// Value Card Component
const ValueCard = ({ icon, title, description, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "16px",
        padding: "32px 24px",
        background: "rgba(255, 255, 255, 0.12)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: isHovered
          ? "0 12px 32px rgba(0, 0, 0, 0.15)"
          : "0 4px 16px rgba(0, 0, 0, 0.08)",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeSlideUp 0.6s ease-out ${delay}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          marginBottom: "16px",
          animation: isHovered ? "float 2s ease-in-out infinite" : "none",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "12px",
          color: "#ffffff",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.6",
          color: "rgba(255, 255, 255, 0.9)",
          textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        {description}
      </p>
    </div>
  );
};

// Feature Item Component
const FeatureItem = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        gap: "16px",
        padding: "20px",
        borderRadius: "12px",
        background: isHovered
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255, 255, 255, 0.08)",
        transition: "all 0.3s",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          flexShrink: 0,
          animation: isHovered ? "float 2s ease-in-out infinite" : "none",
        }}
      >
        {icon}
      </div>
      <div>
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "700",
            marginBottom: "4px",
            color: "#ffffff",
            textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

// Team Member Component
const TeamMember = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: "center",
        animation: `fadeSlideUp 0.5s ease-out ${index * 0.1}s backwards`,
        transition: "transform 0.3s",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          overflow: "hidden",
          margin: "0 auto 20px",
          border: `4px solid ${member.color}`,
          boxShadow: isHovered
            ? `0 12px 32px ${member.color}66`
            : "0 8px 20px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s",
          position: "relative",
        }}
      >
        <img
          src={member.img}
          alt={member.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${member.color}33 100%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#ffffff",
          marginBottom: "6px",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        {member.name}
      </h3>
      <div
        style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "20px",
          background: `${member.color}33`,
          border: `1px solid ${member.color}66`,
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#ffffff",
            fontWeight: "600",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)",
          }}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;