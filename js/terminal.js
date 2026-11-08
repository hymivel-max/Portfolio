/**
 * ADWAITH PORTFOLIO - INTERACTIVE DEVELOPER CLI TERMINAL
 * Full interactive terminal with command history, autocompletion, and easter eggs
 */

(function () {
  const terminalModal = document.getElementById('terminal-modal');
  const terminalBody = document.getElementById('terminal-history');
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');

  if (!terminalInput) return;

  const commandHistory = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => `
<div class="text-emerald-400 font-semibold mb-1">Available System Commands:</div>
  <span class="text-cyan-400 font-mono">whoami</span>       - Adwaith's developer profile & background
  <span class="text-cyan-400 font-mono">skills</span>       - Core tech stack & programming capabilities
  <span class="text-cyan-400 font-mono">projects</span>     - Key featured repositories and 3D engines
  <span class="text-cyan-400 font-mono">location</span>     - Thekkumbhagam, Chavara South, Kollam (691584)
  <span class="text-cyan-400 font-mono">contact</span>      - Direct email and communication links
  <span class="text-cyan-400 font-mono">kerala</span>       - Malayalam roots & cultural tribute
  <span class="text-cyan-400 font-mono">matrix</span>       - Activate matrix stream visualizer
  <span class="text-cyan-400 font-mono">clear</span>        - Clear the terminal screen
  <span class="text-cyan-400 font-mono">exit</span>         - Close the terminal window
`,
    whoami: () => `
<div class="border-l-2 border-emerald-500 pl-3 py-1 my-1">
  <div class="text-emerald-300 font-bold text-base">ADWAITH (അദ്വൈത്)</div>
  <div class="text-slate-300 text-xs mt-1">
    • <span class="text-cyan-300">Status:</span> Plus One (+1 / 11th Grade) High School Student & Prodigy Builder<br>
    • <span class="text-cyan-300">Roles:</span> Indie Game Developer, 3D CGI Artist, Full-Stack Software Engineer<br>
    • <span class="text-cyan-300">Roots:</span> Thekkumbhagam, Chavara South, Kollam, Kerala, India (PIN: 691584)<br>
    • <span class="text-cyan-300">Mission:</span> Merging low-level systems, 3D WebGL physics, and modern web apps into bleeding-edge digital experiences.
  </div>
</div>
`,
    skills: () => `
<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 text-xs">
  <div>
    <span class="text-emerald-400 font-semibold">Languages & Math:</span><br>
    JavaScript (ESNext), TypeScript, Python 3, GLSL Shaders, Lua, HTML5/CSS3, C++ (Systems)
  </div>
  <div>
    <span class="text-cyan-400 font-semibold">3D, Games & CGI:</span><br>
    Three.js, WebGL, Blender 3D (Rigging, Python API, MCP), FiveM Scripting, Minecraft Shaders
  </div>
  <div>
    <span class="text-violet-400 font-semibold">Web & Mobile Ecosystem:</span><br>
    Node.js, Express.js 5, Capacitor 8 (Android/iOS), REST APIs, JWT, Tailwind CSS
  </div>
  <div>
    <span class="text-amber-400 font-semibold">Tools & Creative Suite:</span><br>
    Git/GitHub Actions CI/CD, Adobe Premiere Pro, OBS Live Streaming Tech, FFmpeg, Vercel
  </div>
</div>
`,
    projects: () => `
<div class="space-y-1.5 my-2 text-xs">
  <div>⚡ <strong class="text-emerald-300">Malayalam Open World 3D:</strong> Real-time Kerala village game with Chayakada 3D model, bone rigging & WebGL physics.</div>
  <div>🌿 <strong class="text-emerald-300">Pacha.leaf E-Commerce & App:</strong> Express 5 backend with Capacitor 8 Android/iOS apps and automated GitHub Actions CI/CD.</div>
  <div>🤖 <strong class="text-cyan-300">Antigravity Blender MCP Suite:</strong> AI-driven 3D scene generation, lighting, procedural shaders, and snapshot rendering.</div>
  <div>🎮 <strong class="text-cyan-300">AnyPS5 Architecture:</strong> Native Windows optimization runtime, memory compression & high-speed packaging.</div>
  <div>🥭 <strong class="text-amber-300">Mambazham Discord Bot:</strong> High-performance community hub bot with Malayalam/English slash commands.</div>
  <div>✨ <strong class="text-violet-300">BSL & Mobile Shaders Lab:</strong> GLSL fragment shaders, real-time lighting calculations & crosshair mathematics.</div>
</div>
<div class="text-slate-400 text-[11px] mt-1">Type <span class="text-emerald-400 font-mono">github</span> or scroll to Projects section to view live code.</div>
`,
    location: () => `
<div class="my-1 text-xs text-slate-300">
  <span class="text-emerald-400 font-semibold">Location Coordinates:</span> 8.9959° N, 76.5367° E<br>
  <span class="text-emerald-400 font-semibold">Town:</span> Thekkumbhagam, Chavara South<br>
  <span class="text-emerald-400 font-semibold">District:</span> Kollam, Kerala<br>
  <span class="text-emerald-400 font-semibold">Postal Code:</span> 691584, India<br>
  <span class="text-slate-400 italic">"Engineering world-class technology from the heart of Kerala's serene coastal landscape."</span>
</div>
`,
    contact: () => `
<div class="my-1 text-xs text-slate-300">
  • <span class="text-cyan-400">Email:</span> <a href="mailto:hymivel@gmail.com" class="text-emerald-300 underline">hymivel@gmail.com</a><br>
  • <span class="text-cyan-400">GitHub:</span> <a href="https://github.com/hymivel-max" target="_blank" class="text-emerald-300 underline">github.com/hymivel-max</a><br>
  • <span class="text-cyan-400">Location:</span> Thekkumbhagam, Chavara South, Kollam 691584
</div>
`,
    github: () => {
      window.open('https://github.com/hymivel-max', '_blank');
      return `<div class="text-cyan-300">Navigating to https://github.com/hymivel-max...</div>`;
    },
    kerala: () => `
<div class="border border-emerald-500/40 rounded p-2.5 my-2 bg-emerald-950/20 text-xs text-emerald-200">
  <div class="font-bold text-sm malayalam-sub">കേരളം • ദൈവത്തിന്റെ സ്വന്തം നാട് 🌴</div>
  <p class="mt-1">
    തെക്കുംഭാഗം, ചവറ സൗത്ത്, കൊല്ലം - അഷ്ടമുടിക്കായലിന്റെയും അറബിക്കടലിന്റെയും സൗന്ദര്യത്തിൽ നിന്ന് 
    ലോകോത്തര നിലവാരത്തിലുള്ള കോഡിംഗും 3D വേൾഡും പടുത്തുയർത്തുന്ന ഒരു പ്ലസ് വൺ വിദ്യാർത്ഥിയുടെ യാത്ര.
  </p>
</div>
`,
    matrix: () => {
      triggerMatrixEffect();
      return `<div class="text-emerald-400 animate-pulse">Matrix stream initiated. Reality calibrated.</div>`;
    },
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    },
    exit: () => {
      closeTerminal();
      return 'Terminal session closed.';
    }
  };

  function openTerminal() {
    terminalModal.classList.add('active');
    if (window.CyberAudio) window.CyberAudio.playSwoosh();
    setTimeout(() => terminalInput.focus(), 100);
  }

  function closeTerminal() {
    terminalModal.classList.remove('active');
    if (window.CyberAudio) window.CyberAudio.playClick();
  }

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    commandHistory.push(cmdRaw);
    historyIndex = commandHistory.length;

    // Echo input
    const line = document.createElement('div');
    line.className = 'mb-1';
    line.innerHTML = `<span class="terminal-prompt">adwaith@kollam-core:~$</span> <span class="text-white">${escapeHtml(cmdRaw)}</span>`;
    terminalBody.appendChild(line);

    // Process output
    const outputDiv = document.createElement('div');
    outputDiv.className = 'mb-3 text-slate-300';

    if (COMMANDS[cmd]) {
      const result = COMMANDS[cmd]();
      if (result) {
        outputDiv.innerHTML = result;
        terminalBody.appendChild(outputDiv);
      }
    } else {
      outputDiv.innerHTML = `<span class="text-red-400">Command not found: '${escapeHtml(cmd)}'. Type <span class="text-emerald-400 font-semibold">'help'</span> for available commands.</span>`;
      terminalBody.appendChild(outputDiv);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // Keyboard shortcut Ctrl+K or Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (terminalModal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
    if (e.key === 'Escape' && terminalModal.classList.contains('active')) {
      closeTerminal();
    }
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (window.CyberAudio) window.CyberAudio.playTerminalKey();

    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        terminalInput.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        terminalInput.value = '';
      }
    }
  });

  if (terminalCloseBtn) {
    terminalCloseBtn.addEventListener('click', closeTerminal);
  }

  // Matrix visual effect easter egg
  function triggerMatrixEffect() {
    const chars = '01അആഇഈകഖഗഘADWAITH101010#@!%*';
    let output = '';
    for (let i = 0; i < 8; i++) {
      let row = '';
      for (let j = 0; j < 36; j++) {
        row += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      output += `<div class="text-emerald-400 opacity-75 font-mono text-xs tracking-widest">${row}</div>`;
    }
    const div = document.createElement('div');
    div.className = 'my-2 p-2 bg-black/80 rounded border border-emerald-500/30';
    div.innerHTML = output;
    terminalBody.appendChild(div);
  }

  window.openTerminal = openTerminal;
  window.closeTerminal = closeTerminal;
})();
