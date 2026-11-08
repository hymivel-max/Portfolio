# ADWAITH — Personal Portfolio & Interactive 3D WebGL Ecosystem
> **Developed by Adwaith (@hymivel-max)**  
> *Plus One (+1) Student Prodigy • Indie Game Developer • Full-Stack Engineer • 3D Technologist*  
> *Thekkumbhagam, Chavara South, Kollam, Kerala, India — PIN: 691584*

---

## 🌟 Overview & Key Features

This portfolio is an ultra-modern, high-performance, and animated cyber-emerald developer experience tailored specifically for **Adwaith**. It is built with zero-runtime baggage, works 100% out-of-the-box on **GitHub Pages** and **Vercel**, and features:

1. **Interactive 3D Three.js Background**
   - Dynamic 600+ particle constellation with reactive mouse parallax, real-time depth drift, and glowing geometric icosahedron & torus wireframes.
   - Automatically throttles or switches to 2D canvas fallback on low-power devices.

2. **Procedural Web Audio SFX Engine (`js/audio-sfx.js`)**
   - Synthesizes authentic cyber click, hover blip, swoosh, and terminal keystroke frequencies directly in the browser using the Web Audio API.
   - Zero external audio files required (works offline and on GitHub Pages with zero 404s). Includes a global mute/unmute toggle.

3. **Multi-Page & Smooth Single-Page Transitions**
   - Continuous smooth scroll across `#home`, `#about`, `#projects`, `#skills`, `#terminal-section`, and `#contact`.
   - Dedicated separate standalone multi-page HTML files: `index.html`, `about.html`, `projects.html`, `skills.html`, and `contact.html`.

4. **3D Tilt Card Physics (`js/tilt.js`)**
   - Perspective 3D hover physics with dynamic light specular highlight glare on all project and skill cards.

5. **Developer CLI Shell Modal (`js/terminal.js`)**
   - Interactive hacker terminal with command history (Up/Down arrows) and commands:
     - `whoami` — Adwaith's student background and bio.
     - `skills` — Core technical capabilities.
     - `projects` — Featured 3D games, full-stack apps, and AI MCP tools.
     - `location` — Geographical coordinates for Thekkumbhagam, Chavara South, Kollam (691584).
     - `kerala` — Cultural tribute to Kerala technology and heritage.
     - `matrix` — Falling phosphor matrix code stream.
     - `contact` — Email and direct reachout details.
   - Quick shortcut: `Ctrl+K` or `Cmd+K`.

6. **Interactive Resume & Print View**
   - Integrated printable resume sheet formatted for PDF export or instant preview (`window.print()`).

7. **One-Click Clipboard Toasts**
   - Instant copy triggers for `hymivel@gmail.com` and location coordinates with feedback toasts.

---

## 🚀 How to Run Locally

Because this project uses standard web technologies without mandatory server runtimes, you can preview it instantly:

### Option A: Double-Click
Simply open `index.html` in Google Chrome, Microsoft Edge, Brave, or Firefox.

### Option B: Local Web Server
```powershell
# Using Node / npx
npx serve .

# Or using Python
python -m http.server 8000
```
Then visit `http://localhost:8000` (or `http://localhost:3000`).

---

## 🌐 Publishing to GitHub Pages (Step-by-Step)

1. Open your terminal in this repository folder:
   ```powershell
   cd C:\Users\ADWAITH\Documents\GitHub\adwaith-portfolio
   ```

2. Initialize and commit your code:
   ```powershell
   git init
   git add .
   git commit -m "feat: release Adwaith cyber-emerald animated portfolio"
   git branch -M main
   ```

3. Create a new public repository on GitHub (e.g., `portfolio` or `adwaith` or `hymivel-max.github.io`):
   - If created as `hymivel-max.github.io`, your site will be live at: `https://hymivel-max.github.io/`
   - If created as `portfolio`, your site will be live at: `https://hymivel-max.github.io/portfolio/`

4. Connect the remote and push:
   ```powershell
   git remote add origin https://github.com/hymivel-max/portfolio.git
   git push -u origin main
   ```

5. Enable GitHub Pages:
   - Go to your GitHub repository -> **Settings** -> **Pages**.
   - Under **Build and deployment** > **Branch**, select `main` and root `/` folder.
   - Click **Save**.
   - Your website will be live in ~60 seconds!

---

## ⚡ Deploying to Vercel

```powershell
# Deploy with one command via Vercel CLI
npx vercel
```
Or import your GitHub repository at [vercel.com/new](https://vercel.com/new) — Vercel detects static HTML automatically with zero configuration!

---

## 📂 File Architecture

```
adwaith-portfolio/
│
├── .nojekyll                 # Prevents GitHub Pages Jekyll interference
├── index.html                # Master homepage with 3D canvas & all sections
├── about.html                # Standalone multi-page story & journey
├── projects.html             # Standalone multi-page projects showcase
├── skills.html               # Standalone multi-page skills matrix
├── contact.html              # Standalone multi-page contact & location
├── README.md                 # Complete documentation
│
├── css/
│   └── style.css             # Cyber-emerald design system, glassmorphism & keyframes
│
└── js/
    ├── three-scene.js        # Three.js 3D particle constellation & floating meshes
    ├── audio-sfx.js          # Procedural Web Audio API sound synthesizer
    ├── tilt.js               # 3D hover tilt & specular glare engine
    ├── terminal.js           # Interactive developer CLI terminal
    └── main.js               # Master controller (scroll reveal, cursor, modals, toasts)
```

---

## 👤 Author

- **Adwaith (അദ്വൈത്)**
- **GitHub:** [@hymivel-max](https://github.com/hymivel-max)
- **Email:** [hymivel@gmail.com](mailto:hymivel@gmail.com)
- **Location:** Thekkumbhagam, Chavara South, Kollam, Kerala, India - 691584
