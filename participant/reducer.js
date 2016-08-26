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
    'set_data': (_, { payload :{actives_data,round_data}} ) => ({
	    number: 0,inputed: false, inputs: 0, actives: actives_data, round: round_data
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
