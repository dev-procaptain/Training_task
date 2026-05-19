import React from 'react'
import * as THREE from 'three';
import {extrudeSetting} from '../../../utils/Function';
import {useLoader} from '@react-three/fiber';
import {TextureLoader} from 'three'
import roostTexture from '../../../assets/imgs/leg_texture_old.jpg'

const RoostModel=() => {
	const legMap=useLoader(TextureLoader,roostTexture);
	legMap.wrapS=THREE.RepeatWrapping;
	legMap.wrapT=THREE.RepeatWrapping;
	legMap.colorSpace=THREE.SRGBColorSpace;
	legMap.repeat.set(0.02,0.01);
	legMap.flipY=false;

	const roostAngle=Math.PI/5;
	const roostBowThickness=3;
	const roostBowLength=60;    // 5ft=60inch
	const roostWidth=roostBowLength*Math.cos(roostAngle);
	const roostHeight=roostBowLength*Math.sin(roostAngle);
	const roostRailWidth=2;
	const roostRailHeight=1;
	const roostRailLength=26.5;   //26.5inch
	const roostOffset=5;
	const startWidth=10;
	const roostRailDistanceX=8;
	const roostRailDistanceY=Math.tan(roostAngle)*roostRailDistanceX;
	const startHeight=Math.tan(roostAngle)*startWidth;
	const railModel=[];

	const bowShape=new THREE.Shape();
	bowShape.moveTo(roostWidth,0);
	bowShape.lineTo(roostWidth-roostBowThickness/Math.sin(roostAngle),0);
	bowShape.lineTo(0,roostHeight-roostBowThickness/Math.cos(roostAngle));
	bowShape.lineTo(0,roostHeight)
	bowShape.closePath();

	for(let count=0;count<5;count++) {
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
					<meshStandardMaterial
						bumpMap={legMap}
						bumpScale={0.2}
						map={legMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
				<mesh name='right_bow' rotation={[0,-Math.PI/2,0]} position={[roostRailLength,0,0]}>
					<extrudeGeometry args={[bowShape,extrudeSetting(3)]} />
					<meshStandardMaterial
						bumpMap={legMap}
						bumpScale={0.2}
						map={legMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>

				</mesh>
			</group>

			<group name='rail'>
				<mesh rotation={[0,-Math.PI/2,0]} position={[roostRailLength+roostOffset/2,0,0]}>
					<extrudeGeometry args={[railModel,extrudeSetting(roostRailLength+3+roostOffset)]} />
					<meshStandardMaterial
						bumpMap={legMap}
						bumpScale={0.2}
						map={legMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
			</group>
		</>
	)
}

export default RoostModel