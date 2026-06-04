import {Environment,OrbitControls} from '@react-three/drei';
import {useSelector} from 'react-redux';

const CanvasEnv=({orbitRef}) => {
  const controlBuild = useSelector((state) => state.controlReducer);
  
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[0,100,500]} intensity={3} />
      <directionalLight position={[0,-100,-500]} intensity={2} />
      <OrbitControls
        ref={orbitRef}
        target={[0,150,0]}
        enableDamping
        autoRotate={controlBuild.rotateBuild}
        dampingFactor={0.05}
        minDistance={30}
        maxDistance={800}
        duration={0.5}
        autoRotateSpeed={8}
      />
      {/*<Environment preset="city" background backgroundBlurriness={1} backgroundIntensity={2} />*/}
      <axesHelper args={[500,500,500]} />
    </>
  );
};

export default CanvasEnv;
