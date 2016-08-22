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
    'set_data': (_, { payload : { number , inputed ,inputs,actives_data} } ) => ({
	    number: 0,inputed: false, inputs: 0, actives: actives_data
    }),
    'all_reset': (_, { payload : { number , inputed ,active ,noinput, actives_data} } ) => ({
	    number: 0,inputed: false,active: true, noinput: 0, actives: actives_data
    }),
    'updata input': (_, { payload : { inputs_data, actives_data}} ) => ({
	    inputs: inputs_data, actives: actives_data
    }),
    'join': (_, { payload : {actives_data} }) => ({
	    actives: actives_data
    })
  },{}),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer
