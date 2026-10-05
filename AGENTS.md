# Repository Guidelines

## Project Structure & Module Organization

This workspace contains five independent JavaScript exercises. `exp-1/` is a student admission form; `exp-2/` reads `weather.json` with `fetch`; and `exp-3/` is a portfolio that stores visitor messages in browser `localStorage`. Each has its own `index.html`, `style.css`, and `script.js`. `exp-4/server.js` serves a small product API using Node's built-in `http` module. `exp-5/` is an Express and Mongoose contact API, with `routes/`, `controllers/`, `model/`, and `config/` directories. There is no shared build system or asset directory.

## Build, Test, and Development Commands

- From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000/exp-1/`, `/exp-2/`, or `/exp-3/`. Serving over HTTP lets the weather page fetch its JSON file.
- Run `node exp-4/server.js`, then request `http://localhost:3000/api/products` to check the product API.
- Run `find exp-* -name '*.js' -exec node --check {} \;` to check JavaScript syntax.

There is no `package.json` or build command. `exp-5` is not runnable as checked in: its imports reference `config/dbConnect` and `controllers/contactController`, but the corresponding files currently have different names. Align those paths and define dependencies before adding a run command.

## Coding Style & Naming Conventions

Keep each exercise self-contained. Use four-space indentation, semicolons in JavaScript, `camelCase` for variables and functions, and descriptive HTML IDs and CSS class names. Follow the existing CommonJS `require`/`module.exports` style in the Node examples. No formatter or linter is configured; keep formatting consistent with nearby code and avoid unrelated reformatting.

## Testing Guidelines

No automated tests or coverage target are configured. After changing a browser exercise, load its page and check its main interaction, invalid input, and browser console. For `exp-4`, check both `/api/products` and an unknown path for the expected JSON responses. Add focused automated tests alongside an exercise if its behavior grows.

## Commit & Pull Request Guidelines

This directory has no Git history, so there is no established commit convention. Use short, imperative, exercise-scoped messages such as `exp-2: handle unknown cities`. In pull requests, name the affected exercise, describe behavior changes and manual checks, link any relevant issue, and include screenshots for visible UI changes.

## Security & Configuration

Keep database credentials in `exp-5/.env`; its `.gitignore` excludes that file and `node_modules`. Never include real credentials or visitor data in examples or screenshots.
