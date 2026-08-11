"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Dish } from "@/data/dishes";

type DishViewer3DProps = {
  dish: Dish;
};

// Placeholder: mientras no exista el .glb real de un plato (ver CLAUDE.md,
// sección "Sobre los modelos 3D"), se muestra una esfera con un color
// genérico en vez del modelo. La animación de ensamblaje de ingredientes
// (IngredientAssembly.ts) todavía no está conectada aquí — queda pendiente
// de diseño antes de implementarla.
export function DishViewer3D({ dish }: DishViewer3DProps) {
  return (
    <div className="aspect-square w-full">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <mesh name={dish.id}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#e5177d" />
        </mesh>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
