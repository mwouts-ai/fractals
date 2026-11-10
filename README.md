# Fractals

An interactive, browser-based fractal explorer built with HTML, CSS, and JavaScript in a single file. No installation, dependencies, or build step required.

[Open the explorer](https://mwouts.github.io/fractals/)

## Screenshots

[![Mandelbrot and Julia sets in the Fractals explorer](docs/screenshots/mandelbrot-julia.png)](https://mwouts.github.io/fractals/#c=-0.745%2C0.186&m=-0.5%2C0%2C3.6&j=0%2C0%2C3.6&p=142c70-53cbd1-ffe1ab&t=60&i=512&f=2&family=mandelbrot&degree=3&memory=-0.5&nc=flow&lang=en)

[![A five-root Newton fractal in the Fractals explorer](docs/screenshots/newton.png)](https://mwouts.github.io/fractals/#c=0%2C0&m=0%2C0%2C3.6&j=0%2C0%2C1.2&p=142c70-53cbd1-ffe1ab&t=60&i=512&f=2&family=newton&degree=5&memory=-0.5&nc=flow&lang=en&view=0)

[![Phoenix parameter and dynamical planes in the Fractals explorer](docs/screenshots/phoenix.png)](https://mwouts.github.io/fractals/#c=0.56667%2C0&m=-0.5%2C0%2C3.6&j=0%2C0%2C3.6&p=142c70-53cbd1-ffe1ab&t=60&i=512&f=2&family=phoenix&degree=5&memory=-0.5&nc=flow&lang=en)

## Explore

- Explore Mandelbrot and linked Julia sets, Burning Ship, Multibrot (degrees 2–8), Newton basins, and Phoenix fractals.
- Click the parameter plane to update the linked dynamical view. Drag to pan, scroll or use the +/− buttons to zoom, and use the home button to reset a view.
- Focus a canvas and use the arrow keys to pan, +/− to zoom, or Enter in the parameter plane to select its center.
- Customize palettes, color periods, and iteration limits; browse example scenes or enter full screen.
- Export PNG images at 1920 or 3840 pixels wide, and share either both views or a single view by URL.
- Keep bookmarks and the latest 30 history entries in your browser. Export/import JSON archives to transfer them between browsers.
- Choose an interface language and follow references to Wikipedia, Wikidata, and Ultra Fractal.

## Run locally

From the repository directory:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open <http://localhost:8000>. In a remote development container, forward port 8000 using your editor's Ports panel. Stop the server with Ctrl+C.

Use a current browser with Canvas 2D, Web Workers, ResizeObserver, IntersectionObserver, and structuredClone support. Fractals render on the CPU in background workers. High iteration limits and 3840-pixel exports can take time, especially on mobile devices.

## Data and sharing

Rendering runs locally. Exploration parameters are encoded in the URL fragment; shared links include the view and palette, not your saved notebook. Bookmarks, history, and language preferences use localStorage and are specific to each browser and origin. Localhost and the hosted site therefore have separate notebooks. Export an archive before clearing browser data or moving to another browser.

Clipboard sharing requires HTTPS or localhost. If copying fails, copy the URL from your address bar. External reference links open third-party sites when clicked.

## GitHub Pages

The deployment workflow at `.github/workflows/pages.yml` publishes `index.html` and `LICENSE` to GitHub Pages on pushes to `main`. It can also be run manually from the Actions tab. No build is needed.

Repository setup: in **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. The deployment uses the `github-pages` environment and the standard Pages permissions. Inspect the **Deploy to GitHub Pages** workflow in Actions for deployment status.

Site address: <https://mwouts.github.io/fractals/>.

## Development

The interface, styles, translations, URL encoding, and worker renderer are contained in `index.html`. Serve the file locally, edit it, and reload the browser. Shared states use URL fragments, so no server-side routes are required.

## License

[MIT](LICENSE), copyright 2026 Marc Wouts. Mathematical and formula references are linked in the app's credits.
