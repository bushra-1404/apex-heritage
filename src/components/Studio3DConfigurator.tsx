import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Car } from '../types';
import { CAR_COLLECTION } from '../data/cars';
import { ArrowRight, RotateCcw, Sparkles, Check, Sliders, Shield, Volume2 } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface Studio3DConfiguratorProps {
  initialCar?: Car;
  onReserveConfigured: (car: Car, configSummary: string, adjustedPrice: number) => void;
}

const EXTERIOR_COLORS = [
  { name: 'Monaco Obsidian', hex: '#141416', threeHex: 0x141416, cost: 0 },
  { name: 'Rosso Corsa Racing', hex: '#d91414', threeHex: 0xd91414, cost: 0 },
  { name: 'Grigio Silverstone', hex: '#4f5256', threeHex: 0x4f5256, cost: 0 },
  { name: 'Monaco Midnight Azure', hex: '#0f2440', threeHex: 0x0f2440, cost: 80 },
  { name: 'Verde Corsa Emerald', hex: '#1b4d2e', threeHex: 0x1b4d2e, cost: 120 },
  { name: 'Satin Titanium Frost', hex: '#8e9196', threeHex: 0x8e9196, cost: 150 },
  { name: 'Tuscan Gold Metallic', hex: '#a6822c', threeHex: 0xa6822c, cost: 180 },
];

const CALIPER_COLORS = [
  { name: 'Racing Red', hex: '#f71a0f', threeHex: 0xf71a0f },
  { name: 'Acid Yellow', hex: '#f2c94c', threeHex: 0xf2c94c },
  { name: 'Silverstone Polished', hex: '#e4e2e1', threeHex: 0xe4e2e1 },
  { name: 'Azure Blue', hex: '#2f80ed', threeHex: 0x2f80ed },
];

export const Studio3DConfigurator: React.FC<Studio3DConfiguratorProps> = ({
  initialCar = CAR_COLLECTION[0],
  onReserveConfigured,
}) => {
  const [selectedCar, setSelectedCar] = useState<Car>(initialCar);
  const [paintColor, setPaintColor] = useState(EXTERIOR_COLORS[0]);
  const [caliperColor, setCaliperColor] = useState(CALIPER_COLORS[0]);
  const [wheelStyle, setWheelStyle] = useState<'forged-silver' | 'satin-black' | 'gold-heritage'>('forged-silver');
  const [hasCarbonAero, setHasCarbonAero] = useState(true);
  const [interiorTrim, setInteriorTrim] = useState<'nero-alcantara' | 'cuoio-tan' | 'rosso-leather'>('nero-alcantara');
  const [studioLight, setStudioLight] = useState<'cinematic' | 'monochrome' | 'sunset'>('cinematic');

  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const carMeshRef = useRef<THREE.Group | null>(null);
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const caliperMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const rimMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  // Calculate pricing adjustments
  const calculatedDailyRate =
    selectedCar.dailyRate +
    paintColor.cost +
    (hasCarbonAero ? 150 : 0) +
    (interiorTrim === 'cuoio-tan' ? 90 : interiorTrim === 'rosso-leather' ? 110 : 0);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x050505, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4.5, 2.2, 5.5);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 10, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc1ff72, 1.4);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const floorGrid = new THREE.GridHelper(24, 32, 0x333333, 0x111111);
    floorGrid.position.y = -0.55;
    scene.add(floorGrid);

    // Car Model Group
    const carGroup = new THREE.Group();
    carMeshRef.current = carGroup;

    // Body Material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: paintColor.threeHex,
      roughness: 0.12,
      metalness: 0.88,
    });
    bodyMaterialRef.current = bodyMat;

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.5,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111115,
      roughness: 0.05,
      transmission: 0.75,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });

    // Lower Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.44, 2.05), bodyMat);
    body.position.y = 0.05;
    carGroup.add(body);

    // Front Nose
    const nose = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.24, 1.98), bodyMat);
    nose.position.set(2.25, -0.05, 0);
    carGroup.add(nose);

    // Carbon Splitter
    const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.06, 2.15), carbonMat);
    splitter.position.set(2.35, -0.22, 0);
    carGroup.add(splitter);

    // Cabin Glass
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.68, 1.6), glassMat);
    cabin.position.set(-0.15, 0.46, 0);
    carGroup.add(cabin);

    // Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.5), carbonMat);
    roof.position.set(-0.2, 0.8, 0);
    carGroup.add(roof);

    // Rear Wing
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.06, 2.15), carbonMat);
    wing.position.set(-2.1, 0.56, 0);
    carGroup.add(wing);

    const wingSupports = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 1.3), carbonMat);
    wingSupports.position.set(-2.05, 0.36, 0);
    carGroup.add(wingSupports);

    // LED Lights
    const headLights = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.08, 0.4),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    headLights.position.set(2.7, 0.02, 0.75);
    const headLightsR = headLights.clone();
    headLightsR.position.z = -0.75;
    carGroup.add(headLights, headLightsR);

    const tailLight = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.06, 1.7),
      new THREE.MeshBasicMaterial({ color: 0xf71a0f })
    );
    tailLight.position.set(-2.22, 0.12, 0);
    carGroup.add(tailLight);

    // Wheels
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x161616, roughness: 0.85 });
    const rimMat = new THREE.MeshStandardMaterial({
      color: wheelStyle === 'gold-heritage' ? 0xb8973d : wheelStyle === 'satin-black' ? 0x222224 : 0xc8c6c5,
      metalness: 0.9,
      roughness: 0.2,
    });
    rimMaterialRef.current = rimMat;

    const caliperMat = new THREE.MeshBasicMaterial({ color: caliperColor.threeHex });
    caliperMaterialRef.current = caliperMat;

    const wheelPositions: [number, number, number][] = [
      [1.35, -0.15, 1.0],
      [1.35, -0.15, -1.0],
      [-1.35, -0.15, 1.0],
      [-1.35, -0.15, -1.0],
    ];

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.35, 32), tireMat);
      tire.rotation.x = Math.PI / 2;
      wheelGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.36, 16), rimMat);
      rim.rotation.x = Math.PI / 2;
      wheelGroup.add(rim);

      const caliper = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.12), caliperMat);
      caliper.position.set(0.16, 0.1, 0);
      wheelGroup.add(caliper);

      wheelGroup.position.set(...pos);
      carGroup.add(wheelGroup);
    });

    scene.add(carGroup);

    // Orbit controls / drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      carGroup.rotation.y += deltaX * 0.008;
      carGroup.rotation.x = Math.max(-0.2, Math.min(0.4, carGroup.rotation.x + deltaY * 0.004));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        carGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedCar]);

  // Handle dynamic material color updates
  useEffect(() => {
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.setHex(paintColor.threeHex);
    }
  }, [paintColor]);

  useEffect(() => {
    if (caliperMaterialRef.current) {
      caliperMaterialRef.current.color.setHex(caliperColor.threeHex);
    }
  }, [caliperColor]);

  useEffect(() => {
    if (rimMaterialRef.current) {
      const hex =
        wheelStyle === 'gold-heritage'
          ? 0xb8973d
          : wheelStyle === 'satin-black'
          ? 0x222224
          : 0xc8c6c5;
      rimMaterialRef.current.color.setHex(hex);
    }
  }, [wheelStyle]);

  const handleSoundRev = () => {
    audioEngine.playRev(selectedCar.soundType, 2.5);
  };

  const handleReserve = () => {
    const summary = `${paintColor.name} · ${caliperColor.name} Calipers · ${wheelStyle.toUpperCase()} · ${interiorTrim.toUpperCase()}`;
    onReserveConfigured(selectedCar, summary, calculatedDailyRate);
  };

  return (
    <section id="bespoke-studio" className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto bg-[#050505] text-[#F0F0F0]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 border-b border-white/10 pb-6">
        <div>
          <span className="text-[#C1FF72] text-xs font-mono mb-2 block tracking-[0.25em]">
            [ STUDIO_001 // BESPOKE COMMISSION ]
          </span>
          <h2 className="font-serif-luxury italic text-3xl md:text-5xl text-[#F0F0F0]">
            3D Atelier Configurator.
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#F0F0F0]/60 max-w-md font-light leading-relaxed">
          Tailor exterior liveries, carbon weave aero dynamics, and caliper finishes with real-time 3D rendering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Center: 3D Stage */}
        <div className="lg:col-span-8 bg-[#0A0A0A] border border-white/10 rounded-none overflow-hidden flex flex-col relative min-h-[480px]">
          {/* Top Stage Bar */}
          <div className="p-4 bg-[#050505]/95 border-b border-white/10 flex flex-wrap justify-between items-center gap-3 z-10">
            <div className="flex items-center gap-3">
              <label className="text-[9px] font-mono uppercase text-[#C1FF72]">[ BASE CHASSIS ]</label>
              <select
                value={selectedCar.id}
                onChange={(e) => {
                  const car = CAR_COLLECTION.find((c) => c.id === e.target.value);
                  if (car) setSelectedCar(car);
                }}
                className="bg-[#151515] text-xs text-[#F0F0F0] border border-white/15 px-3 py-1.5 focus:outline-none cursor-pointer font-mono"
              >
                {CAR_COLLECTION.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (${c.dailyRate}/day)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSoundRev}
                className="px-3 py-1.5 bg-[#151515] hover:bg-[#202020] border border-white/15 hover:border-[#C1FF72] text-[10px] font-mono text-[#F0F0F0] flex items-center gap-1.5 transition-colors uppercase"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#C1FF72]" />
                <span>Test Acoustic Note</span>
              </button>
            </div>
          </div>

          {/* Three.js Canvas Container */}
          <div ref={canvasRef} className="w-full flex-1 min-h-[420px] cursor-grab active:cursor-grabbing select-none relative" />

          {/* Interactive Hint */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-[#050505]/90 backdrop-blur-md px-3 py-1.5 border border-white/10 text-[9px] font-mono text-[#F0F0F0]/60 uppercase tracking-wider">
            [ DRAG TO ORBIT CHASSIS 360° ]
          </div>
        </div>

        {/* Right Controls Panel */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-none p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h3 className="font-serif-luxury italic text-2xl text-[#F0F0F0] mb-0.5">
                {selectedCar.name}
              </h3>
              <p className="text-[10px] text-[#C1FF72] font-mono">[ BESPOKE ATELIER COMMISSION ]</p>
            </div>

            {/* Paint Finish Selector */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-[9px] font-mono uppercase tracking-wider text-[#F0F0F0]/60">
                  [ EXTERIOR LIVERY ]
                </label>
                <span className="text-xs font-mono text-[#C1FF72]">{paintColor.name}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {EXTERIOR_COLORS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setPaintColor(col)}
                    className={`h-9 border-2 transition-all flex items-center justify-center relative ${
                      paintColor.name === col.name
                        ? 'border-[#C1FF72] scale-105 shadow-lg shadow-[#C1FF72]/20'
                        : 'border-white/15 hover:border-white/40'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {paintColor.name === col.name && (
                      <Check className="w-3.5 h-3.5 text-[#C1FF72] drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel Rims */}
            <div>
              <label className="block text-[9px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                [ FORGED WHEEL SPEC ]
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'forged-silver', label: 'Silver Forged' },
                  { id: 'satin-black', label: 'Satin Nero' },
                  { id: 'gold-heritage', label: 'Champagne' },
                ].map((rim) => (
                  <button
                    key={rim.id}
                    onClick={() => setWheelStyle(rim.id as any)}
                    className={`py-2 text-[10px] font-mono uppercase border transition-all ${
                      wheelStyle === rim.id
                        ? 'bg-[#C1FF72] text-black border-[#C1FF72] font-bold'
                        : 'bg-[#151515] text-[#F0F0F0]/70 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {rim.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brake Calipers */}
            <div>
              <label className="block text-[9px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                [ CARBON-CERAMIC CALIPER ]
              </label>
              <div className="flex gap-2">
                {CALIPER_COLORS.map((cal) => (
                  <button
                    key={cal.name}
                    onClick={() => setCaliperColor(cal)}
                    className={`flex-1 py-1.5 text-[9px] font-mono uppercase border transition-all flex items-center justify-center gap-1.5 ${
                      caliperColor.name === cal.name
                        ? 'border-[#C1FF72] bg-[#151515]'
                        : 'border-white/10 bg-[#0F0F0F]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cal.hex }} />
                    <span className="text-[#F0F0F0]">{cal.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interior Leather Trim */}
            <div>
              <label className="block text-[9px] font-mono uppercase tracking-wider text-[#F0F0F0]/60 mb-2">
                [ INTERIOR UPHOLSTERY ]
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'nero-alcantara', label: 'Nero Alcantara & Carbon (+ $0)', desc: 'Matte lightweight track cockpit' },
                  { id: 'cuoio-tan', label: 'Cuoio Tuscan Natural Hide (+ $90/day)', desc: 'Warm hand-stitched Italian leather' },
                  { id: 'rosso-leather', label: 'Rosso Scuderia & Diamond Weave (+ $110/day)', desc: 'High-contrast racing heritage' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setInteriorTrim(item.id as any)}
                    className={`w-full text-left p-2.5 border transition-all ${
                      interiorTrim === item.id
                        ? 'border-[#C1FF72] bg-[#151515]'
                        : 'border-white/10 bg-[#0F0F0F] hover:border-white/25'
                    }`}
                  >
                    <div className="text-xs font-semibold text-[#F0F0F0]">{item.label}</div>
                    <div className="text-[9px] text-[#F0F0F0]/40 font-mono">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="pt-6 border-t border-white/10 mt-6">
            <div className="flex justify-between items-baseline mb-4">
              <div>
                <span className="text-[9px] font-mono uppercase text-[#C1FF72] block">[ CUSTOM SPEC RATE ]</span>
                <span className="font-mono text-2xl font-bold text-[#F0F0F0]">
                  ${calculatedDailyRate.toLocaleString()}
                </span>
                <span className="text-xs text-[#F0F0F0]/50 font-mono"> / day</span>
              </div>
              <span className="text-[10px] text-black bg-[#C1FF72] font-mono px-2 py-0.5 font-bold">
                CONCIERGE READY
              </span>
            </div>

            <button
              onClick={handleReserve}
              className="w-full bg-[#C1FF72] hover:bg-[#b2f55e] text-black py-3 text-[10px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#C1FF72]/15"
            >
              <span>Reserve Configured {selectedCar.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
