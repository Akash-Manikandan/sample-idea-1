import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Jordan } from "./Model/Jordan";
import Post from "./Post";
import html2canvas, { Options } from "html2canvas";
import RecordRTC from "recordrtc";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [recording, setRecording] = useState(false);
  let mediaRecorder: RecordRTC | undefined;

  const startRecording = async () => {
    const canvasStream = canvasRef.current!.captureStream() as MediaStream;

    const divCanvas = await html2canvas(divRef.current!);
    const divStream = divCanvas.captureStream() as MediaStream;

    const mergedStream = mergeStreams(canvasStream, divStream);

    const options: RecordRTC.Options = {
      type: "video",
      mimeType: "video/webm",
    };

    mediaRecorder = new RecordRTC(mergedStream, options);
    mediaRecorder.startRecording();

    setRecording(true);

    setTimeout(() => {
      stopRecording();
    }, 5000); // 5 seconds (adjust as needed)
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stopRecording(() => {
        const blob = mediaRecorder!.getBlob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "video.webm";
        a.click();

        setRecording(false);
      });
    }
  };

  const mergeStreams = (
    stream1: MediaStream,
    stream2: MediaStream
  ): MediaStream => {
    const audioTracks = stream1.getAudioTracks();
    const videoTracks = stream2.getVideoTracks();

    const mergedStream = new MediaStream([...audioTracks, ...videoTracks]);
    return mergedStream;
  };

  return (
    <>
      <div className="target-div" ref={divRef}>
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
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </>
  );
}

export default App;
