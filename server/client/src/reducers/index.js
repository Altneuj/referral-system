import { combineReducers } from 'redux';
import authReducer from './authReducer'
import referralsReducer from './referralsReducer';
import tagsReducer from './tagsReducer';
import organizationReducer from './organizationReducer';
import allOrgsReducer from './allOrgsReducer';
import detailReducer from './detailReducer';
import myOrgReducer from './myOrgReducer';

export default combineReducers({
    auth: authReducer,
    referrals: referralsReducer,
    tags: tagsReducer,
    organizationSearchResults: organizationReducer,
    allOrgs: allOrgsReducer,
    referralDetail: detailReducer,
    myOrg: myOrgReducer
});