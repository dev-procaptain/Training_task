import * as THREE from 'three';
import React from 'react'
import {useStore} from '../../../store';

const FlagModel=() => {
	const {sizeInfo}=useStore();
	const width=sizeInfo['Flag'][0];
	const height=sizeInfo['Flag'][1];

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