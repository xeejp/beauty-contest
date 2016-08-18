import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')

export const submitNumber = createAction('submit number', (number) => ({ number }))
