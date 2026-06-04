import * as THREE from 'three';
import React from 'react'
import { useSelector } from 'react-redux';
import { useLoader } from '@react-three/fiber';

import outsideWallTexture from '../../../../../../assets/imgs/ridge.png';
import { extrudeSetting } from '../../../../../../utils/Function';

const OutsideWall = () => {
    const length = useSelector((state) => state.building.buildingLength);
    const height = useSelector((state) => state.building.buildingHeight);
    const width = useSelector((state) => state.building.buildingWidth);
    const transParent = useSelector((state) => state.controlReducer.transparentBuild);

    const wallSideShape=new THREE.Shape();
    wallSideShape.moveTo(-length / 2 - 3, -5);
    wallSideShape.lineTo(-length / 2 - 3, height + 5);
    wallSideShape.lineTo(length / 2 + 3, height + 5);
    wallSideShape.lineTo(length / 2 + 3, -5);
    wallSideShape.closePath();

    const colorMap = useLoader(THREE.TextureLoader, outsideWallTexture);
    colorMap.wrapS = THREE.RepeatWrapping;
    colorMap.wrapT = THREE.RepeatWrapping;
    colorMap.colorSpace = THREE.SRGBColorSpace;
    colorMap.repeat.set(0.01, 0.02);
    colorMap.flipY = false;

    return (
        <mesh name='right-wall' rotation={[0, Math.PI / 2, 0]} position={[width / 2 + 2, 0, 0]} >
            <extrudeGeometry args={[wallSideShape, extrudeSetting(2)]} />
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