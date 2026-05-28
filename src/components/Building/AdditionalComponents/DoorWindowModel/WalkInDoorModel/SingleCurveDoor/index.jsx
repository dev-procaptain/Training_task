import * as THREE from 'three';
import React from 'react'
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';

import { useSelector } from 'react-redux';
import {extrudeSetting} from '../../../../../../utils/Function';
import shedTexture from '../../../assets/imgs/horizontal_hardie_plank.jpg';

const SingleCurveDoor=() => {

	const width = useSelector((state) => state.building.buildingWidth);
	const height = useSelector((state) => state.building.buildingHeight);
	const outTrimThk=5;
	const inTrimThk=3;
	const railPadding=4;

	const colorMap=useLoader(TextureLoader,shedTexture)
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.03);
	colorMap.flipY=false;

	const outTrimShape=new THREE.Shape();
	outTrimShape.moveTo(-width/2,0);
	outTrimShape.lineTo(-width/2,height/4*3);
	outTrimShape.quadraticCurveTo(-width/2,height,0,height);
	outTrimShape.quadraticCurveTo(width/2,height,width/2,height/4*3);
	outTrimShape.lineTo(width/2,0);
	outTrimShape.lineTo(width/2-outTrimThk,0);
	outTrimShape.lineTo(width/2-outTrimThk,height/4*3);
	outTrimShape.quadraticCurveTo(width/2-outTrimThk,height-outTrimThk,0,height-outTrimThk);
	outTrimShape.quadraticCurveTo(-width/2+outTrimThk,height-outTrimThk,-width/2+outTrimThk,height/4*3);
	outTrimShape.lineTo(-width/2+outTrimThk,0);
	outTrimShape.closePath();

	const innerWidth=width-outTrimThk*2;
	const innerHeight=height-outTrimThk;

	const inTrimShape=new THREE.Shape();
	inTrimShape.moveTo(-innerWidth/2,0);
	inTrimShape.lineTo(-innerWidth/2,height/4*3);
	inTrimShape.quadraticCurveTo(-innerWidth/2,innerHeight,0,innerHeight);
	inTrimShape.quadraticCurveTo(innerWidth/2,innerHeight,innerWidth/2,height/4*3);
	inTrimShape.lineTo(innerWidth/2,0);
	inTrimShape.lineTo(innerWidth/2-inTrimThk,0);
	inTrimShape.lineTo(innerWidth/2-inTrimThk,height/4*3);
	inTrimShape.quadraticCurveTo(innerWidth/2-inTrimThk,innerHeight-inTrimThk,0,innerHeight-inTrimThk);
	inTrimShape.quadraticCurveTo(-innerWidth/2+inTrimThk,innerHeight-inTrimThk,-innerWidth/2+inTrimThk,height/4*3);
	inTrimShape.lineTo(-innerWidth/2+inTrimThk,0);
	inTrimShape.closePath();

	const bottomTrimShape=new THREE.Shape();
	bottomTrimShape.moveTo(-innerWidth/2+inTrimThk,0);
	bottomTrimShape.lineTo(-innerWidth/2+inTrimThk,inTrimThk);
	bottomTrimShape.lineTo(innerWidth/2-inTrimThk,inTrimThk);
	bottomTrimShape.lineTo(innerWidth/2-inTrimThk,0);
	bottomTrimShape.closePath();

	const innerDoorWidth=innerWidth-inTrimThk*2;
	const innerDoorHeight=innerHeight-inTrimThk;

	const innerDoorShape=new THREE.Shape();
	innerDoorShape.moveTo(-innerDoorWidth/2,inTrimThk);
	innerDoorShape.lineTo(-innerDoorWidth/2,height/4*3);
	innerDoorShape.quadraticCurveTo(-innerDoorWidth/2,innerDoorHeight,0,innerDoorHeight);
	innerDoorShape.quadraticCurveTo(innerDoorWidth/2,innerDoorHeight,innerDoorWidth/2,height/4*3);
	innerDoorShape.lineTo(innerDoorWidth/2,inTrimThk);
	innerDoorShape.closePath();

	const midTrimShape=new THREE.Shape();
	midTrimShape.moveTo(-innerWidth/2+inTrimThk,height*2/5);
	midTrimShape.lineTo(-innerWidth/2+inTrimThk,height*2/5+inTrimThk);
	midTrimShape.lineTo(innerWidth/2-inTrimThk,height*2/5+inTrimThk);
	midTrimShape.lineTo(innerWidth/2-inTrimThk,height*2/5);
	midTrimShape.closePath();

	innerDoorShape.holes.push(midTrimShape);

	const railtopModel=[];
	const railBottomModel=[];

	[-1,1].forEach(dir => {

		const railtopShape=new THREE.Shape();
		railtopShape.moveTo(dir*(innerWidth/2-inTrimThk),(height*2/5)-railPadding-inTrimThk);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk),(height*2/5)-railPadding);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk-railPadding),height*2/5);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk-railPadding)-dir*inTrimThk,height*2/5);
		railtopShape.closePath();

		const railBottomShape=new THREE.Shape();
		railBottomShape.moveTo(dir*(innerWidth/2-inTrimThk),railPadding+inTrimThk);
		railBottomShape.lineTo(dir*(innerWidth/2-inTrimThk),railPadding+inTrimThk*2);
		railBottomShape.lineTo(dir*(innerWidth/2-inTrimThk*2-railPadding),inTrimThk);
		railBottomShape.lineTo(dir*(innerWidth/2-inTrimThk-railPadding),inTrimThk);
		railBottomShape.closePath();

		innerDoorShape.holes.push(railtopShape);
		innerDoorShape.holes.push(railBottomShape);

		railtopModel.push(railtopShape);
		railBottomModel.push(railBottomShape);
	});

	const topRailShape=new THREE.Shape();
	topRailShape.moveTo(-innerWidth/2+inTrimThk,height*5/7);
	topRailShape.lineTo(-innerWidth/2+inTrimThk,height*5/7-inTrimThk);
	topRailShape.lineTo(-innerWidth/2+inTrimThk+inTrimThk*4,height*5/7-inTrimThk);
	topRailShape.quadraticCurveTo(-innerWidth/2+inTrimThk+inTrimThk*4+2,height*5/7-inTrimThk+inTrimThk/2,-innerWidth/2+inTrimThk+inTrimThk*4,height*5/7);
	topRailShape.closePath();

	innerDoorShape.holes.push(topRailShape);

	return (
		<>
			<group name='Trim'>
				<mesh name='outTrim'>
					<extrudeGeometry args={[outTrimShape,extrudeSetting(5)]} />
					<meshStandardMaterial color={'#bfbfbf'} />
				</mesh>
				<mesh name='inTrim'>
					<extrudeGeometry args={[inTrimShape,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
				<mesh name='inTrim'>
					<extrudeGeometry args={[bottomTrimShape,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
			</group>

			<group name='innerDoor'>
				<mesh>
					<extrudeGeometry args={[innerDoorShape,extrudeSetting(5)]} />
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
				<mesh>
					<extrudeGeometry args={[midTrimShape,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[railtopModel,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[railBottomModel,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[topRailShape,extrudeSetting(5)]} />
					<meshStandardMaterial color={'white'} />
				</mesh>
			</group>
		</>
	)
}

export default SingleCurveDoor