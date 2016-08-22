import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant, actives_data} }) => ({
      participants: Object.assign({}, participants, {[id]: participant}),
      actives: actives_data
    }),
    'input': ({ participants } , { payload: { id, number, inputs, sum_data} }) => {
	const result = Object.assign({},participants)
	result[id].inputed = true
	result[id].number = number
	const result_num = inputs 
	return { participants: result ,inputs : result_num, sum : sum_data}
    },
    'set_data': ({ participants }, { payload : { participants_data ,inputs ,sum} }) => ({
	    participants: participants_data ,inputs: 0 , sum: 0
    }),
    'all_reset': ({ participants }, { payload : { participants_data ,inputs ,actives_data,sum} }) => ({
	    participants: participants_data ,inputs: 0, actives: actives_data, sum: 0
    })

  },{}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
