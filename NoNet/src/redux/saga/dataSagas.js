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
    // 所有日记
    let diarys = yield call(loadDiary, ret.filtered);
    // 按日期整理日记
    let arr = {};
    for (let i=0; i<diarys.length; i++) {
        let diary = diarys[i];
        if (arr[diary.year] == null) {
            arr[diary.year] = {};
        }
        if (arr[diary.year]["array"] == null) {
            arr[diary.year]["array"] = [];
        }
        if (arr[diary.year][diary.month] == null) {
            arr[diary.year][diary.month] = {};
        }
        if (arr[diary.year][diary.month]["array"] == null) {
            arr[diary.year][diary.month]["array"] = [];
        }
        if (arr[diary.year][diary.month][diary.day] == null) {
            arr[diary.year][diary.month][diary.day] = [];
        }
        if (arr[diary.year][diary.month][diary.day]["array"] == null) {
            arr[diary.year][diary.month][diary.day]["array"] = [];
        }
        arr[diary.year]["array"].push(diary);
        arr[diary.year][diary.month]["array"].push(diary);
        arr[diary.year][diary.month][diary.day]["array"].push(diary);
        arr[diary.year][diary.month][diary.day].push(diary)
    }
    yield put({
        type: 'loadDiaryAction', 
        diarys: diarys,
        dateDiarys: arr
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