const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    const batteryUI = `
            <div id="vertical-battery" class="hidden w-full pb-10">
                <header class="w-full relative z-20 pt-6 pb-4 md:pt-10 md:pb-6 text-center">
                    <h1 class="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tighter mb-2 sm:mb-3">Energy Storage<span class="text-white">//</span></h1>
                    <p class="text-xs sm:text-sm text-slate-400 font-mono max-w-2xl mx-auto px-4 mb-6 sm:mb-8">Tactical Flight Endurance & Coulomb Integration Calculator.</p>
                    <div class="flex p-1 bg-slate-900/80 border border-slate-700/50 rounded-xl w-fit mx-auto relative shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                        <button onclick="switchBatteryTab('operator')" id="bat-tab-operator" class="px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-white bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 border border-emerald-400"><i class="fa-solid fa-car-battery"></i> Operator Calculator</button>
                        <button onclick="switchBatteryTab('procurement')" id="bat-tab-procurement" class="px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white flex items-center gap-2 border border-transparent"><i class="fa-solid fa-bolt"></i> Cell Procurement</button>
                    </div>
                </header>

                <main class="w-full relative z-10 pb-10">
                    <!-- Battery Operator View -->
                    <div id="bat-view-operator" class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 px-4 transition-opacity duration-300">
                        <div class="lg:col-span-4 space-y-6">
                            <div class="glass-panel rounded-2xl p-6 sm:p-8 border-t border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                                <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4"><div class="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400"><i class="fa-solid fa-car-battery"></i></div><h2 class="text-lg font-bold text-white uppercase tracking-wider">Airframe Math</h2></div>
                                <div class="space-y-6">
                                    <div class="relative">
                                        <label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max text-left block">Hardware Database</label>
                                        <select id="bat-preset-select" class="w-full input-base rounded-lg px-3 py-3 text-sm font-medium cursor-pointer bg-slate-900 border-emerald-500/30 text-emerald-100"><option value="">Loading database...</option></select>
                                        <a id="bat-operator-vendor-link" href="#" target="_blank" class="hidden absolute top-0 right-0 text-[10px] items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 transition-colors"><i class="fa-solid fa-arrow-up-right-from-square"></i> Vendor Specs</a>
                                    </div>
                                    <div class="grid grid-cols-2 gap-4">
                                        <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max text-left block">Empty Weight</label><div class="relative"><input type="number" id="bat-empty-wt" value="3.5" step="0.1" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">kg</span></div></div>
                                        <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 w-max text-left block">Hover Efficiency</label><div class="relative"><input type="number" id="bat-efficiency" value="7.0" step="0.1" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">g/W</span></div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-8 flex flex-col justify-between">
                            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full lg:h-[180px]">
                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 relative overflow-hidden group">
                                    <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"><i class="fa-solid fa-clock text-9xl"></i></div>
                                    <h3 class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">Estimated Hover</h3>
                                    <div class="flex items-baseline gap-1 mt-2">
                                        <span id="bat-out-time" class="text-3xl sm:text-4xl font-black tracking-tighter text-emerald-400 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">--</span>
                                        <span class="text-sm font-bold text-slate-400 tracking-wider">min</span>
                                    </div>
                                </div>
                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 relative overflow-hidden group">
                                    <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"><i class="fa-solid fa-weight-hanging text-9xl"></i></div>
                                    <h3 class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">Takeoff Weight (MTOW)</h3>
                                    <div class="flex items-baseline gap-1 mt-2">
                                        <span id="bat-out-wt" class="text-3xl sm:text-4xl font-black tracking-tighter text-white">--</span>
                                        <span class="text-sm font-bold text-slate-400 tracking-wider">kg</span>
                                    </div>
                                </div>
                                <div class="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-lg shadow-black/50 relative overflow-hidden group">
                                    <div class="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"><i class="fa-solid fa-bolt text-9xl"></i></div>
                                    <h3 class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">Safe Max Discharge</h3>
                                    <div class="flex items-baseline gap-1 mt-2">
                                        <span id="bat-out-amps" class="text-3xl sm:text-4xl font-black tracking-tighter text-amber-400 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">--</span>
                                        <span class="text-sm font-bold text-slate-400 tracking-wider">A</span>
                                    </div>
                                </div>
                            </div>
                            <!-- Battery Output Spec Box -->
                            <div class="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden lg:mt-6">
                                <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none"></div>
                                <div class="relative z-10 w-full">
                                    <h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><i class="fa-solid fa-microchip text-emerald-400"></i> Active Physics Array</h3>
                                    <p class="text-sm text-slate-400 mb-4 max-w-lg">Nominal voltage and capacity translate into total Watt-Hours (Wh). Using your defined hover effectiveness alongside gravitational limits determines absolute endurance constraint boundaries.</p>
                                    <div class="flex flex-wrap gap-4 text-xs font-mono">
                                        <div class="bg-slate-950 px-3 py-1.5 rounded border border-slate-800"><span class="text-slate-500">Volts:</span> <span id="bat-out-volts" class="text-white font-bold">-- V</span></div>
                                        <div class="bg-slate-950 px-3 py-1.5 rounded border border-slate-800"><span class="text-slate-500">Watt-Hs:</span> <span id="bat-out-wh" class="text-white font-bold">-- Wh</span></div>
                                        <div class="bg-slate-950 px-3 py-1.5 rounded border border-slate-800"><span class="text-slate-500">Avg Draw:</span> <span id="bat-out-draw" class="text-emerald-400 font-bold">-- A</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Battery Procurement View -->
                    <div id="bat-view-procurement" class="hidden max-w-5xl mx-auto px-4 transition-opacity duration-300">
                        <div class="glass-panel p-6 sm:p-8 rounded-2xl border-t border-emerald-500/30 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <div class="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
                                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30"><i class="fa-solid fa-bolt"></i></div>
                                <h2 class="text-lg font-bold text-white uppercase tracking-wider text-left">Flight Constraints Matrix</h2>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block text-left">Min Hover</label><div class="relative"><input type="number" id="bat-proc-time" value="30" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">min</span></div></div>
                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block text-left">Max Bat Weight</label><div class="relative"><input type="number" id="bat-proc-wt" value="3000" class="w-full input-base rounded-lg pl-3 pr-10 py-2.5 text-sm font-semibold"><span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">g</span></div></div>
                                <div><label class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block text-left">Max Price</label><div class="relative"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span><input type="number" id="bat-proc-pr" value="500" class="w-full input-base rounded-lg pl-7 pr-3 py-2.5 text-sm font-semibold text-amber-400"></div></div>
                                <div class="flex items-end"><button onclick="runBatteryProcurement()" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-lg text-sm font-bold transition shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 border-0"><i class="fa-solid fa-microchip"></i> RUN ENGINE</button></div>
                            </div>
                        </div>
                        
                        <div id="bat-proc-results-container" class="hidden">
                             <h3 class="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2 text-left">Hardware Passing Constants</h3>
                             <div id="bat-proc-results-list" class="space-y-3"></div>
                        </div>
                    </div>
                </main>
            </div>`;

    // Regex replace the old placeholder with the new UI module
    html = html.replace(/<div id="vertical-battery"[\s\S]*?<\/div>\s*<\/div>/, batteryUI);

    const scriptLogic = `
        // --- BATTERY ENGINE LOGIC ---
        let flatBatteries = {};
        const elBatPreset = document.getElementById('bat-preset-select');
        const elBatEmptyWt = document.getElementById('bat-empty-wt');
        const elBatEfficiency = document.getElementById('bat-efficiency');

        function switchBatteryTab(view) {
            const vOp = document.getElementById('bat-view-operator');
            const vPr = document.getElementById('bat-view-procurement');
            const tOp = document.getElementById('bat-tab-operator');
            const tPr = document.getElementById('bat-tab-procurement');
            
            if (view === 'operator') {
                vOp.style.display = 'grid'; vPr.style.display = 'none';
                tOp.className = "px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-white bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 border border-emerald-400";
                tPr.className = "px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white flex items-center gap-2 border border-transparent";
            } else {
                vOp.style.display = 'none'; vPr.style.display = 'block';
                tPr.className = "px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-white bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2 border border-emerald-400";
                tOp.className = "px-5 py-2 sm:px-8 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white flex items-center gap-2 border border-transparent";
            }
        }

        function populateBatteryDropdown() {
            if(!masterDB.battery) return;
            let selectHTML = '';
            for (const [groupName, batteries] of Object.entries(masterDB.battery)) {
                selectHTML += \`<optgroup label="[ \${groupName} ]">\`;
                batteries.forEach(bat => { flatBatteries[bat.id] = bat; selectHTML += \`<option value="\${bat.id}">\${bat.name}</option>\`; });
                selectHTML += \`</optgroup>\`;
            }
            if(elBatPreset) {
                elBatPreset.innerHTML = selectHTML;
                elBatPreset.addEventListener('change', calculateBatteryEngine);
                elBatEmptyWt.addEventListener('input', calculateBatteryEngine);
                elBatEfficiency.addEventListener('input', calculateBatteryEngine);
                setTimeout(calculateBatteryEngine, 100);
            }
        }

        function calculateBatteryEngine() {
            if(!elBatPreset.value || !flatBatteries[elBatPreset.value]) return;
            
            const bat = flatBatteries[elBatPreset.value];
            const linkEl = document.getElementById('bat-operator-vendor-link');
            if(bat.link) { linkEl.href = bat.link; linkEl.classList.remove('hidden'); linkEl.classList.add('flex'); } else { linkEl.classList.add('hidden'); linkEl.classList.remove('flex'); }
            
            const emptyWt = parseFloat(elBatEmptyWt.value) || 3.5;
            const efficiency = parseFloat(elBatEfficiency.value) || 7.0; // g/W
            
            const mtowKg = emptyWt + (bat.weight / 1000);
            const mtowG = mtowKg * 1000;
            const nominalVolts = bat.cells * 3.7;
            const wattHours = (bat.capacity / 1000) * nominalVolts;
            const maxAmps = (bat.capacity / 1000) * bat.c_rate;
            
            // Hover Power Required = Weight / Efficiency (W)
            const hoverWatts = mtowG / efficiency;
            const hoverAmps = hoverWatts / nominalVolts;
            
            // Time = (Wh / W) * 60 min
            const hoverMins = (wattHours / hoverWatts) * 60;
            
            document.getElementById('bat-out-time').innerText = Math.max(0, hoverMins).toFixed(1);
            document.getElementById('bat-out-wt').innerText = mtowKg.toFixed(2);
            document.getElementById('bat-out-amps').innerText = maxAmps.toFixed(0);
            
            document.getElementById('bat-out-volts').innerText = nominalVolts.toFixed(1) + ' V';
            document.getElementById('bat-out-wh').innerText = wattHours.toFixed(1) + ' Wh';
            document.getElementById('bat-out-draw').innerText = hoverAmps.toFixed(1) + ' A';
        }

        function runBatteryProcurement() {
            const reqTime = parseFloat(document.getElementById('bat-proc-time').value) || 30;
            const maxWt = parseFloat(document.getElementById('bat-proc-wt').value) || 3000;
            const maxPr = parseFloat(document.getElementById('bat-proc-pr').value) || 500;
            const emptyWt = parseFloat(document.getElementById('bat-empty-wt').value) || 3.5;
            const efficiency = parseFloat(document.getElementById('bat-efficiency').value) || 7.0;
            
            const resultsContainer = document.getElementById('bat-proc-results-container');
            const resultsList = document.getElementById('bat-proc-results-list');
            resultsContainer.classList.remove('hidden');
            resultsList.innerHTML = '';
            
            let passing = [];
            
            Object.values(flatBatteries).forEach(bat => {
                if(bat.weight > maxWt) return;
                if(bat.price > maxPr) return;
                
                const mtowG = (emptyWt * 1000) + bat.weight;
                const nominalVolts = bat.cells * 3.7;
                const wattHours = (bat.capacity / 1000) * nominalVolts;
                const hoverWatts = mtowG / efficiency;
                const hoverMins = (wattHours / hoverWatts) * 60;
                
                if(hoverMins >= reqTime) {
                    passing.push({
                        name: bat.name,
                        wt: bat.weight,
                        pr: bat.price,
                        time: hoverMins,
                        cap: bat.capacity,
                        cells: bat.cells,
                        volts: nominalVolts,
                        url: bat.link || '#'
                    });
                }
            });
            
            passing.sort((a, b) => b.time - a.time); // sort by best flight time
            
            if(passing.length === 0) {
                resultsList.innerHTML = \`<div class="p-6 text-center bg-slate-900 border border-dashed border-slate-700 rounded-xl text-slate-500"><i class="fa-solid fa-ban text-3xl mb-3 block opacity-50"></i><p class="font-bold text-sm">No batteries satisfy constraints.</p></div>\`;
            } else {
                passing.forEach(opt => {
                    const scoreWidth = Math.min(100, Math.max(10, ((opt.time / reqTime) * 100) / 1.5));
                    
                    const html = \`
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 transition shadow-[0_4px_20px_rgba(0,0,0,0.2)] gap-4 text-left">
                        <div class="flex-1 w-full sm:w-auto pr-4">
                            <div class="flex items-center justify-between w-full mb-1">
                                <p class="text-sm font-bold text-white flex items-center flex-wrap gap-y-1"><i class="fa-solid fa-car-battery text-emerald-400 mr-2"></i>\${opt.name}</p>
                                \${opt.url !== '#' ? \`<a href="\${opt.url}" target="_blank" class="text-slate-400 hover:text-emerald-400 transition"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>\` : ''}
                            </div>
                            <p class="text-[10px] text-slate-500 mb-2 font-mono"><i class="fa-solid fa-microchip mr-1"></i>\${opt.cells}S (\${opt.volts.toFixed(1)}V) | \${opt.cap}mAh</p>
                            <div class="flex items-center gap-3 text-xs">
                                <span class="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">\${opt.time.toFixed(1)} min</span>
                                <span class="text-emerald-400 font-bold border-l border-slate-700 pl-3">\${opt.wt.toLocaleString()}g</span>
                                <span class="text-amber-400 font-bold border-l border-slate-700 pl-3">$\${opt.pr.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="w-full sm:w-32 bg-slate-950 rounded-full h-2 border border-slate-800 overflow-hidden shrink-0 mt-2 sm:mt-0 relative group">
                            <div class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style="width: \${scoreWidth}%"></div>
                        </div>
                    </div>\`;
                    resultsList.innerHTML += html;
                });
            }
        }
        // --- END BATTERY ENGINE ---
    `;

    // Inject logic before bootEnterpriseEngine() call so it's in the script block.
    if (!html.includes('populateBatteryDropdown()')) {
        // Find bootEnterpriseEngine function to inject population inside it
        html = html.replace('buildDropdownMenu();', 'buildDropdownMenu();\n            populateBatteryDropdown();');
        html = html.replace('// --- BATTERY ENGINE LOGIC ---', ''); // ensure dedup
        html = html.replace('bootEnterpriseEngine();', scriptLogic + '\n        bootEnterpriseEngine();');
    }

    fs.writeFileSync('index.html', html);
    console.log("Battery Engine successfully built and integrated into index.html.");

} catch (e) {
    console.error("UI Update failed:", e);
}
