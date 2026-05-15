import React from 'react';
import { useSelector } from 'react-redux';
import Truss from './Truss';

export default function Building() {
  const modelType = useSelector((state) => state.building.modelType);

  return (
    <group>
      <Truss modelType={modelType} />
    </group>
  );
}
