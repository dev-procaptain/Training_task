import * as THREE from 'three';
import {TextureLoader} from 'three';
import React,{useMemo} from 'react';
import {useLoader} from '@react-three/fiber';

import {useSelector} from 'react-redux';
import {extrudeSetting} from '../../../../utils/Function';
import legTexture from '../../../../assets/imgs/leg_texture_old.jpg';

const LoftedTruss=() => {

  const width=useSelector((state) => state.building.buildingWidth);
  const length=useSelector((state) => state.building.buildingLength);
  const height=useSelector((state) => state.building.buildingHeight);
  const pitchRise=useSelector((state) => state.building.buildingPitch);
  const dstRailL=30;
  const pitchRatio=pitchRise/12;
  const railThickness=3;
  const railWidth=4;
  const roofWidth=width-2-railWidth*2;
  const roofHeight=(roofWidth/2)*pitchRatio;
  const roofBottomHeight=(roofWidth/2)*pitchRatio/3*2;
  const roofBottomPitchRatio=pitchRatio*1.5;
  const roofWidthone=roofBottomHeight/roofBottomPitchRatio;
  const usableLength=length-3;
  const railCount=Math.floor(usableLength/dstRailL);

  const spacing=
    (usableLength-railThickness*railCount)/
    (railCount-1);

  const colorMap=useLoader(TextureLoader,legTexture);

  colorMap.wrapS=THREE.RepeatWrapping;
  colorMap.wrapT=THREE.RepeatWrapping;
  colorMap.colorSpace=THREE.SRGBColorSpace;
  colorMap.repeat.set(0.02,0.01);
  colorMap.flipY=false;

  const roofBaseRail=useMemo(() => {

    const roofBaseRailModel=[];

    [-1,1].forEach((dir) => {

      for(let col=0;col<Math.floor(railCount);col++) {

        const roofBaseShape=new THREE.Shape();

        roofBaseShape.moveTo(dir*(roofWidth/2),0);

        roofBaseShape.lineTo(
          dir*(roofWidth/2-roofWidthone),
          roofBottomHeight
        );

        roofBaseShape.lineTo(0,roofHeight);

        roofBaseShape.lineTo(0,roofHeight+railWidth);

        roofBaseShape.lineTo(
          dir*(roofWidth/2-roofWidthone),
          roofBottomHeight+railWidth
        );

        roofBaseShape.lineTo(
          dir*(roofWidth/2+railWidth),
          0
        );

        roofBaseShape.closePath();

        roofBaseRailModel.push({
          shape: roofBaseShape,
          index: col,
        });
      }
    });

    return roofBaseRailModel;

  },[width,height,pitchRise,railCount]);

  return (
    <group>

      {
        roofBaseRail.map((item,index) => (

          <mesh
            key={index}
            position={[
              0,
              height+5,
              length/2-
              railThickness-
              railThickness/2-
              (spacing+railThickness)*item.index
            ]}
          >

            <extrudeGeometry
              args={[
                item.shape,
                extrudeSetting(3)
              ]}
            />

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
        ))
      }

    </group>
  );
};

export default LoftedTruss;