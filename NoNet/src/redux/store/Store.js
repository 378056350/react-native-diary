import { saga, reducer } from '../index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


// 中间件: redux-saga
const sagaMiddleware = createSagaMiddleware();
// store
const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware));
// const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware)); 
// if (module.hot) {
//     module.hot.accept('../reducer', () => {
//       const nextRootReducer = require('../reducer/index');
//       store.replaceReducer(nextRootReducer);
//     });
// }
// 监听saga
sagaMiddleware.run(saga);
export default store;