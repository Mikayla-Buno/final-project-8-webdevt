// src/components/user/BookingCard.jsx
import React from "react";

const BookingCard = ({ booking }) => {
  const flight = booking.flight;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">

      {/* Flight Image */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={flight.image}
          alt={flight.airline}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">

        {/* Airline + Status */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">
            {flight.airline} — {flight.flightNumber}
          </h2>

          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>

        {/* Flight Details */}
        <div className="text-gray-600 text-sm space-y-1">
          <p><strong>From:</strong> {flight.origin}</p>
          <p><strong>To:</strong> {flight.destination}</p>
          <p><strong>Date:</strong> {flight.date}</p>
          <p><strong>Time:</strong> {flight.departureTime} → {flight.arrivalTime}</p>
        </div>

        {/* Button */}
        <button className="mt-5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
          View Details
        </button>
      </div>

    </div>
  );
};

export default BookingCard;