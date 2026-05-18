import * as THREE from 'three'
import React from "react";
import InsideWall from './InsideWall';
import OutsideWall from './OutsideWall';
import {useSelector} from 'react-redux';

const WallModel=({modelType}) => {
	return (
		<>
			<InsideWall modelType={modelType} />
			<OutsideWall modelType={modelType} />
		</>
	)
}

export default WallModel;