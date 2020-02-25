const defaultState = {
  isLoading: true,
  postsList: [],
  sideDrawer: "close"
};

const FetchApiDataReducer = function(state = defaultState, action) {
  const { type, payload } = action;

  const updateState = update => {
    return Object.assign({}, state, update);
  };

  const resetState = () => {
    return Object.assign({}, state, defaultState);
  };
  switch (type) {
    case "SET_LOGGED_IN_STATUS":
      return updateState({ isLoggedIn: payload });
    case "IS_LOADING":
      return updateState({ isLoading: payload });
    case "SET_API_DATA":
      return updateState({ postsList: payload });
    case "SET_DRAWER":
      return updateState({ sideDrawer: payload });
    case "RESET_DATA":
      return resetState();
    default:
      return state;
  }
};
export default FetchApiDataReducer;
