# Vanilla App Template

A minimal Vite starter for vanilla JavaScript projects. Use it as a clean base for landing pages, small websites, and
multi-page applications.

## Create a project from this template

1. Open the repository on GitHub and click **Use this template**.

    ![The Use this template button](./assets/template-step-1.png)

2. Enter a name for your new repository and click **Create repository from template**.

    ![Creating a repository from the template](./assets/template-step-2.png)

## Getting started

Make sure that the LTS version of [Node.js](https://nodejs.org/) is installed, then run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually [`http://localhost:5173`](http://localhost:5173). The development server
reloads the page whenever you save a source file.

## Project structure

```text
src/
├── index.html       # Main HTML entry point
├── js/
│   └── main.js      # JavaScript entry point
├── css/
│   ├── styles.css   # Main stylesheet
│   ├── reset.css    # Small browser reset
│   ├── base.css     # Global page styles
│   └── starter.css  # Optional starter screen styles
├── partials/
│   └── starter.html # Optional starter screen markup
└── img/
    └── vite-logo.png # Image assets
```

The starter screen is kept in `partials/starter.html` and `css/starter.css`, so you can remove both files and the
related `<load>` line from `index.html` when you are ready to start building your own page. Add other pages, components,
styles, and resources under `src` as your project grows. Vite automatically includes HTML entry points located directly
in `src` during the production build.

## Available commands

| Command           | Description                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Start the development server.         |
| `npm run build`   | Create a production build in `dist`.  |
| `npm run preview` | Preview the production build locally. |

The [vanilla-app-template.code-workspace](./vanilla-app-template.code-workspace) file includes VS Code tasks for all
three commands. Open it in VS Code and run them through **Terminal > Run Task**.

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow for building and deploying the project to the `gh-pages` branch. The
workflow runs after changes are pushed to `main`.

![Deployment workflow](./assets/how-it-works.png)

Before the first deployment, update the `--base` value in `package.json` with your repository name:

```json
"build": "vite build --base=/<REPOSITORY_NAME>/"
```

In the repository settings, open **Settings > Pages** and select the `gh-pages` branch as the deployment source.

![GitHub Pages settings](./assets/repo-settings.png)

GitHub Actions may require write permissions for the workflow. Open **Settings > Actions > General**, enable read and
write permissions, and save the change.

![GitHub Actions permissions](./assets/gh-actions-perm-1.png)

![GitHub Actions workflow permissions](./assets/gh-actions-perm-2.png)

The deployment status is displayed next to the commit in GitHub. Open **Details** to inspect the workflow log if a
deployment fails.

![Deployment status](./assets/deploy-status.png)
