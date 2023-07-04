import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import type { GroupProps } from "@react-three/fiber";
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
  const group = useRef(null);
  // useFrame(({ clock }) => {
  //   group.current.rotation.x = clock.getElapsedTime();
  //   group.current.rotation.y = clock.getElapsedTime();

  // });
  const { nodes, materials } = useGLTF("/jordan-transformed.glb") as GLTFResult;
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.shoe_shoe_0.geometry}
        material={materials.shoe}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={14}
      />
      <mesh
        geometry={nodes.shoelace_shoelace_0.geometry}
        material={materials.shoelace}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={14}
      />
    </group>
  );
}

useGLTF.preload("/jordan-transformed.glb");
