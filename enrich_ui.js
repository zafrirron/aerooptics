const fs = require('fs');
const path = './index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. ADD MISSING SIDEBAR LINKS
const sidebarLinks = `
                <li><a href="#" onclick="switchVertical('optics')" id="nav-optics" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-white bg-slate-800/80 shadow-[0_4px_12px_rgba(0,0,0,0.2)] border border-slate-700 w-full"><div class="w-7 h-7 rounded bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30"><i class="fa-solid fa-camera-retro"></i></div>Payload Optics</a></li>
                <li><a href="#" onclick="switchVertical('battery')" id="nav-battery" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-battery-half"></i></div>Energy Storage</a></li>
                <li><a href="#" onclick="switchVertical('motor')" id="nav-motor" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-fan"></i></div>Propulsion</a></li>
                <li><a href="#" onclick="switchVertical('fc')" id="nav-fc" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-microchip"></i></div>Flight Control</a></li>
                <li><a href="#" onclick="switchVertical('compute')" id="nav-compute" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-network-wired"></i></div>Companion Compute</a></li>
                <li><a href="#" onclick="switchVertical('frame')" id="nav-frame" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-compress"></i></div>Airframes</a></li>
                <li><a href="#" onclick="switchVertical('datalink')" id="nav-datalink" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-broadcast-tower"></i></div>Data Link (C2)</a></li>
                <li><a href="#" onclick="switchVertical('sensor')" id="nav-sensor" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-radar"></i></div>Sensors & GNSS</a></li>
                <li><a href="#" onclick="switchVertical('pdb')" id="nav-pdb" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-bolt"></i></div>Power (PDB/PMU)</a></li>
                <li><a href="#" onclick="switchVertical('gimbal')" id="nav-gimbal" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all text-slate-400 hover:text-white hover:bg-slate-800/50 w-full"><div class="w-7 h-7 rounded bg-slate-800 text-slate-400 flex items-center justify-center border border-slate-700 group-hover:border-slate-600"><i class="fa-solid fa-arrows-to-dot"></i></div>Gimbals</a></li>
`;

// Replace existing sidebar items (from nav-optics to nav-compute)
html = html.replace(/<ul class="space-y-1">[\s\S]*?<\/ul>/, '<ul class="space-y-1">\n' + sidebarLinks + '\n            </ul>');

// 2. INJECT MOTOR UI
const motorUI = `
                <!-- MOTOR VERTICAL -->
                <div id="vertical-motor" class="w-full hidden">
                    <header class="pt-16 pb-10 px-4 text-center max-w-5xl mx-auto relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-300">
                            <i class="fa-solid fa-fan"></i> AeroForge Propulsion Module
                        </div>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white">Thrust & <span class="gradient-text">Mass Mapping</span></h1>
                        <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-6">Evaluate KV ratings, max thrust, and hover tolerances according to absolute payload mass.</p>
                    </header>

                    <main class="w-full relative z-10 pb-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4">
                        <div class="lg:col-span-4 space-y-6">
                            <div class="glass-panel rounded-2xl p-6 sm:p-8">
                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-brand-400"><i class="fa-solid fa-cogs"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Flight Parameters</h2></div>
                                <div class="space-y-6">
                                    <div class="relative">
                                        <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max"><span>Target Airframe Mass (MTOW)</span></label>
                                        <div class="relative"><input type="number" id="motor-mtow" value="5.0" step="0.1" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold" onchange="runMotorEngine()"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">kg</span></div>
                                    </div>
                                    <div class="relative">
                                        <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max"><span>Motor Count (Arms)</span></label>
                                        <div class="relative">
                                            <select id="motor-arms" class="w-full input-base rounded-lg px-3 py-2.5 text-sm font-semibold" onchange="runMotorEngine()">
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
                            <div class="glass-panel rounded-2xl p-6 sm:p-8">
                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400"><i class="fa-solid fa-space-shuttle"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Required Safety Thresholds</h2></div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                                        <div class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hover Base (1.0:1)</div>
                                        <div class="text-3xl font-black text-white" id="motor-hover-base">0<span class="text-sm text-slate-500 font-medium ml-1">g / arm</span></div>
                                    </div>
                                    <div class="bg-brand-500/10 rounded-xl p-5 border border-brand-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)] relative overflow-hidden">
                                        <div class="text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-1">Target Thrust (2.0:1)</div>
                                        <div class="text-3xl font-black text-brand-300" id="motor-thrust-target">0<span class="text-sm text-brand-500/80 font-medium ml-1">g / arm</span></div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="glass-panel rounded-2xl p-6 sm:p-8 flex-1">
                                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-700/50 pb-4">
                                    <div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400"><i class="fa-solid fa-list"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Procurement Matrix</h2></div>
                                </div>
                                <div class="overflow-x-auto custom-scrollbar">
                                    <table class="w-full text-left border-collapse">
                                        <thead>
                                            <tr class="bg-slate-800/80 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                <th class="p-3 rounded-tl-lg">Model</th>
                                                <th class="p-3">Weight (g)</th>
                                                <th class="p-3">KV</th>
                                                <th class="p-3">Max Thrust (g)</th>
                                                <th class="p-3 text-right">Headroom</th>
                                                <th class="p-3 rounded-tr-lg text-center">Spec</th>
                                            </tr>
                                        </thead>
                                        <tbody id="motor-procurement-list" class="divide-y divide-slate-800/50 text-sm font-medium text-slate-300">
                                            <tr><td colspan="6" class="p-6 text-center text-slate-500">Loading motors...</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
`;
html = html.replace(/<div id="vertical-motor".*?<\/div>[\s\S]*?<\/div>\s*<\/div>/, motorUI);


// 3. INJECT GENERIC VERTICAL UIs for FC, Compute, Frame, DataLink, Sensor, PDB, Gimbal
const categoriesList = [
    {id: 'fc', name: 'Flight Control', icon: 'fa-microchip'},
    {id: 'compute', name: 'Companion Compute', icon: 'fa-network-wired'},
    {id: 'frame', name: 'Airframes', icon: 'fa-compress'},
    {id: 'datalink', name: 'Data Link (C2)', icon: 'fa-broadcast-tower'},
    {id: 'sensor', name: 'Sensors & GNSS', icon: 'fa-radar'},
    {id: 'pdb', name: 'Power Module (PMU)', icon: 'fa-bolt'},
    {id: 'gimbal', name: 'Camera Gimbals', icon: 'fa-arrows-to-dot'}
];

let genericsHTML = "";
for (let c of categoriesList) {
    genericsHTML += `
                <!-- ${c.id.toUpperCase()} VERTICAL -->
                <div id="vertical-${c.id}" class="w-full hidden">
                    <header class="pt-16 pb-10 px-4 text-center max-w-5xl mx-auto relative z-10">
                        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-brand-400 text-xs font-bold uppercase tracking-widest mb-4 transition-all duration-300">
                            <i class="fa-solid ${c.icon}"></i> AeroForge ${c.name}
                        </div>
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white">${c.name} <span class="gradient-text">Matrix</span></h1>
                        <p class="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-6">Centralized database registry for tactical and enterprise procurement.</p>
                    </header>
                    <main class="w-full relative z-10 pb-10 max-w-7xl mx-auto px-4">
                        <div class="glass-panel rounded-2xl p-6 sm:p-8 flex-1">
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
html = html.replace(/(<div id="vertical-fc".*?<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<div id="vertical-compute".*?<\/div>[\s\S]*?<\/div>\s*<\/div>)/, genericsHTML);


// 4. JAVASCRIPT INJECTION: Add runMotorEngine and generic builders
const logicInjection = `
        function populateAllOtherDropdowns() {
            runMotorEngine();
            
            const cats = ['fc', 'compute', 'frame', 'datalink', 'sensor', 'pdb', 'gimbal'];
            cats.forEach(c => {
                const list = document.getElementById(c + '-list');
                if(!list || !masterDB[c]) return;
                let html = '';
                for(const [group, items] of Object.entries(masterDB[c])) {
                    html += \`<tr><td colspan="4" class="bg-slate-800/30 text-xs font-bold uppercase text-brand-400 p-2 mt-4 inline-block rounded w-full border-t border-slate-700/50">\${group}</td></tr>\`;
                    items.forEach(itm => {
                        html += \`<tr class="hover:bg-slate-800/20 transition-colors">
                            <td class="p-3 font-semibold text-white">\${itm.name}</td>
                            <td class="p-3 text-slate-400">\${itm.weight || 'N/A'}</td>
                            <td class="p-3 text-slate-400 font-mono text-xs">\${itm.kv ? 'KV'+itm.kv : (itm.amps ? itm.amps+'A' : (itm.mcu ? itm.mcu : (itm.range_km ? itm.range_km+'km' : '—')))}</td>
                            <td class="p-3 text-center"><a href="\${itm.link}" target="_blank" class="text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1 rounded text-xs font-bold transition-all"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                        </tr>\`;
                    });
                }
                list.innerHTML = html;
            });
        }

        function runMotorEngine() {
            if(!masterDB.motor) return;
            const mtow = parseFloat(document.getElementById('motor-mtow').value) || 5.0;
            const arms = parseFloat(document.getElementById('motor-arms').value) || 4;
            
            const hoverBase = (mtow * 1000) / arms;
            const targetThrust = hoverBase * 2.0;
            
            document.getElementById('motor-hover-base').innerHTML = Math.round(hoverBase) + '<span class="text-sm text-slate-500 font-medium ml-1">g / arm</span>';
            document.getElementById('motor-thrust-target').innerHTML = Math.round(targetThrust) + '<span class="text-sm text-brand-500/80 font-medium ml-1">g / arm</span>';
            
            let listHTML = '';
            for(const [group, items] of Object.entries(masterDB.motor)) {
                listHTML += \`<tr><td colspan="6" class="bg-slate-800/30 text-xs font-bold uppercase text-brand-400 p-2 mt-4 inline-block rounded w-full border-t border-slate-700/50">\${group}</td></tr>\`;
                items.forEach(mot => {
                    const pass = mot.max_thrust >= targetThrust;
                    const headroom = mot.max_thrust - hoverBase;
                    const passClass = pass ? 'text-emerald-400' : 'text-red-400 line-through opacity-50';
                    const passIcon = pass ? '<i class="fa-solid fa-check mr-1"></i>' : '<i class="fa-solid fa-xmark mr-1"></i>';
                    
                    listHTML += \`<tr class="hover:bg-slate-800/20 transition-colors \${pass ? '' : 'opacity-60'}">
                        <td class="p-3 font-semibold text-white">\${mot.name}</td>
                        <td class="p-3 text-slate-400">\${mot.weight}g</td>
                        <td class="p-3 text-slate-400">\${mot.kv}</td>
                        <td class="p-3 font-bold \${passClass}">\${passIcon}\${mot.max_thrust}g</td>
                        <td class="p-3 text-right font-mono text-xs text-brand-400">+\${Math.round(headroom)}g</td>
                        <td class="p-3 text-center"><a href="\${mot.link}" target="_blank" class="text-brand-400 hover:text-brand-300 bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1 rounded text-xs font-bold transition-all"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></td>
                    </tr>\`;
                });
            }
            document.getElementById('motor-procurement-list').innerHTML = listHTML;
        }

        // --- CALLED FROM bootEnterpriseEngine ---
`;

// Insert the new logic just before `function bootEnterpriseEngine` or right into it.
// Let's hook into `populateBatteryDropdown();`
html = html.replace(/populateBatteryDropdown\(\);/g, "populateBatteryDropdown(); populateAllOtherDropdowns();");
html = html.replace(/\/\/ --- BATTERY ENGINE LOGIC ---/g, logicInjection + "\n        // --- BATTERY ENGINE LOGIC ---");

fs.writeFileSync(path, html);
console.log('UI Enriched Successfully');
