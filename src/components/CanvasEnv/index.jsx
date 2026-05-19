import {Environment,OrbitControls} from '@react-three/drei';

const CanvasEnv=() => {

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[0,100,500]} intensity={3} />
      <directionalLight position={[0,-100,-500]} intensity={2} />
      <OrbitControls
        target={[0,150,0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={30}
        maxDistance={800}
      />
      {/*<Environment preset="city" background backgroundBlurriness={1} backgroundIntensity={2} />*/}
      <axesHelper args={[500,500,500]} />
    </>
  );
};

export default CanvasEnv;
