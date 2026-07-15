'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { FLIGHT_PATH } from './path'

export function Airplane({
  progressRef,
  targetRef
}: {
  progressRef: React.MutableRefObject<number>
  targetRef:   React.MutableRefObject<number>
}) {
  const groupRef  = useRef<THREE.Group>(null)
  const lightRef  = useRef<THREE.PointLight>(null)
  const { scene } = useGLTF('/3D/airplane.glb')

  const tmpQ  = useRef(new THREE.Quaternion())
  const bankQ = useRef(new THREE.Quaternion())

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // ── Lerp suave (inércia cinematográfica) ─────────────
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      targetRef.current,
      Math.min(delta * 3.5, 1)
    )

    const t   = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const pos = FLIGHT_PATH.getPoint(t)

    // Posição
    groupRef.current.position.copy(pos)
    if (lightRef.current) {
      lightRef.current.position.copy(pos)
      lightRef.current.position.y += 0.35
    }

    // Escala por profundidade Z - Aumentada significativamente para presença premium extrema
    const sc = THREE.MathUtils.lerp(0.7, 1.05, (pos.z + 1) * 0.5)
    groupRef.current.scale.setScalar(sc)

    // Orientação: aponta na direção do movimento
    const tA = Math.min(1, t + 0.001)
    const tB = Math.max(0, t - 0.001)
    const pA = FLIGHT_PATH.getPoint(tA)
    const pB = FLIGHT_PATH.getPoint(tB)
    
    // Vetor direção visual (frente do avião)
    // Ignora a queda/subida em Y para o nariz nunca "embicar" para baixo.
    // O avião ainda segue o caminho, mas mantém atitude nivelada e vira de lado.
    const travel = pA.clone().sub(pB).normalize()
    const forward = new THREE.Vector3(travel.x, 0, travel.z)
    if (forward.lengthSq() < 0.0001) {
      forward.set(Math.sign(travel.x) || 1, 0, 0)
    }
    forward.normalize()
    
    // Matriz de rotação estável
    const up = new THREE.Vector3(0, 1, 0)
    const right = new THREE.Vector3().crossVectors(forward, up).normalize()
    const realUp = new THREE.Vector3().crossVectors(right, forward).normalize()
    
    // Basis: X=right, Y=realUp, Z=forward (frente do modelo)
    const mat = new THREE.Matrix4().makeBasis(right, realUp, forward)
    tmpQ.current.setFromRotationMatrix(mat)
    
    // Bank angle (inclinação lateral) baseado na curvatura (mudança de X)
    const bank = THREE.MathUtils.clamp((pA.x - pB.x) * 3, -0.6, 0.6)
    bankQ.current.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -bank)
    
    tmpQ.current.multiply(bankQ.current)
    groupRef.current.quaternion.slerp(tmpQ.current, Math.min(delta * 4, 1))
  })

  return (
    <>
      {/* Luz dourada que acompanha o avião */}
      <pointLight
        ref={lightRef}
        color="#cead84"
        intensity={1.4}
        distance={5}
        decay={2}
      />

      {/* Modelo do avião */}
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </>
  )
}
