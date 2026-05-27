import React from 'react'
import GableWall from './GableWall'
import LoftedWall from './LoftedWall'
import {useSelector} from 'react-redux'
import * as THREE from 'three';
import outsideWallTexture from '../../../../assets/imgs/ridge.png';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import {extrudeSetting} from '../../../../utils/Function'


const OutsideWall=({modelType}) => {
	const colorMap=useLoader(TextureLoader,outsideWallTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.02);
	colorMap.flipY=false;

	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const width=useSelector((state) => state.building.buildingWidth);
	const transParent = useSelector((state) => state.controlReducer.transparentBuild);

	const wallSideShape=new THREE.Shape();
	wallSideShape.moveTo(-length/2-3,-5);
	wallSideShape.lineTo(-length/2-3,height+5);
	wallSideShape.lineTo(length/2+3,height+5);
	wallSideShape.lineTo(length/2+3,-5);
	wallSideShape.closePath();
	return (
		<>
			<mesh name='left wall' rotation={[0,Math.PI/2,0]} position={[-width/2-4,0,0]} >
				<extrudeGeometry args={[wallSideShape,extrudeSetting(2)]} />
				<meshLambertMaterial
					bumpMap={colorMap}
					bumpScale={0.2}
					map={colorMap}
					color={'#8c8c8c'}
					side={THREE.DoubleSide}
					roughness={0.8}
					metalness={0}
					transparent
					opacity={transParent ? 0.05 : 1}
				/>
			</mesh>
			<mesh name='right wall' rotation={[0,Math.PI/2,0]} position={[width/2+2,0,0]} >
				<extrudeGeometry args={[wallSideShape,extrudeSetting(2)]} />
				<meshLambertMaterial
					bumpMap={colorMap}
					bumpScale={0.2}
					map={colorMap}
					color={'#8c8c8c'}
					side={THREE.DoubleSide}
					roughness={0.8}
					metalness={0}
					transparent
					opacity={transParent ? 0.05 : 1}
				/>
			</mesh>
			{modelType==='gable_building'&&<GableWall />}
			{modelType==='lofted_building'&&< LoftedWall />}
		</>
	)
}

export default OutsideWall