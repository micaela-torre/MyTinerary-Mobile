import axios from "axios";

const citiesActions = {
  getAllCities: () => {
    return async (dispatch) => {
    try{
    let respuesta = await axios.get("http://192.168.0.125:4000/api/cities");
    let info = respuesta.data.response;
    dispatch({ type: "GET_ALL_CITIES", payload: info });
    if (!respuesta.data.success) {
      throw new Error();
    }
    }catch(e){
      console.log(e)
    }
    
    };
  },
  filterCity: (choose) => {
    return (dispatch) => {
      dispatch({ type: "FILTER_CITY", payload: choose });
    };
  },
};
export default citiesActions;
