import React from 'react'
import {useSelector} from 'react-redux'
import * as THREE from 'three';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import insideWallTexture from '../../../../../assets/imgs/plywood.png'
import {extrudeSetting} from '../../../../../utils/Function';

const GableWall=() => {
	const colorMap=useLoader(TextureLoader,insideWallTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.03,0.01);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);
	const pitchRatio=pitchRise/12;
	const railWidth=4;
	const roofHeight=(width/2-railWidth-1)*pitchRatio;

	const wall=new THREE.Shape();
	wall.moveTo(-width/2+1,0);
	wall.lineTo(0,roofHeight+railWidth);
	wall.lineTo(width/2-1,0);
	wall.closePath();

	return (
		<>
			<group>
				<mesh name='frontwall' position={[0,height+5,length/2-1.5]}>
					<extrudeGeometry args={[wall,extrudeSetting(1.5)]} />
					<meshStandardMaterial
						bumpMap={colorMap}
						bumpScale={0.2}
						map={colorMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
				<mesh name='backwall' position={[0,height+5,-length/2]}>
					<extrudeGeometry args={[wall,extrudeSetting(1.5)]} />
					<meshStandardMaterial
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

export default GableWall