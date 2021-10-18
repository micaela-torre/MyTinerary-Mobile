import { combineReducers } from "redux";
import citiesReducer from "../reducers/citiesReducer"
import itinerariesReducer from "../reducers/itinerariesReducers";
import countriesReducer from "../reducers/countriesReducer";
import usersReducer from "../reducers/usersReducer";

const rootReducer = combineReducers({
  cities: citiesReducer,
  itineraries: itinerariesReducer,
  countries: countriesReducer,
  users: usersReducer,
});
export default rootReducer;
