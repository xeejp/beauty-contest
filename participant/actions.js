import { createAction } from 'redux-act'

export const submitNumber = createAction('submit number', number => number)