import React from "react";
import "./Card.scss";

const Card = () => {
  return (
    <div className="container-fluid custom-card">
      <div className="card">
        <i className="fa-solid fa-street-view"></i>
        <h5>Best Near You</h5>
        <p>Find the best places to visit near you </p>
      </div>
      <div className="card">
        <i class="fa-solid fa-users"></i>
        <h5>Connect</h5>
        <p>Connect with fellow like-minded travellers</p>
      </div>
      <div className="card">
        <i class="fa-solid fa-calendar-days"></i>
        <h5>Itinerary Generator</h5>
        <p>Generate an itinerary for your dream destinations</p>
      </div>
      <div className="card">
        <i class="fa-solid fa-clipboard-list"></i>
        <h5>Personal Bucket List</h5>
        <p>Plan your adventures with your own bucket list</p>
      </div>
    </div>
  );
};

export default Card;
