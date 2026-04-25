# Recipes

Personal cookbook PWA built with Vue 3 + Vite. Hosted at [j-guenther.github.io/recipes](https://j-guenther.github.io/recipes/).

## Local development

```sh
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Add or edit recipes

All recipes live in `src/data/recipes.json` as a JSON array. Each recipe follows this structure:

```json
{
  "id": 5,
  "name": "Recipe Name",
  "tags": ["tag1", "tag2"],
  "time": "30 min",
  "servings": 4,
  "difficulty": "Easy",
  "description": "One-line description.",
  "ingredients": [
    "200g ingredient",
    "1 tsp spice"
  ],
  "steps": [
    "First step.",
    "Second step."
  ],
  "notes": "Optional tip or note.",
  "source": null
}
```

- `id` must be unique — increment from the last entry
- `difficulty` one of: `Easy`, `Medium`, `Hard`
- `source` either `null` or a URL string
- `notes` either `null` or a string

After editing, redeploy (see below) to publish changes.

## Deploy to GitHub Pages

Build and commit the `docs/` output:

```sh
npm run build
git add docs/
git commit -m "deploy"
git push
```

GitHub Pages serves from the `docs/` folder on the `main` branch. Configure this once in **Settings → Pages → Source: Deploy from branch → `main` / `docs`**.