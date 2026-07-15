'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { FLIGHT_PATH } from './path'

const TRAIL_N = 120  // pontos de histórico

export function Trail({
  progressRef
}: {
  progressRef: React.MutableRefObject<number>
}) {
  // Histórico de posições reais do avião (bidirecional)
  const history = useRef<THREE.Vector3[]>([])

  // GLOW, layer largo e suave
  const glowGeo = useRef(new THREE.BufferGeometry())
  const glowPos = useRef(new Float32Array(TRAIL_N * 3))
  const glowCol = useRef(new Float32Array(TRAIL_N * 3))

  // CORE, layer fino e brilhante
  const coreGeo = useRef(new THREE.BufferGeometry())
  const corePos = useRef(new Float32Array(TRAIL_N * 3))
  const coreCol = useRef(new Float32Array(TRAIL_N * 3))

  useFrame(() => {
    const t   = THREE.MathUtils.clamp(progressRef.current, 0, 1)
    const pos = FLIGHT_PATH.getPoint(t)

    // Ponto de emissão: traseira do avião
    // Calcular tangente para deslocar o ponto de emissão para trás
    const tA = Math.min(1, t + 0.005)
    const tB = Math.max(0, t - 0.005)
    const tangent = FLIGHT_PATH.getPoint(tA).sub(FLIGHT_PATH.getPoint(tB)).normalize()
    const scale   = THREE.MathUtils.lerp(0.016, 0.023, (pos.z + 1) * 0.5)
    const emit    = pos.clone().addScaledVector(tangent, -0.6 * scale / 0.02)

    // Adiciona no início, o trail sempre fica atrás, independente da direção
    history.current.unshift(emit)
    if (history.current.length > TRAIL_N) history.current.pop()

    const n = history.current.length

    for (let i = 0; i < TRAIL_N; i++) {
      const p     = i < n ? history.current[i] : emit
      const ratio = i / (TRAIL_N - 1)
      const fade  = Math.pow(1 - ratio, 1.4)   // desvanece progressivamente

      // GLOW, dourado suave
      glowPos.current[i*3]   = p.x
      glowPos.current[i*3+1] = p.y
      glowPos.current[i*3+2] = p.z
      glowCol.current[i*3]   = 0.68 * fade
      glowCol.current[i*3+1] = 0.54 * fade
      glowCol.current[i*3+2] = 0.34 * fade

      // CORE, branco quente → dourado → some
      corePos.current[i*3]   = p.x
      corePos.current[i*3+1] = p.y
      corePos.current[i*3+2] = p.z
      if (ratio < 0.15) {
        // Branco ivory perto do avião
        coreCol.current[i*3]   = 0.97 * fade
        coreCol.current[i*3+1] = 0.96 * fade
        coreCol.current[i*3+2] = 0.94 * fade
      } else {
        // Dourado progressivo
        coreCol.current[i*3]   = 0.82 * fade
        coreCol.current[i*3+1] = 0.67 * fade
        coreCol.current[i*3+2] = 0.43 * fade
      }
    }

    // Atualizar geometrias
    glowGeo.current.setAttribute('position', new THREE.BufferAttribute(glowPos.current, 3))
    glowGeo.current.setAttribute('color',    new THREE.BufferAttribute(glowCol.current, 3))
    glowGeo.current.setDrawRange(0, n)
    glowGeo.current.attributes.position.needsUpdate = true
    glowGeo.current.attributes.color.needsUpdate    = true

    coreGeo.current.setAttribute('position', new THREE.BufferAttribute(corePos.current, 3))
    coreGeo.current.setAttribute('color',    new THREE.BufferAttribute(coreCol.current, 3))
    coreGeo.current.setDrawRange(0, n)
    coreGeo.current.attributes.position.needsUpdate = true
    coreGeo.current.attributes.color.needsUpdate    = true
  })

  return (
    <>
      {/* Glow, dourado suave, mais largo */}
      <primitive object={new THREE.Line(glowGeo.current, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.45 }))} />

      {/* Core, branco→dourado, fino e brilhante */}
      <primitive object={new THREE.Line(coreGeo.current, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.85 }))} />
    </>
  )
}
