'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Airplane } from './Airplane'
import { Trail }    from './Trail'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function AirplaneScene() {
  const progressRef = useRef(0)
  const targetRef   = useRef(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Avião só começa a aparecer/animar a partir da 2ª sessão (após 1 viewport).
    const st = ScrollTrigger.create({
      trigger: "body",
      start: "top+=100vh top",
      end: "bottom bottom",
      onUpdate: (self) => {
        targetRef.current = self.progress;
        setVisible(self.progress > 0.001);
      },
      onLeaveBack: () => {
        targetRef.current = 0;
        setVisible(false);
      },
    });
    return () => { st.kill(); };
  }, [])

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  if (isMobile) return null

  return (
    <div
      style={{
        position:      'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex:        50,
        pointerEvents: 'none',
        opacity:       visible ? 1 : 0,
        transition:    'opacity 0.6s ease',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 1.5) : 1}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <ambientLight    intensity={0.6}  color="#f9f5ec" />
        <directionalLight position={[ 5, 8, 5]} intensity={1.1} />
        <directionalLight position={[-4,-2,-4]} intensity={0.3} color="#ad8957" />

        <Suspense fallback={null}>
          <Trail    progressRef={progressRef} />
          <Airplane progressRef={progressRef} targetRef={targetRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
