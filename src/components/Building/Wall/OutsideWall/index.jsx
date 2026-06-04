import React, {useMemo, useEffect} from 'react'
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
	const doubleDoorOnClick = useSelector((state) => state.controlReducer.doubleDoorOnClick);
	const walkInDoorOnClick = useSelector((state) => state.controlReducer.walkInDoorOnClick);
	const SingleCurveDoorLeftPosition = useSelector((state) => state.dragPositionReducer.singleCurveDoorLeftPosition);
	const singleCurveDoorRightPosition = useSelector((state) => state.dragPositionReducer.singleCurveDoorRightPosition);
	const additionalDoorData = useSelector((state) => state.building.additionalDoorData);
	const doubleDoorLeftPosition = useSelector((state) => state.dragPositionReducer.doubleDoorLeftPosition);
	const doubleDoorRightPosition = useSelector((state) => state.dragPositionReducer.doubleDoorRightPosition);
	
	const leftDoorData = useMemo(() => {
		return additionalDoorData.filter((s) => s.direction === 'left');
	}, [additionalDoorData]);

	const rightDoorData = useMemo(() => {
		return additionalDoorData.filter((s) => s.direction === 'right');
	}, [additionalDoorData]);

	const leftWallSideShape=new THREE.Shape();
	leftWallSideShape.moveTo(-length/2-3,-5);
	leftWallSideShape.lineTo(-length/2-3,height+5);
	leftWallSideShape.lineTo(length/2+3,height+5);
	leftWallSideShape.lineTo(length/2+3,-5);
	leftWallSideShape.closePath();
	
	const rightWallSideShape=new THREE.Shape();
	rightWallSideShape.moveTo(-length/2-3,-5);
	rightWallSideShape.lineTo(-length/2-3,height+5);
	rightWallSideShape.lineTo(length/2+3,height+5);
	rightWallSideShape.lineTo(length/2+3,-5);
	rightWallSideShape.closePath();
	
	rightDoorData.forEach(item => {
		const doorHole = new THREE.Shape();
		if(item.groupType === 'DoubleDoorModel') {
			if(item.doorType === 'double_pattern_door' && doubleDoorOnClick) {
				doorHole.moveTo(-item.width / 2 - doubleDoorRightPosition.z, 0);
				doorHole.lineTo(-item.width / 2 - doubleDoorRightPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - doubleDoorRightPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - doubleDoorRightPosition.z, 0);
				doorHole.closePath();
				rightWallSideShape.holes.push(doorHole);
			}
		}
		
		if(item.groupType === 'WalkInDoorModel') {
			if(item.doorType === 'Single_Curve_Door' && walkInDoorOnClick) {
				 doorHole.moveTo(-item.width / 2 - singleCurveDoorRightPosition.z, 0);
				 doorHole.lineTo(-item.width / 2 - singleCurveDoorRightPosition.z, item.height / 4 * 3);
				 doorHole.quadraticCurveTo(-item.width / 2 - singleCurveDoorRightPosition.z, item.height, -singleCurveDoorRightPosition.z, item.height);
				 doorHole.quadraticCurveTo(item.width / 2 - singleCurveDoorRightPosition.z, item.height, item.width / 2 - singleCurveDoorRightPosition.z, item.height / 4 * 3);
				 doorHole.lineTo(item.width / 2 - singleCurveDoorRightPosition.z, 0);
				 doorHole.closePath();
				 rightWallSideShape.holes.push(doorHole);
			 }
		}
	});

	leftDoorData.forEach(item => {
		const doorHole = new THREE.Shape();
		if(item.groupType === 'DoubleDoorModel') {
			if(item.doorType === 'double_pattern_door' && doubleDoorOnClick) {
				doorHole.moveTo(-item.width / 2 - doubleDoorLeftPosition.z, 0);
				doorHole.lineTo(-item.width / 2 - doubleDoorLeftPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - doubleDoorLeftPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - doubleDoorLeftPosition.z, 0);
				doorHole.closePath();
				leftWallSideShape.holes.push(doorHole);
			}
		}
		
		if(item.groupType === 'WalkInDoorModel') {
			if(item.doorType === 'Single_Curve_Door' && walkInDoorOnClick) {
				doorHole.moveTo(-item.width / 2 - SingleCurveDoorLeftPosition.z, 0);
				doorHole.lineTo(-item.width / 2 - SingleCurveDoorLeftPosition.z, item.height / 4 * 3);
				doorHole.quadraticCurveTo(-item.width / 2 - SingleCurveDoorLeftPosition.z, item.height, -SingleCurveDoorLeftPosition.z, item.height);
				doorHole.quadraticCurveTo(item.width / 2 - SingleCurveDoorLeftPosition.z, item.height, item.width / 2 - SingleCurveDoorLeftPosition.z, item.height / 4 * 3);
				doorHole.lineTo(item.width / 2 - SingleCurveDoorLeftPosition.z, 0);
				doorHole.closePath();
				leftWallSideShape.holes.push(doorHole);
			 }
		}
	});
	
	return (
		<>
			<mesh name='right wall' rotation={[0,Math.PI/2,0]} position={[-width/2-4,0,0]} >
				<extrudeGeometry args={[rightWallSideShape,extrudeSetting(2)]} />
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
			<mesh name='left wall' rotation={[0,Math.PI/2,0]} position={[width/2+2,0,0]} >
				<extrudeGeometry args={[leftWallSideShape,extrudeSetting(2)]} />
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