import * as THREE from 'three';
import {useMemo} from 'react';
import { useSelector } from 'react-redux';
import {extrudeSetting} from '../../../../../../utils/Function';

const PubConcessionWindow=({width, height, direction, id, trimWidth}) => {

	//const buildingWidth = useSelector((state) => state.building.buildingWidth);
	const buildingHeight = useSelector((state) => state.building.buildingHeight);
	const buildingLength = useSelector((state) => state.building.buildingLength);
	//const trimWidth=0.3;
	const gap=0.1;
	const trimThk=trimWidth * 5;
	const offset=trimWidth*1.5;

	const outTrimModel=useMemo(() => {

		const topTrimShapeWidth=width-offset*2+4;
		const topTrimShapeHeight=height;
		const topTrimShape=new THREE.Shape();
		topTrimShape.moveTo(-topTrimShapeWidth/2,topTrimShapeHeight);
		topTrimShape.lineTo(-topTrimShapeWidth/2,topTrimShapeHeight-trimThk);
		topTrimShape.lineTo(topTrimShapeWidth/2,topTrimShapeHeight-trimThk);
		topTrimShape.lineTo(topTrimShapeWidth/2,topTrimShapeHeight);
		topTrimShape.closePath();

		const sideShape=[];
		const sideTrimShapeWidth=width/2-offset;
		const sideTrimShapeHeight=height-trimThk-gap;
		[-1,1].forEach(dir => {
			const sideTrimShape=new THREE.Shape();
			sideTrimShape.moveTo(dir*sideTrimShapeWidth,gap);
			sideTrimShape.lineTo(dir*sideTrimShapeWidth,sideTrimShapeHeight);
			sideTrimShape.lineTo(dir*(sideTrimShapeWidth-trimThk),sideTrimShapeHeight);
			sideTrimShape.lineTo(dir*(sideTrimShapeWidth-trimThk),gap);
			sideTrimShape.closePath();

			sideShape.push(sideTrimShape);
		})

		return {
			topTrimShape,
			sideShape
		};
	},[width,height])

	const gapModel=useMemo(() => {

		const gapTopShapeWidth=width-offset*2;
		const gapTopShapeHeight=height-trimThk;
		const gapTopShape=new THREE.Shape();
		gapTopShape.moveTo(-gapTopShapeWidth/2,gapTopShapeHeight);
		gapTopShape.lineTo(-gapTopShapeWidth/2,gapTopShapeHeight-gap);
		gapTopShape.lineTo(gapTopShapeWidth/2,gapTopShapeHeight-gap);
		gapTopShape.lineTo(gapTopShapeWidth/2,gapTopShapeHeight);
		gapTopShape.closePath();

		const gapBottomShapeWidth=width-offset*2;
		const gapBottomShape=new THREE.Shape();
		gapBottomShape.moveTo(-gapBottomShapeWidth/2,gapTopShapeHeight);
		gapBottomShape.lineTo(-gapBottomShapeWidth/2,gapTopShapeHeight-gap);
		gapBottomShape.lineTo(gapBottomShapeWidth/2,gapTopShapeHeight-gap);
		gapBottomShape.lineTo(gapBottomShapeWidth/2,gapTopShapeHeight);
		gapBottomShape.closePath();

		const gapSideShapeWidth=width-offset*2-trimThk*2;
		const gapSideShapeHeight=height-trimThk-gap;
		const gapSide=[];

		[-1,1].forEach(dir => {
			const gapSideShape=new THREE.Shape();
			gapSideShape.moveTo(dir*gapSideShapeWidth/2,gapSideShapeHeight);
			gapSideShape.lineTo(dir*(gapSideShapeWidth/2-gap),gapSideShapeHeight);
			gapSideShape.lineTo(dir*(gapSideShapeWidth/2-gap),gap);
			gapSideShape.lineTo(dir*gapSideShapeWidth/2,gap);
			gapSideShape.closePath();

			gapSide.push(gapSideShape);
		})

		return {
			gapTopShape,
			gapBottomShape,
			gapSide
		};
	},[width,height])

	const inTrimModel=useMemo(() => {
		const inTrimShapeWidth=width-offset*2-gap*2-trimThk*2;
		const inTrimShapeHeight=height-trimThk-gap;
		const inTrimShape=new THREE.Shape();
		inTrimShape.moveTo(-inTrimShapeWidth/2,inTrimShapeHeight);
		inTrimShape.lineTo(inTrimShapeWidth/2,inTrimShapeHeight);
		inTrimShape.lineTo(inTrimShapeWidth/2,gap);
		inTrimShape.lineTo(-inTrimShapeWidth/2,gap);
		inTrimShape.closePath();

		[-1,1].forEach(dir => {
			const inTrimCutShape=new THREE.Shape();
			inTrimCutShape.moveTo(dir*(inTrimShapeWidth/2-trimThk),inTrimShapeHeight-trimThk);
			inTrimCutShape.lineTo(dir*trimThk/2,inTrimShapeHeight-trimThk);
			inTrimCutShape.lineTo(dir*trimThk/2,gap+trimThk);
			inTrimCutShape.lineTo(dir*(inTrimShapeWidth/2-trimThk),gap+trimThk);
			inTrimCutShape.closePath();

			inTrimShape.holes.push(inTrimCutShape);
		})

		return {
			inTrimShape
		}
	},[width,height])

	const panelModel=useMemo(() => {
		const panelShapeWidth=width-offset*2-gap*2-trimThk*2;
		const panelShapHeight=height-trimThk-gap;
		const panelShapeModel=[];
		[-1,1].forEach(dir => {
			const panelShape=new THREE.Shape();
			panelShape.moveTo(dir*(panelShapeWidth/2-trimThk),panelShapHeight-trimThk);
			panelShape.lineTo(dir*trimThk/2,panelShapHeight-trimThk);
			panelShape.lineTo(dir*trimThk/2,gap+trimThk);
			panelShape.lineTo(dir*(panelShapeWidth/2-trimThk),gap+trimThk);
			panelShape.closePath();

			panelShapeModel.push(panelShape);
		})
		return {
			panelShapeModel
		}
	},[width,height])

	const BottomModel=useMemo(() => {
		const bottomModelWidth=width;
		const bottomModelHeight=trimThk * 5;

		const bottomModelShape=new THREE.Shape();
		bottomModelShape.moveTo(-bottomModelWidth/2,0);
		bottomModelShape.lineTo(bottomModelWidth/2,0);
		bottomModelShape.lineTo(bottomModelWidth/2,-bottomModelHeight);
		bottomModelShape.lineTo(-bottomModelWidth/2,-bottomModelHeight);
		bottomModelShape.closePath();

		const bottomSide=[];
		[-1,1].forEach(dir => {
			const bottomSideShape=new THREE.Shape();
			bottomSideShape.moveTo(dir*bottomModelWidth/2,0);
			bottomSideShape.lineTo(dir*bottomModelWidth/2,bottomModelHeight+trimThk-gap);
			bottomSideShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2),(bottomModelHeight+trimThk-gap)/4*3);
			bottomSideShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2),0);
			bottomSideShape.closePath();

			bottomSide.push(bottomSideShape);
		})

		const bottomGap=[];
		[-1,1].forEach(dir => {
			const bottomGapShape=new THREE.Shape();
			bottomGapShape.moveTo(dir*bottomModelWidth/2,bottomModelHeight+trimThk);
			bottomGapShape.lineTo(dir*bottomModelWidth/2,bottomModelHeight+trimThk-gap);
			bottomGapShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2),(bottomModelHeight+trimThk-gap)/4*3);
			bottomGapShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2),0);
			bottomGapShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2-gap),0);
			bottomGapShape.lineTo(dir*(bottomModelWidth/2-offset-trimThk/3*2-gap),(bottomModelHeight+trimThk)/4*3);
			bottomGapShape.closePath();

			bottomGap.push(bottomGapShape);
		})

		const bottomMidModelWidth=width-offset*2-gap*2-trimThk/3*4;
		const bottomMidShape=new THREE.Shape();
		bottomMidShape.moveTo(-bottomModelWidth/2,bottomModelHeight+trimThk);
		bottomMidShape.lineTo(-bottomMidModelWidth/2,(bottomModelHeight+trimThk)/4*3);
		bottomMidShape.lineTo(-bottomMidModelWidth/2,0);
		bottomMidShape.lineTo(bottomMidModelWidth/2,0);
		bottomMidShape.lineTo(bottomMidModelWidth/2,(bottomModelHeight+trimThk)/4*3);
		bottomMidShape.lineTo(bottomModelWidth/2,bottomModelHeight+trimThk);
		bottomMidShape.closePath();

		return {
			bottomSide,
			bottomGap,
			bottomMidShape
		};
	},[width,height])

	const underModel=useMemo(() => {
		const underModelWidth=width-offset;
		const underModelHeight=trimThk*6;
		const underModelShape=new THREE.Shape();
		underModelShape.moveTo(-underModelWidth/2,0);
		underModelShape.lineTo(-underModelWidth/2,underModelHeight);
		underModelShape.lineTo(underModelWidth/2,underModelHeight);
		underModelShape.lineTo(underModelWidth/2,0)
		underModelShape.closePath();

		return {underModelShape};
	},[width,height])

	return (
		<>
			<group name='outTrimModel' position={direction === 'front' ? [0, buildingHeight, buildingLength / 2] : [0, buildingHeight, -buildingLength / 2]} rotation={direction === 'front' ? [0, 0, 0] : [0, Math.PI, 0]}>
				<mesh>
					<extrudeGeometry args={[outTrimModel.topTrimShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#666666'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[outTrimModel.sideShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#666666'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[gapModel.gapTopShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'black'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[gapModel.gapSide,extrudeSetting(5)]} />
					<meshPhongMaterial color={'black'} />
				</mesh>
				<mesh position={[0,-(height-trimThk-gap),0]}>
					<extrudeGeometry args={[gapModel.gapBottomShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'black'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[inTrimModel.inTrimShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#666666'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[panelModel.panelShapeModel,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#262626'} />
				</mesh>
				<mesh rotation={[Math.PI/2,0,0]}>
					<extrudeGeometry args={[BottomModel.bottomSide,extrudeSetting(2)]} />
					<meshPhongMaterial color={'#C3E2CC'} />
				</mesh>
				<mesh rotation={[Math.PI/2,0,0]}>
					<extrudeGeometry args={[BottomModel.bottomMidShape,extrudeSetting(2)]} />
					<meshPhongMaterial color={'#C3E2CC'} />
				</mesh>
				<mesh rotation={[Math.PI/2,0,0]}>
					<extrudeGeometry args={[BottomModel.bottomGap,extrudeSetting(2)]} />
					<meshPhongMaterial color={'black'} />
				</mesh>
				<mesh position={[0,-2,0]} rotation={[Math.PI/2,0,0]}>
					<extrudeGeometry args={[underModel.underModelShape,extrudeSetting(4)]} />
					<meshPhongMaterial color={'#666666'} />
				</mesh>
			</group>
		</>
	)
}

export default PubConcessionWindow;