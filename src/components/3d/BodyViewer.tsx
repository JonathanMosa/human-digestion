import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

function Hotspot({
  position,
  onClick,
}: {
  position: [number, number, number];
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry args={[0.2, 4, 4]} />
      <meshBasicMaterial color={hovered ? "red" : "#8a3737"} />
    </mesh>
  );
}

function Model() {
  const model = useGLTF("/davinci_vitruvian_man.glb");

  useEffect(() => {
    // traverse finds every mesh inside the model
    model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#44403C",
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
    <div
      style={{
        width: "100%",
        height: "600px",
        margin: "0 auto",
        marginTop: "100px",
      }}
    >
      <Canvas
        style={{ background: "transparent" }}
        camera={{ position: [0, 0, 12] }}
      >
        <Hotspot position={[0, 5, 0]} onClick={() => console.log("clicked")} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls
          enablePan={false} // disable moving camera sideways
          enableZoom={false}
          target={[0, 1, 0]}
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BodyViewer;
