import './App.css';
import { Canvas } from '@react-three/fiber';
import Box from './components/box';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <div className="App">
      <Canvas>
        <mesh position={[0, -0.5, 0]}>
          <Box />
          <ambientLight />
          <OrbitControls />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
