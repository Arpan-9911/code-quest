import { combineReducers } from 'redux'
import authReducer from './auth.js'
import currentUserReducer from './currentUser.js'
import usersReducer from './users.js'
import questionReducer from './question.js'

export default combineReducers({ authReducer, currentUserReducer, usersReducer, questionReducer })