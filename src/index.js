import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import addPhoneModalReducer from './reducers/addPhoneModalReducer';
import coverUploadReducer from './reducers/coverUploadReducer';
import avatarUploadReducer from './reducers/avatarUploadReducer';

const reducer = combineReducers({
  userState: userReducer,
  addPhoneModalState: addPhoneModalReducer,
  coverUploadState: coverUploadReducer,
  avatarUploadState: avatarUploadReducer
});

const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['coverUploadSlice/setCoverImage', 'avatarUploadSlice/setAvatarImage'],
        // Ignore these paths in the state
        ignoredPaths: ['coverUploadState.coverImage', 'avatarUploadState.avatarImage']
      }
    }),
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
