import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_DIMENSIONS_BY_MODEL } from './Reducer';
import appStore from './AppStore';

export const store = appStore;
export {
  MODEL_TYPES,
  MODEL_TYPE_OPTIONS,
  DEFAULT_DIMENSIONS_BY_MODEL,
} from './Reducer';
export {
  setModelType,
  setBuildingWidth,
  setBuildingHeight,
  setDoorMethod,
} from './Action';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const selectModelType = (state) => state.building.modelType;
export const selectBuildingWidth = (state) => state.building.buildingWidth;
export const selectBuildingHeight = (state) => state.building.buildingHeight;
export const selectDoorMethod = (state) => state.building.doorMethod;
export const selectDimensionsByModel = (state) =>
  DEFAULT_DIMENSIONS_BY_MODEL[state.building.modelType];

export const initialData = Object.fromEntries(
  Object.entries(DEFAULT_DIMENSIONS_BY_MODEL).map(([key, { width, height }]) => [
    key,
    [width, height],
  ])
);
