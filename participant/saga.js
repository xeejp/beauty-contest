import { put, take, call, fork } from 'redux-saga/effects'

import { fetchContents, submitNumber } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* submitNumberSaga() {
  while(true) {
	yield take(`${submitNumber}`)
	yield call(sendData, 'submit number')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitNumberSaga)
}

export default saga
