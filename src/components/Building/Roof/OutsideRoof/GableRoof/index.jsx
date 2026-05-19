import React from 'react'
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';
import {useSelector} from 'react-redux';
import * as THREE from 'three';
import {extrudeSetting} from '../../../../../utils/Function';
import roofTexture from '../../../../../assets/imgs/silver_birch.png'

const GableRoof=() => {
	const colorMap=useLoader(TextureLoader,roofTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.center.set(0.5,0.5)
	colorMap.rotation=Math.PI/2
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.031);
	colorMap.flipY=false;

	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);

	const pitchRatio=pitchRise/12;
	const railWidth=4;
	const wallWidth=width+4;
	const roofHeight=(width/2-railWidth-1)*pitchRatio+railWidth+1;
	const wallHeight=height+5;
	const roofOverhangL=20;
	const roofAngle=Math.atan(pitchRatio);
	const roofOverhangX=Math.cos(roofAngle)*roofOverhangL;
	const roofOverhangY=Math.sin(roofAngle)*roofOverhangL;

	const roofBottomShape=new THREE.Shape();
	roofBottomShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	roofBottomShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	roofBottomShape.lineTo(0,wallHeight+roofHeight+railWidth*2);
	roofBottomShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	roofBottomShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY);
	roofBottomShape.lineTo(0,wallHeight+roofHeight);
	roofBottomShape.closePath();

	const roofTopShape=new THREE.Shape();
	roofTopShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	roofTopShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+0.5);
	roofTopShape.lineTo(0,wallHeight+roofHeight+0.5);
	roofTopShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY+0.5);
	roofTopShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY);
	roofTopShape.lineTo(0,wallHeight+roofHeight);
	roofTopShape.closePath();

	const frontOutTrimShape=new THREE.Shape();
	frontOutTrimShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	frontOutTrimShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	frontOutTrimShape.lineTo(0,wallHeight+roofHeight+railWidth*2);
	frontOutTrimShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	frontOutTrimShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY);
	frontOutTrimShape.lineTo(0,wallHeight+roofHeight);
	frontOutTrimShape.closePath();


	//const frontInnerTrimShape=new THREE.Shape();
	//frontInnerTrimShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	//frontInnerTrimShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+2);
	//frontInnerTrimShape.lineTo(0,wallHeight+roofHeight+2);
	//frontInnerTrimShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY+2);
	//frontInnerTrimShape.lineTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY);
	//frontInnerTrimShape.lineTo(0,wallHeight+roofHeight);
	//frontInnerTrimShape.closePath();

	//const leftSideOutTrimShape=new THREE.Shape();
	//leftSideOutTrimShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	//leftSideOutTrimShape.lineTo(-wallWidth/2-roofOverhangX-2,wallHeight-roofOverhangY-2*pitchRatio);
	//leftSideOutTrimShape.lineTo(-wallWidth/2-roofOverhangX-2,wallHeight-roofOverhangY+railWidth*2-2*pitchRatio);
	//leftSideOutTrimShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	//leftSideOutTrimShape.closePath();

	//const leftSideInnerTrimShape=new THREE.Shape();
	//leftSideInnerTrimShape.moveTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY);
	//leftSideInnerTrimShape.lineTo(-wallWidth/2-roofOverhangX,wallHeight-roofOverhangY+2);
	//leftSideInnerTrimShape.lineTo(0,wallHeight+roofHeight+2);
	//leftSideInnerTrimShape.lineTo(0,wallHeight+roofHeight);
	//leftSideInnerTrimShape.closePath();

	//const rightSideOutTrimShape=new THREE.Shape();
	//rightSideOutTrimShape.moveTo(wallWidth/2+roofOverhangX,wallHeight-roofOverhangY);
	//rightSideOutTrimShape.lineTo(wallWidth/2+roofOverhangX+2,wallHeight-roofOverhangY-2*pitchRatio);
	//rightSideOutTrimShape.lineTo(+wallWidth/2+roofOverhangX+2,wallHeight-roofOverhangY+railWidth*2-2*pitchRatio);
	//rightSideOutTrimShape.lineTo(+wallWidth/2+roofOverhangX,wallHeight-roofOverhangY+railWidth*2);
	//rightSideOutTrimShape.closePath();

	return (
		<>
			<group name='roof'>
				<mesh position={[0,0,-length/2-10]}>
					<extrudeGeometry args={[roofBottomShape,extrudeSetting(length+20)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh position={[0,railWidth*2+0.1,-length/2-10]}>
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

			{/*<group name='trim'  >
				<mesh name='frontOutTrim' position={[0,-railWidth,-length/2-12]}>
					<extrudeGeometry args={[frontOutTrimShape,extrudeSetting(2)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>

				<mesh name='frontInnerTrim' position={[0,-railWidth,-length/2-10]}>
					<extrudeGeometry args={[frontInnerTrimShape,extrudeSetting(8)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>

				<mesh name='backOutTrim' position={[0,-railWidth,length/2+10]}>
					<extrudeGeometry args={[frontOutTrimShape,extrudeSetting(2)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh name='backInnerTrim' position={[0,-railWidth,length/2+2]}>
					<extrudeGeometry args={[frontInnerTrimShape,extrudeSetting(8)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh name='leftOutTrim' position={[0,-railWidth,-length/2-12]}>
					<extrudeGeometry args={[leftSideOutTrimShape,extrudeSetting(length+24)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh name='leftInnerTrim' position={[0,-railWidth,-length/2-2]}>
					<extrudeGeometry args={[leftSideInnerTrimShape,extrudeSetting(length+20)]} />
					<meshLambertMaterial color={'red'} />
				</mesh>
				<mesh name='rightOutTrim' position={[0,-railWidth,-length/2-12]}>
					<extrudeGeometry args={[rightSideOutTrimShape,extrudeSetting(length+24)]} />
					<meshLambertMaterial color={'#8c8c8c'} />
				</mesh>
			</group>*/}
		</>
	)
}

export default GableRoof