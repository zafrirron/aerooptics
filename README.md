# AeroOptics Pro Tactical Engine

AeroOptics Pro is a tactical operations engine calculating drone camera optics projections (Field of View, Ground Sample Distance, Johnson's Criteria) relative to altitude. Designed to be lightweight and extremely fast, serving dynamic military and enterprise scenarios.

## Features
- **Offline Capable:** Equipped with a Service Worker logic framework and an embedded fallback database so that the calculation engine runs smoothly even when completely offline.
- **Drone Database:** Over 50 drones covering DJI, Enterprise, Defense, and Skydio embedded natively.
- **Johnson's Criteria:** Real-time military standard recognition matrix.
- **Instant Sharing:** Parameters naturally persist via URL parameters for instant shareability across mission planners.

### Global Drone Discovery Sweep (Data Injection)

The architecture is built upon a deterministic local JSON schema (`database.json`) capable of offline execution. However, to keep the hardware registries relevant, the suite supports a powerful natural-language discovery protocol.

You can issue the command **"perform a Global Drone Discovery Sweep"** to the Antigravity Agent. This invokes a highly structured subroutines where the agent will:
1. Search the open web for the latest enterprise and tactical drone hardware across all 10 hardware categories (Optics, Energy, Avionics, Airframes, Sensors, ESCs, Propellers, etc).
2. Quantify manufacturer specifications into normalized SI units to match parametric constraints.
3. Inject the products accurately into `database.json`.
4. Validate UI logic to ensure no cache-desynchronization occurs.

**Usage Constraint:** Always ensure you are on a robust connectivity link before triggering the sweep.

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
1. Open the `version.js` file.
2. Increment the `APP_VERSION` string (e.g., change `'v0.8'` to `'v0.9'`).
3. Commit and push your changes to GitHub using the terminal:
   ```bash
   git add .
   git commit -m "chore: bump version to deploy new release"
   git push origin main
   ```

When the operators' mobile devices quietly ping the network, their browser checks `sw.js` (which functionally imports `version.js`). Seeing that the version string has changed by even a single character forces the browser to silently delete the old cache array and download the new payload. Next time they open the PWA, it will be the newest version.

## Agentic IDE Discovery & Update Protocol
AeroOptics is engineered to be maintained autonomously via IDE AI agents (like Gemini/Antigravity). When you want to add new drone products to the tactical engine without doing manual optical geometry calculations, open the AI agent and execute the following exact command:

> **"AeroOptics, perform a Global Drone Discovery Sweep."**

The Agent will autonomously:
1. Search the open web for newly released enterprise drones missing from the database.
2. Mathematically derive their physical sensor geometries and true focal equivalents.
3. Inject the payload into `database.json`.
4. Append the payload's technical details to `CHANGELOG.md`.
5. Automatically bump `version.js` to push the release to the PWA network.
