import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './features/auth/authSlice';
import blogsReducer from './features/blogs/blogsSlice';
import propertiesReducer from './features/properties/propertiesSlice';
import filteredPropertiesReducer from './features/properties/filteredProperties';
import filtersReducer from './features/filters/filtersSlice'
import modalReducer from './features/modal/modalSlice'
import notificationsReducer from './features/notifications/notificationsSlice'
import messagesReducer from './features/messages/messagesSlice'
import savedPropertiesReducer from './features/savedProperties/savedPropertiesSlice'
import inspectionsReducer from './features/inspections/inspectionsSlice'
import cataloguesReducer from './features/catalogues/cataloguesSlice'
import membersReducer from './features/members/membersSlice'
import profileReducer from './features/profile/profileSlice'
import ratingsReducer from './features/ratings/ratingsSlice'
import documentsReducer from './features/documents/documentsSlice'
import { attachAuthInterceptors } from './api/axiosInstance';

const rootReducer = combineReducers({
  auth: authReducer,
  blogs: blogsReducer,
  properties: propertiesReducer,
  filteredProperties: filteredPropertiesReducer,
  filters: filtersReducer,
  modals: modalReducer,
  notifications: notificationsReducer,
  messages: messagesReducer,
  savedProperties: savedPropertiesReducer,
  inspections: inspectionsReducer,
  catalogues: cataloguesReducer,
  members: membersReducer,
  profile: profileReducer,
  ratings: ratingsReducer,
  documents: documentsReducer,
});

const persistedReducer = persistReducer({ key: 'root', storage, whitelist: ['auth'] }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

attachAuthInterceptors(store);

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;