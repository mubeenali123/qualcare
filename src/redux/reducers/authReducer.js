import * as types from "../type";

const initialState = {
  user: null,
  application: null, // Stores specific applicant progress
  role: null,        // 'admin' or 'applicant'
  // Initialize token from a generic key to support both
  token: localStorage.getItem("authToken") || null,
  loading: false,
  error: null,
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Both logins trigger the same loading state
    case types.ADMIN_LOGIN_REQUEST:
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    // Generic success for Admin
    case types.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        role: 'admin',
        successMessage: action.payload.message,
      };

    // Generic success for Applicant
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        application: action.payload.application, // Store progress (current step, etc.)
        role: 'applicant',
        successMessage: action.payload.message,
      };

    // Handle Failures
    case types.ADMIN_LOGIN_FAILURE:
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Logout resets everything
    case types.ADMIN_LOGOUT_SUCCESS:
    case types.USER_LOGOUT_SUCCESS:
      return {
        ...initialState,
        token: null,
        user: null,
        application: null,
        role: null
      };
    case types.CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null, successMessage: null };

    case types.CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case types.CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    // In your authReducer.js
    case types.CLEAR_AUTH_ERRORS:
      return {
        ...state,
        error: null,
        successMessage: null
      };
    default:
      return state;
  }
};

export default authReducer;