/**
 * ADWAITH PORTFOLIO - 3D INTERACTIVE TILT ENGINE
 * Provides smooth 3D perspective hover physics & dynamic specular reflection
 */

(function () {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return; // Disable heavy tilt calculations on touch devices

  function initTilt() {
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach((card) => {
      let bounds;

      function updateBounds() {
        bounds = card.getBoundingClientRect();
      }

      function handleMouseMove(e) {
        if (!bounds) updateBounds();

        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = mouseX / bounds.width - 0.5;
        const yPct = mouseY / bounds.height - 0.5;

        const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 10;
        const rotX = -yPct * maxTilt;
        const rotY = xPct * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

        // Dynamic light reflection
        const glare = card.querySelector('.glare-effect');
        if (glare) {
          const glareX = (mouseX / bounds.width) * 100;
          const glareY = (mouseY / bounds.height) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(52, 211, 153, 0.15) 0%, transparent 60%)`;
          glare.style.opacity = '1';
        }
      }

      function handleMouseLeave() {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const glare = card.querySelector('.glare-effect');
        if (glare) glare.style.opacity = '0';
      }

      card.addEventListener('mouseenter', updateBounds);
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }

  document.addEventListener('DOMContentLoaded', initTilt);
  window.initTilt = initTilt;
})();
