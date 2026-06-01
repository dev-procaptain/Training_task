import React from 'react';
import {useSelector} from 'react-redux';
import Truss from './Truss';
import WallModel from './Wall';
import Roof from './Roof';
import DoorWindowModel from './AdditionalComponents/DoorWindowModel';

export default function Building({orbitRef}) {
  const modelType=useSelector((state) => state.building.modelType);

  return (
    <>
      <Truss modelType={modelType} />
      <WallModel modelType={modelType} />
      <Roof modelType={modelType} />

      <DoorWindowModel orbitRef = {orbitRef}/>
    </>
  );
}
