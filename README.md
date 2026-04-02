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
