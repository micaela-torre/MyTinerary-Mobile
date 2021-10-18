import AsyncStorage from '@react-native-async-storage/async-storage';
const usersReducer = (
  state = { token: null, name: null, url: null, lastname: null, _id: null },
  action
) => {
  switch (action.type) {
    case "LOG_INTO_SYSTEM":
      AsyncStorage.setItem('token', action.payload.token) 
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        lastname: action.payload.lastname,
        url: action.payload.url,
        _id: action.payload._id,
      };
    case "LOG_OUT":
      AsyncStorage.removeItem('token')
      return {
        ...state,
        token: null,
        name: null,
        url: null,
        lastname: null,
        _id: null,
      };
    default:
  }
  return state;
};
export default usersReducer;
