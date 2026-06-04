import React from 'react';

import Truss from './Truss';
import WallModel from './Wall';
import Roof from './Roof';
import DoorWindowModel from './AdditionalComponents/DoorWindowModel';

export default function Building() {

  return (
    <>
      <Truss />
      <WallModel />
      <Roof />

      <DoorWindowModel />
    </>
  );
}
