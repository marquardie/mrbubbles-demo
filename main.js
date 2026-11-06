(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const nav = $('#nav');
  let mx = -9999, my = -9999;

  /* ---------- hexagon lamps across the whole site: soft violet neon under the cursor ---------- */
  const cv = $('#hexall'), ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, hexes = [];
  function build() {
    dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    const R = W < 700 ? 30 : 42, dx = R * 1.5, dy = Math.sqrt(3) * R;
    hexes = [];
    for (let c = -1; c < W / dx + 2; c++) for (let r = -1; r < H / dy + 2; r++)
      hexes.push({ x: c * dx, y: r * dy + (c & 1 ? dy / 2 : 0), R: R - 3, e: 0 });
  }
  build(); addEventListener('resize', build);
  function frame() {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.lineJoin = 'round';
    for (const h of hexes) {
      h.e *= .965;                                 // trail fades out behind the cursor
      const k = h.e, a = .025 + Math.pow(k, 1.7) * .5;   // brightest at the cursor, quieter along the trail
      if (a < .03) continue;
      const R = h.R * (k < .35 ? .62 + k / .35 * .38 : 1); // the tail cells dissolve: shrink + fade
      ctx.beginPath();
      for (let i = 0; i < 6; i++) { const g = Math.PI / 3 * i, px = h.x + R * Math.cos(g), py = h.y + R * Math.sin(g); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
      ctx.closePath();
      if (k > .15) { ctx.strokeStyle = `rgba(139,77,255,${(Math.pow(k, 1.7) * .16).toFixed(3)})`; ctx.lineWidth = 8; ctx.stroke(); }
      ctx.strokeStyle = k > .02 ? `rgba(186,150,255,${a.toFixed(3)})` : `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.lineWidth = 1.4; ctx.stroke();
    }
    requestAnimationFrame(frame);
  }
  if (!reduced) requestAnimationFrame(frame);
  /* stamp the cells along the cursor path; the fade in frame() turns that into a trail */
  function stamp(x, y) {
    const RAD = 75;
    for (const h of hexes) {
      const d = Math.hypot(h.x - x, h.y - y);
      if (d < RAD) h.e = Math.max(h.e, Math.pow(1 - d / RAD, 1.2));
    }
  }
  addEventListener('pointermove', e => {
    if (mx > -9000) { const n = Math.ceil(Math.hypot(e.clientX - mx, e.clientY - my) / 30); for (let i = 1; i <= n; i++) stamp(mx + (e.clientX - mx) * i / n, my + (e.clientY - my) * i / n); }
    else stamp(e.clientX, e.clientY);
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  /* ---------- scroll progress: headlight beam along the top ---------- */
  const bar = $('#progress i');
  function onTop() {
    nav.classList.toggle('solid', scrollY > 40);
    const k = clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    bar.style.transform = `scaleX(${k.toFixed(4)})`;
  }
  addEventListener('scroll', onTop, { passive: true }); onTop();

  /* ---------- process: LED strip fills as you scroll ---------- */
  const steps = $('#steps'), ledfill = $('#ledfill');
  function onScroll() {
    if (!steps) return;
    const r = steps.getBoundingClientRect();
    const k = clamp((innerHeight * .8 - r.top) / (r.height + innerHeight * .1));
    ledfill.style.setProperty('--w', (k * 100).toFixed(1) + '%');
    $$('article', steps).forEach((a, i) => a.classList.toggle('on', k > (i + .2) / 4.3));
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- reveals ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    if (el.classList.contains('reveal')) {
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
      el.style.transitionDelay = (sibs.indexOf(el) % 4) * 90 + 'ms'; el.classList.add('in');
    } else el.classList.add('on');
    io.unobserve(el);
  }), { threshold: .2 });
  $$('.reveal,[data-lit]').forEach(el => io.observe(el));

  /* replay the polishing pass every time a pair scrolls back into view */
  const io3 = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    if (e.target.dataset.seen) { e.target.classList.remove('in'); void e.target.offsetWidth; e.target.classList.add('in'); }
    e.target.dataset.seen = 1;
  }), { threshold: .5 });
  $$('.pair').forEach(el => io3.observe(el));

  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; io2.unobserve(e.target);
    const el = e.target, to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    (function tick(t) { const k = clamp((t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(tick); })(t0);
  }), { threshold: .6 });
  $$('[data-count]').forEach(el => io2.observe(el));

  /* ---------- form -> WhatsApp ---------- */
  $('#form').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, m = $('#formmsg');
    const u = L.ui;
    if (!f.name.value.trim()) { m.textContent = u('need'); m.style.color = '#ff6b6b'; f.name.focus(); return; }
    const svc = f.service.value ? f.service.selectedOptions[0].textContent : '';
    const t = u('hi')(f.name.value.trim()) + (f.car.value.trim() ? ` ${u('car')}: ${f.car.value.trim()}.` : '') + (svc ? ` ${u('svc')}: ${svc}.` : '') + (f.msg.value.trim() ? ` ${f.msg.value.trim()}` : '');
    m.style.color = '#b794ff'; m.textContent = u('open');
    open('https://api.whatsapp.com/send/?phone=351917777813&text=' + encodeURIComponent(t), '_blank', 'noopener');
  });
})();
