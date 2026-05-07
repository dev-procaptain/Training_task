import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import WindowModel from './components/Building/Window';
import WallModel from './components/Building/Wall';
import Control from './components/Control';


function App() {
  
  return (
    <div className="App">
      <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <div style={{width: '80%', height: '100%', backgroundColor: 'cyan'}}>
          <Canvas>
            <mesh position={[0, -0.5, 0]}>
              <WallModel />
              <WindowModel />
              <ambientLight 
                intensity={3}
              />
              <OrbitControls 
                target={[0, 25, 0]}
                enableDamping
                dampingFactor={0.05}
                minDistance={150}
                maxDistance={300}
                maxPolarAngle={Math.PI / 2}
              />
            </mesh>
          </Canvas>
        </div>
        <div style={{width: '20%', height: '100%', backgroundColor: 'lightgreen', padding: '20px'}}>
        <Control />
        </div>
      </div>
    </div>
  );
}

export default App;
