const fs = require('fs');

const dbPath = './database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.battery = {
    "Li-Ion Endurance Packs": [
        { id: "molicel_p42a_6s4p", name: "Molicel P42A 6S4P (16800mAh)", capacity: 16800, cells: 6, c_rate: 45, weight: 1750, price: 250, type: "li-ion", link: "https://www.molicel.com/" },
        { id: "samsung_40T_6s6p", name: "Samsung 40T 6S6P (24000mAh)", capacity: 24000, cells: 6, c_rate: 35, weight: 2600, price: 320, type: "li-ion", link: "https://www.samsung.com/semiconductor/" },
        { id: "sony_vtc6_4s4p", name: "Sony VTC6 4S4P (12000mAh)", capacity: 12000, cells: 4, c_rate: 30, weight: 800, price: 150, type: "li-ion", link: "https://electronics.sony.com/" }
    ],
    "High Discharge Li-Po": [
        { id: "tattu_plus_6s_16k", name: "Tattu Plus 6S 16000mAh 15C", capacity: 16000, cells: 6, c_rate: 15, weight: 2060, price: 300, type: "lipo", link: "https://www.genstattu.com/" },
        { id: "tattu_plus_6s_22k", name: "Tattu Plus 6S 22000mAh 25C", capacity: 22000, cells: 6, c_rate: 25, weight: 2650, price: 420, type: "lipo", link: "https://www.genstattu.com/" },
        { id: "maxamps_12s_22k", name: "MaxAmps 12S 22000mAh 120C", capacity: 22000, cells: 12, c_rate: 120, weight: 5150, price: 1100, type: "lipo", link: "https://www.maxamps.com/" },
        { id: "grepow_tattu_14s_22k", name: "Grepow Tattu 14S 22000mAh", capacity: 22000, cells: 14, c_rate: 25, weight: 8500, price: 850, type: "lipo", link: "https://www.grepow.com/" }
    ],
    "Solid-State Heavy Lift": [
        { id: "grepow_ss_6s_22k", name: "Grepow SemiSolid 6S 22000mAh", capacity: 22000, cells: 6, c_rate: 10, weight: 2150, price: 550, type: "solid-state", link: "https://www.grepow.com/" },
        { id: "grepow_ss_12s_30k", name: "Grepow SemiSolid 12S 30000mAh", capacity: 30000, cells: 12, c_rate: 5, weight: 5800, price: 1250, type: "solid-state", link: "https://www.grepow.com/" }
    ]
};

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log("Injected robust, schema-compliant battery data sweep.");
