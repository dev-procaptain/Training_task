import React from 'react'
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import outsideWallTexture from '../../../../../assets/imgs/ridge.png';

const LoftedWall=() => {
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
	const roofWidth=width-2-railWidth*2;
	const roofHeight=(roofWidth/2)*pitchRatio;
	const roofBottomHeight=(roofWidth/2)*pitchRatio/3*2;
	const roofBottomPitchRatio=pitchRatio*1.5;
	const roofWidthone=roofBottomHeight/roofBottomPitchRatio;

	const wallWidth=width+4;
	const wallWidthOne=railWidth+roofWidthone+2;
	const wallHeight=height+5+roofHeight+railWidth+1;
	const wallBottomHeight=height+roofBottomHeight+5+railWidth+1;

	const wallFrontShape=new THREE.Shape()
	wallFrontShape.moveTo(-wallWidth/2,-5);
	wallFrontShape.lineTo(-wallWidth/2,height+5);
	wallFrontShape.lineTo(-wallWidth/2+wallWidthOne,wallBottomHeight);
	wallFrontShape.lineTo(0,wallHeight);
	wallFrontShape.lineTo(wallWidth/2-wallWidthOne,wallBottomHeight);
	wallFrontShape.lineTo(wallWidth/2,height+5);
	wallFrontShape.lineTo(wallWidth/2,-5);
	wallFrontShape.closePath();

	return (
		<>
			<group>
				<mesh name='front_wall' position={[0,0,length/2]} >
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
				<mesh name='back_wall' position={[0,0,-length/2-2]} >
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
			</group>
		</>
	)
}

export default LoftedWall