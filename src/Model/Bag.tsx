import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    shadow_plane: THREE.Mesh;
    bag: THREE.Mesh;
    metal: THREE.Mesh;
    strap: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
    Bag_Matte: THREE.MeshStandardMaterial;
    base_Metal: THREE.MeshStandardMaterial;
    Leather: THREE.MeshStandardMaterial;
  };
};

export function Bag(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/bag-transformed.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.shadow_plane.geometry}
        material={materials.Material}
        scale={54.265}
      />
      <mesh
        geometry={nodes.bag.geometry}
        material={materials.Bag_Matte}
        position={[-33.938, 27.485, -13.899]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.227}
      />
      <mesh
        geometry={nodes.metal.geometry}
        material={materials.base_Metal}
        position={[0.714, 39.452, 24.18]}
        rotation={[-0.995, -0.006, -1.566]}
        scale={0.362}
      />
      <mesh
        geometry={nodes.strap.geometry}
        material={materials.Leather}
        position={[7.813, 27.857, -47.626]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.227}
      />
    </group>
  );
}

useGLTF.preload("/bag-transformed.glb");
