import React from 'react';
import FlightSearchComponent from '../components/user/FlightSearch';

const FlightSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <FlightSearchComponent />
      </div>
    </div>
  );
};

export default FlightSearch;