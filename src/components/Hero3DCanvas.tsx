import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  primaryColorHex?: number;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ primaryColorHex = 0x111111 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    // Subtle fog for depth
    scene.fog = new THREE.FogExp2(0x050505, 0.045);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 1.4, 6.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    // Studio Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    // Electric Lime Rim Accent Light (Artistic Flair)
    const rimLight = new THREE.DirectionalLight(0xc1ff72, 2.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Top Overhead Light
    const topLight = new THREE.PointLight(0xffffff, 1.5, 20);
    topLight.position.set(0, 6, 0);
    scene.add(topLight);

    // Ground Grid with clean architectural styling
    const gridHelper = new THREE.GridHelper(30, 40, 0x333333, 0x111111);
    gridHelper.position.y = -0.55;
    scene.add(gridHelper);

    // Car Root Group
    const carGroup = new THREE.Group();

    // Body Material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: primaryColorHex,
      roughness: 0.15,
      metalness: 0.85,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1c,
      roughness: 0.4,
      metalness: 0.6,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111115,
      roughness: 0.05,
      transmission: 0.7,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });

    // Lower Main Body Chassis
    const bodyGeom = new THREE.BoxGeometry(4.4, 0.42, 2.0);
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.position.y = 0.05;
    carGroup.add(body);

    // Front Nose Wedge / Splitter
    const noseGeom = new THREE.BoxGeometry(1.2, 0.22, 1.95);
    const nose = new THREE.Mesh(noseGeom, bodyMat);
    nose.position.set(2.2, -0.05, 0);
    carGroup.add(nose);

    const splitterGeom = new THREE.BoxGeometry(1.4, 0.05, 2.1);
    const splitter = new THREE.Mesh(splitterGeom, carbonMat);
    splitter.position.set(2.3, -0.22, 0);
    carGroup.add(splitter);

    // Rear Diffuser
    const diffuserGeom = new THREE.BoxGeometry(0.8, 0.2, 2.05);
    const diffuser = new THREE.Mesh(diffuserGeom, carbonMat);
    diffuser.position.set(-2.4, -0.15, 0);
    carGroup.add(diffuser);

    // Aerodynamic Rear Wing
    const wingStandsGeom = new THREE.BoxGeometry(0.1, 0.4, 1.2);
    const wingStands = new THREE.Mesh(wingStandsGeom, carbonMat);
    wingStands.position.set(-2.0, 0.35, 0);
    carGroup.add(wingStands);

    const wingGeom = new THREE.BoxGeometry(0.5, 0.06, 2.1);
    const wing = new THREE.Mesh(wingGeom, carbonMat);
    wing.position.set(-2.05, 0.55, 0);
    carGroup.add(wing);

    // Sleek Cockpit / Glass Canopy
    const cabinGeom = new THREE.BoxGeometry(2.1, 0.65, 1.6);
    const cabin = new THREE.Mesh(cabinGeom, glassMat);
    cabin.position.set(-0.2, 0.45, 0);
    carGroup.add(cabin);

    // Roof Line
    const roofGeom = new THREE.BoxGeometry(1.6, 0.08, 1.5);
    const roof = new THREE.Mesh(roofGeom, carbonMat);
    roof.position.set(-0.25, 0.78, 0);
    carGroup.add(roof);

    // Headlights (LED Cyan/White Glow)
    const lightGeom = new THREE.BoxGeometry(0.2, 0.08, 0.45);
    const headLightMat = new THREE.MeshBasicMaterial({ color: 0xeef5ff });
    const headLightLeft = new THREE.Mesh(lightGeom, headLightMat);
    headLightLeft.position.set(2.65, 0.02, 0.75);
    const headLightRight = new THREE.Mesh(lightGeom, headLightMat);
    headLightRight.position.set(2.65, 0.02, -0.75);
    carGroup.add(headLightLeft, headLightRight);

    // Taillights (Racing Red Bar)
    const tailLightGeom = new THREE.BoxGeometry(0.1, 0.06, 1.7);
    const tailLightMat = new THREE.MeshBasicMaterial({ color: 0xf71a0f });
    const tailLight = new THREE.Mesh(tailLightGeom, tailLightMat);
    tailLight.position.set(-2.21, 0.12, 0);
    carGroup.add(tailLight);

    // Wheels & Brake Calipers
    const wheelGeom = new THREE.CylinderGeometry(0.42, 0.42, 0.35, 36);
    const rimGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.36, 18);
    const caliperGeom = new THREE.BoxGeometry(0.14, 0.22, 0.12);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x18181a, roughness: 0.8 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xc8c6c5, metalness: 0.9, roughness: 0.2 });
    const caliperMat = new THREE.MeshBasicMaterial({ color: 0xf71a0f });

    const wheelPositions: [number, number, number][] = [
      [1.35, -0.15, 0.98],
      [1.35, -0.15, -0.98],
      [-1.35, -0.15, 0.98],
      [-1.35, -0.15, -0.98],
    ];

    const wheels: THREE.Group[] = [];

    wheelPositions.forEach((pos) => {
      const wheelAssembly = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeom, wheelMat);
      tire.rotation.x = Math.PI / 2;
      wheelAssembly.add(tire);

      const rim = new THREE.Mesh(rimGeom, rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelAssembly.add(rim);

      const caliper = new THREE.Mesh(caliperGeom, caliperMat);
      caliper.position.set(0.16, 0.1, 0);
      wheelAssembly.add(caliper);

      wheelAssembly.position.set(...pos);
      carGroup.add(wheelAssembly);
      wheels.push(wheelAssembly);
    });

    scene.add(carGroup);

    // Floating embers / light dust particles
    const particleCount = 45;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf71a0f,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow rotation blended with mouse responsiveness
      targetRotationY = (elapsedTime * 0.25) + (mouseX * 0.8);
      targetRotationX = mouseY * 0.2;

      carGroup.rotation.y += (targetRotationY - carGroup.rotation.y) * 0.05;
      carGroup.rotation.x += (targetRotationX - carGroup.rotation.x) * 0.05;

      // Subtle chassis suspension breathing
      carGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.03;

      // Rotate wheels smoothly
      wheels.forEach((w) => {
        w.children[0].rotation.z -= 0.02;
        w.children[1].rotation.z -= 0.02;
      });

      // Animate particles
      const pos = particleGeom.attributes.position.array as Float32Array;
      for (let i = 1; i < pos.length; i += 3) {
        pos[i] += 0.005;
        if (pos[i] > 4) pos[i] = 0;
      }
      particleGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [primaryColorHex]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
      onMouseDown={() => setIsInteracting(true)}
      onMouseUp={() => setIsInteracting(false)}
      title="Drag or move cursor to inspect 3D silhouette"
    />
  );
};
