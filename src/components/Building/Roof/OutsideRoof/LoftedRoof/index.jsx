import React from 'react'
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';

const LoftedRoof=() => {

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
	const roofOverhangX=20;
	const roofOverhangY=pitchRatio*roofOverhangX;

	const wallWidth=width+4;
	const wallWidthOne=railWidth+roofWidthone+2;
	const wallHeight=height+5+roofHeight+railWidth+1;
	const wallBottomHeight=height+roofBottomHeight+5+railWidth+1;

	const wallFrontShape=new THREE.Shape()
	wallFrontShape.moveTo(-wallWidth/2-roofOverhangX,height+5-roofOverhangY);
	wallFrontShape.lineTo(-wallWidth/2-roofOverhangX,height+5);
	wallFrontShape.lineTo(-wallWidth/2+wallWidthOne,wallBottomHeight);
	wallFrontShape.lineTo(0,wallHeight);
	wallFrontShape.lineTo(wallWidth/2-wallWidthOne,wallBottomHeight);
	wallFrontShape.lineTo(wallWidth/2,height+5-roofOverhangY);
	wallFrontShape.lineTo(wallWidth/2,height+5-roofOverhangY+railWidth);
	wallFrontShape.closePath();


	return (
		<>
			<group>
				<mesh name='roof'>
					<extrudeGeometry />
				</mesh>
			</group>
		</>
	)
}

export default LoftedRoof