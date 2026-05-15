import React from 'react';
import { MODEL_TYPES, useAppSelector, selectModelType } from '../../store';
import DoorModel from './Door';
import WindowModel from './Window';
import CurvedoorModel from './CurveDoor';
import Truss from './Truss';

const taskComponents = {
  [MODEL_TYPES.WINDOW]: <WindowModel />,
  [MODEL_TYPES.DOOR]: <DoorModel />,
  [MODEL_TYPES.CURVE_DOOR]: <CurvedoorModel />,
  [MODEL_TYPES.TRUSS]: <Truss />,
};

export default function Building() {
  const modelType = useAppSelector(selectModelType);
  return <>{taskComponents[modelType]}</>;
}
