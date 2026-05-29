import * as THREE from 'three';
import React,{useMemo} from 'react'

import { useSelector } from 'react-redux';
import {extrudeSetting} from '../../../../../../../utils/Function';

const Method2=({doorType, width, height, id, trimWidth, direction}) => {
	const buildingWidth = useSelector((state) => state.building.buildingWidth);
	//const buildingHeight = useSelector((state) => state.building.buildingHeight);
	const trimModelThk=4;
	const innerTrimModelThk=6;
	const bottomTrimThk=2;
	const windowCountX=2;
	const windowTrimThk=3;
	const glassTrimThk=1;
	const piecePatternCountX=5;
	const glassCoutX=2;
	let countY=4;
	let patternContX=2;

	const trimModel=useMemo(() => {
		const trimModelWidth=width;
		const trimModelHeight=height;
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
		const innerModelWidth=width-trimModelThk*2;
		const innerModelHeight=height-trimModelThk;
		const windowModelwidth=(innerModelWidth-innerTrimModelThk*(windowCountX+2))/windowCountX;
		const windowModelHeight=20;
		const patternModelWidth=14
		const patternModelHeight=10;
		const patternAreaHeight=(innerModelHeight-innerTrimModelThk-windowModelHeight)
		const glassAreaModelWidth=windowModelwidth-windowTrimThk*2;
		const glassAreaModelHeight=windowModelHeight-windowTrimThk*2;
		const glassModelWidth=(glassAreaModelWidth-glassTrimThk*(glassCoutX+1))/glassCoutX;
		const glassModelHeight=(glassAreaModelHeight-glassTrimThk*3)/2;
		const piecePatternModelWidth=(patternModelWidth-glassTrimThk*(piecePatternCountX+1))/piecePatternCountX;
		const piecePatternModelHeight=patternModelHeight-glassTrimThk*2;

		const innerModelShape=new THREE.Shape();
		innerModelShape.moveTo(-innerModelWidth/2,innerModelHeight);
		innerModelShape.lineTo(innerModelWidth/2,innerModelHeight);
		innerModelShape.lineTo(innerModelWidth/2,bottomTrimThk);
		innerModelShape.lineTo(-innerModelWidth/2,bottomTrimThk);
		innerModelShape.closePath();

		let windowModel=[];
		let patternModel=[];
		let glassAreaModel=[];
		let glassModel=[];
		let piecePatternModel=[];

		[-1,1].forEach(dir => {
			const windowModelShape=new THREE.Shape();
			windowModelShape.moveTo(dir*(innerModelWidth/2-innerTrimModelThk),innerModelHeight-innerTrimModelThk);
			windowModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-windowModelwidth),innerModelHeight-innerTrimModelThk);
			windowModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-windowModelwidth),innerModelHeight-windowModelHeight-innerTrimModelThk);
			windowModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk),innerModelHeight-windowModelHeight-innerTrimModelThk);
			windowModelShape.closePath();

			const glassAreaModelShape=new THREE.Shape();
			glassAreaModelShape.moveTo(dir*(innerModelWidth/2-innerTrimModelThk-windowTrimThk),innerModelHeight-innerTrimModelThk-windowTrimThk);
			glassAreaModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-windowTrimThk-glassAreaModelWidth),innerModelHeight-innerTrimModelThk-windowTrimThk);
			glassAreaModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-windowTrimThk-glassAreaModelWidth),innerModelHeight-innerTrimModelThk-windowTrimThk-glassAreaModelHeight);
			glassAreaModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-windowTrimThk),innerModelHeight-innerTrimModelThk-windowTrimThk-glassAreaModelHeight);
			glassAreaModelShape.closePath();

			windowModelShape.holes.push(glassAreaModelShape);

			glassAreaModel.push(glassAreaModelShape);

			const glassModelX=innerModelWidth/2-innerTrimModelThk-windowTrimThk-glassTrimThk;
			const glassModelY=innerModelHeight-innerTrimModelThk-windowTrimThk-glassTrimThk;

			for(let col=0;col<2;col++) {
				for(let row=0;row<glassCoutX;row++) {
					const glassModelShape=new THREE.Shape();
					glassModelShape.moveTo(dir*(glassModelX-row*(glassModelWidth+glassTrimThk)),glassModelY-col*(glassModelHeight+glassTrimThk));
					glassModelShape.lineTo(dir*((glassModelX-glassModelWidth)-row*(glassModelWidth+glassTrimThk)),glassModelY-col*(glassModelHeight+glassTrimThk));
					glassModelShape.lineTo(dir*((glassModelX-glassModelWidth)-row*(glassModelWidth+glassTrimThk)),glassModelY-glassModelHeight-col*(glassModelHeight+glassTrimThk));
					glassModelShape.lineTo(dir*(glassModelX-row*(glassModelWidth+glassTrimThk)),glassModelY-glassModelHeight-col*(glassModelHeight+glassTrimThk));
					glassModelShape.closePath();

					glassAreaModelShape.holes.push(glassModelShape);

					glassModel.push(glassModelShape);
				}
			}

			//while(
			//	innerModelWidth/2-(patternContX*(patternModelWidth+innerTrimModelThk))>patternModelWidth+innerTrimModelThk*2) {
			//	patternContX++;
			//}

			//while(
			//	patternAreaHeight-((countY-1)*(patternModelHeight+innerTrimModelThk))>patternModelHeight+innerTrimModelThk) {
			//	countY++;
			//}

			patternContX=Math.floor((innerModelWidth/2-innerTrimModelThk)/(patternModelWidth+innerTrimModelThk));

			countY=Math.floor((patternAreaHeight-innerTrimModelThk)/(patternModelHeight+innerTrimModelThk));

			const patternBetweenX=(innerModelWidth/2-innerTrimModelThk*2-patternModelWidth*patternContX)/(patternContX-1);

			const patternBetweenY=(patternAreaHeight-innerTrimModelThk*2-patternModelHeight*countY)/(countY-1);

			for(let col=0;col<countY;col++) {
				for(let row=0;row<patternContX;row++) {
					const patternModelShape=new THREE.Shape();

					patternModelShape.moveTo(dir*(innerModelWidth/2-innerTrimModelThk-row*(patternModelWidth+patternBetweenX)),patternAreaHeight-innerTrimModelThk-col*(patternModelHeight+patternBetweenY));
					patternModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-patternModelWidth-row*(patternModelWidth+patternBetweenX)),patternAreaHeight-innerTrimModelThk-col*(patternModelHeight+patternBetweenY));
					patternModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-patternModelWidth-row*(patternModelWidth+patternBetweenX)),patternAreaHeight-patternModelHeight-innerTrimModelThk-col*(patternModelHeight+patternBetweenY));
					patternModelShape.lineTo(dir*(innerModelWidth/2-innerTrimModelThk-row*(patternModelWidth+patternBetweenX)),patternAreaHeight-patternModelHeight-innerTrimModelThk-col*(patternModelHeight+patternBetweenY));
					patternModelShape.closePath();

					const innerPatternModelX=innerModelWidth/2-innerTrimModelThk-glassTrimThk-row*(patternBetweenX+patternModelWidth);

					const innerPatternModelY=patternAreaHeight-innerTrimModelThk-glassTrimThk-col*(patternBetweenY+patternModelHeight);

					for(let row=0;row<piecePatternCountX;row++) {
						const innerPatternModelShape=new THREE.Shape();
						innerPatternModelShape.moveTo(dir*(innerPatternModelX-row*(piecePatternModelWidth+glassTrimThk)),innerPatternModelY);
						innerPatternModelShape.lineTo(dir*(innerPatternModelX-piecePatternModelWidth-row*(piecePatternModelWidth+glassTrimThk)),innerPatternModelY);
						innerPatternModelShape.lineTo(dir*(innerPatternModelX-piecePatternModelWidth-row*(piecePatternModelWidth+glassTrimThk)),innerPatternModelY-piecePatternModelHeight);
						innerPatternModelShape.lineTo(dir*(innerPatternModelX-row*(piecePatternModelWidth+glassTrimThk)),innerPatternModelY-piecePatternModelHeight);
						innerPatternModelShape.closePath();

						piecePatternModel.push(innerPatternModelShape);
						patternModelShape.holes.push(innerPatternModelShape);
					}

					innerModelShape.holes.push(patternModelShape);
					patternModel.push(patternModelShape)
				}
			}
			innerModelShape.holes.push(windowModelShape);
			windowModel.push(windowModelShape);
		})

		return {
			innerModelShape,
			windowModel,
			patternModel,
			glassAreaModel,
			glassModel,
			piecePatternModel
		}

	},[width,height])

	const bottomModel=useMemo(() => {
		const bottomModelWidth=width-trimModelThk*2;

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
		<group rotation={direction === 'left' ? [0, Math.PI / 2, 0] : [0, -Math.PI / 2, 0]} position={direction === 'left' ? [buildingWidth / 2 + 3, 0, 0] : [-buildingWidth / 2 - 3, 0 , 0]}>
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
					<meshPhongMaterial color={'#f2f2f2'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[innerModel.windowModel,extrudeSetting(3.5)]} />
					<meshPhongMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[innerModel.glassAreaModel,extrudeSetting(3.5)]} />
					<meshPhongMaterial color={'#f2f2f2'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[innerModel.glassModel,extrudeSetting(3.5)]} />
					<meshStandardMaterial
						color={'#4d4d4d'}
						roughness={0}
					/>
				</mesh>
				<mesh>
					<extrudeGeometry args={[innerModel.patternModel,extrudeSetting(3)]} />
					<meshPhongMaterial color={'#8c8c8c'} />
				</mesh>
				<mesh>
					<extrudeGeometry args={[innerModel.piecePatternModel,extrudeSetting(3.5)]} />
					<meshStandardMaterial
						color={'#f2f2f2'}
						//normalMap={patternMap}
						roughness={0.8}
						metalness={0}
					/>
				</mesh>
			</group>

			<group name='bottomModel'>
				<mesh>
					<extrudeGeometry args={[bottomModel.bottomModelShape,extrudeSetting(5)]} />
					<meshPhongMaterial color={'#404040'} />
				</mesh>
			</group>
		</group>
	)
}

export default Method2;