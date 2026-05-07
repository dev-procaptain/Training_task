import { configureStore } from '@reduxjs/toolkit';
import buildingReducer from '../../features/building/buildingSlice';

export const store = configureStore({
  reducer: {
    building: buildingReducer,
  },
});