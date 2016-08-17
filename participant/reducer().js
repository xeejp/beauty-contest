const initialState = {
	page : "waiting",
}

function reducer(state = initialState,action){
	switch(action.type) {
		case 'update contents': return action.payload
		case 'change page': return Object.assign({}, state, {
			page: action.payload
		})
	}
}
