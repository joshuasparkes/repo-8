// React App

import React, { useState } from 'react';
import axios from 'axios';

const DuffelFlightsListOffers = () => {
  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  const fetchOffers = async (requestData) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/duffel-flights-list-offers', requestData);
      setOffers(response.data.data.offers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestData = {
      data: {
        slices: [
          {
            origin: "JFK",
            destination: "LAX",
            departure_time: { from: "08:00", to: "12:00" },
            departure_date: "2023-12-01",
            arrival_time: { from: "11:00", to: "15:00" }
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
            loyalty_programme_accounts: [{ account_number: "123456", airline_iata_code: "UA" }],
            type: "adult"
          },
          {
            age: 18,
            fare_type: "student"
          }
        ],
        max_connections: 1,
        cabin_class: "economy"
      }
    };
    fetchOffers(requestData);
  };

  return (
    <div>
      <h1>Flight Offers</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Fetch Offers</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {offers.map((offer, index) => (
          <div key={index}>
            <h2>Offer {index + 1}</h2>
            <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
            <p>Tax Amount: {offer.tax_amount} {offer.tax_currency}</p>
            <p>Cabin Class: {offer.cabin_class}</p>
            {/* Map other fields as necessary */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuffelFlightsListOffers;

// End of React App
