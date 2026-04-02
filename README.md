# AeroOptics Pro Tactical Engine

AeroOptics Pro is a tactical operations engine calculating drone camera optics projections (Field of View, Ground Sample Distance, Johnson's Criteria) relative to altitude. Designed to be lightweight and extremely fast, serving dynamic military and enterprise scenarios.

## Features
- **Offline Capable:** Equipped with a Service Worker logic framework and an embedded fallback database so that the calculation engine runs smoothly even when completely offline.
- **Drone Database:** Over 50 drones covering DJI, Enterprise, Defense, and Skydio embedded natively.
- **Johnson's Criteria:** Real-time military standard recognition matrix.
- **Instant Sharing:** Parameters naturally persist via URL parameters for instant shareability across mission planners.

## Installation & GitHub Pages Setup

This repository is inherently static and uses plain HTML, styled with TailwindCSS, requiring no build tools except standard web hosting.

1. Clone the repository: `git clone https://github.com/zafrirron/aerooptics.git`
2. Open `index.html` in your browser.

To serve on GitHub pages:
- Push all contents to the `main` branch.
- Navigate to your repository **Settings** -> **Pages**.
- Look for the **Build and deployment** section.
- Under **Source**, select **Deploy from a branch**.
- Ensure the branch is set to `main` and folder to `/(root)`.
- Click **Save**.
- Your tactical calculator will soon be available at `https://zafrirron.github.io/aerooptics/`.

## Architecture Details
- `/index.html`: The core tactical engine UI and scripts.
- `/database.json`: Drone specs data definition.
- `/sw.js` and `/manifest.json`: Ensures the application registers correctly as an offline PWA.
- `/icon.png`: Dynamic tactical logo.

## Cache Management & Updates
Because AeroOptics operates as a Progressive Web App (PWA) with strict offline capabilities, updates pushed to GitHub will NOT immediately appear if a user has already cached the application. 

**To forcefully clear the cache and push a new release to your team:**
1. Open the `sw.js` file.
2. At the very top of the file, increase the `CACHE_NAME` version string (e.g., change `'aerooptics-v1'` to `'aerooptics-v2'`).
3. Commit and push your changes to GitHub using the following operations in your terminal:
   ```bash
   git add .
   git commit -m "chore: bump cache version to deploy new release"
   git push origin main
   ```

When the operators' mobile devices quietly ping the network, their browser checks `sw.js`. Seeing that the version string has changed by even a single character forces the browser to silently delete the old cache array and download the new payload. Next time they open the PWA, it will be the newest version.
