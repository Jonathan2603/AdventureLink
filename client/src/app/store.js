import { configureStore } from "@reduxjs/toolkit";
import bucketListReducer from "../features/bucketListSlice";
import placeReducer from "../features/placeSlice";
import userReducer from "../features/userSlice";
import itineraryReducer from "../features/itinerarySlice";
import messagingReducer from "../features/messagingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bucketList: bucketListReducer,
    place: placeReducer,
    itinerary: itineraryReducer,
    messaging: messagingReducer,
  },
});
