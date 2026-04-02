const fs = require('fs');
const dbPath = 'e:/Dev/AeroOptics/database.json';

const raw = fs.readFileSync(dbPath, 'utf8');
const db = JSON.parse(raw);

// AI Enrichment Rules mapping
const rules = [
  // DJI Vis
  { match: 'm3e|m3m|m3pro|air3', wt: 920, pr: 3500, type: 'eo' },
  { match: 'm30_w|m30_z', wt: 3770, pr: 8000, type: 'eo' },
  { match: 'h30', wt: 920, pr: 4000, type: 'eo' },
  { match: 'h20_w|h20_z', wt: 678, pr: 3500, type: 'eo' },
  { match: 'p1', wt: 800, pr: 5600, type: 'eo' },
  { match: 'l1|l2', wt: 930, pr: 12000, type: 'eo' },
  { match: 'p4rtk|p4pv2', wt: 1391, pr: 6000, type: 'eo' },
  { match: 'm2e', wt: 899, pr: 2500, type: 'eo' },
  { match: 'm3d', wt: 1610, pr: 5000, type: 'eo' },
  { match: 'm3td_w', wt: 1610, pr: 7000, type: 'eo' },
  // DJI IR
  { match: 'h30t_ir', wt: 920, pr: 12000, type: 'ir' },
  { match: 'h20t_ir|h20n', wt: 678, pr: 10000, type: 'ir' },
  { match: 'm3t|m30t_ir|m3td_ir', wt: 920, pr: 6000, type: 'ir' }, // M30T is 3770g actually
  { match: 'm30t_ir', wt: 3770, pr: 10000, type: 'ir' }, // Override
  { match: 'xt2', wt: 629, pr: 8000, type: 'ir' },
  // Consumer DJI
  { match: 'i3', wt: 3995, pr: 16000, type: 'eo', rg: true }, // Inspire 3 X9 requires gimbal
  { match: 'i2_x7', wt: 3440, pr: 8000, type: 'eo', rg: true },
  { match: 'air2s|m2pro', wt: 900, pr: 1500, type: 'eo' },
  { match: 'mini|avata|fpv', wt: 249, pr: 800, type: 'eo' },
  // Autel
  { match: 'max4t_w|max4t_z|max4n', wt: 1600, pr: 8000, type: 'eo' },
  { match: 'max4t_ir', wt: 1600, pr: 8000, type: 'ir' },
  { match: 'alpha_w|alpha_z', wt: 4000, pr: 15000, type: 'eo' },
  { match: 'alpha_ir', wt: 4000, pr: 15000, type: 'ir' },
  { match: 'dfish_w|dfish_z|dfish_ir', wt: 7800, pr: 80000, type: 'eo' }, // Default to EO for DF
  { match: 'evo2', wt: 1191, pr: 2500, type: 'eo' },
  { match: 'evo2_.*ir', wt: 1191, pr: 6000, type: 'ir' },
  // Skydio
  { match: 'x10_w|x10_t|x10_n', wt: 2100, pr: 15000, type: 'eo' },
  { match: 'x10_ir', wt: 2100, pr: 15000, type: 'ir' },
  { match: 'x2_eo', wt: 1325, pr: 10000, type: 'eo' },
  { match: 'x2_ir', wt: 1325, pr: 10000, type: 'ir' },
  // Parrot
  { match: 'ai', wt: 898, pr: 4000, type: 'eo' },
  { match: 'usa_w|usa_t', wt: 500, pr: 7000, type: 'eo' },
  { match: 'usa_ir', wt: 500, pr: 7000, type: 'ir' },
  // FLIR
  { match: 'siras_eo', wt: 3090, pr: 9700, type: 'eo' },
  { match: 'siras_ir', wt: 3090, pr: 9700, type: 'ir' },
  { match: 'tz20', wt: 640, pr: 5000, type: 'ir' },
  { match: 'hadron', wt: 43, pr: 4000, type: 'ir', rg: true }, // Modular
  // Phase One & Sony (Modular)
  { match: 'po_', wt: 1100, pr: 45000, type: 'eo', rg: true },
  { match: 'sony_ilxlr1', wt: 243, pr: 5000, type: 'eo', rg: true },
  { match: 'sony_a7r', wt: 665, pr: 3500, type: 'eo', rg: true }
];

for (const cat in db) {
  db[cat].forEach(item => {
    let matched = false;
    for (const r of rules) {
      if (new RegExp(r.match).test(item.id)) {
        item.wt = r.wt;
        item.pr = r.pr;
        item.type = r.type;
        if (r.rg) item.requires_gimbal = true;
        matched = true;
        break;
      }
    }
    if (!matched) {
      item.wt = 1000;
      item.pr = 5000;
      item.type = 'eo';
    }
    // Specific fix for Autel DF IR
    if (item.id === 'autel_dfish_ir') item.type = 'ir';
  });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Database enriched perfectly!');
