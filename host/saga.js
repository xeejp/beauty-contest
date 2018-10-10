import { fork, take, call, takeEvery} from 'redux-saga/effects'

import { fetchContents } from '../shared/actions'
import { changePage, visit, changeResultPage, changeRound } from './actions'

function* changePageSaga(action) {
  const { payload } = action
  yield call(sendData, 'change page', payload)
}

function* changeRoundSaga(action) {
  const { payload } = action
  yield call(sendData, 'change round', payload)
}

function* changeResultPageSaga(action) {
    const { payload } = action
    yield call(sendData, 'change result page', payload)
}
function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}
function* visitSaga() {
  yield call(sendData, 'visit')
}

function* saga() {
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
  yield fork(takeEvery, changePage.getType(), changePageSaga)
  yield fork(takeEvery, changeResultPage.getType(), changeResultPageSaga)
  yield fork(takeEvery, changeRound.getType(), changeRoundSaga)
  yield fork(takeEvery, visit.getType(), visitSaga)
}

export default saga
