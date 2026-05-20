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
	const tanRoofAngle=pitchRise/12;
	const dstRailL=30;
	const railThickness=3;
	const railThk=1;
	const roofWidth=width-2;
	const roofHeight=roofWidth/2*tanRoofAngle;
	const roofBottomHeight=(roofWidth/2)*tanRoofAngle/3*2;
	const tanRoofbottomAngle=tanRoofAngle*1.3;
	const roofWidthone=roofBottomHeight/tanRoofbottomAngle;
	const tanRoofTopAngle=(roofWidth/2-roofWidthone)/(roofHeight-roofBottomHeight);
	const railWidth=railThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
	const railHeight=railThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
	const outerRoofWidth=tanRoofTopAngle*(tanRoofbottomAngle*(roofWidth/2+railWidth)-(roofHeight+railHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const outerRoofHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight+railHeight)-(roofWidth/2+railWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const usableLength=length-3;
	const railCount=Math.floor(usableLength/dstRailL);
	const spacing=(usableLength-railThickness*(railCount))/(railCount-1);


	const wallFrontShape=new THREE.Shape()
	wallFrontShape.moveTo(-width/2-2,-5);
	wallFrontShape.lineTo(-width/2-2,height+5);
	wallFrontShape.lineTo(-outerRoofWidth,outerRoofHeight+height+5);
	wallFrontShape.lineTo(0,roofHeight+height+5+railHeight);
	wallFrontShape.lineTo(outerRoofWidth,outerRoofHeight+height+5);
	wallFrontShape.lineTo(width/2+2,height+5);
	wallFrontShape.lineTo(width/2+2,-5);
	wallFrontShape.closePath();

	return (
		<>
			<group>
				<mesh name='front_wall' position={[0,0,length/2+1]} >
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
				<mesh name='back_wall' position={[0,0,-length/2-3]} >
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