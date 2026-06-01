import React, {useMemo} from 'react'
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
	const transParent = useSelector((state) => state.controlReducer.transparentBuild);
	const additionalDoorData = useSelector((state) => state.building.additionalDoorData);
	const leftPosition = useSelector((state) => state.dragPositionReducer.leftPosition);
	const rightPosition = useSelector((state) => state.dragPositionReducer.rightPosition);

	const leftDoorData = useMemo(() => {
			return additionalDoorData.filter((s) => s.direction === 'left');
		}, [additionalDoorData]);
	
		const rightDoorData = useMemo(() => {
			return additionalDoorData.filter((s) => s.direction === 'right');
		}, [additionalDoorData]);
		
	const frontBottomWall=new THREE.Shape()
	frontBottomWall.moveTo(-width/2,0);
	frontBottomWall.lineTo(-width/2,height);
	frontBottomWall.lineTo(width/2,height);
	frontBottomWall.lineTo(width/2,0);
	frontBottomWall.closePath();

	const leftSideWall=new THREE.Shape();
	leftSideWall.moveTo(-length/2,0);
	leftSideWall.lineTo(-length/2,height);
	leftSideWall.lineTo(length/2,height);
	leftSideWall.lineTo(length/2,0);
	leftSideWall.closePath();
	
	const rightSideWall=new THREE.Shape();
	rightSideWall.moveTo(-length/2,0);
	rightSideWall.lineTo(-length/2,height);
	rightSideWall.lineTo(length/2,height);
	rightSideWall.lineTo(length/2,0);
	rightSideWall.closePath();
	
	leftDoorData.forEach(item => {
		const doorHole = new THREE.Shape();
		if(item.groupType === 'DoubleDoorModel') {
			if(item.doorType === 'double_pattern_door') {
				doorHole.moveTo(-item.width / 2 - rightPosition.z, 0);
				doorHole.lineTo(-item.width / 2 - rightPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - rightPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - rightPosition.z, 0);
				doorHole.closePath();
			}
			leftSideWall.holes.push(doorHole);
		}
	});
	
	rightDoorData.forEach(item => {
		const doorHole = new THREE.Shape();
		if(item.groupType === 'DoubleDoorModel') {
			if(item.doorType === 'double_pattern_door') {
				doorHole.moveTo(-item.width / 2 - leftPosition.z, 0);
				doorHole.lineTo(-item.width / 2 - leftPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - leftPosition.z, item.height);
				doorHole.lineTo(item.width / 2 - leftPosition.z, 0);
				doorHole.closePath();
			}
			rightSideWall.holes.push(doorHole);
		}
	});

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
						transparent
						opacity={transParent ? 0.05 : 1}
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
						transparent
						opacity={transParent ? 0.05 : 1}
					/>
				</mesh>
				<mesh name='leftwall' rotation={[0,Math.PI/2,0]} position={[-width/2,0,0]}>
					<extrudeGeometry args={[leftSideWall,extrudeSetting(1.5)]} />
					<meshStandardMaterial
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
				<mesh name='rightwall' rotation={[0,Math.PI/2,0]} position={[width/2-1.5,0,0]}>
					<extrudeGeometry args={[rightSideWall,extrudeSetting(1.5)]} />
					<meshStandardMaterial
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
			</group>

			{modelType==='gable_building'&&<GableWall />}
			{modelType==='lofted_building'&&< LoftedWall />}
		</>
	)
}


export default InsideWall