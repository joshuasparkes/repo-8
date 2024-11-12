// React App

import React, { useState } from 'react';
import axios from 'axios';

const FlightOffers = () => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  const fetchFlightOffers = async () => {
    setLoading(true);
    setError(null);

    const requestBody = {
      data: {
        slices: [
          {
            origin: "JFK",
            destination: "LAX",
            departure_time: { from: "08:00", to: "12:00" },
            departure_date: "2023-12-01",
            arrival_time: { from: "10:00", to: "14:00" }
          }
        ],
        private_fares: {
          QF: [{ corporate_code: "", tracking_reference: "" }],
          UA: [{ corporate_code: "", tour_code: "" }]
        },
        passengers: [
          {
            family_name: "Doe",
            given_name: "John",
            loyalty_programme_accounts: [
              { account_number: "123456", airline_iata_code: "UA" }
            ],
            type: "adult"
          },
          { age: 18, fare_type: "student" }
        ],
        max_connections: 1,
        cabin_class: "economy"
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/duffel-flights-list-offers', requestBody);
      setOffers(response.data.data.offers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchFlightOffers}>Fetch Flight Offers</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {offers.map((offer, index) => (
          <div key={index}>
            <h3>Offer {index + 1}</h3>
            <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
            <p>Tax Amount: {offer.tax_amount} {offer.tax_currency}</p>
            <p>Cabin Class: {offer.slices[0].segments[0].passengers[0].cabin_class}</p>
            <p>Departure: {offer.slices[0].segments[0].departing_at}</p>
            <p>Arrival: {offer.slices[0].segments[0].arriving_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightOffers;
