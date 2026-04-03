import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const model = useGLTF("/davinci_vitruvian_man.glb");

  useEffect(() => {
    // traverse finds every mesh inside the model
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#00ffff",
          wireframe: true,
        });
      }
    });
  }, [model]);

  return (
    <Center>
      <primitive object={model.scene} scale={200} />
    </Center>
  );
}

const BodyViewer = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Canvas style={{ background: "gray" }} camera={{ position: [0, 0, 12] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
          enablePan={false} // disable moving camera sideways
          enableZoom={false}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BodyViewer;
