const fs = require('fs');
const dbPath = './database.json';

try {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const oldDB = JSON.parse(rawData);

    // If already migrated, skip.
    if (oldDB.optics) {
        console.log("Database already migrated.");
        process.exit(0);
    }

    // 1. Encapsulate old DB
    const newDB = {
        optics: oldDB,
        battery: {
            "Li-Ion Endurance Packs": [
                { id: "molicel_p42a_6s4p", name: "Molicel P42A 6S4P (16800mAh)", weight: 1700, price: 250, link: "https://www.molicel.com/" },
                { id: "tattu_plus_6s_22k", name: "Tattu Plus 6S 22000mAh", weight: 2600, price: 420, link: "https://www.genstattu.com/" }
            ]
        },
        motor: {
            "Heavy Lift U-Series": [
                { id: "tmotor_u8_lite", name: "T-Motor U8 Lite (85KV)", weight: 240, max_thrust: 3500, price: 180, link: "https://store.tmotor.com/" },
                { id: "kde_direct_7215", name: "KDE Direct 7215XF-135", weight: 365, max_thrust: 5200, price: 215, link: "https://www.kdedirect.com/" }
            ]
        },
        fc: {
            "Enterprise Flight Controllers": [
                { id: "cube_orange_plus", name: "Cube Orange+ (Standard Carrier)", weight: 75, price: 349, mcu: "H7", imu: "Triple Redundant", link: "https://cubepilot.org/" },
                { id: "pixhawk_6x", name: "Holybro Pixhawk 6X", weight: 50, price: 299, mcu: "H7", imu: "Triple Redundant", link: "https://holybro.com/" },
                { id: "mro_control_zero", name: "mRo Control Zero H7", weight: 8, price: 175, mcu: "H7", imu: "Dual IMU", link: "https://mrobubotics.com/" }
            ]
        },
        compute: {
            "Edge AI Neural Processing": [
                { id: "jetson_orin_nx_8gb", name: "NVIDIA Jetson Orin NX (8GB) + Carrier", weight: 95, power_w: 15, tops: 70, price: 450, link: "https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/" },
                { id: "rpi5_hailo", name: "Raspberry Pi 5 + Hailo-8 M.2", weight: 65, power_w: 12, tops: 26, price: 220, link: "https://www.raspberrypi.com/" },
                { id: "coral_dev_board", name: "Google Coral Dev Board", weight: 45, power_w: 10, tops: 4, price: 130, link: "https://coral.ai/" }
            ]
        },
        frame: {},
        datalink: {
            "Encrypted Mesh Radios": [
                { id: "microhard_pn900", name: "Microhard pX2 (900MHz MANET)", weight: 35, range_km: 20, encryption: "AES-256", price: 650, link: "https://www.microhardcorp.com/" },
                { id: "silvus_streamcaster", name: "Silvus StreamCaster 4200", weight: 260, range_km: 50, encryption: "AES-256 Suite B", price: 3500, link: "https://silvustechnologies.com/" }
            ]
        },
        sensor: {},
        pdb: {},
        gimbal: {}
    };

    fs.writeFileSync(dbPath, JSON.stringify(newDB, null, 2));
    console.log("Database successfully migrated to AeroForge Schema with seed data injection.");

} catch (e) {
    console.error("Migration failed:", e);
}
