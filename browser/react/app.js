'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import { createStore } from 'redux';
import store from './myRedux.js';

ReactDOM.render(
<Provider store={store}>
  <AppContainer />
</Provider>,
  document.getElementById('app')

);
