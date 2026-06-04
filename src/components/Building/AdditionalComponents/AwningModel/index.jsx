import React from 'react'
import * as THREE from 'three';
import {extrudeSetting} from '../../../../utils/Function';
import {useSelector} from 'react-redux';
import {useLoader} from '@react-three/fiber';
import {TextureLoader} from 'three';
import roofTexture from '../../../../assets/imgs/plywood.png';
import trimTexture from '../../../../assets/imgs/leg_texture_old.jpg';

const AwningModel = () => {
	const roofMap=useLoader(TextureLoader,roofTexture);
	roofMap.wrapS=THREE.RepeatWrapping;
	roofMap.wrapT=THREE.RepeatWrapping;
	roofMap.colorSpace=THREE.SRGBColorSpace;
	roofMap.repeat.set(0.05,0.02);
	roofMap.flipY=false;
	
	const trimMap=useLoader(TextureLoader,trimTexture);
	trimMap.wrapS=THREE.RepeatWrapping;
	trimMap.wrapT=THREE.RepeatWrapping;
	trimMap.colorSpace=THREE.SRGBColorSpace;
	trimMap.repeat.set(0.09,0.01);
	trimMap.needsUpdate = true;
	trimMap.flipY=false;
	
	const buildingLength = useSelector((state) => state.building.buildingLength);
	const buildingHeight = useSelector((state) => state.building.buildingHeight);
	const roofWidth = 30;
	const frontTrimWidth = 2;
	const roofThk = 3;
	const trimWidth = roofWidth -5;
	const trimThk = 5;
	const angle = Math.PI / 9;
	const roofLength = 300;
	const legWidth = 15;
	const legheight = 5;
	
	const roofModel = new THREE.Shape();
	roofModel.moveTo(0, 0);
	roofModel.lineTo(0, roofThk / Math.cos(angle));
	roofModel.lineTo(roofWidth + roofThk * Math.sin(angle), roofThk / Math.cos(angle) - (roofWidth + roofThk * Math.sin(angle)) * Math.tan(angle));
	roofModel.lineTo(roofWidth, 0 - roofWidth * Math.tan(angle));
	roofModel.closePath();
	
	const sideTrimModel = new THREE.Shape();
	sideTrimModel.moveTo(0, 0);
	sideTrimModel.lineTo(0, trimThk / Math.cos(angle));
	sideTrimModel.lineTo(trimWidth + trimThk * Math.sin(angle), trimThk / Math.cos(angle) - (trimWidth + trimThk * Math.sin(angle)) * Math.tan(angle));
	sideTrimModel.lineTo(trimWidth, 0 - trimWidth * Math.tan(angle));
	sideTrimModel.closePath();
	
	const frontTrimModel = new THREE.Shape();
	frontTrimModel.moveTo(trimWidth, 0 - trimWidth * Math.tan(angle));
	frontTrimModel.lineTo(trimWidth + trimThk * Math.sin(angle), trimThk / Math.cos(angle) - (trimWidth + trimThk * Math.sin(angle)) * Math.tan(angle));
	frontTrimModel.lineTo(trimWidth + trimThk * Math.sin(angle) + frontTrimWidth * Math.cos(angle), 0 - trimWidth * Math.tan(angle) + trimThk * Math.cos(angle) - frontTrimWidth * Math.sin(angle));
	frontTrimModel.lineTo(trimWidth + frontTrimWidth * Math.cos(angle), 0 - trimWidth * Math.tan(angle) - frontTrimWidth * Math.sin(angle));
	frontTrimModel.closePath();
	
	return (
		
		<group rotation={[0, Math.PI / 2, 0]} position={[0, buildingHeight - 30, -buildingLength / 2 - 3.5]}>
			<group name='roof'>
				<mesh>
					<extrudeGeometry args={[roofModel, extrudeSetting(roofLength / 2)]} />
					<meshStandardMaterial
						bumpMap={roofMap}
						bumpScale={0.2}
						map={roofMap}
						color={'#d9d9d9'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
						/>
				</mesh>
				<mesh position={[0, 0, -roofLength / 2]}>
					<extrudeGeometry args={[roofModel, extrudeSetting(roofLength / 2)]} />
					<meshStandardMaterial
						bumpMap={roofMap}
						bumpScale={0.2}
						map={roofMap}
						color={'#d9d9d9'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
						/>
				</mesh>
			</group>
			
			<group name='trim'>
				<mesh name='left' position={[0, - trimThk / Math.cos(angle) - 0.1, roofLength / 2 - roofThk * 2]}>
					mesh.geometry.attributes.uv;
					<extrudeGeometry args={[sideTrimModel, extrudeSetting(roofThk)]} />
					<meshStandardMaterial
						bumpMap={trimMap}
						bumpScale={0.2}
						map={trimMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
						/>
				</mesh>
				<mesh name='right' position={[0, - trimThk / Math.cos(angle) - 0.1, -roofLength / 2 + roofThk]}>
					<extrudeGeometry args={[sideTrimModel, extrudeSetting(roofThk)]} />
					<meshStandardMaterial
						bumpMap={trimMap}
						bumpScale={0.2}
						map={trimMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
				<mesh position={[0, - trimThk / Math.cos(angle) - 0.1, 0]}>
					<extrudeGeometry args={[frontTrimModel, extrudeSetting(roofLength / 2 - roofThk)]} />
					<meshStandardMaterial
						bumpMap={trimMap}
						bumpScale={0.2}
						map={trimMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
				<mesh position={[0, - trimThk / Math.cos(angle) - 0.1, -roofLength / 2 + roofThk]}>
					<extrudeGeometry args={[frontTrimModel, extrudeSetting(roofLength / 2 - roofThk)]} />
					<meshStandardMaterial
						bumpMap={trimMap}
						bumpScale={0.2}
						map={trimMap}
						color={'#8c8c8c'}
						side={THREE.DoubleSide}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
			</group>
		</group>
	)
}

export default AwningModel