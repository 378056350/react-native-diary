
import { RealmManager } from '../../common/index';

//========================= 分类 =========================//
// 初始化
export function initialization() {
    return new Promise((resolve) => {
        RealmManager.initialization();
        resolve();
    });
}
// 增
export function saveDiary(data) {
    return new Promise((resolve) => {
        let diary = RealmManager.saveDiary(data.name, data.content, data.year, data.month, data.day, data.weather, data.photos, data.callback);
        resolve();
    });
}
// 查
export function loadDiary(filtered) {
    return new Promise((resolve) => {
        let diarys = RealmManager.loadDiary(filtered)
        let arr = [];
        for (let i=0; i<diarys.length; i++) {
            arr.push(diarys[i]);
        }
        resolve(arr);
    });
}
// 改
export function replaceDiary(data) {
    return new Promise((resolve) => {
        RealmManager.replaceDiary(data.id, data.name, data.content, data.year, data.month, data.day, data.weather, data.photos);
        resolve();
    });
}
// 删
export function removeDiary(filtered) {
    return new Promise((resolve) => {
        RealmManager.removeDiary(filtered.filtered, filtered.callback)
        resolve();
    });
}


// // 读取分类
// export function loadCategory() {
//     return new Promise((resolve) => {
//         let data = Save.getCategory();
//         resolve(data);
//     });
// }
// // 读取记账
// export function loadAccount() {
//     return new Promise((resolve) => {
//         let data = Save.loadAccount();
//         resolve(data);
//     });
// }
// // 整理首页
// export function arrangeHomeData(data) {
//     return new Promise((resolve) => {
//         let homes = Save.arrangeHomeData(data);
//         resolve(homes);
//     });
// }
// // 整理图表
// export function arrangeChartData(data) {
//     return new Promise((resolve) => {
//         let charts = Save.arrangeChartData(data);
//         resolve(charts);
//     });
// }
// // 保存记账
// export function saveAccount(data) {
//     return new Promise((resolve) => {
//         Save.saveAccount(data);
//         resolve();
//     });
// }



