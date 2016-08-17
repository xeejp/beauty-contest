const initialState = {
	page : "waiting",
	participants: {}
}

import { changePage } from './actions'

function reducer(state = initialState,action){
	switch(action.type) {
		case 'update contents': return action.payload
		case [changePage]: return Object.assign({}, state, {
			page: action.payload
		})
		case 'join': return Object.assign({}, participants, {[id]: participant})
	}
}
