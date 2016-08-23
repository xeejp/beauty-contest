import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload : {page_data,results_data}}) => ({ 
	    page: page_data,
            results: results_data
    }),
    'input': (_, { payload : number }) => {
	return { number ,inputed: true}
    },
    'set_data': (_, { payload } ) => ({
	    number: 0,inputed: false, inputs: 0, actives: payload 
    }),
    'all_reset': (_, { payload } ) => ({
	    number: 0,inputed: false, inputs: 0, actives: payload, active: true
    }),
    'updata input': (_, { payload : { inputs_data, actives_data}} ) => ({
	    inputs: inputs_data, actives: actives_data
    }),
    'join': (_, { payload : {actives_data} }) => ({
	    actives: actives_data
    }),
    'result': (_, { payload : { participants_data }}) => ({
	    participants: participants_data
    })
  },{}),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer