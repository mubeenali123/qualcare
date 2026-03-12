import * as types from "../../redux/type";

const initialState = {
  // Step Data
  preEmployment: {},
  education: [],
  experience: [],
  references: [],
  skills: [],
  documents: [],
  certification: [],
  statusLogs: [],
  allStatusLogs: [],
  // Admin Data
  applications: [],
  loading: false,
  error: null,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    // ======================
    // SAVE EACH STEP (Local State)
    // ======================
    case types.SAVE_PRE_EMPLOYMENT:
      return { ...state, preEmployment: action.payload };

    case types.SAVE_EDUCATION:
      return { ...state, education: action.payload };

    case types.SAVE_EXPERIENCE:
      return { ...state, experience: action.payload };

    case types.SAVE_REFERENCES:
      return { ...state, references: action.payload };

    case types.SAVE_SKILLS:
      return { ...state, skills: action.payload };

    case types.SAVE_DOCUMENTS:
      return { ...state, documents: action.payload };

    case types.SAVE_CERTIFICATION:
      return { ...state, certification: action.payload };

    // ======================
    // GLOBAL LOADING/ERROR
    // ======================
    case types.SUBMIT_APPLICATION_REQUEST:
    case types.FETCH_ADMIN_APPS_REQUEST:
    case types.DELETE_ADMIN_APP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.SUBMIT_APPLICATION_FAILURE:
    case types.FETCH_ADMIN_APPS_FAILURE:
    case types.DELETE_ADMIN_APP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // ======================
    // ADMIN SUCCESS ACTIONS
    // ======================
    case types.FETCH_ADMIN_APPS_SUCCESS:
      return {
        ...state,
        loading: false,
        applications: action.payload,
      };

    case types.DELETE_ADMIN_APP_SUCCESS:
      return {
        ...state,
        loading: false,
        // Filter out the deleted application by ID
        applications: state.applications.filter(app => app.id !== action.payload),
      };

    // ======================
    // SUBMISSION SUCCESS
    // ======================
    case types.SUBMIT_APPLICATION_SUCCESS:
      // If it's the final submission, you might want to clear everything
      // Otherwise, just turn off loading
      return {
        ...state,
        loading: false,
      };

    case types.APPROVE_APPLICATION_REQUEST:
    case types.REJECT_APPLICATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.APPROVE_APPLICATION_SUCCESS:
    case types.REJECT_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.APPROVE_APPLICATION_FAILURE:
    case types.REJECT_APPLICATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FETCH_APPLICATION_NOTES_REQUEST:
    case types.ADD_APPLICATION_NOTE_REQUEST:
    case types.DELETE_APPLICATION_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        noteSuccess: null
      };

    case types.FETCH_APPLICATION_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: action.payload,
      };

    case types.ADD_APPLICATION_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        noteSuccess: action.payload.message
      };

    case types.DELETE_APPLICATION_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter(note => note.id !== action.payload),
      };

    case types.FETCH_APPLICATION_NOTES_FAILURE:
    case types.ADD_APPLICATION_NOTE_FAILURE:
    case types.DELETE_APPLICATION_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FETCH_ALL_STATUS_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_ALL_STATUS_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        allStatusLogs: action.payload,
      };

    case types.FETCH_ALL_STATUS_LOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.FETCH_STATUS_LOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_STATUS_LOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        statusLogs: action.payload,
      };

    case types.FETCH_STATUS_LOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default applicationReducer;