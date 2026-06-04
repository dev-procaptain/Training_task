import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';

import { extrudeSetting } from '../../../../../utils/Function';
import outsideWallTexture from '../../../../../assets/imgs/ridge.png';

const OutsideWall = () => {
	const width = useSelector((state) => state.building.buildingWidth);
	const length = useSelector((state) => state.building.buildingLength);
	const height = useSelector((state) => state.building.buildingHeight);
	const pitchRise = useSelector((state) => state.building.buildingPitch);
	const transParent =   useSelector((state) => state.controlReducer.transparentBuild);
    const modelType=useSelector((state) => state.building.modelType);
    
    const modelShape = useMemo(() => {
        const model = new THREE.Shape();

        if (modelType.includes('gable')) {
            const pitchRatio = pitchRise / 12;
            const railThk = 4;
            const roofAngle = Math.atan(pitchRatio);
            const railHeight = railThk / Math.cos(roofAngle);

            const roofHeight = (width / 2 - railHeight - 1) * pitchRatio;
            const wallHeight = height + 6 + roofHeight + railHeight;
        
            model.moveTo(-width / 2 - 2, -5);
            model.lineTo(-width / 2 - 2, height + 5);
            model.lineTo(0, wallHeight);
            model.lineTo(width / 2 + 2, height + 5);
            model.lineTo(width / 2 + 2, -5);
        } else {
            const tanRoofAngle=pitchRise/12;
            const railThk=1;
            const roofWidth=width-2;
            const roofHeight=roofWidth/2*tanRoofAngle;
            const roofBottomHeight=(roofWidth/2)*tanRoofAngle/3*2;
            const tanRoofbottomAngle=tanRoofAngle*1.7;
            const roofWidthone=roofBottomHeight/tanRoofbottomAngle;
            const tanRoofTopAngle=(roofWidth/2-roofWidthone)/(roofHeight-roofBottomHeight);
            const railWidth=railThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
            const railHeight=railThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
            const outerRoofWidth=tanRoofTopAngle*(tanRoofbottomAngle*(roofWidth/2+railWidth)-(roofHeight+railHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
            const outerRoofHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight+railHeight)-(roofWidth/2+railWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);

            model.moveTo(-width / 2 - 2, -5);
            model.lineTo(-width / 2 - 2, height + 5);
            model.lineTo(-outerRoofWidth, outerRoofHeight + height + 5);
            model.lineTo(0,roofHeight+height + 5+railHeight);
            model.lineTo(outerRoofWidth, outerRoofHeight + height + 5);
            model.lineTo(width / 2 + 2, height + 5);
            model.lineTo(width / 2 + 2, -5);
        }
        model.closePath();

        return model;
    }, [width, height, modelType])
    
	const colorMap = useLoader(THREE.TextureLoader, outsideWallTexture);
	colorMap.wrapS = THREE.RepeatWrapping;
	colorMap.wrapT = THREE.RepeatWrapping;
	colorMap.colorSpace = THREE.SRGBColorSpace;
	colorMap.repeat.set(0.01,0.02);
	colorMap.flipY = false;

    return (
        <mesh name='front-outside-wall' position={[0, 0, length / 2 + 1]}>
            <extrudeGeometry args={[modelShape, extrudeSetting(2)]} />
            <meshLambertMaterial
                bumpMap={colorMap}
                bumpScale={0.2}
                map={colorMap}
                color={'#8c8c8c'}
                side={THREE.DoubleSide}
                roughness={0.8}
                metalness={0}
                transparent
                opacity={transParent ? 0.05 : 1}
            />
        </mesh>
    )
}

export default OutsideWall