import * as THREE from 'three';
import React from 'react'
import { useAppSelector, selectBuildingWidth, selectBuildingHeight } from '../../../store';

const FlagModel=() => {
	const width=useAppSelector(selectBuildingWidth);
	const height=useAppSelector(selectBuildingHeight);

	const outTrimShape=new THREE.Shape();
	outTrimShape.moveTo()

	return (
		<>
			<boxGeometry args={[20,20,20]} />
			<meshStandardMaterial color={'red'} />
		</>
	)
}

export default FlagModel