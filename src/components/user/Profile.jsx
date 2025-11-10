import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import { mockFlights } from "../mockData.js";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingFlights = mockFlights; // display all flights as upcoming
  const cancelledFlights = []; // empty for now

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/images/home.jpg)", fontFamily: "'Roboto', sans-serif" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen p-8">
        {/* User Info */}
        <div className="bg-gray-900 bg-opacity-80 p-6 rounded-lg max-w-3xl mx-auto mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-300 mb-1">Email: {user.email}</p>
          <p className="text-gray-300 mb-1">Contact: {user.contact || "Not provided"}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              activeTab === "upcoming"
                ? "bg-yellow-500 text-black shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Upcoming Flights
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              activeTab === "cancelled"
                ? "bg-red-500 text-black shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Cancelled Flights
          </button>
        </div>

        {/* Flights */}
        <div className="max-w-5xl mx-auto">
          {activeTab === "upcoming" && (
            upcomingFlights.length === 0 ? (
              <p className="text-center text-gray-400">No upcoming flights.</p>
            ) : (
              upcomingFlights.map(f => (
                <div key={f.id} className="bg-gray-800 bg-opacity-90 p-4 mb-4 rounded-lg hover:bg-gray-700 cursor-pointer transition flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{f.flightNumber} - {f.airline}</p>
                    <p>{f.origin} → {f.destination}</p>
                    <p>{format(new Date(f.date), "MMM dd, yyyy")} | {f.departureTime} - {f.arrivalTime}</p>
                  </div>
                  <div className="text-right">
                    <p>Status: <span className={`font-semibold ${f.status === "On Time" ? "text-green-400" : "text-red-400"}`}>{f.status}</span></p>
                    <p>Price: ₱{f.price}</p>
                  </div>
                </div>
              ))
            )
          )}

          {activeTab === "cancelled" && (
            cancelledFlights.length === 0 ? (
              <p className="text-center text-gray-400">No cancelled flights.</p>
            ) : (
              cancelledFlights.map(f => (
                <div key={f.id} className="bg-gray-800 bg-opacity-90 p-4 mb-4 rounded-lg hover:bg-gray-700 cursor-pointer transition flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg">{f.flightNumber} - {f.airline}</p>
                    <p>{f.origin} → {f.destination}</p>
                    <p>{format(new Date(f.date), "MMM dd, yyyy")} | {f.departureTime} - {f.arrivalTime}</p>
                  </div>
                  <div className="text-right">
                    <p>Status: <span className="font-semibold text-red-400">{f.status}</span></p>
                    <p>Price: ₱{f.price}</p>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;