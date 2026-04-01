import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * DottedSurface — Three.js animated wave-grid background.
 * Adapted from the shadcn/next-themes original to plain React/Vite.
 * Colors tuned for LeadForge's dark + orange brand.
 */
export function DottedSurface({ style, ...props }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const SEPARATION = 150
    const AMOUNTX = 40
    const AMOUNTY = 60

    // ─── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    )
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0) // fully transparent — let CSS background show

    containerRef.current.appendChild(renderer.domElement)

    // ─── Particles ────────────────────────────────────────────────────────────
    const positions = []
    const colors = []

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions.push(
          ix * SEPARATION - (AMOUNTX * SEPARATION) / 2,
          0,
          iy * SEPARATION - (AMOUNTY * SEPARATION) / 2,
        )
        // Pure white
        colors.push(1.0, 1.0, 1.0)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // ─── Animation ────────────────────────────────────────────────────────────
    let count = 0
    let animationId

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const posAttr = geometry.attributes.position
      const posArray = posAttr.array

      let i = 0
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          posArray[i * 3 + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50
          i++
        }
      }

      posAttr.needsUpdate = true
      renderer.render(scene, camera)
      count += 0.07 // slightly slower than original for a more hypnotic feel
    }

    // ─── Resize ───────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize, { passive: true })
    animate()

    // ─── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)

      scene.traverse((obj) => {
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      renderer.dispose()

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        ...style,
      }}
      {...props}
    />
  )
}
