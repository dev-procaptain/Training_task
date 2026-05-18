import React from 'react'
import * as THREE from 'three';
import {extrudeSetting} from '../../../utils/Function';

const RoostModel=() => {
	const roostAngle=Math.PI/5;
	const roostBowThickness=6;
	const roostBowLength=60;    // 5ft=60inch
	const roostWidth=roostBowLength*Math.cos(roostAngle);
	const roostHeight=roostBowLength*Math.sin(roostAngle);
	const roostRailWidth=3;
	const roostRailHeight=1;
	const roostRailLength=26.5;   //26.5inch
	const roostOffset=5;
	const startWidth=10;
	const roostRailDistanceX=9;
	const roostRailDistanceY=Math.tan(roostAngle)*roostRailDistanceX;
	const startHeight=Math.tan(roostAngle)*startWidth;
	const railModel=[];

	const bowShape=new THREE.Shape();
	bowShape.moveTo(roostWidth,0);
	bowShape.lineTo(roostWidth-roostBowThickness / Math.sin(roostAngle),0);
	bowShape.lineTo(0,roostHeight-roostBowThickness / Math.cos(roostAngle));
	bowShape.lineTo(0,roostHeight);
	bowShape.closePath();

	for(let count=0;count<4;count++) {
		const railShape=new THREE.Shape();
		railShape.moveTo(roostWidth-startWidth-count*(roostRailDistanceX),startHeight+count*roostRailDistanceY);
		railShape.lineTo(roostWidth-startWidth-Math.cos(roostAngle)*roostRailWidth-count*(roostRailDistanceX),startHeight+Math.sin(roostAngle)*roostRailWidth+count*roostRailDistanceY);
		railShape.lineTo(roostWidth-startWidth-Math.cos(roostAngle)*roostRailWidth+Math.cos(Math.PI/2-roostAngle)*roostRailHeight-count*(roostRailDistanceX),startHeight+Math.sin(roostAngle)*roostRailWidth+Math.sin(Math.PI/2-roostAngle)*roostRailHeight+count*roostRailDistanceY);
		railShape.lineTo(roostWidth-startWidth+Math.cos(Math.PI/2-roostAngle)*roostRailHeight-count*(roostRailDistanceX),startHeight+Math.sin(Math.PI/2-roostAngle)*roostRailHeight+count*roostRailDistanceY);
		railShape.closePath();

		railModel.push(railShape);
	}

	return (

		<>
			<group name='bow'>
				<mesh name='left_bow' rotation={[0,-Math.PI/2,0]} position={[0,0,0]}>
					<extrudeGeometry args={[bowShape,extrudeSetting(3)]} />
					<meshStandardMaterial color={'brown'} />
				</mesh>
				<mesh name='right_bow' rotation={[0,-Math.PI/2,0]} position={[roostRailLength,0,0]}>
					<extrudeGeometry args={[bowShape,extrudeSetting(3)]} />
					<meshStandardMaterial color={'brown'} />

				</mesh>
			</group>

			{

				<group name='rail'>
					<mesh rotation={[0,-Math.PI/2,0]} position={[roostRailLength+roostOffset/2,0,0]}>
						<extrudeGeometry args={[railModel,extrudeSetting(roostRailLength+3+roostOffset)]} />
						<meshStandardMaterial color={'blue'} />
					</mesh>
				</group>

			}

		</>
	)
}

export default RoostModel