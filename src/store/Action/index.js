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

export const setBuildingLength = (length) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_BUILDING_LENGTH',
      payload: length,
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

export const setBuildingPitch = (pitch) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_BUILDING_PITCH',
      payload: pitch,
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

export const setAutoRotate = (method) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_AUTO_ROTATE',
      payload: method,
    });
  };
};

export const setInsideRotate = (distance) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_Inside_Build',
      payload: distance,
    });
  };
};

export const setTransparent = (method) => {
  return (dispatch) => {
    dispatch({
      type: '                                   ',
      payload: method,
    });
  };
};
