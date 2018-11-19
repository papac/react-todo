import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import Todo from './components/Todo';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Todo />
  </Provider>, 
  document.getElementById('root')
);
