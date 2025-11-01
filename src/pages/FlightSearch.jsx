import React from 'react';
import FlightSearchComponent from '../components/user/FlightSearch';

const FlightSearch = () => {
  return (
    <div
      className="min-h-screen py-8"
      style={{
        backgroundImage: "url('/images/airplane.png')",
        backgroundAttachment: 'fixed',   // Makes it fixed when scrolling
        backgroundSize: 'auto',          // Keeps original size, prevents stretching
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',   // Prevents tiling
      }}
    >
      <div className="container mx-auto px-4">
        <FlightSearchComponent />
      </div>
    </div>
  );
};

export default FlightSearch;
