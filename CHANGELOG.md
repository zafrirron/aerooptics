# AeroOptics Pro - Operations Changelog

All codebase shifts, optical logic updates, and AI Database Harvests are documented here mapped directly to the `APP_VERSION` cache string.

---

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
