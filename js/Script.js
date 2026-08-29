// stories progress bar
    const sections = document.querySelectorAll('section[id]');
    const bar = document.getElementById('storybar');
    sections.forEach(() => { const seg = document.createElement('div'); seg.className = 'story-seg'; seg.innerHTML = '<i></i>'; bar.appendChild(seg); });
    const segs = bar.querySelectorAll('.story-seg i');

    function updateBar() {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      sections.forEach((s, i) => {
        const top = s.offsetTop, bottom = top + s.offsetHeight;
        let pct = 0;
        if (scrollY > bottom) pct = 100;
        else if (scrollY > top) pct = ((scrollY - top) / s.offsetHeight) * 100;
        segs[i].style.width = pct + '%';
      });
    }
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();

    // floating cta
    const fab = document.getElementById('fab');
    const hero = document.getElementById('s-hero');
    window.addEventListener('scroll', () => {
      fab.classList.toggle('show', window.scrollY > hero.offsetHeight);
    }, { passive: true });

    // counters
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const counters = document.querySelectorAll('.stat-value');
    const cIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target, target = parseInt(el.dataset.count, 10);
          if (reduceMotion) { el.textContent = target.toLocaleString('pt-BR'); }
          else {
            const start = performance.now(), dur = 1100;
            function tick(now) {
              const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
              el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
              if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
          }
          cIO.unobserve(el);
        }
      });
    }, { threshold: .5 });
    counters.forEach(c => cIO.observe(c));

    // note reveal
    const notes = document.querySelectorAll('.note');
    notes.forEach(n => { n.style.opacity = 0; n.style.transition = 'opacity .5s ease, transform .5s ease'; });
    const nIO = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => { e.target.style.opacity = 1; }, i * 100);
          nIO.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    notes.forEach(n => nIO.observe(n));

    // faq chat toggle
    document.querySelectorAll('.msg.q').forEach(q => {
      q.addEventListener('click', () => {
        const a = document.getElementById('a' + q.dataset.a);
        a.classList.toggle('show');
      });
    });