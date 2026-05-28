import * as THREE from 'three';
import {TextureLoader} from 'three';
import React,{useMemo} from 'react';
import {useLoader} from '@react-three/fiber';

import {useSelector} from 'react-redux';
import {extrudeSetting} from '../../../../utils/Function';
import legTexture from '../../../../assets/imgs/leg_texture_old.jpg';

const LoftedTruss=() => {
  const colorMap=useLoader(TextureLoader,legTexture);
  colorMap.wrapS=THREE.RepeatWrapping;
  colorMap.wrapT=THREE.RepeatWrapping;
  colorMap.colorSpace=THREE.SRGBColorSpace;
  colorMap.repeat.set(0.02,0.01);
  colorMap.flipY=false;

  const width=useSelector((state) => state.building.buildingWidth);
  const length=useSelector((state) => state.building.buildingLength);
  const height=useSelector((state) => state.building.buildingHeight);
  const pitchRise=useSelector((state) => state.building.buildingPitch);
  const tanRoofAngle=pitchRise/12;
  const dstRailL=30;
  const railThickness=3;
  const railThk=4;
  const roofWidth=width-2;
  const roofHeight=roofWidth/2*tanRoofAngle;
  const roofBottomHeight=(roofWidth/2)*tanRoofAngle/3*2;
  const tanRoofbottomAngle=tanRoofAngle*1.7;
  const roofWidthone=roofBottomHeight/tanRoofbottomAngle;
  const tanRoofTopAngle=(roofWidth/2-roofWidthone)/(roofHeight-roofBottomHeight);
  const railWidth=railThk*Math.sqrt(1+tanRoofbottomAngle*tanRoofbottomAngle)/tanRoofbottomAngle;
  const railHeight=railThk*Math.sqrt(1+tanRoofTopAngle*tanRoofTopAngle)/tanRoofTopAngle;
  const innerRoofWidth=tanRoofTopAngle*(tanRoofbottomAngle*(roofWidth/2-railWidth)-(roofHeight-railHeight))/(tanRoofbottomAngle*tanRoofTopAngle-1);
  const innerRoofHeight=tanRoofbottomAngle*(tanRoofTopAngle*(roofHeight-railHeight)-(roofWidth/2-railWidth))/(tanRoofbottomAngle*tanRoofTopAngle-1);
  const usableLength=length-3;
  const usableWidth = width - railThk * 2 - 2;
  const railLCount = Math.floor(usableLength/dstRailL);
  const lSpacing=(usableLength-railThickness*(railLCount))/(railLCount - 1);
  
  const roofFrontBaseRail = useMemo(() => {
    const railWCount = Math.floor(usableWidth / dstRailL);
    const wSpacing = (usableWidth - railThk * railWCount) / (railWCount - 1);
    const roofFrontBaseRailModel = [];
    const startX = width / 2 - 1 - railThk;
    [-1, 1].forEach((dir) => {
      for(let row = 0; row < railWCount / 2; row++) {
        const x1 = startX - row * (wSpacing + railThk);
        const x2 = startX - railThk - row * (wSpacing + railThk);
        const y1 = x1 > (width / 2 - railWidth - roofWidthone - 1) ? (width / 2 - x1 - railWidth - 1) * tanRoofbottomAngle : innerRoofHeight + (innerRoofWidth - x1) / tanRoofTopAngle;
        const y2 = x2 > (width / 2 - railWidth - roofWidthone - 1) ? (width / 2 - x2 - railWidth - 1) * tanRoofbottomAngle : innerRoofHeight + (innerRoofWidth - x2) / tanRoofTopAngle;
        const shape = new THREE.Shape();
        shape.moveTo(dir * x1, 0);
        shape.lineTo(dir * x1, y1);
        shape.lineTo(dir * x2, y2);
        shape.lineTo(dir * x2, 0);
        shape.closePath();
        
        roofFrontBaseRailModel.push(shape);
      }
    }) 
    return  roofFrontBaseRailModel;
  }, [width, height, tanRoofbottomAngle, tanRoofTopAngle, roofBottomHeight, roofWidthone])
  
  const roofBaseRail=useMemo(() => {
    const roofBaseRailModel=[];
    [-1,1].forEach((dir) => {

      for(let col=0;col<Math.floor(railLCount);col++) {

        const roofBaseShape=new THREE.Shape();
        roofBaseShape.moveTo(dir*(roofWidth/2),0);
        roofBaseShape.lineTo(dir*(roofWidth/2-roofWidthone),roofBottomHeight);
        roofBaseShape.lineTo(0,roofHeight);
        roofBaseShape.lineTo(0,roofHeight-railHeight);
        roofBaseShape.lineTo(dir*innerRoofWidth,innerRoofHeight);
        roofBaseShape.lineTo(dir*(roofWidth/2-railWidth),0);
        roofBaseShape.closePath();

        roofBaseRailModel.push({
          shape: roofBaseShape,
          index: col,
        });
      }
    });
    return roofBaseRailModel;

  },[width,height,pitchRise,railLCount]);

  return (
    <group>
      
      <mesh position={[0, height + 5, length/2 - 4.5]}>
        <extrudeGeometry args={[roofFrontBaseRail, extrudeSetting(3)]} />
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
      <mesh position={[0, height + 5, -length/2 + 1.5]}>
        <extrudeGeometry args={[roofFrontBaseRail, extrudeSetting(3)]} />
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
              (lSpacing+railThickness)*item.index
            ]}
          >

            <extrudeGeometry args={[item.shape,extrudeSetting(railThickness)]} />
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

