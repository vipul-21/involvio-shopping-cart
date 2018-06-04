import { combineReducers } from 'redux';

import HomeReducer from './home';

const Reducers = combineReducers({ homeState: HomeReducer });

export default Reducers;
