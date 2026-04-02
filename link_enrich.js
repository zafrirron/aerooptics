const fs = require('fs');

const dbPath = './database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Smart Vendor URL guesser
function getVendorLink(name) {
    const l = name.toLowerCase();
    if (l.includes('dji') || l.includes('zenmuse') || l.includes('mavic') || l.includes('matrice')) {
        return 'https://enterprise.dji.com/';
    }
    if (l.includes('sony') || l.includes('ilce') || l.includes('rx1')) {
        return 'https://electronics.sony.com/imaging/interchangeable-lens-cameras/c/all-interchangeable-lens-cameras';
    }
    if (l.includes('phase one') || l.includes('ixm') || l.includes('p3')) {
        return 'https://geospatial.phaseone.com/drone-payloads/';
    }
    if (l.includes('autel')) {
        return 'https://www.autelrobotics.com/';
    }
    if (l.includes('workswell') || l.includes('wiris')) {
        return 'https://workswell.eu/uav-thermal-cameras/';
    }
    if (l.includes('nextvision')) {
        return 'https://www.nextvision-sys.com/';
    }
    if (l.includes('flir') || l.includes('vue') || l.includes('tau')) {
        return 'https://www.flir.com/browse/camera-cores-amp-components/unmanned-aerial-systems/';
    }
    if (l.includes('siqi') || l.includes('a8')) {
        return 'https://shop.siyi.biz/';
    }
    if (l.includes('trillium')) {
        return 'https://trilliumeng.com/gimbals/';
    }
    if (l.includes('hoodtech') || l.includes('alticam')) {
        return 'https://www.hoodtechvision.com/';
    }
    return 'https://www.google.com/search?q=' + encodeURIComponent(name + ' payload');
}

let modified = 0;

for (const group in db) {
    db[group].forEach(cam => {
        if (!cam.link) {
            cam.link = getVendorLink(cam.name);
            modified++;
        }
    });
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log(`Enriched ${modified} payloads with Vendor Links.`);
