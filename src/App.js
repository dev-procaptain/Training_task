import './App.css';
import {Canvas} from '@react-three/fiber';
import Control from './components/Control';
import Building from './components/Building';
import CanvasEnv from './components/CanvasEnv';


function App() {

  return (
    <div className="App">
      <div style={{width: '100%',height: '100%',display: 'flex'}}>
        <div style={{width: '80%',height: '100%'}}>
          <Canvas
            id='canvas-container'
            camera={{
              fov: 45,
              near: 0.1,
              far: 1000,
              aspect: window.innerWidth / window.innerHeight,
              position: [0, 10, 200]
            }}
          >
            <CanvasEnv />
            <Building />
          </Canvas>
        </div>
        <div style={{width: '20%',height: '100%',backgroundColor: 'lightgreen',padding: '20px'}}>
          <Control />
        </div>
      </div>
    </div>
  );
}

export default App;
