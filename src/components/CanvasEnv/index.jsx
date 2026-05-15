import { Environment, OrbitControls } from '@react-three/drei';
import { useSelector } from 'react-redux';

const CanvasEnv = () => {
  const height = useSelector((state) => state.building.buildingHeight);

  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[0, 100, 500]} intensity={3} />
      <directionalLight position={[0, -100, -500]} intensity={2} />
      <OrbitControls
        target={[0, height / 2, 0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={100}
        maxDistance={5000}
      />
      <Environment preset="city" background backgroundBlurriness={1} backgroundIntensity={2} />
      <axesHelper args={[500, 500, 500]} />
    </>
  );
};

export default CanvasEnv;
