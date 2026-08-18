// gallery/ is a single page, no nav between files, just rooms you scroll
// or click through. This wires the fixed chrome (progress line, room
// counter, the floor-directory dot-nav) once index.html has built its
// list of rooms (entrance + whichever content rooms are visible).
function initGalleryChrome(rooms) {
  const progress = document.getElementById("progressLine");
  const counter = document.getElementById("roomCounter");
  const navMount = document.getElementById("roomNav");

  navMount.innerHTML = rooms.map((r, i) => `
    <button data-target="${r.id}" title="${r.label}">
      <span class="dot"></span>${romanize(i + 1)}
    </button>
  `).join("");

  navMount.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById(btn.dataset.target)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const roomEls = rooms.map((r) => document.getElementById(r.id)).filter(Boolean);
  // Belt-and-suspenders: the entrance room should never be stuck at
  // opacity 0 waiting on the observer's first callback.
  roomEls[0]?.classList.add("in-view");

  function setActive(index) {
    navMount.querySelectorAll("button").forEach((b, i) => b.classList.toggle("active", i === index));
    counter.innerHTML = `<strong>${romanize(index + 1)}</strong> / ${romanize(rooms.length)}`;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        const idx = roomEls.indexOf(en.target);
        if (idx !== -1) setActive(idx);
      }
    });
  }, { threshold: 0.5 });
  roomEls.forEach((el) => io.observe(el));

  if (roomEls.length) setActive(0);

  window.addEventListener("scroll", () => {
    const h = document.documentElement;
    const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = pct + "%";
  });
}

function romanize(num) {
  const map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
  let n = num, out = "";
  for (const [val, sym] of map) {
    while (n >= val) { out += sym; n -= val; }
  }
  return out || "I";
}
