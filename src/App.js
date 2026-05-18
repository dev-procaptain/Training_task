import './App.css';
import {Canvas} from '@react-three/fiber';
import ControlPanelShell from './components/Control/ControlPanelShell';
import Building from './components/Building';
import CanvasEnv from './components/CanvasEnv';

function App() {

  return (
    <div className="App">
      <div style={{width: '100%',height: '100%',display: 'flex'}}>
        <div style={{flex: 1,height: '100%',minWidth: 0}}>
          <Canvas
            id="canvas-container"
            camera={{
              fov: 45,
              near: 0.1,
              far: 100000,
              aspect: window.innerWidth/window.innerHeight,
              position: [0,150,800],
            }}
          >
            <CanvasEnv />
            <Building />
          </Canvas>
        </div>
        <ControlPanelShell />
      </div>
    </div>
  );
}

export default App;
