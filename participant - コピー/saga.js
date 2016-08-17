import { put, take, call, fork } from 'redux-saga/effects'

import { fetchContents, submitInvestment } from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
}

export default saga
