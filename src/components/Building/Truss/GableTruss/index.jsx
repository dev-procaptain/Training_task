import * as THREE from 'three';
import {TextureLoader} from 'three'
import React,{useMemo} from 'react'
import {useLoader} from '@react-three/fiber';

import {useSelector} from 'react-redux';
import {extrudeSetting} from '../../../../utils/Function';
import legTexture from '../../../../assets/imgs/leg_texture_old.jpg';

const GableTruss=() => {
	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);
	const dstRailL=30;
	const pitchRatio=pitchRise/12;
	const railThk=4;
	const roofAngle=Math.atan(pitchRatio);
	const railWidth=railThk/Math.sin(roofAngle);
	const railHeight=railThk/Math.cos(roofAngle);
	const railThickness=3;

	const roofHeight=(width/2-railHeight-1)*pitchRatio;
	const roofMidHeight=width/2*pitchRatio/2;

	const colorMap=useLoader(TextureLoader,legTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.02,0.01);
	colorMap.flipY=false;

	const roofBaseRail=useMemo(() => {
		const usableWidth=width-2-railThk*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railThk*railCount)/(railCount-1);
		const startX=Math.floor(width/2-railThk-1);
		const roofBaseRailModel=[];

		[-1,1].forEach(dir => {
			for(let col=0;col<railCount/2;col++) {
				const x=startX-col*(railThk+spacing)

				const roofBaseRailShape=new THREE.Shape();
				roofBaseRailShape.moveTo(dir*x,0);
				roofBaseRailShape.lineTo(dir*(x-railThk),0);
				roofBaseRailShape.lineTo(dir*(x-railThk),railThk*pitchRatio+col*(spacing+railThk)*pitchRatio);
				roofBaseRailShape.lineTo(dir*x,col*(spacing+railThk)*pitchRatio);
				roofBaseRailShape.closePath();

				roofBaseRailModel.push(roofBaseRailShape);
			}
		})
		return {roofBaseRailModel}
	},[width,height,length,pitchRatio])

	const baseSideRail=useMemo(() => {
		const baseRailModel=[];
		const roofTrussModel=[];
		const roofMidTrussModel=[];
		const roofTrussGap=[];

		const startY=length/2-1.5;
		const usableLength=length-3;
		const railCount=Math.floor(usableLength/dstRailL);
		const spacing=(usableLength-railThickness*railCount)/(railCount-1);

		for(let row=0;row<railCount;row++) {
			const y=startY-row*(railThickness+spacing);
			const z=spacing+railThickness;
			const rightShape=new THREE.Shape();

			rightShape.moveTo(width/2-1,y);
			rightShape.lineTo(width/2-1-railWidth,y);
			rightShape.lineTo(width/2-1-railWidth,y-railThickness);
			rightShape.lineTo(width/2-1,y-railThickness);
			rightShape.closePath();
			baseRailModel.push(rightShape);

			const leftShape=new THREE.Shape();

			leftShape.moveTo(-width/2+1,y);
			leftShape.lineTo(-width/2+1+railWidth,y);
			leftShape.lineTo(-width/2+1+railWidth,y-railThickness);
			leftShape.lineTo(-width/2+1,y-railThickness);
			leftShape.closePath();

			baseRailModel.push(leftShape);

			[-1,1].forEach(dir => {
				const roofTrussshape=new THREE.Shape();
				roofTrussshape.moveTo(dir*(width/2-1),0);
				roofTrussshape.lineTo(dir*(width/2-railWidth),0);
				roofTrussshape.lineTo(0,roofHeight);
				roofTrussshape.lineTo(0,roofHeight+railHeight);
				roofTrussshape.closePath();

				roofTrussModel.push(roofTrussshape);
			})
			roofTrussGap.push(z);

			const roofMidTrussShape=new THREE.Shape();
			roofMidTrussShape.moveTo(-width/2+roofMidHeight/pitchRatio,roofMidHeight);
			roofMidTrussShape.lineTo(width/2-roofMidHeight/pitchRatio,roofMidHeight);
			roofMidTrussShape.lineTo(width/2-roofMidHeight/pitchRatio-railThk/pitchRatio,roofMidHeight+4);
			roofMidTrussShape.lineTo(-width/2+roofMidHeight/pitchRatio+railThk/pitchRatio,roofMidHeight+4);
			roofMidTrussShape.closePath();

			roofMidTrussModel.push(roofMidTrussShape);
		}

		return {
			baseRailModel,
			roofTrussModel,
			roofTrussGap,
			roofMidTrussModel
		};
	},[width,height,length,pitchRise])

	return (
		<>
			<mesh position={[0,height+5,length/2-4.5]}>
				<extrudeGeometry args={[roofBaseRail.roofBaseRailModel,extrudeSetting(3)]} />
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
			<group name='roofTruss'>
				{
					baseSideRail.roofTrussGap.map((item,index) => (
						<>
							<mesh key={index} position={[0,height+5,(length/2-railThickness-railThickness/2-index*item)]}>
								<extrudeGeometry args={[baseSideRail.roofTrussModel,extrudeSetting(3)]} />
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
							<mesh key={index} position={[0,height+5,(length/2-railThickness-railThickness/2-index*item)]}>
								<extrudeGeometry args={[baseSideRail.roofMidTrussModel,extrudeSetting(3)]} />
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
						</>
					))
				}
			</group>
		</>
	)
}

export default GableTruss