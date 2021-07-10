const initialState = {
  isLoggedIn: false,
  initialLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        ...action.payload,
      };
    case "REGISTER": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "FETCH_CURRENT_USER": {
      return {
        ...state,
        ...action.payload,
        initialLoading: false,
      };
    }
    default:
      return state;
  }
};

export { initialState, authReducer };
