import React from 'react'
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';

const Jointer_1 = () => {
	const width = 10;
	const height = 5;
	const radius = 32;
	const offset1 = 0.1;
	const offset2 = 0.5;
	
	const shape = new THREE.Shape();

    shape.moveTo(0, 0);
		shape.lineTo(0, offset1)
    shape.lineTo(
      (width / 6) * 5 - offset1,
      height / 8
    );
    shape.quadraticCurveTo(
      (width / 6) * 5,
      height / 8,
      (width / 6) * 5 + offset1,
      (height / 8) * 2
    );
    shape.quadraticCurveTo(
      (width / 6) * 5 + offset1 * 2,
      (height / 8) * 2 + offset1,
      (width / 6) * 5 + offset2,
      height / 8 + offset2
    );
    shape.quadraticCurveTo(
      (width / 6) * 5 + offset2 + offset1,
       height / 8 + offset2 - offset1,
      (width / 6) * 5 + offset2 * 2,
      height / 8 * 2 + offset1
    );
    shape.lineTo(width, height / 2);
		shape.lineTo(width + offset1 * 2, height / 2);
		shape.lineTo(width + offset1 * 2, height / 8 * 2 + offset2);
		shape.lineTo(width + offset1 * 2 + offset1 * 2, height / 8 * 2)
    shape.lineTo(width + offset1 * 2 + offset1 * 2, 0);
    shape.closePath();

	return (
		<group rotation={[0, Math.PI, 0]} position={[width, 0, 0]}>
			<group name='cylinder'  position={[0, 0, 0]}>
				<mesh rotation={[Math.PI / 2, 0, 0]}>
					<cylinderGeometry args={[0.5, 0.5, 0.3, radius]} />
					<meshStandardMaterial color="black" />
				</mesh>
				<mesh rotation={[Math.PI / 2, 0, 0]} position={[width, height / 2, 0]}>
					<cylinderGeometry args={[0.5, 0.5, 0.3, radius]} />
					<meshStandardMaterial color="black" />
				</mesh>
				<mesh rotation={[Math.PI / 2, 0, 0]} position={[width, -height / 2, 0]}>
					<cylinderGeometry args={[0.5, 0.5, 0.3, radius]} />
					<meshStandardMaterial color="black" />
				</mesh>
			</group>
			
			<group name='body'  position={[0, 0, 0]}>
				<mesh position={[0, 0, -0.15]}>
					<extrudeGeometry args={[shape, extrudeSetting(0.3)]} />
					<meshStandardMaterial color={'black'} />
				</mesh>
				<mesh rotation={[Math.PI, 0 ,0]} position={[0, 0, 0.15]}>
					<extrudeGeometry args={[shape, extrudeSetting(0.3)]} />
					<meshStandardMaterial color={'black'} />
				</mesh>
			</group>
		</group>
	)
}

export default Jointer_1