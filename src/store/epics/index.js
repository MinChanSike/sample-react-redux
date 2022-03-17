import { combineEpics } from 'redux-observable';
import * as userEpic from './userEpic'

export default combineEpics(
    userEpic.getUsers
)