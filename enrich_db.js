const fs = require('fs');

const dbPath = './database.json';
let db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 3. MOTOR
db.motor = {
  "T-Motor Enterprise": [
    { "id": "tm_u8_lite", "name": "U8 Lite KV85", "weight": 240, "kv": 85, "max_thrust": 3500, "link": "https://store.tmotor.com/goods.php?id=325" },
    { "id": "tm_u13", "name": "U13 KV85", "weight": 875, "kv": 85, "max_thrust": 11000, "link": "https://store.tmotor.com" },
    { "id": "tm_mn1005", "name": "Navigator MN1005 KV90", "weight": 204, "kv": 90, "max_thrust": 2800, "link": "https://store.tmotor.com" }
  ],
  "KDE Direct": [
    { "id": "kde_7215", "name": "KDE7215XF-135", "weight": 415, "kv": 135, "max_thrust": 5200, "link": "https://www.kdedirect.com" },
    { "id": "kde_8218", "name": "KDE8218XF-120", "weight": 615, "kv": 120, "max_thrust": 7800, "link": "https://www.kdedirect.com" }
  ]
};

// 4. FC
db.fc = {
  "CubePilot": [
    { "id": "cube_orange_plus", "name": "Cube Orange+", "weight": 34, "mcu": "H7", "redundancy": "Triple IMU", "link": "https://cubepilot.org" },
    { "id": "cube_blue", "name": "Cube Blue (TAA)", "weight": 34, "mcu": "H7", "redundancy": "Triple IMU (US Built)", "link": "https://cubepilot.org" }
  ],
  "Holybro": [
    { "id": "pixhawk_6c", "name": "Pixhawk 6C", "weight": 49, "mcu": "H743", "redundancy": "Dual IMU", "link": "https://holybro.com" },
    { "id": "pixhawk_6x", "name": "Pixhawk 6X Pro", "weight": 52, "mcu": "H753", "redundancy": "Triple IMU", "link": "https://holybro.com" }
  ],
  "CUAV": [
    { "id": "cuav_nora", "name": "Nora+", "weight": 70, "mcu": "H7", "redundancy": "Triple IMU", "link": "https://cuav.net" },
    { "id": "cuav_x7", "name": "X7 Pro", "weight": 85, "mcu": "H7", "redundancy": "Triple IMU", "link": "https://cuav.net" }
  ]
};

// 5. COMPUTE
db.compute = {
  "NVIDIA": [
    { "id": "jetson_orin_nano", "name": "Jetson Orin Nano (8GB)", "weight": 110, "tops": 40, "ram": 8, "link": "https://nvidia.com" },
    { "id": "jetson_orin_nx", "name": "Jetson Orin NX (16GB)", "weight": 120, "tops": 100, "ram": 16, "link": "https://nvidia.com" }
  ],
  "Raspberry Pi": [
    { "id": "rpi_5_8gb", "name": "Raspberry Pi 5 (8GB)", "weight": 46, "tops": 0, "ram": 8, "link": "https://raspberrypi.com" },
    { "id": "cm4_carrier", "name": "CM4 Carrier Board Mini", "weight": 30, "tops": 0, "ram": 4, "link": "https://raspberrypi.com" }
  ]
};

// 6. FRAME
db.frame = {
  "Tarot": [
    { "id": "tarot_t18", "name": "T18 Octocopter (1270mm)", "weight": 2100, "arms": 8, "max_prop": 18, "link": "https://tarot-rc.com" },
    { "id": "tarot_x6", "name": "X6 Hexacopter (960mm)", "weight": 2000, "arms": 6, "max_prop": 18, "link": "https://tarot-rc.com" }
  ],
  "CarbonCore": [
    { "id": "cc_cortex", "name": "Cortex Quadcopter", "weight": 1400, "arms": 4, "max_prop": 24, "link": "https://carboncore.com" }
  ]
};

// 7. DATALINK
db.datalink = {
  "Microhard": [
    { "id": "mh_pddl900", "name": "PDDL900 (900MHz)", "weight": 45, "range_km": 100, "bandwidth_mbps": 25, "link": "https://microhardcorp.com" }
  ],
  "Silvus": [
    { "id": "silvus_sc4200", "name": "StreamCaster 4200", "weight": 150, "range_km": 150, "bandwidth_mbps": 100, "link": "https://silvustechnologies.com" }
  ],
  "Herelink": [
    { "id": "herelink_v1.1", "name": "Herelink V1.1 Air Unit", "weight": 95, "range_km": 20, "bandwidth_mbps": 12, "link": "https://cubepilot.org" }
  ]
};

// 8. SENSOR
db.sensor = {
  "LiDAR": [
    { "id": "velodyne_puck", "name": "Velodyne Puck VLP-16", "weight": 830, "range_m": 100, "accuracy_cm": 3, "link": "https://velodynelidar.com" },
    { "id": "livox_avia", "name": "Livox Avia", "weight": 498, "range_m": 320, "accuracy_cm": 2, "link": "https://livoxtech.com" }
  ],
  "GPS / RTK": [
    { "id": "here4_rtk", "name": "Here4 RTK", "weight": 16, "range_m": 0, "accuracy_cm": 1, "link": "https://cubepilot.org" },
    { "id": "f9p_rtk", "name": "Holybro H-RTK F9P", "weight": 30, "range_m": 0, "accuracy_cm": 1, "link": "https://holybro.com" }
  ]
};

// 9. PDB
db.pdb = {
  "Mauch": [
    { "id": "mauch_pl_200", "name": "PL-200 Sensor + Hub", "weight": 45, "amps": 200, "link": "https://mauch-electronic.com" },
    { "id": "mauch_pl_400", "name": "PL-400 Quad Sensor", "weight": 85, "amps": 400, "link": "https://mauch-electronic.com" }
  ],
  "Holybro": [
    { "id": "pm02_v3", "name": "PM02D Power Module", "weight": 20, "amps": 90, "link": "https://holybro.com" }
  ]
};

// 10. GIMBAL
db.gimbal = {
  "Gremsy": [
    { "id": "gremsy_pio", "name": "Pixy PE", "weight": 420, "payload_g": 600, "link": "https://gremsy.com" },
    { "id": "gremsy_t3", "name": "T3 V3", "weight": 1200, "payload_g": 3300, "link": "https://gremsy.com" }
  ],
  "DJI": [
    { "id": "zenmuse_rs3", "name": "Ronin S3 Pro", "weight": 1500, "payload_g": 4500, "link": "https://dji.com" }
  ]
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Database successfully populated with all verticals!");
