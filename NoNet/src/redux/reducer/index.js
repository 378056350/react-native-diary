import { combineReducers } from 'redux';
import DiaryReducer from './DiaryReducer';

const rootReducer = combineReducers({
    DiaryReducer: DiaryReducer,
});

export default rootReducer;

