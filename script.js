// script.js (UPGRADED)

// Start after page load (wait for cake animation)
window.addEventListener("load", () => {
  setTimeout(() => {
    startConfetti();
    sparkleBurst(); // small extra effect
  }, 5000);
});

function startConfetti() {
  // Remove old container if exists
  const old = document.getElementById("confetti-container");
  if (old) old.remove();

  const container = document.createElement("div");
  container.id = "confetti-container";
  container.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    overflow: hidden;
    z-index: 9999;
  `;
  document.body.appendChild(container);

  const colors = [
    "#ff4d6d", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff",
    "#ffffff", "#f72585", "#b5179e"
  ];

  const shapes = ["circle", "square", "ribbon"];
  const confettiCount = 260;

  for (let i = 0; i < confettiCount; i++) {
    const piece = document.createElement("div");

    const size = Math.random() * 10 + 6;
    const delay = Math.random() * 4;
    const duration = Math.random() * 3 + 3;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.6 + 0.4;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Shape style
    let extraShapeCSS = "";
    if (shape === "circle") {
      extraShapeCSS = `border-radius: 50%;`;
    } else if (shape === "square") {
      extraShapeCSS = `border-radius: 3px;`;
    } else {
      // ribbon
      extraShapeCSS = `
        width: ${size * 0.5}px;
        height: ${size * 2.2}px;
        border-radius: 4px;
      `;
    }

    piece.style.cssText = `
      position: absolute;
      top: -30px;
      left: ${left}vw;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      opacity: ${opacity};
      ${extraShapeCSS}

      transform: translate3d(0,0,0) rotate(${Math.random() * 360}deg);
      filter: drop-shadow(0 8px 10px rgba(0,0,0,0.15));

      animation:
        confettiFall ${duration}s linear ${delay}s infinite,
        confettiDrift ${Math.random() * 2 + 2}s ease-in-out ${delay}s infinite,
        confettiSpin ${Math.random() * 2 + 1}s linear ${delay}s infinite;
    `;

    container.appendChild(piece);
  }

  // Inject CSS once
  if (!document.getElementById("confetti-styles")) {
    const style = document.createElement("style");
    style.id = "confetti-styles";
    style.innerHTML = `
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); }
        100% { transform: translateY(115vh) rotate(720deg); }
      }

      @keyframes confettiDrift {
        0%,100% { margin-left: 0px; }
        50% { margin-left: 60px; }
      }

      @keyframes confettiSpin {
        0% { rotate: 0deg; }
        100% { rotate: 360deg; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ✨ Sparkle burst effect */
function sparkleBurst() {
  const burst = document.createElement("div");
  burst.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9998;
  `;
  document.body.appendChild(burst);

  const sparkleColors = ["#fff", "#ffe066", "#ffd6ff", "#bde0fe"];

  for (let i = 0; i < 45; i++) {
    const s = document.createElement("span");
    const size = Math.random() * 6 + 4;

    s.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 40 + 10}vh;
      width: ${size}px;
      height: ${size}px;
      background: ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]};
      border-radius: 50%;
      opacity: 0;
      animation: sparkle 1.8s ease ${Math.random()}s forwards;
      filter: blur(0.3px);
    `;
    burst.appendChild(s);
  }

  if (!document.getElementById("sparkle-styles")) {
    const style = document.createElement("style");
    style.id = "sparkle-styles";
    style.innerHTML = `
      @keyframes sparkle {
        0% { transform: scale(0.3); opacity: 0; }
        30% { opacity: 1; }
        100% { transform: scale(1.8) translateY(-30px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // auto cleanup
  setTimeout(() => burst.remove(), 3000);
}
