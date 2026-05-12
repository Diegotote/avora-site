import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReduced ? 160 : isMobile ? 520 : 1250;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sizes[i] = 0.008 + Math.random() * 0.022;
      velocities[i] = 0.0007 + Math.random() * 0.0019;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: '#d6b66a',
      size: isMobile ? 0.012 : 0.014,
      transparent: true,
      opacity: 0.72,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    const scroll = { y: window.scrollY, velocity: 0, boost: 0, direction: 1 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleScroll = () => {
      const nextY = window.scrollY;
      const delta = nextY - scroll.y;
      scroll.y = nextY;
      scroll.direction = delta >= 0 ? 1 : -1;
      scroll.velocity = Math.min(Math.abs(delta) / 42, 1);
      scroll.boost = Math.max(scroll.boost, scroll.velocity);
      document.documentElement.style.setProperty('--particle-warp', scroll.boost.toFixed(3));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let frame = 0;
    let animationId = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frame += 1;

      smooth.x += (mouse.x - smooth.x) * 0.035;
      smooth.y += (mouse.y - smooth.y) * 0.035;
      scroll.boost += (0 - scroll.boost) * 0.035;

      const pos = geometry.attributes.position.array as Float32Array;
      const warpSpeed = 1 + scroll.boost * (isMobile ? 12 : 22);
      const zRush = scroll.boost * 0.036 * scroll.direction;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += velocities[i] * warpSpeed * scroll.direction;
        pos[i * 3 + 2] += zRush;
        pos[i * 3] += Math.sin(frame * 0.004 + i) * (0.00045 + scroll.boost * 0.002);
        if (pos[i * 3 + 1] > 3.25) pos[i * 3 + 1] = -3.25;
        if (pos[i * 3 + 1] < -3.25) pos[i * 3 + 1] = 3.25;
        if (pos[i * 3 + 2] > 2.35) pos[i * 3 + 2] = -2.35;
        if (pos[i * 3 + 2] < -2.35) pos[i * 3 + 2] = 2.35;
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.y = smooth.x * 0.12;
      particles.rotation.x = smooth.y * 0.07;
      material.opacity = 0.72 + scroll.boost * 0.18;
      material.size = (isMobile ? 0.012 : 0.014) + scroll.boost * 0.011;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[1] h-full w-full pointer-events-none" />
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(200,169,126,.12),transparent_62%)] blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,.11),transparent_65%)] blur-3xl" />
        <div className="diagonal-ray diagonal-ray-one" />
        <div className="diagonal-ray diagonal-ray-two" />
      </div>
      <div className="cursor-glow hidden md:block" />
    </>
  );
}
