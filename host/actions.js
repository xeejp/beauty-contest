import { createAction } from 'redux-act'

export const visit = createAction('visit')
export const openParticipantPage = createAction('open participant page')
export const changePage = createAction('change page', page => page)
export const changeRound = createAction('change round', round => round)
export const changeResultPage = createAction('change result page', result_page => result_page)
