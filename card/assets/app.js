// Shared across every page in card/. Depends on ../data/victor-data.js
// being loaded first (defines window.VictorDB).

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html", alwaysOn: true },
  { key: "prompts", label: "Prompts", href: "prompts.html" },
  { key: "flags", label: "Flags", href: "flags.html" },
  { key: "idealType", label: "Ideal Type", href: "ideal-type.html" },
  { key: "friends", label: "Friends Say", href: "friends.html" },
  { key: "contact", label: "Contact", href: "contact.html", alwaysOn: true },
];

function renderNav(activeHref) {
  const mount = document.getElementById("pillnav");
  if (mount) {
    const vis = window.VictorDB.getVisibility();
    mount.innerHTML = NAV_ITEMS.map((item) => {
      const on = item.alwaysOn || vis[item.key] !== false;
      const classes = [
        item.href === activeHref ? "active" : "",
        on ? "" : "dim",
      ].filter(Boolean).join(" ");
      return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
    }).join("");
  }
  initPaletteSwitcher();
  // Deferred: renderNav() runs before this page's content gets injected
  // into #card/#pageCard (that happens later in the same <script> block),
  // so wiring the window chrome has to wait until that's done or the
  // content injection would wipe out the title bar we just added.
  setTimeout(initWindowMode, 0);
}

// ---- style switcher: SHARES a localStorage key + vocabulary with
// personal/assets/app.js (same THEME_KEY, same 6 keys) so picking a style
// on either site carries over to the other. ----
const PALETTES = [
  { key: "editorial", label: "Editorial (default)", swatch: ["#fbf7f2", "#c9603e"] },
  { key: "tinder", label: "Swipe Right", swatch: ["#fff5f2", "#ff4d8d"] },
  { key: "kawaii", label: "Kawaii", swatch: ["#fff8fc", "#ff6fb3"] },
  { key: "academia", label: "Dark Academia", swatch: ["#1b1410", "#c9a13b"] },
  { key: "desktop", label: "Window Mode", swatch: ["#eeeae2", "#ff5a1f"] },
];
const PALETTE_KEY = "victorSiteTheme";

function applyPalette(key) {
  if (key === "editorial") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", key);
  }
  localStorage.setItem(PALETTE_KEY, key);
  document.querySelectorAll(".palette-swatch").forEach((el) => {
    el.classList.toggle("active", el.dataset.key === key);
  });
}

// ---- Window Mode: turns the page's card into an actual clickable/
// collapsible "window" (title bar + traffic-light dots + minimize)
// instead of just a color/font swap. Wiring always runs; the CSS that
// makes it visible only applies under html[data-theme="desktop"]. ----
function initWindowMode() {
  const target = document.getElementById("card") || document.getElementById("pageCard");
  if (!target || target.dataset.osWired) return;
  target.dataset.osWired = "1";
  target.classList.add("os-window");

  const bar = document.createElement("div");
  bar.className = "os-titlebar";
  bar.innerHTML = `<span class="os-dots">🔴🟡🟢</span><span class="os-title">${document.title}</span><span class="os-min">–</span>`;
  target.prepend(bar);

  bar.querySelector(".os-min").addEventListener("click", (e) => {
    e.stopPropagation();
    target.classList.toggle("os-collapsed");
    e.target.textContent = target.classList.contains("os-collapsed") ? "+" : "–";
  });
}

function initPaletteSwitcher() {
  if (document.querySelector(".palette-switcher")) return;
  const saved = localStorage.getItem(PALETTE_KEY) || "editorial";
  applyPalette(saved);

  const widget = document.createElement("div");
  widget.className = "palette-switcher";
  widget.innerHTML = `
    <button class="palette-toggle" id="paletteToggle" title="Try a different palette">🎨</button>
    <div class="palette-panel" id="palettePanel">
      <div class="palette-panel-label">Try a palette</div>
      ${PALETTES.map((p) => `
        <button class="palette-swatch ${p.key === saved ? "active" : ""}" data-key="${p.key}">
          <span class="sw" style="background:linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})"></span>
          ${p.label}
        </button>`).join("")}
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("paletteToggle").addEventListener("click", () => {
    document.getElementById("palettePanel").classList.toggle("open");
  });
  widget.querySelectorAll(".palette-swatch").forEach((btn) => {
    btn.addEventListener("click", () => applyPalette(btn.dataset.key));
  });
}

function renderHiddenState(sectionLabel) {
  return `
    <div class="hidden-state">
      <div class="emoji">🙈</div>
      <p>Victor turned the <strong>${sectionLabel}</strong> section off for now.<br>
      <a href="index.html">← Back to the profile</a></p>
    </div>
  `;
}

function spawnFloatingHearts(container) {
  if (!container) return;
  const emojis = ["💛", "💗", "❤️", "💫"];
  function spawn() {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.position = "absolute";
    h.style.left = Math.random() * 100 + "vw";
    h.style.bottom = "-40px";
    h.style.fontSize = 14 + Math.random() * 16 + "px";
    h.style.opacity = "0.8";
    h.style.animation = `rise ${6 + Math.random() * 5}s linear forwards`;
    container.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rise{
      0%{ transform:translateY(0) rotate(0deg); opacity:0; }
      10%{ opacity:.85; }
      100%{ transform:translateY(-110vh) rotate(25deg); opacity:0; }
    }`;
  document.head.appendChild(style);
  setInterval(spawn, 1400);
  for (let i = 0; i < 4; i++) setTimeout(spawn, i * 400);
}
