import React from 'react'
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import insideRoofTexture from '../../../../../assets/imgs/premium.png';

const GableRoof=() => {
	const colorMap=useLoader(TextureLoader,insideRoofTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.015,0.01);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);
	const pitchRatio=pitchRise/12;
	const railWidth=4;

	const roofHeight=(width/2-railWidth-1)*pitchRatio;

	const roofShape=new THREE.Shape()
	roofShape.moveTo(-width/2+1,0);
	roofShape.lineTo(0,roofHeight+railWidth);
	roofShape.lineTo(width/2-1,0);
	roofShape.lineTo(width/2,0);
	roofShape.lineTo(0,roofHeight+railWidth+1);
	roofShape.lineTo(-width/2,0);
	roofShape.closePath();

	return (
		<>
			<group>
				<mesh position={[0,height+5,-length/2]}>
					<extrudeGeometry args={[roofShape,extrudeSetting(length)]} />
					<meshLambertMaterial
						bumpMap={colorMap}
						bumpScale={0.2}
						map={colorMap}
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

export default GableRoof