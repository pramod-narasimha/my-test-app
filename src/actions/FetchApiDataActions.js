import axios from "axios";
const api = {
  devApi : "http://localhost:3000/apiResponse.json",
  prodApi : "https://pramod-narasimha.github.io/apiResponse.json"
};

export function setApiData(data) {
  return {
    type: "SET_API_DATA",
    payload: data
  };
}

export function setLoading(data) {
  return {
    type: "IS_LOADING",
    payload: data
  };
}

export function setSideDrawer(data){
  return {
    type: "SET_DRAWER",
    payload: data
  }

}
export const fetchApiData = () => dispatch => {
  dispatch(setLoading(true));
  axios.get(api.devApi).then(response => {
    dispatch(setApiData(response.data.aData));
    dispatch(setLoading(false));
  });
};

export const openSideDrawer = () => dispatch => {
  dispatch(setSideDrawer("open"));
}

export const closeSideDrawer = () => dispatch => {
  dispatch(setSideDrawer("close"));
}
