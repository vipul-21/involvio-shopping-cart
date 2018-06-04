import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './app/containers/AppContainer';
import Store from './app/redux/store';

render(
  <Provider store={Store}>
    <AppContainer />
  </Provider>,
  document.getElementById('app'),
);
