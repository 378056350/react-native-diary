
import Immutable from 'immutable';
import { Save } from '../../common/index';

const initialState = {  
    diarys: [],
}  

const reducer = (state = initialState, action) => {
    switch (action.type) {  
        case 'loadDiaryAction': {
            state = Immutable.fromJS(state);   // 转成immutable
            state = state.merge({
                diarys: action.data
            });
            return state.toJS()    // 转回原生js
        }   
        default: 
            return state;  
    }  
}  

export default reducer;