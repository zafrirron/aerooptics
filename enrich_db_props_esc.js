const fs = require('fs');
const dbPath = './database.json';
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// APPEND PROPS
db.props = {
  "Mejzlik": [
    { "id": "mjz_18x6", "name": "18x6.1 Carbon Fiber", "weight": 44, "pitch": 6.1, "diameter": 18, "link": "https://mejzlik.eu" },
    { "id": "mjz_24x8", "name": "24x8 Carbon Fiber", "weight": 95, "pitch": 8.0, "diameter": 24, "link": "https://mejzlik.eu" }
  ],
  "T-Motor": [
    { "id": "tm_p22x6", "name": "Polymer 22x6.6", "weight": 55, "pitch": 6.6, "diameter": 22, "link": "https://store.tmotor.com" }
  ]
};

// APPEND ESC
db.esc = {
  "APD": [
    { "id": "apd_80f3", "name": "80F3[x] (80A)", "weight": 14, "amps": 80, "voltage_max": 35, "link": "https://powerdrives.net" },
    { "id": "apd_120f3", "name": "120F3[x] (120A)", "weight": 20, "amps": 120, "voltage_max": 50, "link": "https://powerdrives.net" }
  ],
  "Hobbywing": [
    { "id": "hw_xrotor_60a", "name": "XRotor Pro 60A", "weight": 56, "amps": 60, "voltage_max": 25, "link": "https://hobbywing.com" }
  ]
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Appended Props and ESC to DB");
