const fs = require('fs');
const dbPath = './database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

function getVendorLink(name) {
    const l = name.toLowerCase();

    // DJI Models
    if (l.includes('dji') || l.includes('zenmuse') || l.includes('mavic') || l.includes('matrice') || 
        l.includes('phantom') || l.includes('inspire') || l.match(/\bair\s[2-3]/) || 
        l.includes('mini') || l.includes('avata')) {
        return 'https://enterprise.dji.com/';
    }
    
    // Autel Robotics
    if (l.includes('autel') || l.includes('evo') || l.includes('alpha') || l.includes('dragonfish')) {
        return 'https://www.autelrobotics.com/';
    }

    // Skydio
    if (l.includes('x10') || l.includes('x2')) {
        return 'https://www.skydio.com/';
    }

    // Parrot
    if (l.includes('parrot') || l.includes('anafi')) {
        return 'https://www.parrot.com/en/drones/anafi-usa';
    }

    // AgEagle / SenseFly / MicaSense
    if (l.includes('sensefly') || l.includes('s.o.d.a') || l.includes('aeria')) {
        return 'https://ageagle.com/sensefly-drones/';
    }
    if (l.includes('micasense') || l.includes('rededge')) {
        return 'https://ageagle.com/micasense/';
    }

    // Yuneec
    if (l.includes('yuneec') || l.includes('e90') || l.includes('e30')) {
        return 'https://yuneec.com/';
    }

    // BRINC
    if (l.includes('brinc') || l.includes('lemur')) {
        return 'https://brincdrones.com/';
    }

    // Teal
    if (l.includes('teal 2')) {
        return 'https://tealdrones.com/';
    }

    // Existing rules
    if (l.includes('sony') || l.includes('ilce') || l.includes('rx1')) {
        return 'https://electronics.sony.com/';
    }
    if (l.includes('phase one') || l.includes('ixm') || l.includes('p3')) {
        return 'https://geospatial.phaseone.com/';
    }
    if (l.includes('workswell') || l.includes('wiris')) {
        return 'https://workswell.eu/uav-thermal-cameras/';
    }
    if (l.includes('nextvision')) {
        return 'https://www.nextvision-sys.com/';
    }
    if (l.includes('flir') || l.includes('vue') || l.includes('tau')) {
        return 'https://www.flir.com/';
    }
    if (l.includes('siqi') || l.includes('a8')) {
        return 'https://shop.siyi.biz/';
    }
    if (l.includes('trillium')) {
        return 'https://trilliumeng.com/';
    }
    if (l.includes('hoodtech') || l.includes('alticam')) {
        return 'https://www.hoodtechvision.com/';
    }

    // Absolute fallback (just in case)
    return null;
}

let modified = 0;
for (const group in db) {
    db[group].forEach(cam => {
        const link = getVendorLink(cam.name);
        if (link) {
            cam.link = link;
            modified++;
        }
    });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Repaired ${modified} vendor links.`);
