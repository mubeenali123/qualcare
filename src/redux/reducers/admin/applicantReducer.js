import * as types from "../../type";

const initialState = {
  applicants: [],
  loading: false,
  error: null,
};

const applicantReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APPLICANTS_REQUEST:
    case types.DELETE_APPLICANT_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_APPLICANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        applicants: action.payload,
      };

    case types.DELETE_APPLICANT_SUCCESS:
      return {
        ...state,
        loading: false,
        applicants: state.applicants.filter((item) => item.id !== action.payload),
      };

    case types.FETCH_APPLICANTS_FAILURE:
    case types.DELETE_APPLICANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default applicantReducer;