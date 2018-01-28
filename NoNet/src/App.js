import React, { Component } from 'react';
import { 
  View, 
  Text,
  Modal,
  InteractionManager,
} from 'react-native';
import store from './redux/store/Store';
import { Provider } from 'react-redux';
import Tabbar from './component/tabbar/Tabbar';


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Tabbar/>
      </Provider>
    );
  }
}

export default App;
