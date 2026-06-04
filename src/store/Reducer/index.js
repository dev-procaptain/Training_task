import {
  DEFAULT_MODEL_TYPE,
  getDimensionsForModelType,
} from '../../utils/InitData';
import {setStartPosition, updateStatePosition} from '../Action';

const defaultDimensions = getDimensionsForModelType(DEFAULT_MODEL_TYPE);

export const initialState = {
  modelType: DEFAULT_MODEL_TYPE,
  buildingWidth: defaultDimensions.width,
  buildingLength: defaultDimensions.length,
  buildingHeight: defaultDimensions.height,
  buildingPitch: defaultDimensions.pitch,
  doorMethod: 'method1',
  additionalDoorData: defaultDimensions.additionalDoorData,
};

export const controlInitalState = {
  rotateBuild: false,
  insideBuild: false,
  transparentBuild: false,
  doubleDoorOnClick: false,
  walkInDoorOnClick: false,
}

export const dragPositionInitialState = {
  doubleDoorLeftPosition: {
    x: 0,
    y: 0,
    z: 100,
  },
  doubleDoorRightPosition: {
    x: 0,
    y: 0,
    z: 100,
  },
  singleCurveDoorLeftPosition: {
    x: 0,
    y: 0,
    z: -100,
  },
  singleCurveDoorRightPosition: {
    x: 0,
    y: 0,
    z: -100,
  },

}

export const controlReducer = (state = controlInitalState, action) => {
  switch (action.type) {
    case 'SET_AUTO_ROTATE': 
      return {
        ...state,
        rotateBuild: action.payload
    }
    
    case 'SET_Inside_Build':
      return {
        ...state,
        insideBuild: action.payload
      }
      
      case 'SET_Transparent_Build':
        return {
          ...state,
          transparentBuild: action.payload
        }
        
      case 'SET_DoubleDoor_Onclick':
        return {
          ...state,
          doubleDoorOnClick: action.payload
        }
        
      case 'SET_WalkInDoor_Onclick':
        return {
          ...state,
          walkInDoorOnClick: action.payload
        }
  default:
    return state;
  }
}

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
        additionalDoorData: dimensions.additionalDoorData,
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

export const dragPositionReducer = (state = dragPositionInitialState, action) => {
  switch (action.type) {
    case 'SET_Start_Position': 
    if ( action.payload.id === 3) {
      return {
        ...state,
        doubleDoorLeftPosition: {
          x: action.payload.x,
          y: action.payload.y,
          z: action.payload.z,
        }
      };
    } else if (action.payload.id === 4) {
      return  {
        ...state,
        doubleDoorRightPosition: {
          x: action.payload.x,
          y: action.payload.y,
          z: action.payload.z,
        }
      };
    } else if (action.payload.id === 5) {
      return  {
        ...state,
        singleCurveDoorLeftPosition: {
          x: action.payload.x,
          y: action.payload.y,
          z: action.payload.z,
        }
      };
    } else if (action.payload.id === 6) {
      return  {
        ...state,
        singleCurveDoorRightPosition: {
          x: action.payload.x,
          y: action.payload.y,
          z: action.payload.z,
        }
      };
    }
    default:
      return state;
  }
}

export default reducer;
