import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, useVideoConfig } from 'remotion';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

// ── Beam cone rendered with additive blending ─────────────────────────────────
function Beam({ intensity }: { intensity: number }) {
    const geoOuter = useMemo(() => {
        const g = new THREE.ConeGeometry(1.1, 4.0, 48, 1, true);
        g.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI));
        return g;
    }, []);

    const geoCore = useMemo(() => {
        const g = new THREE.ConeGeometry(0.6, 4.0, 32, 1, true);
        g.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI));
        return g;
    }, []);

    const mat = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ff915a'),
        transparent: true,
        opacity: 0.13 * intensity,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    }), [intensity]);

    const matCore = useMemo(() => new THREE.MeshBasicMaterial({
        color: new THREE.Color('#fffae0'),
        transparent: true,
        opacity: 0.18 * intensity,
        side: THREE.BackSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    }), [intensity]);

    return (
        <group position={[0, 0.05, 0]}>
            <mesh geometry={geoOuter} material={mat} />
            <mesh geometry={geoCore} material={matCore} />
        </group>
    );
}

// ── The fixture geometry built procedurally in Three.js ───────────────────────
function FixtureGeometry({ tiltAngle, panAngle }: { tiltAngle: number; panAngle: number }) {
    const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1c1c1e', roughness: 0.6, metalness: 0.4 }), []);
    const orangeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ff6b00', roughness: 0.4, metalness: 0.2, emissive: '#ff6b00', emissiveIntensity: 0.4 }), []);
    const silverMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#9a9aa0', roughness: 0.3, metalness: 0.9 }), []);
    const lensMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3366cc', roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.85, emissive: '#2244aa', emissiveIntensity: 0.6 }), []);

    return (
        <group>
            {/* BASE CONTROLLER */}
            <group position={[0, -1.05, 0]}>
                <mesh material={bodyMat}><boxGeometry args={[1.3, 0.18, 0.52]} /></mesh>
                {/* orange accent strips */}
                <mesh material={orangeMat} position={[-0.55, 0, 0]}><boxGeometry args={[0.04, 0.03, 0.52]} /></mesh>
                <mesh material={orangeMat} position={[0.55, 0, 0]}><boxGeometry args={[0.04, 0.03, 0.52]} /></mesh>
                {/* feet */}
                {([-0.50, 0.50] as number[]).flatMap(fx =>
                    ([-0.18, 0.18] as number[]).map(fz => (
                        <mesh key={`${fx}${fz}`} material={bodyMat} position={[fx, -0.12, fz]}>
                            <boxGeometry args={[0.14, 0.07, 0.10]} />
                        </mesh>
                    ))
                )}
            </group>

            {/* STEM */}
            <mesh material={silverMat} position={[0, -0.81, 0]}>
                <cylinderGeometry args={[0.065, 0.065, 0.18, 20]} />
            </mesh>

            {/* YOKE ARMS (pan around Y axis) */}
            <group rotation={[0, panAngle, 0]}>
                {([-1, 1] as number[]).map(side => (
                    <group key={side}>
                        <mesh material={bodyMat} position={[side * 0.50, -0.32, 0]}>
                            <boxGeometry args={[0.11, 0.78, 0.14]} />
                        </mesh>
                        <mesh material={orangeMat} position={[side * 0.51, -0.32, 0]}>
                            <boxGeometry args={[0.02, 0.60, 0.07]} />
                        </mesh>
                    </group>
                ))}
                {/* Yoke top bar */}
                <mesh material={bodyMat} position={[0, 0.07, 0]}>
                    <boxGeometry args={[1.00, 0.12, 0.14]} />
                </mesh>

                {/* HEAD (tilt around X axis) */}
                <group position={[0, -0.32, 0]} rotation={[tiltAngle, 0, 0]}>
                    <mesh material={bodyMat}>
                        <boxGeometry args={[0.80, 0.72, 0.75]} />
                    </mesh>
                    {/* side panels */}
                    {([-1, 1] as number[]).map(s => (
                        <mesh key={s} material={new THREE.MeshStandardMaterial({ color: '#303032', roughness: 0.5, metalness: 0.3 })} position={[s * 0.37, 0, 0]}>
                            <boxGeometry args={[0.055, 0.60, 0.62]} />
                        </mesh>
                    ))}
                    {/* orange head accents */}
                    {([-1, 1] as number[]).map(s => (
                        <mesh key={s} material={orangeMat} position={[s * 0.365, 0.08, 0.05]}>
                            <boxGeometry args={[0.03, 0.09, 0.50]} />
                        </mesh>
                    ))}

                    {/* LENS ASSEMBLY – mounted on front face */}
                    <group position={[0, 0.20, -0.42]}>
                        {/* barrel */}
                        <mesh material={bodyMat} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.295, 0.295, 0.30, 40]} />
                        </mesh>
                        {/* inner dark ring */}
                        <mesh material={new THREE.MeshStandardMaterial({ color: '#111114', roughness: 0.8 })} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.02]}>
                            <cylinderGeometry args={[0.20, 0.20, 0.20, 32]} />
                        </mesh>
                        {/* glass */}
                        <mesh material={lensMat} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.06]}>
                            <cylinderGeometry args={[0.185, 0.185, 0.025, 40]} />
                        </mesh>
                        {/* lens glint point light */}
                        <pointLight color="#6699ff" intensity={0.8} distance={1.5} position={[0, 0, -0.1]} />
                    </group>

                    {/* BEAM from lens */}
                    <group position={[0, 0.20, -0.55]} rotation={[-Math.PI / 2, 0, 0]}>
                        <Beam intensity={1} />
                    </group>
                </group>
            </group>
        </group>
    );
}

// ── Scene wrapper ─────────────────────────────────────────────────────────────
function StageScene({ frame, fps }: { frame: number; fps: number }) {
    const t = frame / fps;

    // Pan: slow sinusoidal left-right
    const panAngle = interpolate(
        Math.sin(t * 0.4),
        [-1, 1], [-0.4, 0.4]
    );

    // Tilt: gradual droop then return
    const tiltAngle = interpolate(
        Math.sin(t * 0.25 + 1.0),
        [-1, 1], [-0.2, 0.5]
    );

    // Fade in
    const fadeIn = interpolate(frame, [0, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <>
            <ambientLight intensity={0.15} />
            <directionalLight position={[3, 5, 3]} intensity={0.8} color="#fff5e0" />
            <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#4466aa" />
            <group scale={fadeIn}>
                <FixtureGeometry tiltAngle={tiltAngle} panAngle={panAngle} />
            </group>
        </>
    );
}

// ── Public component ──────────────────────────────────────────────────────────
export const MovingHead3D: React.FC<{
    style?: React.CSSProperties;
    cameraZ?: number;
}> = ({ style, cameraZ = 4.5 }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    return (
        <div style={{ position: 'absolute', inset: 0, ...style }}>
            <Canvas
                camera={{ position: [0, 0.2, cameraZ], fov: 38 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <StageScene frame={frame} fps={fps} />
            </Canvas>
        </div>
    );
};
