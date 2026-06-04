'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useMotionStore } from '@/store'

function NeuralPoints() {
  const ref  = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, connections] = useMemo(() => {
    const count = 80
    const pos: number[] = []
    for (let i = 0; i < count; i++) {
      pos.push(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      )
    }

    // Build line segments between nearby nodes
    const linePos: number[] = []
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ix = pos[i * 3], iy = pos[i * 3 + 1], iz = pos[i * 3 + 2]
        const jx = pos[j * 3], jy = pos[j * 3 + 1], jz = pos[j * 3 + 2]
        const dist = Math.sqrt((jx-ix)**2 + (jy-iy)**2 + (jz-iz)**2)
        if (dist < 1.6) {
          linePos.push(ix, iy, iz, jx, jy, jz)
        }
      }
    }

    return [new Float32Array(pos), new Float32Array(linePos)]
  }, [])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x += delta * 0.015
    // Subtle mouse influence
    ref.current.rotation.y += mouse.x * 0.002
    ref.current.rotation.x += mouse.y * 0.001
  })

  return (
    <group ref={ref as any}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#C7FF3F" transparent opacity={0.08} />
      </lineSegments>

      {/* Nodes */}
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#C7FF3F"
          size={0.04}
          sizeAttenuation
          depthWrite={false}
          opacity={0.7}
        />
      </Points>
    </group>
  )
}

export function NeuralMeshCanvas() {
  const gpuTier = useMotionStore((s) => s.config.gpuTier)
  if (gpuTier === 'low') return null

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <NeuralPoints />
      </Canvas>
    </div>
  )
}
