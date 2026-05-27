import React from 'react'
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import insideRoofTexture from '../../../../../assets/imgs/premium.png';
import {extrudeSetting} from '../../../../../utils/Function';

const LoftedRoof=() => {
	const colorMap=useLoader(TextureLoader,insideRoofTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.015,0.01);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);
	const transParent = useSelector((state) => state.controlReducer.transparentBuild);
	
	const tanRoofAngle=pitchRise/12;
	const railThk=1;
	const roofHeight=width/2*tanRoofAngle;
	const roofBottomHeight=(width/2)*tanRoofAngle/3*2;
	const tanRoofbottomAngle=tanRoofAngle*1.7;
	const roofWidthone=roofBottomHeight/tanRoofbottomAngle;
	const tanRoofTopAngle=(width/2-roofWidthone)/(roofHeight-roofBottomHeight);
	const railWidth=railThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
	const railHeight=railThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
	const outerRoofWidth=tanRoofTopAngle*(tanRoofbottomAngle*(width/2-railWidth)-(roofHeight-railHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
	const outerRoofHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight-railHeight)-(width/2-railWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);

	const roofShape=new THREE.Shape();
	roofShape.moveTo(width/2,0);
	roofShape.lineTo(width/2-roofWidthone,roofBottomHeight);
	roofShape.lineTo(0,roofHeight);
	roofShape.lineTo(-width/2+roofWidthone,roofBottomHeight);
	roofShape.lineTo(-width/2,0);
	roofShape.lineTo(-width/2+railWidth,0);
	roofShape.lineTo(-outerRoofWidth,outerRoofHeight);
	roofShape.lineTo(0,roofHeight-railHeight);
	roofShape.lineTo(outerRoofWidth,outerRoofHeight);
	roofShape.lineTo(width/2-railWidth,0);
	roofShape.closePath();

	return (
		<>
			<group>
				<mesh position={[0,height+5,-length/2]}>
					<extrudeGeometry args={[roofShape,extrudeSetting(length)]} />
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
			</group>
		</>
	)
}

export default LoftedRoof