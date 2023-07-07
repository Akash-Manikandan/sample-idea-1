import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { useRef } from "react";

type GLTFResult = GLTF & {
  nodes: {
    shoe_shoe_0: THREE.Mesh;
    shoelace_shoelace_0: THREE.Mesh;
  };
  materials: {
    shoe: THREE.MeshStandardMaterial;
    shoelace: THREE.MeshStandardMaterial;
  };
};

export function Jordan(props: JSX.IntrinsicElements["group"]) {
  const group = useRef(new THREE.Group());
  useFrame(({ clock }) => {
    // group.current.rotation.z = clock.getElapsedTime();
    group.current.rotation.y = clock.getElapsedTime();
    // group.current.rotation.x = 360;
  });
  const { nodes, materials } = useGLTF("/jordan-transformed.glb") as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.shoe_shoe_0.geometry}
        material={materials.shoe}
        rotation={[0, 0, 0]}
        scale={14}
      />
      <mesh
        geometry={nodes.shoelace_shoelace_0.geometry}
        material={materials.shoelace}
        rotation={[0, 0, 0]}
        scale={14}
      />
    </group>
  );
}

useGLTF.preload("/jordan-transformed.glb");
