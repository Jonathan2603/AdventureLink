import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createBucketList } from "../../features/bucketListSlice";
import { getPlace } from "../../features/placeSlice";
import { getUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Overview from "./Overview/Overview";
import ItineraryForm from "./Itinerary/ItineraryForm";
import "./Place.scss";

const Place = () => {
  const { user } = useSelector(getUser);
  const { place } = useSelector(getPlace);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login");
      navigate("/login");
    }
  }, [user, navigate]);

  const handleBucketList = () => {
    dispatch(createBucketList(place));
    toast.success(`${place.toUpperCase()} added to your Bucket List!`);
  };

  return (
    <div className="container-fluid">
      <Overview />
      {place ? (
        <>
          <button className="bucket btn btn-primary" onClick={handleBucketList}>
            <i className="fa-solid fa-plus"></i> Add to Bucket List
          </button>
          <ItineraryForm place={place} />
        </>
      ) : (
        <div style={{minHeight:450}}>
        <h4 style={{ textAlign: "center", margin: "30px" }}>
          Your Dream Destination Awaits... Embark on Your Adventure Today! 
        </h4>
        </div>
      )}
    </div>
  );
};

export default Place;
