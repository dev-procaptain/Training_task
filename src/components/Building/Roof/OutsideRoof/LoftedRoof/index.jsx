import React from 'react'
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';
import {useLoader} from '@react-three/fiber';
import {TextureLoader} from 'three'
import roofTexture from '../../../../../assets/imgs/silver_birch.png'

const LoftedRoof=() => {

	const colorMap=useLoader(TextureLoader,roofTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.center.set(0.5,0.5)
	colorMap.rotation=Math.PI/2
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.04);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);

	const tanRoofAngle=pitchRise/12;
	const trimRailThk=8;
	const roofTrimThk=1;
	const roofOverhangL=30;
	const tanRoofbottomAngle=tanRoofAngle*1.3;
	const roofOverhangY=tanRoofbottomAngle/Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)*roofOverhangL;
	const roofOverhangX=roofOverhangL/Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle);

	const roofHeight=width/2*tanRoofAngle;
	const roofBottomHeight=(width/2)*tanRoofAngle/3*2;
	const roofWidthone=roofBottomHeight/tanRoofbottomAngle;
	const tanRoofTopAngle=(width/2-roofWidthone)/(roofHeight-roofBottomHeight);
	const trimRailWidth=trimRailThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
	const trimRailHeight=trimRailThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
	const roofRailWidth=roofTrimThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
	const roofRailHeight=roofTrimThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
	const outerRoofTrimWidth=tanRoofTopAngle*(tanRoofbottomAngle*(width/2+trimRailWidth)-(roofHeight+trimRailHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const outerRoofTrimHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight+trimRailHeight)-(width/2+trimRailWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const outerRoofWidth=tanRoofTopAngle*(tanRoofbottomAngle*(width/2+roofRailWidth+trimRailWidth)-(roofHeight+roofRailHeight+trimRailHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const outerRoofHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight+roofRailHeight+trimRailHeight)-(width/2+roofRailWidth+trimRailWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);

	const roofBottomShape=new THREE.Shape();
	roofBottomShape.moveTo(width/2+roofOverhangX,0-roofOverhangY);
	roofBottomShape.lineTo(width/2-roofWidthone,roofBottomHeight);
	roofBottomShape.lineTo(0,roofHeight);
	roofBottomShape.lineTo(-width/2+roofWidthone,roofBottomHeight);
	roofBottomShape.lineTo(-width/2-roofOverhangX,0-roofOverhangY);
	roofBottomShape.lineTo(-width/2-trimRailWidth-roofOverhangX,0-roofOverhangY);
	roofBottomShape.lineTo(-outerRoofTrimWidth,outerRoofTrimHeight);
	roofBottomShape.lineTo(0,roofHeight+trimRailHeight);
	roofBottomShape.lineTo(outerRoofTrimWidth,outerRoofTrimHeight);
	roofBottomShape.lineTo(width/2+roofOverhangX+trimRailWidth,0-roofOverhangY);
	roofBottomShape.closePath();

	const roofTopShape=new THREE.Shape();
	roofTopShape.moveTo(width/2+roofOverhangX+trimRailWidth,0-roofOverhangY);
	roofTopShape.lineTo(outerRoofTrimWidth,outerRoofTrimHeight);
	roofTopShape.lineTo(0,roofHeight+trimRailHeight);
	roofTopShape.lineTo(-outerRoofTrimWidth,outerRoofTrimHeight);
	roofTopShape.lineTo(-width/2-roofOverhangX-trimRailWidth,0-roofOverhangY);
	roofTopShape.lineTo(-width/2-roofOverhangX-trimRailWidth-roofRailWidth,0-roofOverhangY);
	roofTopShape.lineTo(-outerRoofWidth,outerRoofHeight);
	roofTopShape.lineTo(0,roofHeight+trimRailHeight+roofRailHeight);
	roofTopShape.lineTo(outerRoofWidth,outerRoofHeight);
	roofTopShape.lineTo(width/2+roofOverhangX+trimRailWidth+roofRailWidth,0-roofOverhangY);
	roofTopShape.closePath();

	return (
		<>
			<group>
				<mesh name='roof_Trim' position={[0,height+6,-length/2-10]}>
					<extrudeGeometry args={[roofBottomShape,extrudeSetting(length+20)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh name='roof' position={[0,height+6,-length/2-10]}>
					<extrudeGeometry args={[roofTopShape,extrudeSetting(length+20)]} />
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

export default LoftedRoof