import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { generateItinerary } from '../../../features/itinerarySlice';
import "./ItineraryForm.scss";

const ItineraryForm = ({ place }) => {
  const dispatch = useDispatch();
  const { itinerary, isLoading, isError, message } = useSelector(state => state.itinerary);
  const [travelDates, setTravelDates] = useState({ start: '', end: '' });
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState('');
  const [travelRadius, setTravelRadius] = useState(50); // Default radius in km

  // Reset itinerary when the 'place' changes
  useEffect(() => {
    dispatch(generateItinerary({
      place,
      travelDates: { start: '', end: '' },
      numberOfTravelers: '',
      interests: '',
      budget: '',
      travelRadius: 50
    }));
  }, [place, dispatch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(generateItinerary({
      place,
      travelDates,
      numberOfTravelers,
      interests,
      budget,
      travelRadius
    }));
  };

  // Render itinerary as plain text by converting object to string if necessary
  const renderItinerary = () => {
    if (typeof itinerary === 'string') {
      return itinerary;
    } else if (itinerary && typeof itinerary === 'object' && itinerary.itinerary) {
      // Directly returning the 'itinerary' property if it exists
      return itinerary.itinerary;
    }
    return 'No itinerary generated yet.';
  };

  return (
    <div>
      <form className="itinerary-form" onSubmit={handleSubmit}>
        <h3>Create your Itinerary for {place}</h3>
        <div className="date-inputs">
          <label>
            Start Date:
            <input
              type="date"
              value={travelDates.start}
              onChange={e => setTravelDates(prev => ({ ...prev, start: e.target.value }))}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={travelDates.end}
              onChange={e => setTravelDates(prev => ({ ...prev, end: e.target.value }))}
            />
          </label>
        </div>
        <input
          type="number"
          min="1"
          placeholder="Number of Travelers"
          value={numberOfTravelers}
          onChange={e => setNumberOfTravelers(e.target.value)}
        />
        <input
          type="text"
          placeholder="Interests (e.g., cultural, outdoor, culinary)"
          value={interests}
          onChange={e => setInterests(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Budget per person in GBP (£)"
          value={budget}
          onChange={e => setBudget(e.target.value)}
        />
        <label>
          Travel Radius (km):
          <input
            type="range"
            min="0"
            max="500"
            value={travelRadius}
            onChange={e => setTravelRadius(e.target.value)}
          />
          {travelRadius} km
        </label>
        <button type="submit">Generate Itinerary</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error: {message}</p>}
        <div className="itinerary-result" style={{ whiteSpace: 'pre-wrap' }}>
          <h4>Generated Itinerary:</h4>
          <ReactMarkdown>{renderItinerary()}</ReactMarkdown>
        </div>
      </form>
    </div>
  );
};

export default ItineraryForm;
