# singhsuryanshu — Personal Portfolio

A dark, cinematic developer portfolio with live GitHub repo integration and auto-deploy on resume update.

**Live site:** [singhsuryanshu.github.io/portfolio](https://singhsuryanshu.github.io/portfolio)

---

## Updating Your Resume

This site is wired so that **a single push auto-updates everything**.

### Step 1 — Update your resume data
Open `resume.json` and edit whatever changed — new job, new skill, updated bullet points. This file is the single source of truth for all content on the site.

### Step 2 — Replace the PDF
Drop your new PDF into the repo root, keeping the same filename:
```
Suryanshu_Singh_Resume.pdf
```

### Step 3 — Push
```bash
git add resume.json Suryanshu_Singh_Resume.pdf
git commit -m "update: resume Q2 2026"
git push
```

**That's it.** GitHub Actions deploys the site in ~60 seconds automatically.

---

## How it works

```
You push to main
      ↓
GitHub Actions triggers (.github/workflows/deploy.yml)
      ↓
Deploys entire repo to GitHub Pages
      ↓
Browser loads resume.json at runtime → renders all sections dynamically
```

- `resume.json` — all your content (experience, skills, projects, about)
- `Suryanshu_Singh_Resume.pdf` — the downloadable PDF
- `js/main.js` — fetches resume.json on page load and renders everything
- `.github/workflows/deploy.yml` — auto-deploys on every push to main

---

## Project Structure

```
portfolio/
├── index.html                    # Shell HTML
├── resume.json                   # ← Edit this to update the site
├── Suryanshu_Singh_Resume.pdf    # ← Replace this with new PDF
├── css/style.css
├── js/main.js
├── .github/workflows/deploy.yml  # Auto-deploy workflow
└── README.md
```

---

## First-time GitHub Pages setup

1. Go to your repo → **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push any change — the first deploy runs automatically

---

## Local Development

```bash
cd portfolio
python3 -m http.server 8080
# open http://localhost:8080
```

*Must use a local server so resume.json fetches work correctly.*
