import React from 'react';
import FlightSearchComponent from '../components/user/FlightSearch';

const FlightSearch = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center py-12"
      style={{
        backgroundImage: "url('/images/home.jpg')",
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/60 to-blue-700/70"></div>

      {/* Centered Flight Search Card */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-200">
          
          <FlightSearchComponent />
        </div>
      </div>
    </div>

    
  );
};

export default FlightSearch;
