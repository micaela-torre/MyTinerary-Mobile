import axios from "axios";

const usersActions = {
  signIn: (user) => {
    return async (dispatch, getState) => {
      let res = await axios.post("http://192.168.0.125:4000/api/user/signin", {
        ...user,
      });
      dispatch({ type: "LOG_INTO_SYSTEM", payload: res.data.response });
      return res;
    };
  },
  signUp: (user) => {
    return async (dispatch, getState) => {
      let res = await axios.post("http://192.168.0.125:4000/api/users", {
        ...user,
      });
      dispatch({ type: "LOG_INTO_SYSTEM", payload: res.data.response });

      return res;
    };
  },
  logOut: () => {
    return (dispatch, getState) => {
      dispatch({ type: "LOG_OUT" });
    };
  },

  logInLS: (token) => {
    return async (dispatch) => {
      try {
        let res = await axios.get("http://192.168.0.125:4000/api/verifyToken", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
    
        dispatch({
          type: "LOG_INTO_SYSTEM",
          payload: {
            token,
            name: res.data.name,
            url: res.data.url,
            lastname: res.data.lastname,
            _id: res.data._id,
          },
        });
      } catch (e) {
        return dispatch({ type: "LOG_OUT" }), console.log(e);
      }
    };
  },
};
export default usersActions;
