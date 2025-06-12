import * as api from '../api'
import { setCurrentUser } from './currentUser'
import { getAllUsers } from './users'

export const signUp = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
    dispatch(getAllUsers())
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(authData)
    dispatch({ type: 'AUTH', data })
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}