import React from 'react'
import * as THREE from 'three'


export function AirplaneGeometry() {
  return (
    <group>
      {/* Fuselagem, cilindro alongado */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 2.2, 16]} />
        <meshStandardMaterial color="#f9f5ec" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Nariz */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI/2, 0, 0]}>
        <coneGeometry args={[0.08, 0.4, 16]} />
        <meshStandardMaterial color="#f9f5ec" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Asa principal esquerda */}
      <mesh position={[-0.7, -0.02, 0]} rotation={[0, 0, 0.05]}>
        <boxGeometry args={[1.4, 0.04, 0.4]} />
        <meshStandardMaterial color="#e8d5b0" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Asa principal direita */}
      <mesh position={[0.7, -0.02, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[1.4, 0.04, 0.4]} />
        <meshStandardMaterial color="#e8d5b0" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Cauda vertical */}
      <mesh position={[0, 0.2, -0.9]}>
        <boxGeometry args={[0.04, 0.4, 0.3]} />
        <meshStandardMaterial color="#f9f5ec" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Cauda horizontal esquerda */}
      <mesh position={[-0.3, 0.05, -0.9]}>
        <boxGeometry args={[0.6, 0.03, 0.2]} />
        <meshStandardMaterial color="#e8d5b0" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Cauda horizontal direita */}
      <mesh position={[0.3, 0.05, -0.9]}>
        <boxGeometry args={[0.6, 0.03, 0.2]} />
        <meshStandardMaterial color="#e8d5b0" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Motores, esquerda */}
      <mesh position={[-0.5, -0.1, 0.1]}>
        <cylinderGeometry args={[0.06, 0.07, 0.3, 12]} />
        <meshStandardMaterial color="#1a1d26" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Motores, direita */}
      <mesh position={[0.5, -0.1, 0.1]}>
        <cylinderGeometry args={[0.06, 0.07, 0.3, 12]} />
        <meshStandardMaterial color="#1a1d26" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Detalhes janelas (strip) */}
      <mesh position={[0.082, 0.03, 0.2]}>
        <boxGeometry args={[0.01, 0.04, 1.0]} />
        <meshStandardMaterial color="#407e8d" metalness={0.2} roughness={0.6} emissive="#407e8d" emissiveIntensity={0.3} />
      </mesh>

      {/* Stripe decorativa MOOVIA */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.082, 0.122, 2.2, 16, 1, true, Math.PI*0.4, Math.PI*0.2]} />
        <meshStandardMaterial color="#ad8957" side={THREE.DoubleSide} metalness={0.1} roughness={0.5} />
      </mesh>
    </group>
  )
}
