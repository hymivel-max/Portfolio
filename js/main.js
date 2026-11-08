/**
 * ADWAITH PORTFOLIO - MASTER CONTROLLER (MAIN.JS)
 * Handles cursor physics, scroll spy, project filters, modals, audio triggers & toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Custom Cursor Physics
  initCustomCursor();

  // 2. Typewriter Effect in Hero
  initTypewriter();

  // 3. Scroll Reveal Observer
  initScrollReveal();

  // 4. Animated Statistics Counter
  initStatsCounter();

  // 5. Sound FX Event Listeners
  initSoundListeners();

  // 6. Project Filtering & Details Modal
  initProjectSystem();

  // 7. Navigation & Mobile Menu
  initNavigation();

  // 8. Contact Form & Clipboard Copy
  initContactSystem();

  // 9. Resume Modal
  initResumeModal();
});

/* ==========================================================================
   1. CUSTOM CURSOR PHYSICS
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const dot = document.getElementById('custom-cursor-dot');
  if (!cursor || !dot || window.innerWidth < 768) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Smooth lerp for outer ring
  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, [data-tilt], .interactive-target');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      if (window.CyberAudio) window.CyberAudio.playHover();
    });
    target.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

/* ==========================================================================
   2. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    'Plus One Tech Prodigy & Innovator',
    'Indie Game Developer (Malayalam Open World 3D)',
    '3D CGI & Blender MCP Architect',
    'Full-Stack Mobile Engineer (Pacha Ecosystem)',
    'GLSL Shader & Systems Programmer',
    'Community Automator (Mambazham Bot)'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      delay = 45;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      delay = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      delay = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400; // Pause before new word
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal-init');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. ANIMATED STATISTICS COUNTER
   ========================================================================== */
function initStatsCounter() {
  const statElements = document.querySelectorAll('[data-counter]');
  if (!statElements.length) return;

  let hasAnimated = false;

  const statsSection = document.getElementById('stats-strip');
  if (!statsSection) return;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
      statElements.forEach((el) => {
        const targetNum = parseInt(el.getAttribute('data-counter'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateNumber(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          // Ease out cubic
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(easedProgress * targetNum);
          el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${targetNum.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(updateNumber);
      });
    }
  }, { threshold: 0.4 });

  observer.observe(statsSection);
}

/* ==========================================================================
   5. SOUND FX LISTENERS & MUTE TOGGLE
   ========================================================================== */
function initSoundListeners() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (!soundToggleBtn) return;

  function updateSoundUI() {
    if (!window.CyberAudio) return;
    const isMuted = window.CyberAudio.isMuted();
    if (isMuted) {
      soundToggleBtn.classList.remove('sound-active');
      soundToggleBtn.setAttribute('title', 'Sound FX: Off (Click to Enable)');
      const label = soundToggleBtn.querySelector('.sound-label');
      if (label) label.textContent = 'SFX: OFF';
    } else {
      soundToggleBtn.classList.add('sound-active');
      soundToggleBtn.setAttribute('title', 'Sound FX: On (Click to Mute)');
      const label = soundToggleBtn.querySelector('.sound-label');
      if (label) label.textContent = 'SFX: ON';
    }
  }

  soundToggleBtn.addEventListener('click', () => {
    if (window.CyberAudio) {
      window.CyberAudio.toggleMute();
      updateSoundUI();
    }
  });

  updateSoundUI();

  // Attach click sound to buttons
  document.querySelectorAll('.cyber-btn, .nav-link, .filter-btn, .modal-close').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.CyberAudio) window.CyberAudio.playClick();
    });
  });
}

/* ==========================================================================
   6. PROJECT FILTERING & DETAILS MODAL
   ========================================================================== */
const PROJECT_DATABASE = {
  'malayalam-open-world': {
    title: 'Malayalam Open World 3D (കേരള ഓപ്പൺ വേൾഡ്)',
    badge: '3D WebGL & Game Engine',
    category: 'games',
    desc: 'An ambitious real-time 3D open-world game capturing authentic Kerala village life. Built on WebGL and Three.js with full character bone rigging, custom hand/sword joints, responsive third-person camera physics, and authentic architectural assets including a traditional Kerala "Chayakada" (tea shop).',
    tech: ['Three.js', 'Vite', 'GLTF/GLB Rigging', 'WebGL Shaders', 'JavaScript', 'Blender 3D'],
    highlights: [
      'Custom skeletal joint inspection and bone hierarchy tools.',
      'Authentic Kerala aesthetic with procedural lighting and water shaders.',
      'Optimized submesh rendering and real-time performance on web browsers.',
      'Modular architecture ready for multiplayer expansions.'
    ],
    github: 'https://github.com/hymivel-max',
    demoText: 'Explore Kerala Village 3D Preview'
  },
  'pacha-ecommerce': {
    title: 'Pacha.leaf E-Commerce & Mobile App (പച്ച)',
    badge: 'Full-Stack & Mobile Ecosystem',
    category: 'web',
    desc: 'A luxury botanical and rare Western Ghats flora commerce ecosystem. Engineered with an Express.js 5 backend, JWT authentication, automated GitHub Actions CI/CD workflows, and cross-platform native iOS/Android mobile applications packaged using Capacitor 8.',
    tech: ['Node.js 22', 'Express 5', 'Capacitor 8', 'JWT Auth', 'Nodemailer', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'High-performance REST API with secure cookie-based session management.',
      'Automated mobile APK packaging pipeline via GitHub Actions runner.',
      'Rich animated responsive client with cart persistence and order tracking.',
      'Production deployment on Vercel with automated webhooks.'
    ],
    github: 'https://github.com/hymivel-max/pacha',
    demoText: 'Visit Live Pacha Store'
  },
  'blender-mcp': {
    title: 'Antigravity Blender MCP Suite',
    badge: 'AI & 3D Generative Automation',
    category: 'ai',
    desc: 'A cutting-edge Model Context Protocol (MCP) server that empowers LLM coding agents to programmatically control Blender 3D. Generates 3D primitives, scene illumination, procedural materials, camera snapshot rendering, and procedural animations entirely via code.',
    tech: ['Python 3', 'Blender API (bpy)', 'MCP Protocol', 'JSON-RPC', 'Procedural 3D'],
    highlights: [
      'Bidirectional RPC communication between AI agents and active Blender sessions.',
      'Automated viewport snapshot capture for immediate visual feedback.',
      'Procedural material generation and coordinate transformation pipelines.',
      'Streamlined 3D pipeline for rapid game asset prototyping.'
    ],
    github: 'https://github.com/hymivel-max',
    demoText: 'View MCP Tool Specs'
  },
  'anyps5': {
    title: 'AnyPS5 Windows Optimization Architecture',
    badge: 'Systems & Emulation Engineering',
    category: 'systems',
    desc: 'Research and low-level system engineering project exploring native Windows runtime optimization, memory-mapped buffers, high-ratio compression packaging, and high-performance game execution environments.',
    tech: ['C++', 'Windows API', 'PowerShell Automation', 'Memory Optimization', 'Compression'],
    highlights: [
      'Custom lightweight Windows launcher packaging with automated dependency validation.',
      'Over 95MB+ optimized compressed distributable deployment.',
      'Low-overhead memory mapping for rapid resource streaming.',
      'Automated build scripts for reproducible deployment.'
    ],
    github: 'https://github.com/hymivel-max',
    demoText: 'Read Architecture Notes'
  },
  'mambazham-discord': {
    title: 'Mambazham Discord Bot & Community Hub (മാമ്പഴം)',
    badge: 'Cloud Automation & Bots',
    category: 'web',
    desc: 'A high-engagement community bot built for Malayali & global Discord servers. Features automated role dispatching, low-latency audio streaming, interactive Malayalam mini-games, server moderation, and customized slash command interactions.',
    tech: ['Node.js', 'Discord.js v14', 'WebSockets', 'REST APIs', 'Cloud Automation'],
    highlights: [
      'Bilingual command set with native Malayalam cultural humor and tech commands.',
      'Reliable 24/7 cloud event loop with auto-reconnection and state caching.',
      'Rich interactive embed builders with dynamic button components.',
      'Moderation filters with heuristic spam and raid mitigation.'
    ],
    github: 'https://github.com/hymivel-max',
    demoText: 'Explore Bot Features'
  },
  'shaders-lab': {
    title: 'BSL & Mobile Shaders Graphics Lab',
    badge: 'GLSL & Graphics Programming',
    category: 'shaders',
    desc: 'An experimental shader lab focused on real-time graphics mathematics, GLSL fragment/vertex shader authoring, custom crosshair raymath, BSL Minecraft shader enhancements, and mobile GPU optimization.',
    tech: ['GLSL', 'HLSL', 'WebGL', 'Linear Algebra', 'Raymarching', 'Minecraft Shaders'],
    highlights: [
      'Custom mathematical implementations for dynamic crosshair HUD elements.',
      'Volumetric atmospheric fog and dynamic sun shaft calculations.',
      'Optimized shader pipelines targeting mobile Mali and Adreno GPUs.',
      'Precise ray-plane intersection and smooth step blending math.'
    ],
    github: 'https://github.com/hymivel-max',
    demoText: 'Inspect Shader Code'
  }
};

function initProjectSystem() {
  // Filter tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'border-emerald-500', 'text-emerald-400', 'bg-emerald-500/10'));
      btn.classList.add('active', 'border-emerald-500', 'text-emerald-400', 'bg-emerald-500/10');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Project Modal
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  if (!modal) return;

  document.querySelectorAll('[data-open-project]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = trigger.getAttribute('data-open-project');
      const data = PROJECT_DATABASE[projId];
      if (!data) return;

      document.getElementById('modal-proj-title').textContent = data.title;
      document.getElementById('modal-proj-badge').textContent = data.badge;
      document.getElementById('modal-proj-desc').textContent = data.desc;

      // Tech badges
      const techContainer = document.getElementById('modal-proj-tech');
      techContainer.innerHTML = '';
      data.tech.forEach((t) => {
        const span = document.createElement('span');
        span.className = 'badge-pill badge-emerald text-xs';
        span.textContent = t;
        techContainer.appendChild(span);
      });

      // Highlights
      const hlContainer = document.getElementById('modal-proj-highlights');
      hlContainer.innerHTML = '';
      data.highlights.forEach((h) => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-slate-300 text-xs sm:text-sm';
        li.innerHTML = `<span class="text-emerald-400 font-bold mt-0.5">▹</span> <span>${h}</span>`;
        hlContainer.appendChild(li);
      });

      // Github link
      const ghBtn = document.getElementById('modal-proj-github');
      if (ghBtn) ghBtn.href = data.github;

      modal.classList.add('active');
      if (window.CyberAudio) window.CyberAudio.playSwoosh();
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   7. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
      if (window.CyberAudio) window.CyberAudio.playClick();
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('text-emerald-400', 'bg-emerald-500/10');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-emerald-400', 'bg-emerald-500/10');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   8. CONTACT SYSTEM & CLIPBOARD
   ========================================================================== */
function initContactSystem() {
  // Copy to clipboard triggers
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`✨ ${label}`);
        if (window.CyberAudio) window.CyberAudio.playSuccess();
      }).catch(() => {
        showToast('Direct copy failed, please select manually.');
      });
    });
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('⚠️ Please fill out all required fields.');
        return;
      }

      // Simulated instant client dispatch to hymivel@gmail.com
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Transmitting to Chavara Node...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        // Prepare mailto link as fallback
        const mailtoUrl = `mailto:hymivel@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom:%20${encodeURIComponent(email)}`;
        window.location.href = mailtoUrl;

        showToast('🚀 Transmission dispatched to hymivel@gmail.com!');
        if (window.CyberAudio) window.CyberAudio.playSuccess();

        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 700);
    });
  }
}

/* ==========================================================================
   9. RESUME MODAL & PRINT VIEW
   ========================================================================== */
function initResumeModal() {
  const resumeBtn = document.getElementById('open-resume-btn');
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const resumePrintBtn = document.getElementById('resume-print-btn');

  if (!resumeModal) return;

  function openResume() {
    resumeModal.classList.add('active');
    if (window.CyberAudio) window.CyberAudio.playSwoosh();
  }

  function closeResume() {
    resumeModal.classList.remove('active');
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  if (resumeBtn) resumeBtn.addEventListener('click', openResume);
  if (resumeCloseBtn) resumeCloseBtn.addEventListener('click', closeResume);
  if (resumePrintBtn) {
    resumePrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });
}

/* ==========================================================================
   GLOBAL TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);

  // Animate in
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

window.showToast = showToast;
