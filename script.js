/* ══════════════════════════════════════════════
   Celdas Solares — Química Computacional 1
   main.js
══════════════════════════════════════════════ */

// ── Timer ──────────────────────────────────────
let secs    = 40 * 60;
let running = false;
let iv      = null;

const disp = document.getElementById('timer-display');
const pbar = document.getElementById('pbar');
const tbtn = document.getElementById('tbtn');

function pad(n) {
  return String(n).padStart(2, '0');
}

function renderTimer() {
  disp.textContent = pad(Math.floor(secs / 60)) + ':' + pad(secs % 60);
  pbar.style.width  = ((40 * 60 - secs) / (40 * 60) * 100) + '%';
  disp.className    = secs <= 300 ? 'danger' : secs <= 600 ? 'warn' : '';
}

function toggleTimer() {
  if (running) {
    clearInterval(iv);
    running = false;
    tbtn.textContent = '▶';
  } else {
    iv = setInterval(() => {
      if (secs > 0) {
        secs--;
        renderTimer();
      } else {
        clearInterval(iv);
        running = false;
        tbtn.textContent = '▶';
      }
    }, 1000);
    running = true;
    tbtn.textContent = '⏸';
  }
}

function resetTimer() {
  clearInterval(iv);
  running = false;
  secs    = 40 * 60;
  tbtn.textContent = '▶';
  renderTimer();
}

// ── Navigation ─────────────────────────────────
function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Active nav highlight on scroll ─────────────
const navBtns = document.querySelectorAll('.nav-btn');
const sectionIds = ['b1', 'b2', 'b3', 'b4', 'b5', 'refs'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = sectionIds.indexOf(e.target.id);
      navBtns.forEach(b => b.classList.remove('active'));
      if (i >= 0) navBtns[i].classList.add('active');
    }
  });
}, { threshold: 0.25 });

sectionIds.forEach(id => {
  const el = document.getElementById(id);
  if (el) observer.observe(el);
});

// ── Keyboard shortcuts ──────────────────────────
// Space → play/pause timer
// R     → reset timer
document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); toggleTimer(); }
  if (e.code === 'KeyR')  { resetTimer(); }
});

// ── Init ───────────────────────────────────────
renderTimer();