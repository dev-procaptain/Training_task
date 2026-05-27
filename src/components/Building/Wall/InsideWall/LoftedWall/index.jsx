import React from 'react'
import {useSelector} from 'react-redux'
import {extrudeSetting} from '../../../../../utils/Function';
import * as THREE from 'three';
import {TextureLoader} from 'three'
import insideWallTexture from '../../../../../assets/imgs/plywood.png'
import {useLoader} from '@react-three/fiber';

const LoftedWall=() => {
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
	const transParent = useSelector((state) => state.controlReducer.transparentBuild);

	const tanRoofAngle=pitchRise/12;
	const roofWidth=width-2;
	const roofHeight=roofWidth/2*tanRoofAngle;
	const roofBottomHeight=(roofWidth/2)*tanRoofAngle/3*2;
	const tanRoofbottomAngle=tanRoofAngle*1.3;
	const roofWidthone=roofBottomHeight/tanRoofbottomAngle;

	const wall=new THREE.Shape();
	wall.moveTo(-roofWidth/2,0);
	wall.lineTo(-roofWidth/2+roofWidthone,roofBottomHeight);
	wall.lineTo(0,roofHeight);
	wall.lineTo(roofWidth/2-roofWidthone,roofBottomHeight);
	wall.lineTo(width/2-1,0);
	wall.closePath();

	return (
		<>
			<group name='front wall'>
				<mesh name='front wall' position={[0,height+5,length/2-1.5]}>
					<extrudeGeometry args={[wall,extrudeSetting(1.5)]} />
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
				<mesh name='back wall' position={[0,height+5,-length/2]}>
					<extrudeGeometry args={[wall,extrudeSetting(1.5)]} />
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
		</>
	)
}

export default LoftedWall