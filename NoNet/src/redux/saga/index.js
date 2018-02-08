import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import { 
  initializationSagas,
  saveDiarySagas,
  loadDiarySagas,
  replaceDiarySagas,
  removeDiarySagas
} from './dataSagas';

function* saga() {
  yield [
    call(initializationSagas),
    call(saveDiarySagas),
    call(loadDiarySagas),
    call(replaceDiarySagas),
    call(removeDiarySagas),
  ]
}

export default saga;