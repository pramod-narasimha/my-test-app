import { combineReducers } from "redux";
import FetchApiDataReducer from "./FetchApiDataReducer.js";

const rootReducer = combineReducers({
  apiData: FetchApiDataReducer
});

export default rootReducer;
