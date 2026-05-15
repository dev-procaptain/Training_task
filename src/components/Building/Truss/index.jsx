import React,{useMemo} from 'react'
import {useStore} from '../../../store'
import * as THREE from 'three';
import {extrudeSetting} from '../../../utils/Function';
import legTexture from '../../../assets/imgs/leg_texture_old.jpg';
import {TextureLoader} from 'three'
import {useLoader} from '@react-three/fiber';

const Truss=() => {
	const {sizeInfo}=useStore();
	const scaleX=10;
	const scaleY=11;
	const width=sizeInfo['Truss'][0];
	const height=sizeInfo['Truss'][1];
	const length=sizeInfo['Truss'][0]*1.5;
	const dstRailL=30;
	const pitchRatio=8/12;
	const railWidth=4;
	const railThickness=3;

	const doorHeight=height*scaleY;
	const doorWidth=width*scaleX;
	const doorLength=length*scaleY;
	const roofHeight=doorWidth/2*pitchRatio;
	const roofMidHeight=doorWidth/2*5/12;

	const colorMap=useLoader(TextureLoader,legTexture);
	colorMap.wrapS=THREE.RepeatWrapping;
	colorMap.wrapT=THREE.RepeatWrapping;
	colorMap.colorSpace=THREE.SRGBColorSpace;
	colorMap.repeat.set(0.02,0.01);
	colorMap.flipY=false;

	const baseModel=useMemo(() => {

		const baseShape=new THREE.Shape();
		baseShape.moveTo(-doorWidth/2,-doorLength/2);
		baseShape.lineTo(-doorWidth/2,doorLength/2);
		baseShape.lineTo(doorWidth/2,doorLength/2);
		baseShape.lineTo(doorWidth/2,-doorLength/2);
		baseShape.closePath();

		const baseCutShape=new THREE.Path();
		baseCutShape.moveTo(-doorWidth/2+5,-doorLength/2+5);
		baseCutShape.lineTo(-doorWidth/2+5,doorLength/2-5);
		baseCutShape.lineTo(doorWidth/2-5,doorLength/2-5);
		baseCutShape.lineTo(doorWidth/2-5,-doorLength/2+5);
		baseCutShape.closePath();

		baseShape.holes.push(baseCutShape);

		return baseShape;
	},[doorWidth,doorLength])

	const baseSideRail=useMemo(() => {
		const baseRailModel=[];
		const roofTrussModel=[];
		const roofMidTrussModel=[];
		const roofTrussGap=[];

		const startY=doorLength/2-1.5;
		const usableLength=doorLength-3;
		const railCount=Math.floor(usableLength/dstRailL);
		const spacing=(usableLength-railThickness*railCount)/(railCount-1);

		for(let row=0;row<railCount;row++) {
			const y=startY-row*(railThickness+spacing);
			const z=spacing+railThickness;
			const rightShape=new THREE.Shape();

			rightShape.moveTo(doorWidth/2-1,y);
			rightShape.lineTo(doorWidth/2-1-railWidth,y);
			rightShape.lineTo(doorWidth/2-1-railWidth,y-railThickness);
			rightShape.lineTo(doorWidth/2-1,y-railThickness);
			rightShape.closePath();
			baseRailModel.push(rightShape);

			const leftShape=new THREE.Shape();

			leftShape.moveTo(-doorWidth/2+1,y);
			leftShape.lineTo(-doorWidth/2+1+railWidth,y);
			leftShape.lineTo(-doorWidth/2+1+railWidth,y-railThickness);
			leftShape.lineTo(-doorWidth/2+1,y-railThickness);
			leftShape.closePath();

			baseRailModel.push(leftShape);

			[-1,1].forEach(dir => {
				const roofTrussshape=new THREE.Shape();
				roofTrussshape.moveTo(dir*(doorWidth/2-1),0);
				roofTrussshape.lineTo(dir*(doorWidth/2-5),0);
				roofTrussshape.lineTo(0,roofHeight);
				roofTrussshape.lineTo(0,roofHeight+4);
				roofTrussshape.closePath();

				roofTrussModel.push(roofTrussshape);
			})
			roofTrussGap.push(z);

			const roofMidTrussShape=new THREE.Shape();
			roofMidTrussShape.moveTo(-doorWidth/2+12*roofMidHeight/8,roofMidHeight);
			roofMidTrussShape.lineTo(doorWidth/2-12*roofMidHeight/8,roofMidHeight);
			roofMidTrussShape.lineTo(doorWidth/2-12*roofMidHeight/8-6,roofMidHeight+4);
			roofMidTrussShape.lineTo(-doorWidth/2+12*roofMidHeight/8+6,roofMidHeight+4);
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

	const frontBaseRail=useMemo(() => {
		const startX=-doorWidth/2+railWidth+1;
		const usableWidth=doorWidth-2-railWidth*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railWidth*railCount)/(railCount-1);

		const baseRailModel=[];
		for(let col=0;col<railCount;col++) {
			const x=startX+col*(railWidth+spacing)

			const frontBaseModel=new THREE.Shape();
			frontBaseModel.moveTo(x,-doorLength/2+1.5);
			frontBaseModel.lineTo(x+railWidth,-doorLength/2+1.5);
			frontBaseModel.lineTo(x+railWidth,-doorLength/2+1.5+3);
			frontBaseModel.lineTo(x,-doorLength/2+1.5+3);
			frontBaseModel.closePath();

			baseRailModel.push(frontBaseModel);
		}

		return {
			baseRailModel,
		}
	},[width,height,length])

	const roofBaseRail=useMemo(() => {
		const usableWidth=doorWidth-2-railWidth*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railWidth*railCount)/(railCount-1);
		const startX=Math.floor(doorWidth/2-railWidth-1);
		const roofBaseRailModel=[];

		[-1,1].forEach(dir => {
			for(let col=0;col<railCount/2;col++) {
				const x=startX-col*(railWidth+spacing)

				const roofBaseRailShape=new THREE.Shape();
				roofBaseRailShape.moveTo(dir*x,0);
				roofBaseRailShape.lineTo(dir*(x-railWidth),0);
				roofBaseRailShape.lineTo(dir*(x-railWidth),railWidth+col*(spacing+railWidth+1)*pitchRatio);
				roofBaseRailShape.lineTo(dir*x,col*(spacing+railWidth+2)*pitchRatio);
				roofBaseRailShape.closePath();

				roofBaseRailModel.push(roofBaseRailShape);
			}
		})
		return {roofBaseRailModel}
	},[width,height,length])

	const BackBaseRail=() => {
		const startX=-doorWidth/2+railWidth+1;
		const usableWidth=doorWidth-2-railWidth*2;
		const railCount=Math.floor(usableWidth/dstRailL);
		const spacing=(usableWidth-railWidth*railCount)/(railCount-1);

		const baseRailModel=[];
		for(let col=0;col<railCount;col++) {
			const x=startX+col*(railWidth+spacing)

			const backBaseModel=new THREE.Shape();
			backBaseModel.moveTo(x,doorLength/2-1.5);
			backBaseModel.lineTo(x+railWidth,doorLength/2-1.5);
			backBaseModel.lineTo(x+railWidth,doorLength/2-1.5-3);
			backBaseModel.lineTo(x,doorLength/2-1.5-3);
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
				<mesh name='top_base' rotation={[Math.PI/2,0,0]} position={[0,doorHeight+5,0]}>
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
					<extrudeGeometry args={[baseSideRail.baseRailModel,extrudeSetting(doorHeight)]} />
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
					<extrudeGeometry args={[frontBaseRail.baseRailModel,extrudeSetting(doorHeight)]} />
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
				<mesh position={[0,doorHeight+5,doorLength/2-4.5]}>
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
				<mesh rotation={[-Math.PI/2,0,0]}>
					<extrudeGeometry args={[BackBaseRail(),extrudeSetting(doorHeight)]} />
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

			<group name='roofTruss'>
				{
					baseSideRail.roofTrussGap.map((item,index) => (
						<>
							<mesh key={index} position={[0,doorHeight+5,(doorLength/2-railThickness-railThickness/2-index*item)]}>
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
							<mesh key={index} position={[0,doorHeight+5,(doorLength/2-railThickness-railThickness/2-index*item)]}>
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

export default Truss