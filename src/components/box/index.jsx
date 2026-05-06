import React from "react";
import * as THREE from 'three';

const Box = () => {
	
	const boxShape = new THREE.Shape();
	boxShape.moveTo(-1, 0);
	boxShape.lineTo(-1, 1);
	boxShape.lineTo(1, 1);
	boxShape.lineTo(1, 0);
	boxShape.closePath();
	
	const extrudeSetting  = (value) => {
		return{
			depth : value,
			bevelEnabled : false
		};
	};
	
	return (
		<>
			<extrudeGeometry args={[boxShape, extrudeSetting(4)]} />
			<meshStandardMaterial color={'red'} />
		</>
	)
}

export default Box;