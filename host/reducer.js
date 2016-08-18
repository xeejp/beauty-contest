import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

import { changePage } from './actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    [changePage]: (_, { payload }) => ({ page: payload }),
    'join': ({ participants }, { payload: { id, participant } }) => ({
      participants: Object.assign({}, participants, {[id]: participant})
    }),
    'input': ({ participants } , { payload: { id, number} }) => {
	const result = Object.assign({},participants)
	result[id].inputed = true
	result[id].number = number
	return { participants: result }
    }
  },{}),
  handleAction('update contents', () => ({ loading: false }), { loading: true })
])

export default reducer
