# singhsuryanshu — Personal Portfolio

A dark, cinematic developer portfolio with live GitHub repo integration.

**Live site:** [singhsuryanshu.github.io/portfolio](https://singhsuryanshu.github.io/portfolio) *(after deploying)*

---

## Features

- Dark cinematic aesthetic with film-grain overlay & scanline animation
- Custom lag-cursor with interactive expand states
- Scroll-triggered reveal animations
- Animated skill bars
- **Live GitHub repos** fetched at runtime via the GitHub API
- Responsive mobile layout with hamburger nav
- Contact form (ready to wire to Formspree / EmailJS)

---

## Project Structure

```
portfolio/
├── index.html        # Main HTML
├── css/
│   └── style.css     # All styles + CSS variables
├── js/
│   └── main.js       # Cursor, animations, GitHub API, form
└── README.md
```

---

## Customise It

1. **Your details** — update `index.html`:
   - Name, bio, stats in the About section
   - Projects list (name, description, tags)
   - Contact links (LinkedIn, email, resume URL)

2. **Skills** — edit the `.skill-card` blocks and `data-level` percentages in `index.html`

3. **Contact form** — in `js/main.js`, replace the `setTimeout` mock in `initContactForm()` with a real endpoint:
   - [Formspree](https://formspree.io) — easiest, free tier available
   - [EmailJS](https://www.emailjs.com) — no backend required

---

## Deploy to GitHub Pages

```bash
# 1. Create a new repo on GitHub named "portfolio" (or any name)

# 2. Clone and add files
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/singhsuryanshu/portfolio.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to repo → Settings → Pages → Source: Deploy from branch → main / root
```

Your site will be live at `https://singhsuryanshu.github.io/portfolio`

---

## Local Development

No build step needed — just open `index.html` in a browser.

For live-reload during development:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Tech Stack

- Vanilla HTML / CSS / JavaScript — zero dependencies
- Google Fonts: [Syne](https://fonts.google.com/specimen/Syne) + [DM Mono](https://fonts.google.com/specimen/DM+Mono)
- GitHub REST API v3

---

*Built with Claude — [claude.ai](https://claude.ai)*
