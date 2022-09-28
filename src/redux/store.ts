import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './authSlice/AuthSlice';
import VehicleReducer from './vehicleSlice/VehicleSlice';
import FormReducer from './formSlice/FormSlice';
import {persistReducer, persistStore} from 'redux-persist'
// import storage from 'redux-persist/lib/storage';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'mygarage',
  storage,
}

const userPersistedReducer = persistReducer(persistConfig,  authReducer)
const middleware:any = [thunk]
export const store = configureStore({
  reducer: {
    authReducer: userPersistedReducer,
    vehicleReducer: VehicleReducer,
    formReducer: FormReducer,
    middleware,
  },
});

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
