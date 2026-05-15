export const setModelType = (modelType) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MODEL_TYPE',
      payload: modelType,
    });
  };
};

export const setBuildingWidth = (width) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_BUILDING_WIDTH',
      payload: width,
    });
  };
};

export const setBuildingHeight = (height) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_BUILDING_HEIGHT',
      payload: height,
    });
  };
};

export const setDoorMethod = (method) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_DOOR_METHOD',
      payload: method,
    });
  };
};
