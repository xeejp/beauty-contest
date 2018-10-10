import { fork, take, call, select, takeEvery } from 'redux-saga/effects'

import { fetchContents } from '../shared/actions'
import { submitNumber } from './actions'

function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}

function* submitNumberSaga(action) {
  const { payload } = action
  yield call(sendData, 'input', payload)
}

function* saga() {
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
  yield fork(takeEvery, submitNumber.getType(), submitNumberSaga)
}

export default saga
