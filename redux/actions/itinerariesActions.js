import axios from "axios";
const itinerariesActions = {
  getItineraries: (id) => {
    return async (dispatch) => {
      let respuesta = await axios.get(
        ` http://192.168.0.125:4000/api/itineraries/${id}`
      );
      let info = respuesta.data.response;
      if (!respuesta.data.success) {
        throw new Error();
      }
      dispatch({ type: "GET_ITINERARIES", payload: info });
    };
  },
  getActivitiesByItinerary: (id) => {
    return async () => {
      try {
        let res = await axios.get(`http://192.168.0.125:4000/api/activities/${id}`);
        return res;
      } catch (e) {
        console.log(e);
      }
    };
  },
  putLike: (id,userId, token) => {
    return async () => {
      try {
        let res = await axios.put(
          `http://192.168.0.125:4000/api/like/${id}`,
          {userId},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        
          return res
        
    
      } catch (e) {
        console.log(e);
      }
    };
  },
  getComments:(id) =>{
    return async () => {
      try {
        let comments = await axios.get(
          `http://192.168.0.125:4000/api/comment/${id}`)
          return comments.data.response
  }catch(e){
    console.log(e)
  }
}
},
  createComment: (id,comment,token) => {
    return async () => {
      try {
  
        let res = await axios.put(
          `http://192.168.0.125:4000/api/comment/${id}`,
          {...comment },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        
        return res.data
      } catch (e) {
        console.log(e);
      }
    };
  },
  deleteComment: (id, commentId,token) => {
    return async () => {
      try {
        
        let comments = await axios.put(
          `http://192.168.0.125:4000/api/comment/${id}`,
          {commentId, delete:true},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if(comments.data.success){
          return comments.data.response;
        }
      } catch (e) {
        console.log(e);
      }
    };
  },
  modifyComment: (comment, commentId, id, token) =>{
    return async () => {
    let comments = await axios.put(
      `http://192.168.0.125:4000/api/comment/${id}`,
      {comment,commentId, delete:false},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if(comments.data.success){
      return comments.data.response
  }
  }
  }
};
export default itinerariesActions;
