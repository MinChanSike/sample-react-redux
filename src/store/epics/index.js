import { combineEpics } from 'redux-observable';
import userEpics from './userEpic';

export default combineEpics(
    ...userEpics
)