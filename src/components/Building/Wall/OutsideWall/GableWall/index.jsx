import React from 'react'
import {useSelector} from 'react-redux'
import {extrudeSetting} from '../../../../../utils/Function';
import * as THREE from 'three';
import outsideWallTexture from '../../../../../assets/imgs/ridge.png';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';

const GableWall=() => {
	const colorMap=useLoader(TextureLoader,outsideWallTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.02);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);

	const pitchRatio=pitchRise/12;
	const railWidth=4;
	const roofHeight=(width/2-railWidth-1)*pitchRatio;
	const wallHeight=height+6+roofHeight+railWidth;

	const wallFrontShape=new THREE.Shape();
	wallFrontShape.moveTo(-width/2-2,-5);
	wallFrontShape.lineTo(-width/2-2,height+5);
	wallFrontShape.lineTo(0,wallHeight);
	wallFrontShape.lineTo(width/2+2,height+5);
	wallFrontShape.lineTo(width/2+2,-5);
	wallFrontShape.closePath();

	const wallSideShape=new THREE.Shape();
	wallSideShape.moveTo(-length/2,-5);
	wallSideShape.lineTo(-length/2,height+5);
	wallSideShape.lineTo(length/2,height+5);
	wallSideShape.lineTo(length/2,-5);
	wallSideShape.closePath();

	return (
		<>
			<group >
				<mesh name='front wall' position={[0,0,length/2]}>
					<extrudeGeometry args={[wallFrontShape,extrudeSetting(2)]} />
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
				<mesh name='back wall' position={[0,0,-length/2-2]}>
					<extrudeGeometry args={[wallFrontShape,extrudeSetting(2)]} />
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
				<mesh name='left wall' rotation={[0,Math.PI/2,0]} position={[-width/2-2,0,0]} >
					<extrudeGeometry args={[wallSideShape,extrudeSetting(2)]} />
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
				<mesh name='right wall' rotation={[0,Math.PI/2,0]} position={[width/2,0,0]} >
					<extrudeGeometry args={[wallSideShape,extrudeSetting(2)]} />
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

export default GableWall