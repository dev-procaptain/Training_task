import React from 'react';
import {taskStore} from "../../store"
import DoorModel from "./Door";
import WindowModel from "./Window";
import CurvedoorModel from './CurveDoor';
import Truss from './Truss';

const taskComponents={
	'SS1-T1211': <WindowModel />,
	'SS1-T1242': <DoorModel />,
	'Curve_door': <CurvedoorModel />,
	'Truss': <Truss />,
}
export default function Building() {
	const {taskInfo}=taskStore();
	return (
		<>
			{taskComponents[taskInfo]}
		</>
	)
}
