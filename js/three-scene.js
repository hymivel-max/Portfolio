/**
 * ADWAITH PORTFOLIO - THREE.JS INTERACTIVE 3D BACKGROUND
 * Real-time particle constellation, glowing geometry, and mouse parallax
 */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // Check if THREE is loaded
  if (typeof THREE === 'undefined') {
    init2DFallback(canvas);
    return;
  }

  try {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.0018);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.z = 600;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Constellation
    const particleCount = window.innerWidth < 768 ? 320 : 650;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = [];

    const colorEmerald = new THREE.Color(0x10b981);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorViolet = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 1400;
      positions[i3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i3 + 2] = (Math.random() - 0.5) * 1000;

      // Color distribution: emerald dominant with cyan & violet sparks
      const rand = Math.random();
      let chosenColor;
      if (rand < 0.6) chosenColor = colorEmerald;
      else if (rand < 0.85) chosenColor = colorCyan;
      else chosenColor = colorViolet;

      colors[i3] = chosenColor.r;
      colors[i3 + 1] = chosenColor.g;
      colors[i3 + 2] = chosenColor.b;

      speeds.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.25
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom circular soft glow texture for particles
    function createCircleTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(52, 211, 153, 0.8)');
      gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.3)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }

    const pMaterial = new THREE.PointsMaterial({
      size: 7.5,
      map: createCircleTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, pMaterial);
    scene.add(particleSystem);

    // Floating 3D Geometric Tech Artifacts (Icosahedron & Torus Knot)
    const icoGeo = new THREE.IcosahedronGeometry(75, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(280, 80, -100);
    scene.add(icoMesh);

    const torusGeo = new THREE.TorusGeometry(55, 16, 16, 60);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-300, -120, -150);
    scene.add(torusMesh);

    // Dynamic Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.45;
      mouseY = (event.clientY - windowHalfY) * 0.45;
    });

    // Touch tilt for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX - windowHalfX) * 0.3;
        mouseY = (e.touches[0].clientY - windowHalfY) * 0.3;
      }
    }, { passive: true });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      camera.position.x = targetX * 0.6;
      camera.position.y = -targetY * 0.6;
      camera.lookAt(scene.position);

      // Particle physics & drift
      const posAttr = geometry.attributes.position;
      const posArray = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        posArray[i3] += speeds[i].x;
        posArray[i3 + 1] += speeds[i].y;
        posArray[i3 + 2] += speeds[i].z;

        // Boundary rebound / wrap
        if (Math.abs(posArray[i3]) > 700) posArray[i3] = -posArray[i3];
        if (Math.abs(posArray[i3 + 1]) > 600) posArray[i3 + 1] = -posArray[i3 + 1];
        if (Math.abs(posArray[i3 + 2]) > 500) posArray[i3 + 2] = -posArray[i3 + 2];
      }
      posAttr.needsUpdate = true;

      // Rotate floating geometric meshes
      icoMesh.rotation.x = elapsedTime * 0.22;
      icoMesh.rotation.y = elapsedTime * 0.35;
      icoMesh.position.y = 80 + Math.sin(elapsedTime * 0.9) * 22;

      torusMesh.rotation.x = elapsedTime * 0.3;
      torusMesh.rotation.z = elapsedTime * 0.25;
      torusMesh.position.y = -120 + Math.cos(elapsedTime * 0.8) * 25;

      particleSystem.rotation.y = elapsedTime * 0.025;

      renderer.render(scene, camera);
    }

    animate();
  } catch (err) {
    console.warn('Three.js initialization failed, reverting to 2D canvas:', err);
    init2DFallback(canvas);
  }

  // 2D Canvas Fallback in case WebGL is unavailable
  function init2DFallback(cvs) {
    const ctx = cvs.getContext('2d');
    let width = cvs.width = window.innerWidth;
    let height = cvs.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = cvs.width = window.innerWidth;
      height = cvs.height = window.innerHeight;
    });

    const dots = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1
      });
    }

    function render2D() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.6)';
      for (let i = 0; i < count; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(render2D);
    }
    render2D();
  }
})();
