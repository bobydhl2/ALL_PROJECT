# Snake Game

Simple Snake game built with plain HTML, CSS, and JavaScript.

## What to open in your web browser

- **Local run:** `http://localhost:8000`
- **Public GitHub Pages URL (Project repo):** `https://<your-username>.github.io/Project/`

## Play locally

```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000`

## Publish to GitHub (Project repository)

This repository includes an automatic GitHub Pages workflow:
`/.github/workflows/deploy-pages.yml`

### 1) Push this code to your GitHub `Project` repository

```bash
git remote add origin https://github.com/<your-username>/Project.git
git branch -M main
git push -u origin main
```

(If `origin` already exists, update it with `git remote set-url origin ...`.)

### 2) Enable GitHub Pages to use Actions

In GitHub for `Project`:

- Go to **Settings → Pages**
- Under **Build and deployment**, set **Source** to **GitHub Actions**

### 3) Open your public game URL

After the workflow finishes, your game will be live at:

`https://<your-username>.github.io/Project/`

## Controls

- Arrow keys or `W A S D`: move snake
- `Space`: restart after game over
