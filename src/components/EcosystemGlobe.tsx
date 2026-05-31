import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

const GLOBE_RADIUS = 15

// Convert Lat/Lon to 3D Cartesian coordinates
const convertLatLngToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.sin(theta))
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.cos(theta)

  return new THREE.Vector3(x, y, z)
}

interface NodeData {
  name: string
  lat: number
  lon: number
  type: 'core' | 'support'
}

const nodes: NodeData[] = [
  { name: 'Future Minds Ghana', lat: 5.6037, lon: -0.1870, type: 'core' },
  { name: 'AI Masterclasses', lat: 9.0820, lon: 8.6753, type: 'core' },
  { name: 'Webinars', lat: 9.1450, lon: 40.4897, type: 'core' },
  { name: 'Tech Leaders', lat: -1.2921, lon: 36.8219, type: 'core' },
  { name: 'Innovation Labs', lat: -1.9403, lon: 29.8739, type: 'core' },
  { name: 'Partners', lat: -30.5595, lon: 22.9375, type: 'core' },
  { name: 'Schools', lat: 12.0, lon: -15.0, type: 'support' },
  { name: 'Communities', lat: -5.0, lon: 15.0, type: 'support' }
]

// Connections between core nodes
const connections = [
  { from: 'Future Minds Ghana', to: 'AI Masterclasses' },
  { from: 'AI Masterclasses', to: 'Innovation Labs' },
  { from: 'Innovation Labs', to: 'Webinars' },
  { from: 'Webinars', to: 'Tech Leaders' },
  { from: 'Innovation Labs', to: 'Partners' },
  { from: 'Future Minds Ghana', to: 'Partners' },
  { from: 'AI Masterclasses', to: 'Tech Leaders' }
]

interface PulsingNodeProps {
  pos: THREE.Vector3
  name: string
  type: 'core' | 'support'
  isHovered: boolean
  onHover: (hovered: boolean) => void
}

const PulsingNode = ({ pos, name, type, isHovered, onHover }: PulsingNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    // Pulsing scale
    const baseScale = type === 'core' ? 1.0 : 0.8
    const pulseFactor = type === 'core' ? 0.2 : 0.1
    const pulseSpeed = type === 'core' ? 4 : 2.5
    const scale = baseScale + Math.sin(time * pulseSpeed) * pulseFactor
    
    // Scale up if hovered
    const targetScale = isHovered ? scale * 1.5 : scale
    meshRef.current.scale.set(targetScale, targetScale, targetScale)
  })

  const color = type === 'core' ? '#D4A017' : '#F2CC6B'
  const size = type === 'core' ? 0.45 : 0.3

  return (
    <group position={pos}>
      {/* Node mesh with raycast events */}
      <mesh 
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          onHover(false)
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[size * 2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.4 : 0.15} />
      </mesh>

      {/* HTML Label */}
      <Html 
        distanceFactor={type === 'core' ? 32 : 40} 
        center 
        className={`globe-label ${type}`}
      >
        <div className={`label-card ${type} ${isHovered ? 'hovered' : ''}`}>
          <span className="dot"></span>
          <span className="text">{name}</span>
        </div>
      </Html>
    </group>
  )
}

const ArcConnection = ({ fromPos, toPos, isHighlighted }: { fromPos: THREE.Vector3; toPos: THREE.Vector3; isHighlighted: boolean }) => {
  const points = useMemo(() => {
    const midPoint = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5)
    const distance = fromPos.distanceTo(toPos)
    const liftFactor = 1.0 + (distance / GLOBE_RADIUS) * 0.25
    midPoint.normalize().multiplyScalar(GLOBE_RADIUS * liftFactor)

    const curve = new THREE.QuadraticBezierCurve3(fromPos, midPoint, toPos)
    return curve.getPoints(30)
  }, [fromPos, toPos])

  return (
    <Line
      points={points}
      color="#D4A017"
      lineWidth={isHighlighted ? 2.5 : 1.2}
      transparent
      opacity={isHighlighted ? 0.8 : 0.3}
    />
  )
}

interface GlobeSceneProps {
  hoveredNode: string | null
  setHoveredNode: (name: string | null) => void
}

const GlobeScene = ({ hoveredNode, setHoveredNode }: GlobeSceneProps) => {
  const globeRef = useRef<THREE.Group>(null)

  useFrame(() => {
    // Slowly rotate when no node is hovered to allow easy reading
    if (globeRef.current && !hoveredNode) {
      globeRef.current.rotation.y += 0.0018
    }
  })

  const nodePositions = useMemo(() => {
    return nodes.map(n => ({
      ...n,
      pos: convertLatLngToVector3(n.lat, n.lon, GLOBE_RADIUS)
    }))
  }, [])

  const findPosByName = (name: string) => {
    return nodePositions.find(n => n.name === name)?.pos
  }

  return (
    <group ref={globeRef} rotation={[0.2, 2.5, 0]}>
      {/* Central Floating Logo Text */}
      <Html center position={[0, 0, 0]} className="globe-center-html">
        <div className="globe-center-text">
          <span className="part-one">EBIBIMAN</span>
          <span className="part-two">TECH</span>
          <span className="part-three">ALLIANCE</span>
        </div>
      </Html>

      {/* Semi-transparent Earth Sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial 
          color="#080808" 
          roughness={0.25} 
          metalness={0.8} 
          transparent 
          opacity={0.8} 
        />
      </mesh>

      {/* Grid Overlay */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.04, 32, 32]} />
        <meshBasicMaterial 
          color="#D4A017" 
          wireframe 
          transparent 
          opacity={0.05} 
        />
      </mesh>

      {/* Glowing Nodes */}
      {nodePositions.map((node) => (
        <PulsingNode 
          key={node.name} 
          pos={node.pos} 
          name={node.name} 
          type={node.type} 
          isHovered={hoveredNode === node.name}
          onHover={(hovered) => setHoveredNode(hovered ? node.name : null)}
        />
      ))}

      {/* Arc Connections */}
      {connections.map((conn, idx) => {
        const fromPos = findPosByName(conn.from)
        const toPos = findPosByName(conn.to)
        if (!fromPos || !toPos) return null
        
        const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to
        return (
          <ArcConnection 
            key={idx} 
            fromPos={fromPos} 
            toPos={toPos} 
            isHighlighted={isHighlighted} 
          />
        )
      })}
    </group>
  )
}

interface EcosystemGlobeProps {
  hoveredNode: string | null
  setHoveredNode: (name: string | null) => void
}

export default function EcosystemGlobe({ hoveredNode, setHoveredNode }: EcosystemGlobeProps) {
  return (
    <div className="globe-canvas-container">
      <Canvas camera={{ position: [0, 4, 33], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[20, 20, 20]} intensity={1.2} color="#D4A017" />
        <pointLight position={[-20, -20, -20]} intensity={0.3} color="#000" />
        <GlobeScene hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 3} 
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
