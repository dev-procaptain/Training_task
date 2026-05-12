import * as THREE from 'three';
import React,{useMemo} from 'react'
import {useStore} from '../../../store';
import {extrudeSetting} from '../../../utils/Function';

const CurvedoorModel=() => {

	const {sizeInfo}=useStore();
	const width=sizeInfo['Curve_door'][0];
	const height=sizeInfo['Curve_door'][1];
	const outTrimThk=5;
	const inTrimThk=3;
	const scaleX=20;
	const scaleY=21;
	const doorWidth=width*scaleX;
	const doorHeight=height*scaleY;
	const railPadding=4;

	const outTrimShape=new THREE.Shape();
	outTrimShape.moveTo(-doorWidth/2,0);
	outTrimShape.lineTo(-doorWidth/2,doorHeight/4*3);
	outTrimShape.quadraticCurveTo(-doorWidth/2,doorHeight,0,doorHeight);
	outTrimShape.quadraticCurveTo(doorWidth/2,doorHeight,doorWidth/2,doorHeight/4*3);
	outTrimShape.lineTo(doorWidth/2,0);
	outTrimShape.lineTo(doorWidth/2-outTrimThk,0);
	outTrimShape.lineTo(doorWidth/2-outTrimThk,doorHeight/4*3);
	outTrimShape.quadraticCurveTo(doorWidth/2-outTrimThk,doorHeight-outTrimThk,0,doorHeight-outTrimThk);
	outTrimShape.quadraticCurveTo(-doorWidth/2+outTrimThk,doorHeight-outTrimThk,-doorWidth/2+outTrimThk,doorHeight/4*3);
	outTrimShape.lineTo(-doorWidth/2+outTrimThk,0);
	outTrimShape.closePath();

	const innerWidth=doorWidth-outTrimThk*2;
	const innerHeight=doorHeight-outTrimThk;

	const inTrimShape=new THREE.Shape();
	inTrimShape.moveTo(-innerWidth/2,0);
	inTrimShape.lineTo(-innerWidth/2,doorHeight/4*3);
	inTrimShape.quadraticCurveTo(-innerWidth/2,innerHeight,0,innerHeight);
	inTrimShape.quadraticCurveTo(innerWidth/2,innerHeight,innerWidth/2,doorHeight/4*3);
	inTrimShape.lineTo(innerWidth/2,0);
	inTrimShape.lineTo(innerWidth/2-inTrimThk,0);
	inTrimShape.lineTo(innerWidth/2-inTrimThk,doorHeight/4*3);
	inTrimShape.quadraticCurveTo(innerWidth/2-inTrimThk,innerHeight-inTrimThk,0,innerHeight-inTrimThk);
	inTrimShape.quadraticCurveTo(-innerWidth/2+inTrimThk,innerHeight-inTrimThk,-innerWidth/2+inTrimThk,doorHeight/4*3);
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
	innerDoorShape.lineTo(-innerDoorWidth/2,doorHeight/4*3);
	innerDoorShape.quadraticCurveTo(-innerDoorWidth/2,innerDoorHeight,0,innerDoorHeight);
	innerDoorShape.quadraticCurveTo(innerDoorWidth/2,innerDoorHeight,innerDoorWidth/2,doorHeight/4*3);
	innerDoorShape.lineTo(innerDoorWidth/2,inTrimThk);
	innerDoorShape.closePath();

	const midTrimShape=new THREE.Shape();
	midTrimShape.moveTo(-innerWidth/2+inTrimThk,doorHeight*2/5);
	midTrimShape.lineTo(-innerWidth/2+inTrimThk,doorHeight*2/5+inTrimThk);
	midTrimShape.lineTo(innerWidth/2-inTrimThk,doorHeight*2/5+inTrimThk);
	midTrimShape.lineTo(innerWidth/2-inTrimThk,doorHeight*2/5);
	midTrimShape.closePath();

	innerDoorShape.holes.push(midTrimShape);

	const railtopModel=[];
	const railBottomModel=[];

	[-1,1].forEach(dir => {

		const railtopShape=new THREE.Shape();
		railtopShape.moveTo(dir*(innerWidth/2-inTrimThk),(doorHeight*2/5)-railPadding-inTrimThk);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk),(doorHeight*2/5)-railPadding);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk-railPadding),doorHeight*2/5);
		railtopShape.lineTo(dir*(innerWidth/2-inTrimThk-railPadding)-dir*inTrimThk,doorHeight*2/5);
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
	topRailShape.moveTo(-innerWidth/2+inTrimThk,doorHeight*5/7);
	topRailShape.lineTo(-innerWidth/2+inTrimThk,doorHeight*5/7-inTrimThk);
	topRailShape.lineTo(-innerWidth/2+inTrimThk+inTrimThk*4,doorHeight*5/7-inTrimThk);
	topRailShape.quadraticCurveTo(-innerWidth/2+inTrimThk+inTrimThk*4+2,doorHeight*5/7-inTrimThk+inTrimThk/2,-innerWidth/2+inTrimThk+inTrimThk*4,doorHeight*5/7);
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
					<meshStandardMaterial color={'#8c8c8c'} />
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

export default CurvedoorModel