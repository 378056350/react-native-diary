
import {
  CameraRoll,
} from 'react-native';

export default class PhotoManager {

  static fetchData(number, lastCursor, block) {
    var fetchParams = {
      first: number,
      groupTypes: 'All',
      assetType: 'Photos'
    }
    // 如果不是第一次取图片，则this.state.lastCursor不为空，下一次取图片时就从上次的结尾开始取
    if (lastCursor) {
      fetchParams.after = lastCursor;
    }
    CameraRoll.getPhotos(fetchParams).then((data) => {
      PhotoManager._appendAssets(data, block); // 取到图片数据后，交由appendAssets处理
    }).done();
  }
  static _appendAssets=(data, block)=>{ 
    var noMore = false;
    if (!data.page_info.has_next_page) { 
      noMore = true;
    }
    if (block) {
      block(data, noMore);
    }
  }
};