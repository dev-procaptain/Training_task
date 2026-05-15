export const MODEL_TYPES = {
  WINDOW: 'window',
  DOOR: 'door',
  CURVE_DOOR: 'curveDoor',
  TRUSS: 'truss',
};

export const MODEL_TYPE_OPTIONS = Object.values(MODEL_TYPES);

export const DEFAULT_DIMENSIONS_BY_MODEL = {
  [MODEL_TYPES.WINDOW]: { width: 4.5, height: 2 },
  [MODEL_TYPES.DOOR]: { width: 10.5, height: 9 },
  [MODEL_TYPES.CURVE_DOOR]: { width: 4.5, height: 7.5 },
  [MODEL_TYPES.TRUSS]: { width: 25, height: 15 },
};

const defaultModelType = MODEL_TYPES.WINDOW;
const defaultDimensions = DEFAULT_DIMENSIONS_BY_MODEL[defaultModelType];

export const initialState = {
  modelType: defaultModelType,
  buildingWidth: defaultDimensions.width,
  buildingHeight: defaultDimensions.height,
  doorMethod: 'method1',
};

const getDimensionsForModelType = (modelType) =>
  DEFAULT_DIMENSIONS_BY_MODEL[modelType] ??
  DEFAULT_DIMENSIONS_BY_MODEL[MODEL_TYPES.WINDOW];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODEL_TYPE': {
      const { width, height } = getDimensionsForModelType(action.payload);
      return {
        ...state,
        modelType: action.payload,
        buildingWidth: width,
        buildingHeight: height,
      };
    }
    case 'SET_BUILDING_WIDTH':
      return { ...state, buildingWidth: action.payload };
    case 'SET_BUILDING_HEIGHT':
      return { ...state, buildingHeight: action.payload };
    case 'SET_DOOR_METHOD':
      return { ...state, doorMethod: action.payload };
    default:
      return state;
  }
};

export default reducer;
