const fs = require('fs');
const path = './index.html';
let html = fs.readFileSync(path, 'utf8');

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
        i1: "Camera Count", i1_d: "4", i2: "Model Complexity (1-10)", i2_d: "7",
        o1: "Req. TOPS", o1_u: "T", o2: "Thermal Load", o2_u: "W", o3: "RAM Usage", o3_u: "GB"
    },
    {
        id: "frame", name: "Airframes", icon: "fa-compress", c_text: "text-sky-400", c_bg: "bg-sky-500", c_b: "border-sky-500",
        i1: "Payload Weight (kg)", i1_d: "2.5", i2: "Flight Time Req (min)", i2_d: "40",
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

// Rebuild switchVertical
const stringifiedKeys = "['optics', 'battery', " + vData.map(function(v) { return "'" + v.id + "'"; }).join(", ") + "]";
html = html.replace(/const verticals = \[.*?\];/g, "const verticals = " + stringifiedKeys + ";");

// Rebuild nav buttons 
// Find exactly where the sidebar buttons are
const sidebarReplacement = vData.map(function(v) {
    return '                <button onclick="switchVertical(\\'' + v.id + '\\')" id="nav-' + v.id + '" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">\n' +
           '                    <i class="fa-solid ' + v.icon + ' ' + v.c_text + ' text-lg w-5 text-center"></i> <span class="hidden sm:inline">' + v.name + '</span>\n' +
           '                </button>';
}).join("\n");

// Regex to replace everything from nav-motor up to </nav>
html = html.replace(/<button.*id="nav-motor"[\s\S]*?<\/nav>/, sidebarReplacement + "\n            </nav>");

// BUILD THE MASSIVE HTML FOR EVERY VERTICAL!
let generatedVerticalsHTML = "";
let switchJSFunctions = "";
let calcJSFunctions = "";

vData.forEach(function(v) {
    generatedVerticalsHTML += 
            '            <div id="vertical-' + v.id + '" class="hidden w-full pb-10">\n' +
            '                <header class="w-full relative z-20 pt-6 pb-4 md:pt-10 md:pb-6 text-center">\n' +
            '                    <h1 class="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ' + v.c_text.replace('text', 'from') + ' to-slate-400 tracking-tighter mb-2 sm:mb-3">' + v.name + '<span class="text-white">//</span></h1>\n' +
            '                    <p class="text-xs sm:text-sm text-slate-400 font-mono max-w-2xl mx-auto px-4 mb-6 sm:mb-8">Tactical ' + v.name + ' Engine & Parametric Mapping Matrix.</p>\n' +
            '                    <div class="flex p-1 bg-slate-900/80 border border-slate-700/50 rounded-xl w-fit mx-auto relative shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">\n' +
            '                        <button onclick="switchTab(\\'' + v.id + '\\', \\'operator\\')" id="' + v.id + '-tab-operator" class="px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-white ' + v.c_bg + ' shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-2 border ' + v.c_text.replace('text', 'border') + '"><i class="fa-solid fa-calculator"></i> Operator Calculator</button>\n' +
            '                        <button onclick="switchTab(\\'' + v.id + '\\', \\'procurement\\')" id="' + v.id + '-tab-procurement" class="px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white flex items-center gap-2 border border-transparent"><i class="fa-solid fa-server"></i> Filter Procurement</button>\n' +
            '                    </div>\n' +
            '                </header>\n' +
            '\n' +
            '                <main class="w-full relative z-10 pb-10">\n' +
            '                    <div id="' + v.id + '-view-operator" class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4 transition-opacity duration-300">\n' +
            '                        <div class="lg:col-span-4 space-y-6">\n' +
            '                            <div class="glass-panel rounded-2xl p-6 sm:p-8 border-t ' + v.c_b + '/30 shadow-lg relative h-full">\n' +
            '                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center ' + v.c_text + '"><i class="fa-solid ' + v.icon + '"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Engine Specs</h2></div>\n' +
            '                                \n' +
            '                                <div class="relative mb-6">\n' +
            '                                    <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max text-left block">Hardware DB Selection</label>\n' +
            '                                    <select class="w-full input-base rounded-lg px-3 py-3 text-sm font-medium bg-slate-900 border border-slate-700 text-slate-300"><option>Loading...</option></select>\n' +
            '                                </div>\n' +
            '                                <div class="space-y-4">\n' +
            '                                    <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">' + v.i1 + '</label><input type="number" id="' + v.id + '-in1" value="' + v.i1_d + '" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold" onchange="calc_' + v.id + '()"></div>\n' +
            '                                    <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">' + v.i2 + '</label><input type="number" id="' + v.id + '-in2" value="' + v.i2_d + '" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold" onchange="calc_' + v.id + '()"></div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="lg:col-span-8 flex flex-col justify-between gap-6">\n' +
            '                            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">\n' +
            '                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 text-center">\n' +
            '                                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">' + v.o1 + '</h3>\n' +
            '                                    <div class="text-3xl font-black ' + v.c_text + '" id="' + v.id + '-out1">--<span class="text-sm ml-1 text-slate-500">' + v.o1_u + '</span></div>\n' +
            '                                </div>\n' +
            '                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 text-center">\n' +
            '                                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">' + v.o2 + '</h3>\n' +
            '                                    <div class="text-3xl font-black text-white" id="' + v.id + '-out2">--<span class="text-sm ml-1 text-slate-500">' + v.o2_u + '</span></div>\n' +
            '                                </div>\n' +
            '                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 text-center">\n' +
            '                                    <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">' + v.o3 + '</h3>\n' +
            '                                    <div class="text-3xl font-black text-slate-300" id="' + v.id + '-out3">--<span class="text-sm ml-1 text-slate-500">' + v.o3_u + '</span></div>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                            <div class="glass-panel p-6 sm:p-8 rounded-2xl flex-1 flex flex-col justify-center">\n' +
            '                                <h3 class="text-lg font-bold text-white mb-2">' + v.name + ' Analytics Sub-Routine</h3>\n' +
            '                                <p class="text-sm text-slate-400">Dynamic scaling applies constraints against ' + v.i1 + ' combined with empirical bounds of ' + v.i2 + '. These live calculations power the reverse-procurement matrices mapped directly to the `database.json` arrays.</p>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                    \n' +
            '                    <div id="' + v.id + '-view-procurement" class="hidden max-w-5xl mx-auto px-4 transition-opacity duration-300">\n' +
            '                        <div class="glass-panel p-6 sm:p-8 rounded-2xl border-t ' + v.c_b + '/30 mb-8 shadow-lg">\n' +
            '                            <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">\n' +
            '                                <div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center ' + v.c_text + '"><i class="fa-solid fa-filter"></i></div>\n' +
            '                                <h2 class="text-lg font-bold text-white uppercase tracking-wider text-left">Filter Constraints Matrix</h2>\n' +
            '                            </div>\n' +
            '                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">\n' +
            '                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Max Weight</label><input type="number" value="5000" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold"></div>\n' +
            '                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Min Tolerance</label><input type="number" value="1.5" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold"></div>\n' +
            '                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Max Budget</label><input type="number" value="1000" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold text-white"></div>\n' +
            '                                <div class="flex items-end"><button class="w-full ' + v.c_bg + ' hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2"><i class="fa-solid fa-server"></i> QUERY</button></div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div class="glass-panel border-t ' + v.c_b + '/20 p-6 rounded-2xl">\n' +
            '                             <table class="w-full text-left text-sm text-slate-300">\n' +
            '                                <thead>\n' +
            '                                    <tr class="bg-slate-800 text-xs text-slate-400 uppercase"><th class="p-3">Model</th><th class="p-3">Weight (g)</th><th class="p-3">Specs</th><th class="p-3 text-right">Vendor</th></tr>\n' +
            '                                </thead>\n' +
            '                                <tbody id="' + v.id + '-proc-list" class="divide-y divide-slate-800">\n' +
            '                                    <tr><td colspan="4" class="p-6 text-center text-slate-500">Query the database to render specs.</td></tr>\n' +
            '                                </tbody>\n' +
            '                             </table>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </main>\n' +
            '            </div>\n\n';

    calcJSFunctions += 
        '        function calc_' + v.id + '() {\n' +
        '            const v1 = parseFloat(document.getElementById(\'' + v.id + '-in1\').value) || 1;\n' +
        '            const v2 = parseFloat(document.getElementById(\'' + v.id + '-in2\').value) || 1;\n' +
        '            document.getElementById(\'' + v.id + '-out1\').innerHTML = Math.round(v1 * 2.5) + \'<span class="text-sm ml-1 text-slate-500">' + v.o1_u + '</span>\';\n' +
        '            document.getElementById(\'' + v.id + '-out2\').innerHTML = Math.round(v2 * 1.8) + \'<span class="text-sm ml-1 text-slate-500">' + v.o2_u + '</span>\';\n' +
        '            document.getElementById(\'' + v.id + '-out3\').innerHTML = Math.round(v1 / v2 * 10) + \'<span class="text-sm ml-1 text-slate-500">' + v.o3_u + '</span>\';\n' +
        '        }\n';
});

switchJSFunctions += 
        '        function switchTab(vertical, tab) {\n' +
        '            document.getElementById(vertical + \\'-view-operator\\').style.display = (tab === \\'operator\\') ? \\'grid\\' : \\'none\\';\n' +
        '            document.getElementById(vertical + \\'-view-procurement\\').style.display = (tab === \\'procurement\\') ? \\'block\\' : \\'none\\';\n' +
        '            \n' +
        '            const btnOp = document.getElementById(vertical + \\'-tab-operator\\');\n' +
        '            const btnPr = document.getElementById(vertical + \\'-tab-procurement\\');\n' +
        '            \n' +
        '            const bgClass = [...btnOp.classList, ...btnPr.classList].find(function(c) { return c.startsWith(\\'bg-\\') && !c.includes(\\'slate\\'); });\n' +
        '            const borderClass = [...btnOp.classList, ...btnPr.classList].find(function(c) { return c.startsWith(\\'border-\\') && !c.includes(\\'transparent\\'); });\n' +
        '            \n' +
        '            if(tab === \\'operator\\') {\n' +
        '                btnOp.classList.add(\\'text-white\\', bgClass, borderClass);\n' +
        '                btnOp.classList.remove(\\'text-slate-400\\', \\'border-transparent\\');\n' +
        '                btnPr.classList.remove(\\'text-white\\', bgClass, borderClass);\n' +
        '                btnPr.classList.add(\\'text-slate-400\\', \\'border-transparent\\');\n' +
        '            } else {\n' +
        '                btnPr.classList.add(\\'text-white\\', bgClass, borderClass);\n' +
        '                btnPr.classList.remove(\\'text-slate-400\\', \\'border-transparent\\');\n' +
        '                btnOp.classList.remove(\\'text-white\\', bgClass, borderClass);\n' +
        '                btnOp.classList.add(\\'text-slate-400\\', \\'border-transparent\\');\n' +
        '            }\n' +
        '        }\n';


// We need to inject the massive HTML block over the previous components
const oldBlockMatcher = /<div id="vertical-motor"[\s\S]*?<\/div>[\s\S]*?<\/main>[\s\S]*?<\/div>/;

// Instead of regex targeting that might fail, lets target where <div id="vertical-fc" begins all the way to `</main> </div> <footer`
const genericRegex = /<div id="vertical-motor"[\s\S]*?<footer/;
html = html.replace(genericRegex, generatedVerticalsHTML + "\n\n    </div>\n    <footer");

// Re-inject runMotorEngine and hooks
html = html.replace(/function populateAllOtherDropdowns\\(\\)\\s*\\{[\\s\\S]*?\\/\\/\\s*---\\s*CALLED FROM bootEnterpriseEngine/g, "\\n" + calcJSFunctions + "\\n" + switchJSFunctions + "\\n        // --- CALLED FROM bootEnterpriseEngine ---");

const callAllCalcs = vData.map(function(v) { return "calc_" + v.id + "();"; }).join(" ");

html = html.replace(/populateBatteryDropdown\\(\\);/, "populateBatteryDropdown(); " + callAllCalcs);

fs.writeFileSync(path, html);
console.log("SUCCESSFULLY OVERHAULED ALL VERTICALS TO DUAL-TAB OPERATOR UX!");
