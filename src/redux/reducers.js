import {combineReducers} from 'redux';
import applicationReducer from './reducers/applicationReducer';
import authReducer from './reducers/authReducer';
import applicantReducer from './reducers/admin/applicantReducer';
 
const persistConfig = {
    key: 'root',
  };
  const rootReducer = combineReducers({
    applicationReducer :  applicationReducer,
    auth :  authReducer,
    applicants :  applicantReducer,
  })
 
export default rootReducer;