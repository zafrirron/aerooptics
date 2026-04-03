# AeroForge Version History

### v2.2.0 (The True AeroForge Build)
*   **Total Vertical Expansion:** Deployed 8 new engineering modules: Propulsion, Flight Control, Companion Compute, Airframes, Data Link (C2), Sensors & GNSS, Power (PMU), and Gimbals.
*   **Mathematical Models:** Integrated the Thrust-to-Mass hover requirement module capable of filtering enterprise motors against airframe parameters (Quadcopter/Hexa/Octo) based on a strict 2.0:1 requirement.
*   **Database Expansion:** Tripled `database.json` capacity by injecting enterprise specs for T-Motor, KDE Direct, NVIDIA, CubePilot, Silvus, and Velodyne.

### v2.1.2Changelog

All codebase shifts, optical logic updates, and AI Database Harvests are documented here mapped directly to the `APP_VERSION` cache string.

---

## [v2.1] - 2026-04-[Current Date] - "Energy Storage Vertical"
### Battery Dynamics Sub-System
- **AeroForge Scale:** Implemented the complete interface and JS mechanics for the Phase 1 Energy Storage module natively inside the Dashboard.
- **Flight Operator Math:** The Battery Operator tab calculates absolute Hover Time (minutes), Safe Max Discharge limits (Amps), and active Takeoff Weight (MTOW) using simplified Coulomb integration intersecting with Airframe mass and Motor Efficiency constants (g/W).
- **Reverse Procurement Sweep:** Built a reverse-engineering filter for hardware. Operators input target hover metrics alongside max weight thresholds, outputting dynamically ranked Solid-State/Li-Po/Li-Ion packs capable of surviving the load math.
- **Database Harvest:** Successfully enriched `database.json`'s `battery` root node with a spectrum of high-end enterprise cells (e.g. Molicel P42A, Samsung 40T, Tattu Plus, Grepow SemiSolid).

## [v2.0] - 2026-04-[Current Date] - "AeroForge Evolution"
### Architectural Paradigm Shift
- **AeroForge Dashboard Framework:** The entire PWA has been fundamentally rewritten from a single-function optical calculator into a master **"Universal Drone Architecture Engine."** The UI now boasts a premium absolute-height dashboard featuring a persistent left-hand navigation sidebar allowing engineers to seamlessly jump between multi-domain procurement mechanics.
- **Legacy Preservation Protocol:** The entire original `v1.5` AeroOptics application (incorporating tactical physics and reverse-engineering logic) was completely preserved and encapsulated into a protected runtime container (`#vertical-optics`), guaranteeing 100% mathematical integrity for field operators while the layout transitions.
- **Relational Database Expansion:** Aggressively restructured `database.json` via a root-level encapsulation script. The core engine dynamically parses a newly constructed `optics` key while establishing foundational JSON infrastructure for 9 new operational domains (`battery`, `motor`, `fc`, `compute`, `frame`, `datalink`, `sensor`, `pdb`, `gimbal`). Initial schema seed data (e.g. NVIDIA Jetson Orin NX, T-Motor U8 Lites, Cube Orange+) was injected to confirm multi-domain data propagation.

## [v1.5] - 2026-04-[Current Date]
### Data Hotfix
- **Vendor Link Accuracy:** Re-mapped and hardcoded database payloads that do not explicitly contain their manufacturer nomenclature in their internal database naming structure (e.g. "Phantom", "Inspire", "EVO", "X10"). Resolves an issue where these models incorrectly defaulted to Google Search link fallbacks instead of strictly routing to DJI, Autel, or Skydio respectively.

## [v1.4] - 2026-04-[Current Date]
### Data Enrichment & UI Upgrades
- **Vendor Link Mapping:** Programmatically enriched all AI-swept hardware packages with direct `link` definitions to their official manufacturer pages.
- **Operator Link Button:** Selecting a database preset now dynamically exposes an "Open Vendor Page" action link in the top right of the selector.
- **Engineering Sensor Specs:** The Platform Procurement list now natively exposes raw optical physics hardware numbers (Sensor dimensions mm, Resolution px, Focal Length mm) directly alongside cost and weight estimations, including embedded outbound vendor links.

## [v1.3] - 2026-04-[Current Date]
### Hotfix
- **UI Logic Loop:** Corrected a CSS specificity bug where Tailwind `grid` utilities overrode JS `classList` visibility toggles, and repaired an unclosed structural `<div>` that accidentally orphaned the Procurement panel inside the Operator view.

## [v1.2] - 2026-04-[Current Date]

### Architectural Safety Measure
- **PWA Integrity Enforcement:** Deployed a strict local Git `pre-commit` hook that intercepts any agentic or human commit involving HTML/JS/CSS files, forcefully rejecting the deployment if `version.js` was not simultaneously bumped. Guarantees 100% field cache expiration compliance for all future development.

## [v1.1] - 2026-04-[Current Date]

### UX/UI Single Page Application Refactor
- **Architecture:** Converted the entire interface into a strict tabbed Single Page Application (SPA). The application structurally isolates the tactical `Operator Engine` from the `Engineering Procurement Engine` via header tabs, preventing UI bleeding and cognitive clutter.

## [v1.0] - 2026-04-[Current Date]

### Major System Upgrade: Procurement Engine
- **Data Architecture:** The autonomous AI Sweeper populated the database with real-world `weight` (grams), `price` (USD), and spectral `type` for all 50+ payloads globally.
- **Physics Automation:** Engineered a mechanical integration penalizer. If modular standalone cameras (e.g., Phase One / Sony a7R) are evaluated, the geometry engine automatically applies a strict `+800g` and `+$2,500` payload integration penalty mimicking a standardized Gremsy gimbal requirement.
- **Engine UI:** Deployed the massive "Platform Procurement Engine" targeting drone frame engineers. Engineers can now define target resolutions, spectral constraints, structural mass ceilings, and instantly loop the entire payload industry to procure the exact required hardware.

## [v0.9] - 2026-04-[Current Date]

### Frontend Infrastructure
- **Feature:** Introduced the Tactical Operations Changelog viewer on the tablet frontend Interface.
- **Service Worker:** Bound `CHANGELOG.md` permanently to the resilient offline-cache system ensuring field personnel have live access to patch notes.

## [v0.8] - 2026-04-[Current Date]

### Agentic DB Harvester Updates
- **Added** `Matrice 3D (Dock 2 - Wide)` (17.3mm x 13.0mm, 20MP, fl: 12.24mm)
- **Added** `Matrice 3D / 3TD (Dock 2 - Tele)` (6.4mm x 4.8mm, 12MP, fl: 32.4mm)
- **Added** `Matrice 3TD (Dock 2 - Wide)` (1/1.32-inch, 48MP, fl: 5.73mm)
- **Added** `Matrice 3TD (Dock 2 - IR)` (640x512, fl: 9.1mm)

## [v0.7] - 2026-04-02
- **Documentation:** Updated front-end metadata and core banner to definitively identify the application as a Tactical DRI (Detection, Recognition, Identification) Calculator rather than a generic mission engine.

## [v0.6] - 2026-04-02
- **Feature:** Engineered a new "Reverse Max Altitude" logic processor.
- **UI:** Deployed an inline Dropdown selector mapping Custom Target Sizes dynamically to standard Johnson mathematical criteria limits (Detect [2px], Recognize [8px], Identify [14px]).

## [v0.5] - 2026-04-02
- **Architecture:** Established the Single Source of Truth decoupled cache system via `version.js`. 
- **Bug Fix:** Repaired iOS Safari touch mapping events to ensure mission stability on disconnected mobile tablets.
