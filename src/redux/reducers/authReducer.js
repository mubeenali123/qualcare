import * as types from "../type";

const initialState = {
  user: null,
  // ✅ Initialize token from localStorage so the user stays logged in on refresh
  token: localStorage.getItem("adminToken") || null,
  loading: false,
  error: null,
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case types.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        // ✅ Store the token in the state
        token: action.payload.token, 
        successMessage: action.payload.message,
      };

    case types.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.ADMIN_LOGOUT_SUCCESS:
      // ✅ Completely clear the state
      return {
        ...initialState,
        token: null,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;