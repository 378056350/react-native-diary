import { takeEvery, takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { Save, DateManager } from '../../common/index';
import {
    initialization,
    saveDiary,
    loadDiary,
    replaceDiary,
    removeDiary
} from './DiaryApi';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// 初始化
function* initializationSaga() {
    // 数据库
    yield call(initialization);
}
// 增
function* saveDiarySaga(ret) {
    yield call(saveDiary, ret.data);
}
// 查
function* loadDiarySaga(ret) {
    let diarys = yield call(loadDiary, ret.filtered);
    yield put({
        type: 'loadDiaryAction', 
        data: diarys,
    });
}
// 改
function* replaceDiarySaga(ret) {
    let diarys = yield call(replaceDiary, ret.data);
}
// 删
function* removeDiarySaga(ret) {
    let diarys = yield call(removeDiary, ret.filtered);
}


export function* initializationSagas() {
    yield* takeLatest("initializationSaga", initializationSaga);
}
export function* saveDiarySagas() {
    yield* takeLatest("saveDiarySaga", saveDiarySaga);
}
export function* loadDiarySagas() {
    yield* takeLatest("loadDiarySaga", loadDiarySaga);
}
export function* replaceDiarySagas() {
    yield* takeLatest("replaceDiarySaga", replaceDiarySaga);
}
export function* removeDiarySagas() {
    yield* takeLatest("removeDiarySaga", removeDiarySaga);
}