import React from 'react';

const ConfirmationModal = ({ booking, onClose, onPrint }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Fixed Overlay Background */}
      <div className="no-print" style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        {/* Scrollable Container */}
        <div style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'white',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        }}>
          {/* Modal Header - Ticket Style */}
          <div style={{
            padding: '48px 40px',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Decorative circles */}
            <div style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              background: 'white',
              borderRadius: '50%',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
            }} />
            <div style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              background: 'white',
              borderRadius: '50%',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
            }} />
            
            {/* Perforated line effect */}
            <div style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '50%',
              height: '2px',
              background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 16px)',
              transform: 'translateY(-50%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ 
                textAlign: 'center',
                marginBottom: '24px',
              }}>
                <div style={{ fontSize: '80px', marginBottom: '8px', textShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>✈️</div>
                <h1 style={{ 
                  fontSize: '42px', 
                  fontWeight: '900', 
                  marginBottom: '8px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  letterSpacing: '-0.5px',
                }}>
                  OHANA AIRLINES
                </h1>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  Boarding Pass
                </div>
              </div>

              {/* Booking Reference - Prominent Display */}
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '24px',
                borderRadius: '16px',
                border: '2px dashed rgba(255,255,255,0.4)',
                textAlign: 'center',
              }}>
                <div style={{ 
                  fontSize: '13px', 
                  marginBottom: '8px', 
                  fontWeight: '600', 
                  opacity: 0.9,
                  letterSpacing: '1px',
                }}>
                  BOOKING REFERENCE
                </div>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '900',
                  fontFamily: 'monospace',
                  letterSpacing: '8px',
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  {booking.bookingReference}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Route Display */}
          <div style={{
            padding: '40px',
            background: 'linear-gradient(to bottom, #F8FAFC 0%, white 100%)',
            borderBottom: '2px dashed #CBD5E1',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}>
              {/* Origin */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px', fontWeight: '600', letterSpacing: '1px' }}>
                  FROM
                </div>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '900', 
                  color: '#1E293B',
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}>
                  {booking.flight.origin.match(/\(([^)]+)\)/)?.[1] || booking.flight.origin.split(' ')[0]}
                </div>
                <div style={{ fontSize: '16px', color: '#475569', fontWeight: '600' }}>
                  {booking.flight.origin}
                </div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#FF6B35',
                  marginTop: '16px',
                }}>
                  {booking.flight.departureTime || 'TBA'}
                </div>
              </div>

              {/* Airplane Icon */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{ fontSize: '48px' }}>✈️</div>
                <div style={{
                  padding: '6px 16px',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}>
                  {booking.flight.flightNumber}
                </div>
              </div>

              {/* Destination */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: '#64748B', marginBottom: '12px', fontWeight: '600', letterSpacing: '1px' }}>
                  TO
                </div>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '900', 
                  color: '#1E293B',
                  marginBottom: '8px',
                  fontFamily: 'monospace',
                }}>
                  {booking.flight.destination.match(/\(([^)]+)\)/)?.[1] || booking.flight.destination.split(' ')[0]}
                </div>
                <div style={{ fontSize: '16px', color: '#475569', fontWeight: '600' }}>
                  {booking.flight.destination}
                </div>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#10B981',
                  marginTop: '16px',
                }}>
                  {booking.flight.arrivalTime || 'TBA'}
                </div>
              </div>
            </div>
          </div>

          {/* Flight Details Grid */}
          <div style={{ padding: '40px', background: 'white' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '32px',
            }}>
              <TicketDetailItem 
                icon="📅" 
                label="Flight Date" 
                value={new Date(booking.flight.date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })} 
              />
              <TicketDetailItem 
                icon="👥" 
                label="Passengers" 
                value={`${booking.passengers} ${booking.passengers === 1 ? 'Person' : 'People'}`} 
              />
              <TicketDetailItem 
                icon="🎫" 
                label="Booking Date" 
                value={new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })} 
              />
              <TicketDetailItem 
                icon="✅" 
                label="Status" 
                value="CONFIRMED" 
                success 
              />
            </div>

            {/* Passenger Details */}
            {booking.passengerDetails && booking.passengerDetails.length > 0 && (
              <div style={{
                padding: '24px',
                background: '#F8FAFC',
                borderRadius: '16px',
                border: '2px solid #E2E8F0',
                marginBottom: '32px',
              }}>
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: '700', 
                  color: '#1E293B', 
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>👤</span>
                  Passenger Information
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {booking.passengerDetails.map((passenger, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'white',
                      borderRadius: '10px',
                      border: '1px solid #E2E8F0',
                    }}>
                      <span style={{ fontWeight: '600', color: '#1E293B' }}>
                        {index + 1}. {passenger.name}
                      </span>
                      <span style={{ color: '#64748B', fontWeight: '500' }}>
                        Age: {passenger.age}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total Amount - Prominent */}
            <div style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
              borderRadius: '16px',
              border: '3px solid #10B981',
              marginBottom: '32px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '14px', color: '#059669', marginBottom: '8px', fontWeight: '700', letterSpacing: '1px' }}>
                TOTAL AMOUNT PAID
              </div>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: '#059669',
                fontFamily: 'monospace',
              }}>
                ₱{booking.totalPrice.toLocaleString()}
              </div>
            </div>

            {/* Important Information */}
            <div style={{
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
              borderRadius: '16px',
              border: '2px solid #FCD34D',
            }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '700', 
                color: '#D97706', 
                marginBottom: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}>
                <span>⚠️</span>
                Important Travel Information
              </h4>
              <ul style={{ 
                fontSize: '14px', 
                color: '#92400E', 
                lineHeight: '1.8', 
                paddingLeft: '24px',
                margin: 0,
              }}>
                <li style={{ marginBottom: '8px' }}>
                  Arrive at the airport at least 2 hours before departure
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Bring a valid government-issued ID for all passengers
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Complete online check-in 24 hours before flight
                </li>
                <li>
                  Keep this booking reference for your records
                </li>
              </ul>
            </div>
          </div>

          {/* Modal Footer */}
          <div style={{
            padding: '24px 40px',
            background: '#F8FAFC',
            borderTop: '2px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <div style={{ fontSize: '13px', color: '#64748B' }}>
              Booking confirmed on {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={onClose}
                style={{
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  background: 'white',
                  color: '#475569',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F1F5F9';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                style={{
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
              >
                🖨️ Print Ticket
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Print-Only Ticket */}
      <div className="print-only" style={{ display: 'none' }}>
        <div style={{
          maxWidth: '210mm',
          margin: '0 auto',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
        }}>
          {/* Print Ticket Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '3px solid #FF6B35',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>✈️</div>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#1E293B', marginBottom: '4px', letterSpacing: '-0.5px', margin: '0 0 4px 0' }}>
              OHANA AIRLINES
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B', fontWeight: '600', letterSpacing: '2px', margin: 0 }}>
              ELECTRONIC BOARDING PASS
            </p>
          </div>

          {/* Booking Reference */}
          <div style={{
            background: '#FFF7ED',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            border: '3px dashed #FF6B35',
          }}>
            <div style={{ fontSize: '11px', color: '#92400E', marginBottom: '4px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Booking Reference
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '900',
              fontFamily: 'monospace',
              color: '#FF6B35',
              letterSpacing: '6px',
              margin: 0,
            }}>
              {booking.bookingReference}
            </div>
          </div>

          {/* Flight Route */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '16px',
            background: '#F8FAFC',
            borderRadius: '12px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>FROM</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#1E293B', fontFamily: 'monospace', margin: 0 }}>
                {booking.flight.origin.match(/\(([^)]+)\)/)?.[1] || booking.flight.origin.split(' ')[0]}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{booking.flight.origin}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#FF6B35', marginTop: '8px' }}>
                {booking.flight.departureTime || 'TBA'}
              </div>
            </div>
            <div style={{ fontSize: '24px' }}>→</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748B', marginBottom: '4px', fontWeight: '700' }}>TO</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#1E293B', fontFamily: 'monospace', margin: 0 }}>
                {booking.flight.destination.match(/\(([^)]+)\)/)?.[1] || booking.flight.destination.split(' ')[0]}
              </div>
              <div style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>{booking.flight.destination}</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981', marginTop: '8px' }}>
                {booking.flight.arrivalTime || 'TBA'}
              </div>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px',
          }}>
            {/* Left Column */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #E2E8F0', margin: '0 0 12px 0' }}>
                Flight Information
              </h3>
              <PrintDetailItem label="Flight Number" value={booking.flight.flightNumber} />
              <PrintDetailItem label="Date" value={booking.flight.date} />
              <PrintDetailItem label="Departure" value={booking.flight.departureTime || 'TBA'} />
              <PrintDetailItem label="Arrival" value={booking.flight.arrivalTime || 'TBA'} />
            </div>

            {/* Right Column */}
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #E2E8F0', margin: '0 0 12px 0' }}>
                Booking Details
              </h3>
              <PrintDetailItem label="Passengers" value={booking.passengers} />
              <PrintDetailItem label="Booking Date" value={booking.bookingDate} />
              <PrintDetailItem label="Total Amount" value={`₱${booking.totalPrice.toLocaleString()}`} highlight />
              <PrintDetailItem label="Status" value="CONFIRMED" success />
            </div>
          </div>

          {/* Passenger Names */}
          {booking.passengerDetails && booking.passengerDetails.length > 0 && (
            <div style={{
              marginBottom: '20px',
              padding: '12px',
              background: '#F8FAFC',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
            }}>
              <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#1E293B', marginBottom: '8px', margin: '0 0 8px 0' }}>
                Passenger List
              </h4>
              {booking.passengerDetails.map((passenger, index) => (
                <div key={index} style={{ fontSize: '11px', color: '#1E293B', marginBottom: '4px', fontWeight: '500' }}>
                  {index + 1}. {passenger.name} - {passenger.age} years old
                </div>
              ))}
            </div>
          )}

          {/* Important Instructions */}
          <div style={{
            background: '#FEF3C7',
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid #FDE047',
            marginBottom: '16px',
          }}>
            <h4 style={{ fontSize: '11px', fontWeight: '700', color: '#92400E', marginBottom: '8px', margin: '0 0 8px 0' }}>
              ⚠️ Important Travel Information
            </h4>
            <ul style={{ fontSize: '10px', color: '#78350F', lineHeight: '1.6', paddingLeft: '16px', margin: 0 }}>
              <li style={{ marginBottom: '4px' }}>Arrive at least 2 hours before departure</li>
              <li style={{ marginBottom: '4px' }}>Bring valid government-issued ID for all passengers</li>
              <li style={{ marginBottom: '4px' }}>Complete online check-in 24 hours before flight</li>
              <li>Baggage: 7kg cabin + 20kg checked per passenger</li>
            </ul>
          </div>

          {/* Footer */}
          <div style={{
            paddingTop: '12px',
            borderTop: '2px solid #E2E8F0',
            textAlign: 'center',
            fontSize: '9px',
            color: '#94A3B8',
          }}>
            <p style={{ marginBottom: '4px', margin: '0 0 4px 0' }}>
              Electronic ticket. Keep for your records. Customer Service: 1-800-OHANA-AIR
            </p>
            <p style={{ margin: 0 }}>
              Printed: {new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          .no-print,
          .no-print * {
            display: none !important;
            visibility: hidden !important;
          }
          
          .print-only,
          .print-only * {
            visibility: visible !important;
          }
          
          .print-only {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
    </>
  );
};

// Ticket Detail Item Component
const TicketDetailItem = ({ icon, label, value, success }) => (
  <div style={{
    padding: '20px',
    background: success ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)' : '#F8FAFC',
    borderRadius: '12px',
    border: success ? '2px solid #10B981' : '2px solid #E2E8F0',
  }}>
    <div style={{ 
      fontSize: '24px', 
      marginBottom: '8px',
    }}>
      {icon}
    </div>
    <div style={{ 
      fontSize: '11px', 
      color: '#64748B', 
      marginBottom: '6px', 
      fontWeight: '600', 
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }}>
      {label}
    </div>
    <div style={{
      fontSize: '17px',
      fontWeight: '700',
      color: success ? '#059669' : '#1E293B',
    }}>
      {value}
    </div>
  </div>
);

// Print Detail Item Component
const PrintDetailItem = ({ label, value, highlight, success }) => (
  <div style={{ marginBottom: '10px' }}>
    <div style={{ fontSize: '9px', color: '#64748B', marginBottom: '2px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
      {label}
    </div>
    <div style={{
      fontSize: '12px',
      fontWeight: success || highlight ? '700' : '600',
      color: highlight ? '#059669' : success ? '#10B981' : '#1E293B',
    }}>
      {value}
    </div>
  </div>
);

export default ConfirmationModal;