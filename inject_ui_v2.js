const fs = require('fs');
const path = './index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. UPDATE switchVertical ARRAY to include all 10 verticals
html = html.replace(/const verticals = \['optics', 'battery', 'motor', 'fc', 'compute'\];/, "const verticals = ['optics', 'battery', 'motor', 'fc', 'compute', 'frame', 'datalink', 'sensor', 'pdb', 'gimbal'];");

// 2. INJECT MISSING SIDEBAR BUTTONS
const newButtons = `
                <button onclick="switchVertical('compute')" id="nav-compute" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-brain text-purple-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Edge Neural Compute</span>
                </button>
                <button onclick="switchVertical('frame')" id="nav-frame" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-compress text-brand-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Airframes</span>
                </button>
                <button onclick="switchVertical('datalink')" id="nav-datalink" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-broadcast-tower text-indigo-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Data Link (C2)</span>
                </button>
                <button onclick="switchVertical('sensor')" id="nav-sensor" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-radar text-emerald-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Sensors & GNSS</span>
                </button>
                <button onclick="switchVertical('pdb')" id="nav-pdb" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-bolt text-amber-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Power (PDB/PMU)</span>
                </button>
                <button onclick="switchVertical('gimbal')" id="nav-gimbal" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-arrows-to-dot text-slate-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Camera Gimbals</span>
                </button>`;

html = html.replace(/<button onclick="switchVertical\('compute'\)"[\s\S]*?<\/button>/, newButtons);

// 3. GENERATE FULL HTML FOR ALL 8 VERTICALS
const motorUI = `
                <!-- MOTOR VERTICAL -->
                <div id="vertical-motor" class="w-full hidden pb-10">
                    <header class="pt-16 pb-10 px-4 text-center max-w-5xl mx-auto relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-300">
                            <i class="fa-solid fa-fan"></i> AeroForge Propulsion Module
                        </div>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white">Thrust & <span class="text-amber-400">Mass Mapping</span></h1>
                        <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-6">Evaluate KV ratings, max thrust, and hover tolerances according to absolute payload mass.</p>
                    </header>

                    <main class="w-full relative z-10 pb-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4">
                        <div class="lg:col-span-4 space-y-6">
                            <div class="glass-panel rounded-2xl p-6 sm:p-8 border-t border-amber-500/30">
                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400"><i class="fa-solid fa-cogs"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Flight Parameters</h2></div>
                                <div class="space-y-6">
                                    <div class="relative">
                                        <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max block">Target Airframe Mass (MTOW)</label>
                                        <div class="relative"><input type="number" id="motor-mtow" value="5.0" step="0.1" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold" onchange="runMotorEngine()"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">kg</span></div>
                                    </div>
                                    <div class="relative">
                                        <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max block">Motor Count (Arms)</label>
                                        <div class="relative">
                                            <select id="motor-arms" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 bg-slate-900 border-slate-700" onchange="runMotorEngine()">
                                                <option value="4">Quadcopter (4)</option>
                                                <option value="6">Hexacopter (6)</option>
                                                <option value="8">Octocopter (8)</option>
                                                <option value="12">Dodecacopter (12)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="lg:col-span-8 flex flex-col gap-6">
                            <div class="glass-panel rounded-2xl p-6 sm:p-8 flex-1">
                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400"><i class="fa-solid fa-list"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Procurement Matrix</h2></div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div class="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                                        <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hover Base (1.0:1)</div>
                                        <div class="text-3xl font-black text-white" id="motor-hover-base">0<span class="text-sm text-slate-500 font-medium ml-1">g / arm</span></div>
                                    </div>
                                    <div class="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden">
                                        <div class="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Target Thrust (2.0:1)</div>
                                        <div class="text-3xl font-black text-amber-300" id="motor-thrust-target">0<span class="text-sm text-amber-500/80 font-medium ml-1">g / arm</span></div>
                                    </div>
                                </div>
                                <div class="overflow-x-auto custom-scrollbar">
                                    <table class="w-full text-left border-collapse">
                                        <thead>
                                            <tr class="bg-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                <th class="p-3 rounded-tl-lg">Model</th>
                                                <th class="p-3">Weight</th>
                                                <th class="p-3">KV</th>
                                                <th class="p-3">Max Thrust</th>
                                                <th class="p-3 text-right">Headroom</th>
                                                <th class="p-3 rounded-tr-lg text-center">Spec</th>
                                            </tr>
                                        </thead>
                                        <tbody id="motor-procurement-list" class="divide-y divide-slate-800/50 text-sm font-medium text-slate-300">
                                            <tr><td colspan="6" class="p-6 text-center text-slate-500">Select parameters to load motors...</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
`;

const categoriesList = [
    {id: 'fc', name: 'Flight Control', icon: 'fa-microchip', color: 'text-indigo-400', border: 'border-indigo-500/30'},
    {id: 'compute', name: 'Companion Compute', icon: 'fa-network-wired', color: 'text-purple-400', border: 'border-purple-500/30'},
    {id: 'frame', name: 'Airframes', icon: 'fa-compress', color: 'text-brand-400', border: 'border-brand-500/30'},
    {id: 'datalink', name: 'Data Link (C2)', icon: 'fa-broadcast-tower', color: 'text-blue-400', border: 'border-blue-500/30'},
    {id: 'sensor', name: 'Sensors & GNSS', icon: 'fa-radar', color: 'text-emerald-400', border: 'border-emerald-500/30'},
    {id: 'pdb', name: 'Power Module (PMU)', icon: 'fa-bolt', color: 'text-yellow-400', border: 'border-yellow-500/30'},
    {id: 'gimbal', name: 'Camera Gimbals', icon: 'fa-arrows-to-dot', color: 'text-slate-300', border: 'border-slate-500/30'}
];

let genericsHTML = motorUI;
for (let c of categoriesList) {
    genericsHTML += `
                <!-- ${c.id.toUpperCase()} VERTICAL -->
                <div id="vertical-${c.id}" class="w-full hidden pb-10">
                    <header class="pt-16 pb-10 px-4 text-center max-w-5xl mx-auto relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 ${c.color} text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-300">
                            <i class="fa-solid ${c.icon}"></i> AeroForge ${c.name}
                        </div>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white">${c.name} <span class="gradient-text">Matrix</span></h1>
                        <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-6">Centralized database registry for tactical and enterprise procurement.</p>
                    </header>
                    <main class="w-full relative z-10 pb-10 max-w-7xl mx-auto px-4">
                        <div class="glass-panel border-t ${c.border} rounded-2xl p-6 sm:p-8 flex-1">
                            <div class="overflow-x-auto custom-scrollbar">
                                <table class="w-full text-left border-collapse">
                                    <thead>
                                        <tr class="bg-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider" id="header-${c.id}">
                                            <th class="p-3 rounded-tl-lg">Item</th>
                                            <th class="p-3">Weight (g)</th>
                                            <th class="p-3">Details</th>
                                            <th class="p-3 rounded-tr-lg text-center">Spec</th>
                                        </tr>
                                    </thead>
                                    <tbody id="${c.id}-list" class="divide-y divide-slate-800/50 text-sm font-medium text-slate-300">
                                        <tr><td colspan="4" class="p-6 text-center text-slate-500">Loading ${c.name}...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
`;
}

// Ensure we target exactly the block of placeholders from <div id="vertical-fc" to the end of <div id="vertical-motor"... </div>
const oldBlockMatcher = /<div id="vertical-fc"[\s\S]*?<div id="vertical-compute"[\s\S]*?<div id="vertical-motor"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

if (oldBlockMatcher.test(html)) {
    html = html.replace(oldBlockMatcher, genericsHTML);
    console.log("[OK] Successfully replaced old placeholder cards with true UIs.");
} else {
    console.log("[ERROR] Could not find the old placeholder blocks. Trying fallback injection just before </main>");
    html = html.replace(/<\/main>/, genericsHTML + '\n        </main>');
}

fs.writeFileSync(path, html);
