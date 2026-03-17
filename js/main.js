/* =============================================
   PORTFOLIO — singhsuryanshu
   main.js
   ============================================= */

const GITHUB_USERNAME = 'singhsuryanshu';
const GITHUB_API      = `https://api.github.com/users/${GITHUB_USERNAME}`;
const REPOS_API       = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12`;

/* ── Custom Cursor ── */
(function initCursor() {
  const dot  = document.getElementById('dot');
  const ring = document.getElementById('ring');
  if (!dot || !ring) return;

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx - 4 + 'px';
    dot.style.top  = my - 4 + 'px';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.45';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });

  /* Expand ring on interactive elements */
  document.querySelectorAll('a, button, .stat, .skill-card, .project-item, .repo-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width   = '48px';
      ring.style.height  = '48px';
      ring.style.opacity = '0.25';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width   = '32px';
      ring.style.height  = '32px';
      ring.style.opacity = '0.45';
    });
  });

  function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx - 16 + 'px';
    ring.style.top  = ry - 16 + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
})();

/* ── Scroll Reveal ── */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  reveals.forEach(r => obs.observe(r));
})();

/* ── Skill Bar Animations ── */
(function initSkillBars() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      grid.querySelectorAll('.skill-card').forEach(card => {
        const bar   = card.querySelector('.skill-bar');
        const level = card.dataset.level || 80;
        if (bar) bar.style.width = level + '%';
      });
      obs.disconnect();
    }
  }, { threshold: 0.2 });

  obs.observe(grid);
})();

/* ── Smooth Scroll for data-scroll buttons ── */
document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── Nav Smooth Scroll ── */
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      /* Close mobile menu */
      document.querySelector('.nav-links')?.classList.remove('open');
    }
  });
});

/* ── Mobile Hamburger ── */
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
})();

/* ── Nav Scroll Shadow ── */
(function initNavShadow() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(255,255,255,0.12)'
      : 'rgba(255,255,255,0.07)';
  }, { passive: true });
})();

/* ── GitHub API ── */
(async function initGitHub() {
  const metaEl  = document.getElementById('github-meta');
  const gridEl  = document.getElementById('repos-grid');
  const errorEl = document.getElementById('repos-error');

  /* Language → color map */
  const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python:     '#3572A5',
    Go:         '#00ADD8',
    Rust:       '#dea584',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    Java:       '#b07219',
    C:          '#555555',
    'C++':      '#f34b7d',
    Shell:      '#89e051',
    Ruby:       '#701516',
    PHP:        '#4F5D95',
    Swift:      '#F05138',
    Kotlin:     '#7F52FF',
    Dart:       '#00B4AB',
    Vue:        '#41b883',
  };

  function langColor(lang) {
    return langColors[lang] || '#8b949e';
  }

  function formatNum(n) {
    if (!n) return '0';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
    return String(n);
  }

  /* Fetch user profile */
  let userData = null;
  try {
    const res  = await fetch(GITHUB_API);
    if (res.ok) userData = await res.json();
  } catch (_) {}

  if (userData && metaEl) {
    metaEl.innerHTML = `
      <div class="github-meta-item">
        <strong>${formatNum(userData.public_repos)}</strong>
        <span>Public Repos</span>
      </div>
      <div class="github-meta-item">
        <strong>${formatNum(userData.followers)}</strong>
        <span>Followers</span>
      </div>
      <div class="github-meta-item">
        <strong>${formatNum(userData.following)}</strong>
        <span>Following</span>
      </div>
      ${userData.location ? `
      <div class="github-meta-item">
        <span>📍 ${userData.location}</span>
      </div>` : ''}
    `;
  }

  /* Fetch repos */
  let repos = [];
  try {
    const res = await fetch(REPOS_API);
    if (!res.ok) throw new Error('GitHub API error');
    repos = await res.json();
  } catch (err) {
    console.error('GitHub fetch failed:', err);
    if (gridEl)  gridEl.classList.add('hidden');
    if (errorEl) errorEl.classList.remove('hidden');
    return;
  }

  /* Filter out forks, sort by stars then updated */
  const filtered = repos
    .filter(r => !r.fork)
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 6);

  if (!gridEl) return;

  if (filtered.length === 0) {
    gridEl.innerHTML = '<p style="padding:2rem;color:var(--muted);font-size:0.85rem;">No public repositories found.</p>';
    return;
  }

  gridEl.innerHTML = filtered.map(repo => {
    const color = langColor(repo.language);
    const desc  = repo.description
      ? (repo.description.length > 90 ? repo.description.slice(0, 87) + '…' : repo.description)
      : 'No description provided.';

    return `
      <a class="repo-card" href="${repo.html_url}" target="_blank" rel="noopener">
        <div class="repo-name">${repo.name}</div>
        <div class="repo-desc">${desc}</div>
        <div class="repo-footer">
          ${repo.language ? `
          <div class="repo-lang" style="color:${color};">
            <span style="background:${color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px;"></span>
            ${repo.language}
          </div>` : ''}
          <div class="repo-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            ${formatNum(repo.stargazers_count)}
          </div>
          <div class="repo-stat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
            </svg>
            ${formatNum(repo.forks_count)}
          </div>
        </div>
      </a>
    `;
  }).join('');
})();

/* ── Contact Form (demo handler) ── */
(function initContactForm() {
  const btn    = document.getElementById('send-btn');
  const status = document.getElementById('form-status');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#f04a4a';
        status.classList.remove('hidden');
      }
      return;
    }

    /* Replace this with your actual form handler / EmailJS / Formspree endpoint */
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled    = false;
      if (status) {
        status.textContent = 'Message sent! I\'ll get back to you soon.';
        status.style.color = 'var(--accent2)';
        status.classList.remove('hidden');
      }
      document.getElementById('name').value    = '';
      document.getElementById('email').value   = '';
      document.getElementById('message').value = '';
    }, 1200);
  });
})();
