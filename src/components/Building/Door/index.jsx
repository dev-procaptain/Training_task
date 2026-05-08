import * as THREE from 'three';
import React,{useMemo} from 'react'
import {extrudeSetting} from '../../../utils/Function';
import {useStore} from '../../../store';

const Door=() => {
	const {sizeInfo}=useStore();
	const width=sizeInfo['SS1-T1242'][0];
	const height=sizeInfo['SS1-T1242'][1];
	const scaleX=20;
	const scaleY=21;
	const trimModelThk=4;
	const innerTrimModelThk=3;
	const bottomTrimThk=2;
	const windowCountX=2;
	const patternContX=4;
	const countY=5;

	const trimModel=useMemo(() => {
		const trimModelWidth=width*scaleX;
		const trimModelHeight=height*scaleY;
		//const trimModelThk=trimThk*scaleX;
		const trimSideModelArr=[];

		[-1,1].forEach(dir => {
			const trimSideModelShape=new THREE.Shape();
			trimSideModelShape.moveTo(dir*trimModelWidth/2,0);
			trimSideModelShape.lineTo(dir*(trimModelWidth/2-trimModelThk),0);
			trimSideModelShape.lineTo(dir*(trimModelWidth/2-trimModelThk),trimModelHeight);
			trimSideModelShape.lineTo(dir*trimModelWidth/2,trimModelHeight);
			trimSideModelShape.closePath();

			trimSideModelArr.push(trimSideModelShape);
		})

		const trimSideModelShape=new THREE.Shape();
		trimSideModelShape.moveTo(trimModelWidth/2,0);
		trimSideModelShape.lineTo(-trimModelWidth/2+trimModelThk,0);
		trimSideModelShape.lineTo(trimModelWidth/2+trimModelThk,trimModelHeight);
		trimSideModelShape.lineTo(trimModelWidth/2,0);
		trimSideModelShape.closePath();


		const trimMidModelShape=new THREE.Shape();
		trimMidModelShape.moveTo(-trimModelWidth/2+trimModelThk,trimModelHeight);
		trimMidModelShape.lineTo(-trimModelWidth/2+trimModelThk,trimModelHeight-trimModelThk);
		trimMidModelShape.lineTo(trimModelWidth/2-trimModelThk,trimModelHeight-trimModelThk);
		trimMidModelShape.lineTo(trimModelWidth/2-trimModelThk,trimModelHeight);
		trimMidModelShape.closePath();

		return {
			trimSideModelArr,
			trimMidModelShape,

		}

	},[width,height])

	const innerModel=useMemo(() => {
		const innerModelWidth=width*scaleX-trimModelThk*2;
		const innerModelHeight=height*scaleY-trimModelThk;

		const innerModelShape=new THREE.Shape();
		innerModelShape.moveTo(-innerModelWidth/2,innerModelHeight);
		innerModelShape.lineTo(innerModelWidth/2,innerModelHeight);
		innerModelShape.lineTo(innerModelWidth/2,bottomTrimThk);
		innerModelShape.lineTo(-innerModelWidth/2,bottomTrimThk);
		innerModelShape.closePath();

		const windowModelWidth=(innerModelWidth-innerTrimModelThk*3)/windowCountX;
		const windowModelHeight=(innerModelHeight-bottomTrimThk-innerTrimModelThk*(countY+1))/countY;

		const windowModelShape=new THREE.Shape();
		windowModelShape.moveTo(-innerModelWidth/2+innerTrimModelThk*2,innerModelHeight-innerTrimModelThk);
		windowModelShape.lineTo(-innerModelWidth/2+windowModelWidth+innerTrimModelThk*2,innerModelHeight-innerTrimModelThk);
		windowModelShape.lineTo(-innerModelWidth/2+windowModelWidth+innerTrimModelThk*2,innerModelHeight-windowModelHeight);
		windowModelShape.lineTo(-innerModelWidth/2+innerTrimModelThk*2,innerModelHeight-windowModelHeight);
		windowModelShape.closePath();

		innerModelShape.holes.push(windowModelShape);

		return {
			innerModelShape,
		}

	},[width,height])

	const bottomModel=useMemo(() => {
		const bottomModelWidth=width*scaleX-trimModelThk*2;

		const bottomModelShape=new THREE.Shape();
		bottomModelShape.moveTo(-bottomModelWidth/2,0);
		bottomModelShape.lineTo(-bottomModelWidth/2,bottomTrimThk);
		bottomModelShape.lineTo(bottomModelWidth/2,bottomTrimThk);
		bottomModelShape.lineTo(bottomModelWidth/2,0);
		bottomModelShape.closePath();

		return {
			bottomModelShape
		}

	},[width,height])
	return (
		<>
			<group name='trimModel'>
				<mesh>
					<extrudeGeometry args={[trimModel.trimMidModelShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'gray'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[trimModel.trimSideModelArr,extrudeSetting(5)]} />
					<meshPhongMaterial color={'gray'} />
				</mesh>
			</group>

			<group name='innerModel'>
				<mesh>
					<extrudeGeometry args={[innerModel.innerModelShape,extrudeSetting(2)]} />
					<meshPhongMaterial color={'#e6e6e6'} />
				</mesh>
			</group>

			<group name='bottomModel'>
				<mesh>
					<extrudeGeometry args={[bottomModel.bottomModelShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#404040'} />
				</mesh>
			</group>
		</>
	)
}

export default Door