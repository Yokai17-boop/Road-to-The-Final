# Road to the Final — World Cup 2026 Prototype

A static fan experience prototype for the 2026 World Cup. Select a national team to explore a simulated tournament journey, tactical identity, matchup narratives, and host-city storytelling.

## Features

- Interactive team selector with dozens of World Cup contenders
- Tactical DNA panel with style profile, radar metrics, and identity cards
- Simulated tournament route and knockout narrative summaries
- Matchup clash cards with stylistic tension storytelling
- Host-city experience cards for touristic event atmosphere
- Responsive dark editorial UI with globe visualization accents

## How it works

- `index.html` renders the UI and loads styling from `style.css`
- `data.js` provides the team roster and metadata for every selectable nation
- `script.js` drives the interactive selection, fallback narrative generation, radar chart, globe styling, and panel updates
- The page uses CDN-hosted dependencies: `Chart.js`, `D3`, `TopoJSON`, and `Fontshare`

## Run locally

### Quick start

1. Open `Road to Final/index.html` directly in your browser.

### Static server (recommended)

If your browser blocks file-based resource loading, serve the folder locally.

From `Road to Final`:

```powershell
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

Or use another local static server such as `npx serve .`.

## Files

- `index.html` — app shell and interactive sections
- `style.css` — visual styling and layout
- `script.js` — UI behavior, team selection, and content rendering
- `data.js` — team metadata, host-city info, and fallback roster
- `data/` — included JSON and data assets used by the prototype
