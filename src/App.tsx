import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Jordan } from "./Model/Jordan";
import Post from "./Post";
import { Bag } from "./Model/Bag";
import { Rolex } from "./Model/Rolex";
import { Car } from "./Model/Car";
import html2canvas from "html2canvas";

function App() {
 
  return (
    <>
      <div className="target-div">
        <div className="w-[1080px] z-50 absolute top-6 left-0 flex items-center justify-center">
          <Canvas
            style={{
              width: "750px",
              height: "750px",
            }}
          >
            <Suspense fallback={null}>
              <ambientLight />
              <directionalLight intensity={2} position={[0, 0, 50]} />
              <Jordan />
              <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
        </div>
        <Post />
      </div>
    
    </>
  );
}

export default App;
