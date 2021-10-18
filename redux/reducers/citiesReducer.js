const citiesReducer = (state = { cities: [], filterCities: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_CITIES":
      return {
        ...state,
        cities: action.payload,
        filterCities: action.payload,
      };
    case "FILTER_CITY":
      let resultCity = state.cities.filter((city) =>
        city.name.toLowerCase().startsWith(action.payload.trim())
      );

      return {
        ...state,
        filterCities: resultCity,
      };
    default:
      return state;
  }
}; //estoy retornando el estado actual(la primera vez va a ser null , que es el valor por defecto)
export default citiesReducer;
