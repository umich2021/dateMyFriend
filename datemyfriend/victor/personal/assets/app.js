// Shared across every page in personal/. Depends on ../data/victor-data.js
// being loaded first (defines window.VictorDB).

const NAV_ITEMS = [
  { key: "home", label: "Home", href: "index.html", alwaysOn: true },
  { key: "about", label: "About", href: "index.html", alwaysOn: true },
  { key: "flags", label: "Flags", href: "flags.html" },
  { key: "idealType", label: "Ideal Type", href: "ideal-type.html" },
  { key: "values", label: "Values", href: "values.html" },
  { key: "friends", label: "Friends Say", href: "friends.html" },
  { key: "faq", label: "FAQ", href: "faq.html" },
  { key: "contact", label: "Contact", href: "contact.html", alwaysOn: true },
];

function renderNav(activeHref) {
  const mount = document.getElementById("navlinks");
  if (!mount) return;
  const vis = window.VictorDB.getVisibility();
  // "home"/"about" both point at index.html — only show one entry for it
  const items = activeHref === "index.html"
    ? NAV_ITEMS.filter((i) => i.key !== "home")
    : NAV_ITEMS.filter((i) => i.key !== "about");

  mount.innerHTML = items.map((item) => {
    const on = item.alwaysOn || vis[item.key] !== false;
    const classes = [
      item.href === activeHref ? "active" : "",
      on ? "" : "dim",
    ].filter(Boolean).join(" ");
    return `<li><a href="${item.href}" class="${classes}">${item.label}</a></li>`;
  }).join("");
}

function renderHiddenState(sectionLabel) {
  return `
    <div class="hidden-state reveal in-view">
      <div class="emoji">🙈</div>
      <p>Victor turned the <strong>${sectionLabel}</strong> section off for now.<br>
      <a href="index.html">← Back home</a></p>
    </div>
  `;
}

// ---- style switcher: lets you try different visual directions live ----
const THEMES = [
  { key: "editorial", label: "Editorial (default)", swatch: ["#faf6f0", "#c9603e"] },
  { key: "tinder", label: "Swipe Right", swatch: ["#fff5f2", "#ff4d8d"] },
  { key: "kawaii", label: "Kawaii", swatch: ["#fff8fc", "#ff9ecb"] },
  { key: "academia", label: "Dark Academia", swatch: ["#1b1410", "#c9a13b"] },
  { key: "desktop", label: "Window Mode", swatch: ["#eeeae2", "#ff5a1f"] },
];
const THEME_KEY = "victorSiteTheme";
let heartInterval = null;

function setHeartsActive(active) {
  let layer = document.getElementById("heart-layer");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "heart-layer";
    document.body.prepend(layer);
  }
  if (active && !heartInterval) {
    const emojis = ["💛", "💗", "❤️", "💫"];
    const spawn = () => {
      const h = document.createElement("div");
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.cssText = `position:absolute; left:${Math.random() * 100}vw; bottom:-40px; font-size:${14 + Math.random() * 16}px; opacity:.8; animation: heart-rise ${6 + Math.random() * 5}s linear forwards;`;
      layer.appendChild(h);
      setTimeout(() => h.remove(), 12000);
    };
    heartInterval = setInterval(spawn, 1400);
    for (let i = 0; i < 4; i++) setTimeout(spawn, i * 400);
  } else if (!active && heartInterval) {
    clearInterval(heartInterval);
    heartInterval = null;
    layer.innerHTML = "";
  }
}

let kawaiiInterval = null;

function setKawaiiRainActive(active) {
  let layer = document.getElementById("kawaii-rain");
  if (!layer) {
    layer = document.createElement("div");
    layer.id = "kawaii-rain";
    document.body.prepend(layer);
  }
  if (active && !kawaiiInterval) {
    const emojis = ["🌸", "💕", "⭐", "✨", "🎀", "🧸", "🍡", "🐰"];
    const spawn = () => {
      const h = document.createElement("div");
      h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      h.style.cssText = `position:absolute; left:${Math.random() * 100}vw; bottom:-40px; font-size:${16 + Math.random() * 20}px; animation: kawaii-rise ${5 + Math.random() * 4}s linear forwards;`;
      layer.appendChild(h);
      setTimeout(() => h.remove(), 10000);
    };
    kawaiiInterval = setInterval(spawn, 450);
    for (let i = 0; i < 10; i++) setTimeout(spawn, i * 150);
  } else if (!active && kawaiiInterval) {
    clearInterval(kawaiiInterval);
    kawaiiInterval = null;
    layer.innerHTML = "";
  }
}

function applyTheme(key) {
  if (key === "editorial") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", key);
  }
  localStorage.setItem(THEME_KEY, key);
  document.querySelectorAll(".theme-swatch").forEach((el) => {
    el.classList.toggle("active", el.dataset.key === key);
  });
  document.body.classList.toggle("has-mascot", key === "kawaii");
  setHeartsActive(key === "tinder");
  setKawaiiRainActive(key === "kawaii");
}

function initThemeSwitcher() {
  if (document.querySelector(".theme-switcher")) return;
  const saved = localStorage.getItem(THEME_KEY) || "editorial";
  applyTheme(saved);

  const widget = document.createElement("div");
  widget.className = "theme-switcher";
  widget.innerHTML = `
    <button class="theme-toggle" id="themeToggle" title="Try a different style">🎨</button>
    <div class="theme-panel" id="themePanel">
      <div class="theme-panel-label">Try a style</div>
      ${THEMES.map((t) => `
        <button class="theme-swatch ${t.key === saved ? "active" : ""}" data-key="${t.key}">
          <span class="sw" style="background:linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})"></span>
          ${t.label}
        </button>`).join("")}
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("themeToggle").addEventListener("click", () => {
    document.getElementById("themePanel").classList.toggle("open");
  });
  widget.querySelectorAll(".theme-swatch").forEach((btn) => {
    btn.addEventListener("click", () => applyTheme(btn.dataset.key));
  });

  const mascot = document.createElement("div");
  mascot.className = "mascot";
  mascot.innerHTML = `
    <div class="mascot-bubble">hi! 👋</div>
    <div class="mascot-body">
      <span class="mascot-eye left"></span><span class="mascot-eye right"></span>
      <span class="mascot-blush left"></span><span class="mascot-blush right"></span>
      <span class="mascot-mouth"></span>
      <div class="mascot-arm"></div>
    </div>
  `;
  document.body.appendChild(mascot);

  const bunny = document.createElement("div");
  bunny.className = "kawaii-bunny";
  bunny.innerHTML = `
    <span class="bunny-ear left"></span><span class="bunny-ear right"></span>
    <div class="bunny-face">
      <span class="bunny-eye left"></span><span class="bunny-eye right"></span>
      <span class="bunny-blush left"></span><span class="bunny-blush right"></span>
    </div>
  `;
  document.body.appendChild(bunny);

  const stickers = document.createElement("div");
  stickers.className = "kawaii-stickers";
  stickers.innerHTML = `
    <div class="sticker s1">🌸</div>
    <div class="sticker s2">⭐</div>
    <div class="sticker s3">🐾</div>
    <div class="sticker s4">✨</div>
    <div class="sticker s5">🎀</div>
    <div class="sticker s6">🧸</div>
    <div class="sticker s7">💕</div>
  `;
  document.body.appendChild(stickers);
}

// ---- Window Mode: turns key sections into actual clickable/collapsible
// "windows" (title bar + traffic-light dots + minimize) instead of just
// reskinning colors. On the home page, About/Photos/Interests/Contact
// become a scattered desktop of overlapping windows you can click to
// bring to front. On every other page, the page's one content block
// becomes a single window. Wiring always runs; the CSS that makes any of
// this visible/interactive only applies under html[data-theme="desktop"],
// so it's inert in every other style. ----
let osZTop = 10;

function makeOsWindow(el, title, solo) {
  if (!el || el.dataset.osWired) return;
  el.dataset.osWired = "1";
  el.classList.add("os-window");
  if (solo) el.classList.add("os-solo");

  const bar = document.createElement("div");
  bar.className = "os-titlebar";
  bar.innerHTML = `<span class="os-dots">🔴🟡🟢</span><span class="os-title">${title}</span><span class="os-min">–</span>`;
  el.prepend(bar);

  function bringToFront() {
    osZTop += 1;
    el.style.zIndex = osZTop;
  }
  el.addEventListener("mousedown", bringToFront);
  bar.querySelector(".os-min").addEventListener("click", (e) => {
    e.stopPropagation();
    el.classList.toggle("os-collapsed");
    e.target.textContent = el.classList.contains("os-collapsed") ? "+" : "–";
    bringToFront();
  });
}

function initWindowMode() {
  // home page: group into one scattered "desktop" of windows
  const homeSections = [
    { id: "about", title: "about.txt" },
    { id: "gallery", title: "photos.app" },
    { id: "interests", title: "interests.exe" },
    { id: "contact", title: "contact.sys" },
  ].map((s) => ({ ...s, el: document.getElementById(s.id) })).filter((s) => s.el);

  if (homeSections.length) {
    let wrap = document.getElementById("osDesktop");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.id = "osDesktop";
      wrap.className = "os-desktop";
      homeSections[0].el.parentNode.insertBefore(wrap, homeSections[0].el);
      homeSections.forEach((s) => wrap.appendChild(s.el));
    }
    homeSections.forEach((s) => makeOsWindow(s.el, s.title, false));
  }

  // every other page: the single content block becomes one window
  [
    { id: "flagsContent", title: "flags.txt" },
    { id: "idealContent", title: "ideal-type.doc" },
    { id: "valuesContent", title: "values.doc" },
    { id: "friendsContent", title: "friends.log" },
    { id: "faqContent", title: "faq.txt" },
    { id: "contactContent", title: "contact.sys" },
  ].forEach((s) => {
    const el = document.getElementById(s.id);
    if (el) makeOsWindow(el, s.title, true);
  });
}

function initChrome(opts) {
  opts = opts || {};
  if (opts.lockedTheme) {
    // This page has settled on a style — set it directly and skip the
    // switcher entirely (no 🎨 button, and critically: no write to the
    // shared victorSiteTheme localStorage key, so it doesn't drag other
    // still-undecided pages along with it).
    document.documentElement.setAttribute("data-theme", opts.lockedTheme);
  } else {
    initThemeSwitcher();
  }
  initWindowMode();

  // custom cursor
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (dot && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function loop() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll("a, button, .avatar, .stat").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("grow"));
      el.addEventListener("mouseleave", () => ring.classList.remove("grow"));
    });
  }

  // scroll progress + nav border
  const progress = document.getElementById("progress");
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (progress) progress.style.width = pct + "%";
    if (nav) nav.classList.toggle("scrolled", h.scrollTop > 10);
  });

  // reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("in-view");
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

function initMagnetic(btn) {
  if (!btn) return;
  btn.addEventListener("mousemove", (e) => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  });
  btn.addEventListener("mouseleave", () => { btn.style.transform = "translate(0,0)"; });
}
