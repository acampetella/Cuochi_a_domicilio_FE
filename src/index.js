import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import buttonSelectedCoverReducer from './reducers/buttonSelectedCoverReducer';
import buttonSelectedAvatarReducer from './reducers/buttonSelectedAvatarReducer'

const reducer = combineReducers({
  buttonSelectedCoverState: buttonSelectedCoverReducer,
  buttonSelectedAvatarState: buttonSelectedAvatarReducer
});

const store = configureStore({
  reducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
