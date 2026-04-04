const fs = require('fs');
const path = './index.html';
const tplPath = './template.html';

let html = fs.readFileSync(path, 'utf8');
const tpl = fs.readFileSync(tplPath, 'utf8');

const vData = [
    {
        id: "motor", name: "Propulsion", icon: "fa-fan", c_text: "text-amber-400", c_bg: "bg-amber-500", c_b: "border-amber-500",
        i1: "Target Mass (kg)", i1_d: "5.0", i2: "Motor Arms", i2_d: "4",
        o1: "Hover Base", o1_u: "g", o2: "Thrust Reqd", o2_u: "g", o3: "Peak Amp Draw", o3_u: "A"
    },
    {
        id: "fc", name: "Core Avionics (FC)", icon: "fa-microchip", c_text: "text-indigo-400", c_bg: "bg-indigo-500", c_b: "border-indigo-500",
        i1: "Redundancy Req", i1_d: "2", i2: "CAN Nodes", i2_d: "4",
        o1: "MCU Heat", o1_u: "°C", o2: "Serial Bus", o2_u: "kB/s", o3: "Loop Rate", o3_u: "Hz"
    },
    {
        id: "compute", name: "Edge Compute", icon: "fa-brain", c_text: "text-purple-400", c_bg: "bg-purple-500", c_b: "border-purple-500",
        i1: "Camera Count", i1_d: "4", i2: "Model Complexity", i2_d: "7",
        o1: "Req. TOPS", o1_u: "T", o2: "Thermal Load", o2_u: "W", o3: "RAM Usage", o3_u: "GB"
    },
    {
        id: "frame", name: "Airframes", icon: "fa-compress", c_text: "text-sky-400", c_bg: "bg-sky-500", c_b: "border-sky-500",
        i1: "Payload Weight (kg)", i1_d: "2.5", i2: "Flight Time Req (m)", i2_d: "40",
        o1: "Frame Class", o1_u: "mm", o2: "Drag Coeff", o2_u: "Cd", o3: "CG Shift Reqd", o3_u: "cm"
    },
    {
        id: "datalink", name: "Data Link (C2)", icon: "fa-broadcast-tower", c_text: "text-blue-400", c_bg: "bg-blue-500", c_b: "border-blue-500",
        i1: "Target Range (km)", i1_d: "15", i2: "Video Streams", i2_d: "2",
        o1: "Min Bandwidth", o1_u: "Mbps", o2: "Fade Margin", o2_u: "dBm", o3: "Est Latency", o3_u: "ms"
    },
    {
        id: "sensor", name: "Sensors & GNSS", icon: "fa-radar", c_text: "text-emerald-400", c_bg: "bg-emerald-500", c_b: "border-emerald-500",
        i1: "Flight Speed (m/s)", i1_d: "12", i2: "Altitude (m)", i2_d: "80",
        o1: "Cloud Density", o1_u: "pts", o2: "GNSS Fix Est.", o2_u: "s", o3: "Blind Spot", o3_u: "m"
    },
    {
        id: "pdb", name: "Power Module", icon: "fa-bolt", c_text: "text-yellow-400", c_bg: "bg-yellow-500", c_b: "border-yellow-500",
        i1: "Motor Burst (A)", i1_d: "120", i2: "Payload (A)", i2_d: "8",
        o1: "Peak Rating", o1_u: "A", o2: "Heat Dissipation", o2_u: "W", o3: "Voltage Sag", o3_u: "V"
    },
    {
        id: "gimbal", name: "Camera Gimbals", icon: "fa-arrows-to-dot", c_text: "text-slate-300", c_bg: "bg-slate-500", c_b: "border-slate-500",
        i1: "Payload Mass (g)", i1_d: "1200", i2: "Wind Max (kt)", i2_d: "20",
        o1: "Stab Mass", o1_u: "g", o2: "Torque Req", o2_u: "Nm", o3: "Micro-jitter", o3_u: "μrd"
    },
    {
        id: "props", name: "Propellers", icon: "fa-superpowers", c_text: "text-cyan-400", c_bg: "bg-cyan-500", c_b: "border-cyan-500",
        i1: "Motor KV", i1_d: "100", i2: "Air Density", i2_d: "1.2",
        o1: "Tip Mach", o1_u: "M", o2: "Pitch Speed", o2_u: "m/s", o3: "Thrust Coeff", o3_u: "Ct"
    },
    {
        id: "esc", name: "Motor Controllers", icon: "fa-memory", c_text: "text-red-400", c_bg: "bg-red-500", c_b: "border-red-500",
        i1: "Stator Volume", i1_d: "24", i2: "Target RPM", i2_d: "5000",
        o1: "Freewheel Cap", o1_u: "uF", o2: "Heat Soak", o2_u: "°C/m", o3: "Burst Overhd", o3_u: "%"
    }
];

let generatedHTML = "";
let calcJS = "";
let btnHTML = "";

vData.forEach(v => {
    let block = tpl
        .split("{{id}}").join(v.id)
        .split("{{name}}").join(v.name)
        .split("{{icon}}").join(v.icon)
        .split("{{c_text}}").join(v.c_text)
        .split("{{c_bg}}").join(v.c_bg)
        .split("{{c_b}}").join(v.c_b)
        .split("{{c_grad}}").join(v.c_text.replace("text", "from"))
        .split("{{c_border}}").join(v.c_text.replace("text", "border"))
        .split("{{i1}}").join(v.i1).split("{{i1_d}}").join(v.i1_d)
        .split("{{i2}}").join(v.i2).split("{{i2_d}}").join(v.i2_d)
        .split("{{o1}}").join(v.o1).split("{{o1_u}}").join(v.o1_u)
        .split("{{o2}}").join(v.o2).split("{{o2_u}}").join(v.o2_u)
        .split("{{o3}}").join(v.o3).split("{{o3_u}}").join(v.o3_u);
    generatedHTML += block + "\\n\\n";
    
    btnHTML += \`
                <button onclick="switchVertical('\${v.id}')" id="nav-\${v.id}" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid \${v.icon} \${v.c_text} text-lg w-5 text-center"></i> <span class="hidden sm:inline">\${v.name}</span>
                </button>\`;

    calcJS += \`
        function calc_\${v.id}() {
            const v1 = parseFloat(document.getElementById('\${v.id}-in1').value) || 1;
            const v2 = parseFloat(document.getElementById('\${v.id}-in2').value) || 1;
            document.getElementById('\${v.id}-out1').innerHTML = Math.round(v1 * 2.5) + '<span class="text-sm ml-1 text-slate-500">\${v.o1_u}</span>';
            document.getElementById('\${v.id}-out2').innerHTML = Math.round(v2 * 1.8) + '<span class="text-sm ml-1 text-slate-500">\${v.o2_u}</span>';
            document.getElementById('\${v.id}-out3').innerHTML = Math.round(v1 / v2 * 10) + '<span class="text-sm ml-1 text-slate-500">\${v.o3_u}</span>';
        }
    \`;
});

const switchJSFunctions = \`
        function switchTab(vertical, tab) {
            document.getElementById(vertical + '-view-operator').style.display = (tab === 'operator') ? 'grid' : 'none';
            document.getElementById(vertical + '-view-procurement').style.display = (tab === 'procurement') ? 'block' : 'none';
            
            const btnOp = document.getElementById(vertical + '-tab-operator');
            const btnPr = document.getElementById(vertical + '-tab-procurement');
            
            const bgClass = Array.from(btnOp.classList).concat(Array.from(btnPr.classList)).find(c => c.startsWith('bg-') && !c.includes('slate'));
            const borderClass = Array.from(btnOp.classList).concat(Array.from(btnPr.classList)).find(c => c.startsWith('border-') && !c.includes('transparent'));
            
            if(tab === 'operator') {
                btnOp.classList.add('text-white', bgClass, borderClass);
                btnOp.classList.remove('text-slate-400', 'border-transparent');
                btnPr.classList.remove('text-white', bgClass, borderClass);
                btnPr.classList.add('text-slate-400', 'border-transparent');
            } else {
                btnPr.classList.add('text-white', bgClass, borderClass);
                btnPr.classList.remove('text-slate-400', 'border-transparent');
                btnOp.classList.remove('text-white', bgClass, borderClass);
                btnOp.classList.add('text-slate-400', 'border-transparent');
            }
        }
\`;

// 1. UPDATE verticals Array
const stringifiedKeys = "['optics', 'battery', " + vData.map(v => \`'\${v.id}'\`).join(", ") + "]";
html = html.replace(/const verticals = \[.*?\];/g, \`const verticals = \${stringifiedKeys};\`);

// 2. Nav Inject
html = html.replace(/<button.*id="nav-motor"[\s\S]*?<\/nav>/, btnHTML + "\\n            </nav>");

// 3. Inject Viewport HTML
const genericRegex = /<div id="vertical-motor"[\s\S]*?<footer/;
html = html.replace(genericRegex, generatedHTML + "\\n\\n    </div>\\n    <footer");

// 4. Inject JS Scripts
html = html.replace(/function populateAllOtherDropdowns\(\) \{[\s\S]*?\/\/\s*---\s*CALLED FROM bootEnterpriseEngine/g, \`\\n\${calcJS}\\n\${switchJSFunctions}\\n        // --- CALLED FROM bootEnterpriseEngine ---\`);

const callAllCalcs = vData.map(v => \`calc_\${v.id}();\`).join(" ");
html = html.replace(/populateBatteryDropdown\(\);/, \`populateBatteryDropdown(); \${callAllCalcs}\`);

fs.writeFileSync(path, html);
console.log("SUCCESSFULLY OVERHAULED ALL VERTICALS TO DUAL-TAB OPERATOR UX!");
