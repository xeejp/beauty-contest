import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'input': (_, { payload : number }) => {
	return { number ,inputed: true}
    },
    'set_data': (_, { payload : { number , inputed } } ) => ({
	    number: 0,inputed: false
    }),
    'all_reset': (_, { payload : { number , inputed ,active} } ) => ({
	    number: 0,inputed: false,active: true
    })
  },{}),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer
