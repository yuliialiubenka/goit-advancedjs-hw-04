# Image Search

An image search application built with vanilla JavaScript, Vite, Axios,
iziToast, and SimpleLightbox. It uses the Pixabay API to search for images and
displays the results in a responsive gallery.

## Features

- Search Pixabay images by keyword.
- Load 15 images per request.
- Paginate results with the **Load more** button.
- Hide the button when the end of the result collection is reached.
- Display notifications for empty results, errors, and the end of a collection.
- Open full-size images in a SimpleLightbox modal window.
- Smoothly scroll the page after loading the next group of images.
- Preserve the current search query in the page URL.
- Cancel outdated requests when a new search is submitted.

## Technologies

- HTML5
- CSS3
- JavaScript modules (`import` / `export`)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [iziToast](https://izitoast.marcelodolce.com/)
- [SimpleLightbox](https://simplelightbox.com/)
- [Pixabay API](https://pixabay.com/api/docs/)

## Getting Started

An LTS version of [Node.js](https://nodejs.org/) is required.

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Pixabay API key is stored in
[`src/js/pixabay-api.js`](./src/js/pixabay-api.js) according to the
assignment requirements.

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Build the production version in the `dist` directory. |
| `npm run preview` | Preview the production build locally. |

## Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml             # GitHub Pages deployment workflow
├── src/
│   ├── index.html                 # Application markup
│   ├── main.js                    # Application logic and event handling
│   ├── js/
│   │   ├── pixabay-api.js         # Pixabay HTTP requests
│   │   └── render-functions.js    # Gallery and UI rendering functions
│   └── css/
│       ├── styles.css             # Main CSS entry point
│       ├── reset.css              # Base element resets
│       ├── base.css               # Shared variables and reusable styles
│       └── home.css               # Page-specific styles
├── package.json                   # Scripts and dependencies
├── vite.config.js                 # Vite configuration
└── README.md
```

The application logic is separated into three JavaScript modules:

- [`src/js/pixabay-api.js`](./src/js/pixabay-api.js) exports
  `getImagesByQuery(query, page)`, which sends an Axios request and returns the
  `data` object from the Pixabay response.
- [`src/js/render-functions.js`](./src/js/render-functions.js) creates the
  SimpleLightbox instance and exports
  functions for rendering the gallery, loader, and **Load more** button.
- [`src/main.js`](./src/main.js) coordinates form submission, pagination,
  notifications, end-of-collection checks, and smooth scrolling.

`styles.css` imports the other CSS files so that the page uses a single style
entry point.

## Pagination

Each request asks Pixabay for 15 images using the `per_page` parameter. The
first request uses page `1`; each **Load more** click requests the next page.
Submitting a new search clears the current gallery and resets pagination to
page `1`.

When all matching images have been loaded, the application hides the button and
displays:

> We're sorry, but you've reached the end of search results.

## Deployment

The repository includes a GitHub Actions workflow at
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) that builds
the project and deploys the `dist` directory to the `gh-pages` branch whenever
changes are pushed to `main`.
