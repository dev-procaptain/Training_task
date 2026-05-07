import React from "react";
import * as THREE from 'three'

const WallModel = () => {
	
	return (
		<>
		<mesh position={[0, 25, 0]}>
			<planeGeometry args={[200, 100]} />
			<meshPhongMaterial color={'brown'} />
		</mesh>
		</>
	)
}

export default WallModel;