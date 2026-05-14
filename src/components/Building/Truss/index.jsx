import React,{useMemo} from 'react'
import {useStore} from '../../../store'
import * as THREE from 'three';
import {extrudeSetting} from '../../../utils/Function';
import {CSG} from '../../../assets/libs';

const Truss=() => {
	const {sizeInfo}=useStore();
	const scaleX=20;
	const scaleY=21;
	const width=sizeInfo['Truss'][0];
	const height=sizeInfo['Truss'][1];
	const length=30;

	const baseModel=useMemo(() => {
		const baseWidth=width*scaleX;
		const baseHeight=height*scaleY;
		const baseLength=length*scaleY;

		const baseShape=new THREE.Shape();
		baseShape.moveTo(-baseWidth/2-0.5,-baseLength/2-1.5);
		baseShape.lineTo(-baseWidth/2-0.5,baseLength/2+1.5);
		baseShape.lineTo(baseWidth/2+0.5,baseLength+1.5);
		baseShape.lineTo(baseWidth/2+0.5,-baseLength-1.5);
		baseShape.closePath();

		const baseCutShape=new THREE.Shape();
		baseCutShape.lineTo(-baseShape/2,-baseLength/2);
		baseCutShape.lineTo(-baseWidth/2,baseLength/2);
		baseCutShape.lineTo(baseWidth/2,baseLength/2);
		baseCutShape.lineTo(baseWidth/2,-baseLength/2);
		baseCutShape.closePath();

		const geometry1=new THREE.ExtrudeGeometry(baseShape,extrudeSetting(5));
		const material1=new THREE.MeshBasicMaterial({color: 0x00ff00});
		const mesh1=new THREE.Mesh(geometry1,material1);

		const geometry2=new THREE.ExtrudeGeometry(baseCutShape,extrudeSetting(5));
		const material2=new THREE.MeshBasicMaterial({color: 0x00ff00});
		const mesh2=new THREE.Mesh(geometry2,material2);

		mesh1.updateMatrix();
		mesh2.updateMatrix();

		const mesh1CSG=CSG.fromMesh(mesh1);
		const mesh2CSG=CSG.fromMesh(mesh2);

		const subtractCSG=mesh1CSG.subtract(mesh2CSG);
		const resultGeometry=CSG.toGeometry(subtractCSG);

		return resultGeometry;
	},[width,height,length])

	return (
		<>
			<group name='base'>
				<mesh geometry={baseModel.resultGeometry}>
					<meshLambertMaterial color={'gray'} />
				</mesh>
			</group>
		</>
	)
}

export default Truss