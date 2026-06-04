import * as THREE from 'three';
import React,{useMemo} from 'react'
import {TextureLoader} from 'three';
import {useLoader} from '@react-three/fiber';

import {useSelector} from 'react-redux';
import legTexture from '../../../assets/imgs/leg_texture_old.jpg';
import {extrudeSetting} from '../../../utils/Function';

import GableTruss from './GableTruss'
import LoftedTruss from './LoftedTruss';

const Truss=() => {
	const width=useSelector((state) => state.building.buildingWidth);
	const length=useSelector((state) => state.building.buildingLength);
	const height=useSelector((state) => state.building.buildingHeight);
	const pitchRise=useSelector((state) => state.building.buildingPitch);
	const modelType = useSelector((state) => state.building.modelType);

	const dstRailL=30;
	const pitchRatio=pitchRise/12;
	const railWidth=4;
	const railThickness=3;

	const roofHeight=width/2*pitchRatio;
	const roofMidHeight=width/2*5/12;

	const colorMap=useLoader(TextureLoader,legTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.02,0.01);
	colorMap.flipY=false;

	const baseModel=useMemo(() => {
		const baseShape=new THREE.Shape();
		baseShape.moveTo(-width/2,-length/2);
		baseShape.lineTo(-width/2,length/2);
		baseShape.lineTo(width/2,length/2);
		baseShape.lineTo(width/2,-length/2);
		baseShape.closePath();

		const baseCutShape=new THREE.Path();
		baseCutShape.moveTo(-width/2+7,-length/2+7);
		baseCutShape.lineTo(-width/2+7,length/2-7);
		baseCutShape.lineTo(width/2-7,length/2-7);
		baseCutShape.lineTo(width/2-7,-length/2+7);
		baseCutShape.closePath();

		baseShape.holes.push(baseCutShape);

		return baseShape;
	},[width,length])

	const frontBaseRail=useMemo(() => {
		const startX=-width/2+railWidth+1;
		const usableWidth=width-2-railWidth*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railWidth*railCount)/(railCount-1);

		const baseRailModel=[];
		for(let col=0;col<railCount;col++) {
			const x=startX+col*(railWidth+spacing)

			const frontBaseModel=new THREE.Shape();
			frontBaseModel.moveTo(x,-length/2+1.5);
			frontBaseModel.lineTo(x+railWidth,-length/2+1.5);
			frontBaseModel.lineTo(x+railWidth,-length/2+1.5+3);
			frontBaseModel.lineTo(x,-length/2+1.5+3);
			frontBaseModel.closePath();

			baseRailModel.push(frontBaseModel);
		}

		return {
			baseRailModel,
		}
	},[width,height,length])

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
				roofTrussshape.lineTo(dir*(width/2-5),0);
				roofTrussshape.lineTo(0,roofHeight);
				roofTrussshape.lineTo(0,roofHeight+4);
				roofTrussshape.closePath();

				roofTrussModel.push(roofTrussshape);
			})
			roofTrussGap.push(z);

			const roofMidTrussShape=new THREE.Shape();
			roofMidTrussShape.moveTo(-width/2+12*roofMidHeight/8,roofMidHeight);
			roofMidTrussShape.lineTo(width/2-12*roofMidHeight/8,roofMidHeight);
			roofMidTrussShape.lineTo(width/2-12*roofMidHeight/8-6,roofMidHeight+4);
			roofMidTrussShape.lineTo(-width/2+12*roofMidHeight/8+6,roofMidHeight+4);
			roofMidTrussShape.closePath();

			roofMidTrussModel.push(roofMidTrussShape);
		}

		return {
			baseRailModel,
			roofTrussModel,
			roofTrussGap,
			roofMidTrussModel
		};
	},[width,height,length])

	const BackBaseRail=() => {
		const startX=-width/2+railWidth+1;
		const usableWidth=width-2-railWidth*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railWidth*railCount)/(railCount-1);

		const baseRailModel=[];
		for(let col=0;col<railCount;col++) {
			const x=startX+col*(railWidth+spacing)

			const backBaseModel=new THREE.Shape();
			backBaseModel.moveTo(x,length/2-1.5);
			backBaseModel.lineTo(x+railWidth,length/2-1.5);
			backBaseModel.lineTo(x+railWidth,length/2-1.5-3);
			backBaseModel.lineTo(x,length/2-1.5-3);
			backBaseModel.closePath();

			baseRailModel.push(backBaseModel);
		}

		return baseRailModel
	}
	return (
		<>
			<group name='base'>
				<mesh name='bottom_base' rotation={[Math.PI/2,0,0]}>
					<extrudeGeometry args={[baseModel,extrudeSetting(5)]} />
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
				<mesh name='top_base' rotation={[Math.PI/2,0,0]} position={[0,height+5,0]}>
					<extrudeGeometry args={[baseModel,extrudeSetting(5)]} />
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
			</group>

			<group name='baseRail' >
				<mesh rotation={[-Math.PI/2,0,0]}>
					<extrudeGeometry args={[baseSideRail.baseRailModel,extrudeSetting(height)]} />
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
				<mesh rotation={[-Math.PI/2,0,0]}>
					<extrudeGeometry args={[frontBaseRail.baseRailModel,extrudeSetting(height)]} />
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
				<mesh rotation={[-Math.PI/2,0,0]}>
					<extrudeGeometry args={[BackBaseRail(),extrudeSetting(height)]} />
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
			</group>

			{modelType === 'gable_building' && <GableTruss />}
			{modelType === 'lofted_building' && <LoftedTruss />}
		</>
	)
}

export default Truss