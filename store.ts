import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const defaultState = {
  authToken: null
}

export const actionTypes = {
  SIGNIN: 'SIGNIN',
  SIGNOUT: 'SIGNOUT'
}

// REDUCERS
export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SIGNIN:
      return Object.assign({}, state, {
        authToken: action.authToken
      })
    case actionTypes.SIGNOUT:
      return Object.assign({}, state, {
        authToken: null
      })
    default:
      return state
  }
}

// ACTIONS
export const signIn = (token) => {
  return { type: actionTypes.SIGNIN, authToken: token }
}
export const signOut = () => {
  return { type: actionTypes.SIGNOUT }
}

export function initializeStore (initialState = defaultState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
  )
}
