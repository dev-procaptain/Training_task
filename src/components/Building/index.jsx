import React from 'react';
import {useSelector} from 'react-redux';
import Truss from './Truss';
import WallModel from './Wall';
import Roof from './Roof';
import RoostModel from './Roost';

export default function Building() {
  const modelType=useSelector((state) => state.building.modelType);

  return (
    <group>
      {/*<Truss modelType={modelType} />
      <WallModel modelType={modelType} />
      <Roof modelType={modelType} />*/}
      <RoostModel />
    </group>
  );
}
