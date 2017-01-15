import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, nextPage, backPage, submitPage, changePage, changeResultPage, changeRound, visit } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('change page', payload)
    if (payload == 'experiment'){
      yield call(sendData, 'set_data')
    }
    yield put(changePage(payload))
  }
}

function* nextPageSaga() {
  const pages = ["description", "experiment", "result", "waiting"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* backPageSaga() {
  const pages = ["description", "experiment", "result", "waiting"]
  while (true) {
    yield take(`${backPage}`)
    const page = yield select(({ page }) => page)
    let back = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        back = pages[(i != 0)?(i-1):(pages.length-1)]
        break
      }
    }
    yield put(submitPage(back))
  }
}

function* changeResultPageSaga() {
  while(true){
    const { payload: {result_page} } = yield take(`${changeResultPage}`)
    yield call(sendData, 'change result page',result_page)
  }
}

function* changeRoundSaga() {
  while(true){
    const { payload: {round} } = yield take(`${changeRound}`)
    console.log(round)
    yield call(sendData, 'change round' , round)
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* visitSaga() {
  while (true) {
    yield take(`${visit}`)
    yield call(sendData, 'visit')
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(nextPageSaga)
  yield fork(backPageSaga)
  yield fork(fetchContentsSaga)
  yield fork(changeResultPageSaga)
  yield fork(changeRoundSaga)
  yield fork(visitSaga)
}

export default saga
