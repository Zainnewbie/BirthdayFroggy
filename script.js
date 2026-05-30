
(() => {
  const letter = [
    `Level 20 unlocked 🎮`,
    ``,
    `Congraatss cipaa🥳🥳 new achievement unlocked being "kepala dua". Mwehehehee smoga di new chapter ini cipaa makin bahagia, makin kuat, dan tetap jadi orang yang nyenengin diri sendiri of course dan bisa nyenengin banyak orang jugaa. Jangan lupa nikmatin proses hidup juga ya, nggak harus selalu sempurna dan ga harus menuhin ekspektasi orang" cukup jadi diri sendiri aja. May all the good things finding you at the right time, kuliah lancar, rezeki aman, hati tenang, dikelilingi orng" baik dan mimpi satu-satu tercapai.`,
    ``,
    `Sorry aku gabisa kasih apa" cmn bisa kasih sedikit effort ini. aku cmn bisa doain cipa dari jauh aja, Wishing you a year full of little miracles and pretty moments. Wish u best😊`,
    ``,
    `With warm wishes,`,
    `The prince a.k.a kimoyy`
  ];

  const letterBody = document.getElementById('letterBody');
  letter.forEach((line, idx) => {
    const p = document.createElement('p');
    if (idx === 0) p.className = 'emphasis';
    if (idx === letter.length - 2) p.className = 'signline';
    if (line === '') {
      p.innerHTML = '&nbsp;';
    } else {
      p.textContent = line;
    }
    letterBody.appendChild(p);
  });

  const revealItems = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }
  }, { threshold: 0.16 });
  revealItems.forEach((el) => io.observe(el));
  document.querySelector('.hero').classList.add('is-visible'); // keep header visible right away

  // Canvas pond shimmer
  const canvas = document.getElementById('pondCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, dpr = 1;
  const ripples = [];
  const bubbles = [];
  const twinkles = [];

  function resize() {
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    w = canvas.width = Math.floor(window.innerWidth * dpr);
    h = canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedScene();
  }

  function seedScene() {
    ripples.length = 0;
    bubbles.length = 0;
    twinkles.length = 0;

    const bubbleCount = Math.round(Math.min(24, Math.max(12, window.innerWidth / 80)));
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 1 + Math.random() * 4,
        vx: -0.08 + Math.random() * 0.16,
        vy: -0.15 - Math.random() * 0.25,
        a: 0.18 + Math.random() * 0.28
      });
    }

    const twinkleCount = Math.round(Math.min(30, Math.max(18, window.innerWidth / 60)));
    for (let i = 0; i < twinkleCount; i++) {
      twinkles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        s: 0.6 + Math.random() * 1.8,
        p: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < 6; i++) {
      ripples.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight * (0.2 + Math.random() * 0.78),
        r: 20 + Math.random() * 100,
        dr: 0.1 + Math.random() * 0.32,
        a: 0.05 + Math.random() * 0.08
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const grd = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
    grd.addColorStop(0, 'rgba(255,255,255,0.08)');
    grd.addColorStop(0.55, 'rgba(120, 204, 147, 0.08)');
    grd.addColorStop(1, 'rgba(36, 89, 59, 0.12)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // soft water lines
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const y = (i + 1) * window.innerHeight / 9;
      ctx.beginPath();
      for (let x = -20; x <= window.innerWidth + 20; x += 22) {
        const wave = Math.sin((x * 0.012) + (performance.now() * 0.0008) + i) * (4 + i * 0.45);
        if (x === -20) ctx.moveTo(x, y + wave);
        else ctx.lineTo(x, y + wave);
      }
      ctx.stroke();
    }

    // bubbles
    for (const b of bubbles) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.y < -10) b.y = window.innerHeight + 10;
      if (b.x < -10) b.x = window.innerWidth + 10;
      if (b.x > window.innerWidth + 10) b.x = -10;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${b.a})`;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // twinkles
    for (const t of twinkles) {
      t.p += 0.02;
      const s = t.s + Math.sin(t.p) * 0.35;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${0.24 + Math.sin(t.p * 2) * 0.08})`;
      ctx.arc(t.x, t.y, s, 0, Math.PI * 2);
      ctx.fill();
    }

    // ripples
    for (const r of ripples) {
      r.r += r.dr;
      r.a *= 0.9985;
      if (r.r > Math.max(window.innerWidth, window.innerHeight) * 0.9) {
        r.x = Math.random() * window.innerWidth;
        r.y = window.innerHeight * (0.35 + Math.random() * 0.6);
        r.r = 20;
        r.a = 0.05 + Math.random() * 0.08;
      }
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${r.a})`;
      ctx.lineWidth = 1.3;
      ctx.ellipse(r.x, r.y, r.r, r.r * 0.4, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  draw();

  // Floating emotes
  const floaters = document.getElementById('floaters');
  const emotes = ['🐸', '💚', '✨', '🪷', '🎮', '💌'];
  function spawnFloater() {
    const el = document.createElement('span');
    el.textContent = emotes[(Math.random() * emotes.length) | 0];
    el.style.left = Math.max(0, Math.min(window.innerWidth - 24, Math.random() * window.innerWidth)) + 'px';
    el.style.fontSize = (16 + Math.random() * 18) + 'px';
    el.style.animationDuration = (7 + Math.random() * 5) + 's';
    el.style.opacity = (0.55 + Math.random() * 0.4).toFixed(2);
    el.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
    floaters.appendChild(el);
    setTimeout(() => el.remove(), 13000);
  }
  setInterval(spawnFloater, 900);
  for (let i = 0; i < 10; i++) setTimeout(spawnFloater, 180 * i);

  // Scroll controls
  const scroll = document.getElementById('letterScroll');
  const jump = (y) => scroll.scrollBy({ top: y, behavior: 'smooth' });
  document.getElementById('upBtn').addEventListener('click', () => jump(-160));
  document.getElementById('downBtn').addEventListener('click', () => jump(160));
  document.getElementById('topBtn').addEventListener('click', () => scroll.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('bottomBtn').addEventListener('click', () => scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' }));

  // Music
  const audio = document.getElementById('bgm');
  const musicBtn = document.getElementById('musicBtn');
  const hint = document.getElementById('audioHint');
  const startAudioBtn = document.getElementById('startAudioBtn');
  let userUnlocked = false;

  audio.loop = true;
  audio.preload = 'auto';

  function setMusicLabel(playing) {
    musicBtn.textContent = playing ? '⏸ musik on' : '▶ Putar lagu';
    musicBtn.classList.toggle('is-off', !playing);
    musicBtn.setAttribute('aria-pressed', String(playing));
  }

  async function startAudio() {
    try {
      await audio.play();
      userUnlocked = true;
      hint.classList.add('hidden');
      setMusicLabel(true);
      return true;
    } catch (err) {
      hint.classList.remove('hidden');
      setMusicLabel(false);
      return false;
    }
  }

  function stopAudio() {
    audio.pause();
    setMusicLabel(false);
  }

  // Try once on load, then fall back to a tap prompt.
  window.addEventListener('load', () => {
    setTimeout(() => startAudio(), 350);
  });

  // Any first user gesture should unlock sound.
  const unlockEvents = ['pointerdown', 'touchstart', 'keydown'];
  const unlock = () => {
    if (!userUnlocked && audio.paused) startAudio();
  };
  unlockEvents.forEach((evt) => window.addEventListener(evt, unlock, { passive: true, once: true }));

  startAudioBtn.addEventListener('click', startAudio);
  musicBtn.addEventListener('click', async () => {
    if (audio.paused) {
      await startAudio();
    } else {
      stopAudio();
    }
  });

  audio.addEventListener('ended', () => {
    // loop=true already handles this; keep it as extra safety for certain browsers.
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  // Card hover tilt on pointer devices
  const cards = document.querySelectorAll('.polaroid');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (window.matchMedia('(max-width: 680px)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) scale(1.01)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
})();
