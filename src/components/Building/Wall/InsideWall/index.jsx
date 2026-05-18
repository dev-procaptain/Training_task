import React from 'react'
import {useSelector} from 'react-redux'
import * as THREE from 'three';
import {TextureLoader} from 'three'
import insideWallTexture from '../../../../assets/imgs/plywood.png'
import {useLoader} from '@react-three/fiber';
import {extrudeSetting} from '../../../../utils/Function';
import GableWall from './GableWall';
import LoftedWall from './LoftedWall';


const InsideWall=({modelType}) => {
	const colorMap=useLoader(TextureLoader,insideWallTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.03,0.01);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);

	const frontBottomWall=new THREE.Shape()
	frontBottomWall.moveTo(-width/2,0);
	frontBottomWall.lineTo(-width/2,height);
	frontBottomWall.lineTo(width/2,height);
	frontBottomWall.lineTo(width/2,0);
	frontBottomWall.closePath();

	const sideWall=new THREE.Shape();
	sideWall.moveTo(-length/2,0);
	sideWall.lineTo(-length/2,height);
	sideWall.lineTo(length/2,height);
	sideWall.lineTo(length/2,0);
	sideWall.closePath();

	return (
		<>
			<group >
				<mesh name='frontwall' position={[0,0,length/2-1.5]}>
					<extrudeGeometry args={[frontBottomWall,extrudeSetting(1.5)]} />
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
				<mesh name='backwall' position={[0,0,-length/2]}>
					<extrudeGeometry args={[frontBottomWall,extrudeSetting(1.5)]} />
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
				<mesh name='leftwall' rotation={[0,Math.PI/2,0]} position={[-width/2,0,0]}>
					<extrudeGeometry args={[sideWall,extrudeSetting(1.5)]} />
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
				<mesh name='rightwall' rotation={[0,Math.PI/2,0]} position={[width/2-1.5,0,0]}>
					<extrudeGeometry args={[sideWall,extrudeSetting(1.5)]} />
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

			{modelType==='gable_building'&&<GableWall />}
			{modelType==='lofted_building'&&< LoftedWall />}
		</>
	)
}


export default InsideWall