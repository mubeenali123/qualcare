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
  dashboardStats: null,
  finalFormData: {},        // keyed by step_name
  formProgress: null,       // { completedSteps, totalSteps, percentage, stepStatuses }
  currentFinalStep: 1,
  savingStep: false,
  stepSaveSuccess: null,
  loading: false,
  error: null,
  sendingToTablet: false,
  sendToTabletError: null
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
    case types.FETCH_DASHBOARD_STATS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_DASHBOARD_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboardStats: action.payload,
      };

    case types.FETCH_DASHBOARD_STATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.SAVE_FINAL_FORM_STEP_REQUEST:
      return {
        ...state,
        savingStep: true,
        stepSaveSuccess: null,
        error: null,
      };

    case types.SAVE_FINAL_FORM_STEP_SUCCESS:
      return {
        ...state,
        savingStep: false,
        stepSaveSuccess: action.payload.stepName,
        finalFormData: {
          ...state.finalFormData,
          [action.payload.stepName]: action.payload.data,
        },
        formProgress: action.payload.progress || state.formProgress,
      };

    case types.SAVE_FINAL_FORM_STEP_FAILURE:
      return {
        ...state,
        savingStep: false,
        error: action.payload,
      };
    case types.FETCH_FORM_PROGRESS_REQUEST:
      return { ...state, loading: true };

    case types.FETCH_FORM_PROGRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        formProgress: action.payload,
      };

    case types.FETCH_FORM_PROGRESS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.FETCH_FINAL_FORM_DATA_REQUEST:
      return { ...state, loading: true };

    case types.FETCH_FINAL_FORM_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        finalFormData: action.payload,
      };

    case types.FETCH_FINAL_FORM_DATA_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case types.CLEAR_FINAL_FORM_ERROR:
      return {
        ...state,
        error: null,
        stepSaveSuccess: null,
      };
    case types.SEND_TO_TABLET_REQUEST:
      return {
        ...state,
        sendingToTablet: true,
        sendToTabletError: null
      };

    case types.SEND_TO_TABLET_SUCCESS:
      return {
        ...state,
        sendingToTablet: false,
        sendToTabletError: null
      };

    case types.SEND_TO_TABLET_FAILURE:
      return {
        ...state,
        sendingToTablet: false,
        sendToTabletError: action.payload
      };
      // FETCH PRE-EMPLOYMENT DATA
    case types.FETCH_PRE_EMPLOYMENT_DATA_REQUEST:
    case types.FETCH_EDUCATION_DATA_REQUEST:
    case types.FETCH_AVAILABILITY_DATA_REQUEST:
    case types.FETCH_REFERENCES_DATA_REQUEST:
    case types.FETCH_EXPERIENCE_DATA_REQUEST:
    case types.FETCH_DOCUMENTS_DATA_REQUEST:
    case types.FETCH_CERTIFICATION_DATA_REQUEST:
    case types.FETCH_REVIEW_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.FETCH_PRE_EMPLOYMENT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        preEmployment: action.payload
      };

    case types.FETCH_EDUCATION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        education: action.payload
      };

    case types.FETCH_AVAILABILITY_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        availability: action.payload
      };

    case types.FETCH_REFERENCES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        references: action.payload
      };

    case types.FETCH_EXPERIENCE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        experience: action.payload
      };

    case types.FETCH_DOCUMENTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        documents: action.payload
      };

    case types.FETCH_CERTIFICATION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        certification: action.payload
      };

    case types.FETCH_REVIEW_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        review: action.payload
      };

    case types.FETCH_PRE_EMPLOYMENT_DATA_FAILURE:
    case types.FETCH_EDUCATION_DATA_FAILURE:
    case types.FETCH_AVAILABILITY_DATA_FAILURE:
    case types.FETCH_REFERENCES_DATA_FAILURE:
    case types.FETCH_EXPERIENCE_DATA_FAILURE:
    case types.FETCH_DOCUMENTS_DATA_FAILURE:
    case types.FETCH_CERTIFICATION_DATA_FAILURE:
    case types.FETCH_REVIEW_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default applicationReducer;