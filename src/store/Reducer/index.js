import {
  DEFAULT_MODEL_TYPE,
  getDimensionsForModelType,
} from '../../utils/InitData';

const defaultDimensions = getDimensionsForModelType(DEFAULT_MODEL_TYPE);

export const initialState = {
  modelType: DEFAULT_MODEL_TYPE,
  buildingWidth: defaultDimensions.width,
  buildingLength: defaultDimensions.length,
  buildingHeight: defaultDimensions.height,
  buildingPitch: defaultDimensions.pitch,
  doorMethod: 'method1',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODEL_TYPE': {
      const dimensions = getDimensionsForModelType(action.payload);
      return {
        ...state,
        modelType: action.payload,
        buildingWidth: dimensions.width,
        buildingLength: dimensions.length,
        buildingHeight: dimensions.height,
        buildingPitch: dimensions.pitch,
      };
    }
    case 'SET_BUILDING_WIDTH':
      return { ...state, buildingWidth: action.payload };
    case 'SET_BUILDING_LENGTH':
      return { ...state, buildingLength: action.payload };
    case 'SET_BUILDING_HEIGHT':
      return { ...state, buildingHeight: action.payload };
    case 'SET_BUILDING_PITCH':
      return { ...state, buildingPitch: action.payload };
    case 'SET_DOOR_METHOD':
      return { ...state, doorMethod: action.payload };
    default:
      return state;
  }
};

export default reducer;
