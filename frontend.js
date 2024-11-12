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
            origin: event.target.origin.value,
            destination: event.target.destination.value,
            departure_date: event.target.departure_date.value,
            departure_time: {
              from: event.target.departure_time_from.value,
              to: event.target.departure_time_to.value,
            },
            arrival_time: {
              from: event.target.arrival_time_from.value,
              to: event.target.arrival_time_to.value,
            },
          },
        ],
        private_fares: {
          QF: [
            {
              corporate_code: event.target.qf_corporate_code.value,
              tracking_reference: event.target.qf_tracking_reference.value,
            },
          ],
          UA: [
            {
              corporate_code: event.target.ua_corporate_code.value,
              tour_code: event.target.ua_tour_code.value,
            },
          ],
        },
        passengers: [
          {
            family_name: event.target.family_name.value,
            given_name: event.target.given_name.value,
            loyalty_programme_accounts: [
              {
                account_number: event.target.loyalty_account_number.value,
                airline_iata_code: event.target.loyalty_airline_iata_code.value,
              },
            ],
            type: event.target.passenger_type.value,
          },
          {
            age: parseInt(event.target.passenger_age.value, 10),
            fare_type: event.target.fare_type.value,
          },
        ],
        max_connections: parseInt(event.target.max_connections.value, 10),
        cabin_class: event.target.cabin_class.value,
      },
    };

    fetchOffers(requestData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields for request data */}
        <input type="text" name="origin" placeholder="Origin" required />
        <input type="text" name="destination" placeholder="Destination" required />
        <input type="date" name="departure_date" required />
        <input type="time" name="departure_time_from" required />
        <input type="time" name="departure_time_to" required />
        <input type="time" name="arrival_time_from" required />
        <input type="time" name="arrival_time_to" required />
        <input type="text" name="qf_corporate_code" placeholder="QF Corporate Code" />
        <input type="text" name="qf_tracking_reference" placeholder="QF Tracking Reference" />
        <input type="text" name="ua_corporate_code" placeholder="UA Corporate Code" />
        <input type="text" name="ua_tour_code" placeholder="UA Tour Code" />
        <input type="text" name="family_name" placeholder="Family Name" required />
        <input type="text" name="given_name" placeholder="Given Name" required />
        <input type="text" name="loyalty_account_number" placeholder="Loyalty Account Number" />
        <input type="text" name="loyalty_airline_iata_code" placeholder="Loyalty Airline IATA Code" />
        <input type="text" name="passenger_type" placeholder="Passenger Type" required />
        <input type="number" name="passenger_age" placeholder="Passenger Age" />
        <input type="text" name="fare_type" placeholder="Fare Type" />
        <input type="number" name="max_connections" placeholder="Max Connections" required />
        <select name="cabin_class" required>
          <option value="first">First</option>
          <option value="business">Business</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="economy">Economy</option>
        </select>
        <button type="submit">Search Offers</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {offers.map((offer, index) => (
          <div key={index}>
            <h3>Offer {index + 1}</h3>
            <p>Total Amount: {offer.total_amount} {offer.total_currency}</p>
            <p>Tax Amount: {offer.tax_amount} {offer.tax_currency}</p>
            {/* Map other fields as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuffelFlightsListOffers;
