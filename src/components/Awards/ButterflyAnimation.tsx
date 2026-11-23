"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { DoubleSide, type Group } from "three";

type Vec3 = [number, number, number];

type ButterflyAnimationProps = {
  className?: string;
  cycle: number;
  fromLeft: boolean;
  playing: boolean;
  reduceMotion: boolean;
  variant?: "gold" | "violet";
  onLand?: (cycle: number) => void;
};

const GOLD = {
  wing: "#e8c878",
  wingInner: "#a78bfa",
  body: "#f5e6b8",
  edge: "#38bdf8",
};

const VIOLET = {
  wing: "#8b5cf6",
  wingInner: "#f0d78a",
  body: "#ddd6fe",
  edge: "#e8c878",
};

function bezier(p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  return [
    uu * u * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + tt * t * p3[0],
    uu * u * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + tt * t * p3[1],
    uu * u * p0[2] + 3 * uu * t * p1[2] + 3 * u * tt * p2[2] + tt * t * p3[2],
  ];
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function Wing({
  side,
  palette,
}: {
  side: 1 | -1;
  palette: typeof GOLD;
}) {
  return (
    <group>
      <mesh
        position={[side * 0.32, 0.16, 0]}
        rotation={[0.2, side * 0.55, side * 0.12]}
      >
        <circleGeometry args={[0.34, 18]} />
        <meshStandardMaterial
          color={palette.wing}
          emissive={palette.wing}
          emissiveIntensity={0.35}
          transparent
          opacity={0.88}
          side={DoubleSide}
          roughness={0.28}
          metalness={0.35}
        />
      </mesh>
      <mesh
        position={[side * 0.18, 0.12, 0.01]}
        rotation={[0.15, side * 0.4, 0]}
        scale={0.42}
      >
        <circleGeometry args={[0.28, 14]} />
        <meshStandardMaterial
          color={palette.wingInner}
          emissive={palette.edge}
          emissiveIntensity={0.55}
          transparent
          opacity={0.8}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        position={[side * 0.24, -0.14, 0]}
        rotation={[-0.15, side * 0.45, side * -0.2]}
        scale={[0.72, 0.85, 1]}
      >
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial
          color={palette.wing}
          emissive={palette.wingInner}
          emissiveIntensity={0.25}
          transparent
          opacity={0.82}
          side={DoubleSide}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

function Butterfly({ palette }: { palette: typeof GOLD }) {
  const wingL = useRef<Group>(null);
  const wingR = useRef<Group>(null);
  const body = useRef<Group>(null);

  useFrame(() => {
    const flap = (body.current?.parent?.userData.flap as number | undefined) ?? 0.4;
    if (wingL.current) wingL.current.rotation.y = flap;
    if (wingR.current) wingR.current.rotation.y = -flap;
  });

  return (
    <group ref={body}>
      <mesh rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.045, 0.38, 6, 10]} />
        <meshStandardMaterial color={palette.body} metalness={0.55} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshStandardMaterial color={palette.body} metalness={0.5} roughness={0.22} />
      </mesh>
      <mesh position={[0.03, 0.24, 0.02]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.006, 0.006, 0.18, 6]} />
        <meshStandardMaterial color={palette.edge} />
      </mesh>
      <mesh position={[-0.03, 0.24, 0.02]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.006, 0.006, 0.18, 6]} />
        <meshStandardMaterial color={palette.edge} />
      </mesh>
      <group ref={wingL}>
        <Wing side={-1} palette={palette} />
      </group>
      <group ref={wingR}>
        <Wing side={1} palette={palette} />
      </group>
    </group>
  );
}

function FlightRig({
  cycle,
  fromLeft,
  playing,
  variant,
  onLand,
}: {
  cycle: number;
  fromLeft: boolean;
  playing: boolean;
  variant: "gold" | "violet";
  onLand?: (cycle: number) => void;
}) {
  const root = useRef<Group>(null);
  const elapsed = useRef(0);
  const landed = useRef(false);
  const cycleSeen = useRef(cycle);
  const dir = fromLeft ? 1 : -1;
  const palette = variant === "violet" ? VIOLET : GOLD;

  const inbound = useMemo(() => {
    const start: Vec3 = [-4.2 * dir, 1.45, 0.4];
    return {
      start,
      c1: [-2.2 * dir, 1.7, 1.0] as Vec3,
      c2: [-0.5 * dir, 0.9, 1.15] as Vec3,
      land: [0.42 * dir, 0.48, 1.35] as Vec3,
    };
  }, [dir]);

  useEffect(() => {
    elapsed.current = 0;
    landed.current = false;
    if (root.current) {
      root.current.visible = true;
      root.current.scale.setScalar(1);
      root.current.position.set(...inbound.start);
    }
  }, [cycle, inbound.start]);

  useFrame((_, delta) => {
    if (!root.current) return;
    if (cycleSeen.current !== cycle) {
      cycleSeen.current = cycle;
      elapsed.current = 0;
      landed.current = false;
    }
    if (playing) elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;

    let pos: Vec3 = inbound.start;
    let flap = 0.7;
    let scale = 1;

    if (t < 0.95) {
      const p = smooth(clamp01(t / 0.95));
      pos = bezier(inbound.start, inbound.c1, inbound.c2, inbound.land, p);
      flap = 0.85 + Math.sin(t * 28) * 0.55;
    } else if (t < 1.7) {
      const p = (t - 0.95) / 0.75;
      pos = [
        inbound.land[0] + Math.sin(p * 6) * 0.03,
        inbound.land[1] - 0.04,
        inbound.land[2],
      ];
      flap = 0.22 + Math.sin(t * 9) * 0.12;
      if (p > 0.18 && !landed.current) {
        landed.current = true;
        onLand?.(cycle);
      }
    } else if (t < 2.45) {
      const p = smooth(clamp01((t - 1.7) / 0.75));
      pos = [
        inbound.land[0] + p * 0.35 * dir,
        inbound.land[1] + p * 1.05,
        inbound.land[2] - p * 0.4,
      ];
      flap = 0.5 + Math.sin(t * 18) * 0.3;
      scale = 1 - p;
    } else {
      root.current.visible = false;
      return;
    }

    root.current.visible = true;
    root.current.position.set(pos[0], pos[1], pos[2]);
    root.current.scale.setScalar(scale);
    root.current.rotation.set(
      0.2 + Math.sin(t * 3) * 0.08,
      fromLeft ? 0.35 : Math.PI - 0.35,
      Math.sin(t * 5) * 0.12
    );
    root.current.userData.flap = flap;
  });

  return (
    <group ref={root} scale={1.05}>
      <Butterfly palette={palette} />
      <Sparkles
        count={18}
        scale={[1.3, 0.7, 0.8]}
        size={2.2}
        speed={1.8}
        opacity={0.85}
        color="#f5e6b8"
      />
    </group>
  );
}

export default function ButterflyAnimation({
  className,
  cycle,
  fromLeft,
  playing,
  reduceMotion,
  variant = "gold",
  onLand,
}: ButterflyAnimationProps) {
  if (reduceMotion) return null;

  return (
    <div className={className} aria-hidden>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.4]}
        camera={{ position: [0, 0.2, 6.2], fov: 32 }}
        style={{ width: "100%", height: "100%", background: "transparent", pointerEvents: "none" }}
        frameloop={playing ? "always" : "demand"}
      >
        <ambientLight intensity={0.7} color="#efe6ff" />
        <directionalLight position={[3, 4, 2]} intensity={1.2} color="#fff4d6" />
        <pointLight position={[0.4, 0.8, 2]} intensity={0.9} color="#c4b5fd" distance={7} />
        <pointLight position={[-1, 1.2, 1.5]} intensity={0.45} color="#f5d78e" distance={6} />
        <FlightRig
          cycle={cycle}
          fromLeft={fromLeft}
          playing={playing}
          variant={variant}
          onLand={onLand}
        />
      </Canvas>
    </div>
  );
}
