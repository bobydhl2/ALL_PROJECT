# ALL_project

A simple calculator web app is available in [`calculator-app/`](calculator-app).

## Run locally

Open `calculator-app/index.html` in your browser, or use a static server:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080/calculator-app/>.

## Publish as a public website (GitHub Pages)

This repository includes a workflow at `.github/workflows/deploy-calculator-pages.yml`.

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push changes to `main` that touch `calculator-app/`.
4. The site will be published at:
   `https://<your-github-username>.github.io/ALL_project/`
