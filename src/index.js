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
import confirmDialogReducer from './reducers/confirmDialogReducer';
import cookReducer from './reducers/cookReducer';
import cookDescriptionModalReducer from './reducers/cookDescriptionModalReducer';
import cookTownModalReducer from './reducers/cookTownModalReducer';
import cookLinkModalReducer from './reducers/cookLinkModalReducer';
import addCourseModalReducer from './reducers/addCourseModalReducer';
import cookMenuReducer from './reducers/cookMenuReducer';

const reducer = combineReducers({
  userState: userReducer,
  addPhoneModalState: addPhoneModalReducer,
  coverUploadState: coverUploadReducer,
  avatarUploadState: avatarUploadReducer,
  confirmDialogState: confirmDialogReducer,
  cookState: cookReducer,
  cookDescriptionModalState: cookDescriptionModalReducer,
  cookTownModalState: cookTownModalReducer,
  cookLinkModalState: cookLinkModalReducer,
  addCourseModalState: addCourseModalReducer,
  cookMenuState: cookMenuReducer
});

const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['coverUploadSlice/setCoverImage', 'avatarUploadSlice/setAvatarImage', 
          'cookSlice/setCook', 'cookSlice/setInitialCook', 'cookMenuSlice/setCookMenuCourses'],
        // Ignore these paths in the state
        ignoredPaths: ['coverUploadState.coverImage', 'avatarUploadState.avatarImage', 'cookState.cook', 
          'cookState.initialCook', 'cookMenuState.courses.0.courseImage', 'cookMenuState.courses.1.courseImage',
          'cookMenuState.courses.2.courseImage', 'cookMenuState.courses.3.courseImage',
          'cookMenuState.courses.4.courseImage', 'cookMenuState.courses.5.courseImage']
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
