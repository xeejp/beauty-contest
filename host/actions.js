import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')

export const openParticipantPage = createAction('open participant page')
export const changePage = createAction('change page', page => page)
export const submitPage = createAction('submit page', page => page)
export const nextPage = createAction('next page')
export const backPage = createAction('back page')
export const changeRound = createAction('change round', (round) => ({round}))
export const changeResultPage = createAction('change result page', (result_page) => ({result_page}))