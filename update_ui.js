const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Database extraction fix
    html = html.replace(
        'presetGroups = await response.json();',
        'const masterDB = await response.json(); presetGroups = masterDB.optics || {};'
    );
    html = html.replace(
        'presetGroups = cachedDB ? JSON.parse(cachedDB) : fallbackDB;',
        'const masterDB = cachedDB ? JSON.parse(cachedDB) : fallbackDB; presetGroups = masterDB.optics || fallbackDB.optics || {};'
    );

    // 2. Wrap header and main
    html = html.replace(/<header[\s\S]*?<\/main>/, match => {
        return `
    <div class="flex h-screen overflow-hidden bg-[#0a0f18] w-full">
        <!-- Dashboard Sidebar -->
        <aside class="w-16 sm:w-64 bg-slate-950 border-r border-slate-800 flex flex-col z-30 shrink-0 select-none">
            <div class="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-center sm:justify-start">
                 <h1 class="hidden sm:block text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400 tracking-tighter">AEROFORGE<span class="text-white">//</span></h1>
                 <i class="fa-solid fa-plane-up sm:hidden text-brand-400 text-2xl"></i>
            </div>
            <nav class="p-2 sm:p-4 space-y-2 flex-1 overflow-y-auto">
                <button onclick="switchVertical('optics')" id="nav-optics" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-white bg-brand-500/10 border border-brand-500/30 flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-camera text-brand-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Optics & Acoustics</span>
                </button>
                <button onclick="switchVertical('battery')" id="nav-battery" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-battery-full text-emerald-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Energy Storage</span>
                </button>
                <button onclick="switchVertical('motor')" id="nav-motor" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-fan text-amber-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Propulsion System</span>
                </button>
                <button onclick="switchVertical('fc')" id="nav-fc" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-microchip text-indigo-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Core Avionics (FC)</span>
                </button>
                <button onclick="switchVertical('compute')" id="nav-compute" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid fa-brain text-purple-400 text-lg w-5 text-center"></i> <span class="hidden sm:inline">Edge Neural Compute</span>
                </button>
            </nav>
            <div class="p-4 border-t border-slate-800 hidden sm:block text-center">
                 <div class="py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono text-emerald-400"><i class="fa-solid fa-cloud-check"></i> Master DB Sync</div>
            </div>
        </aside>

        <!-- Master Viewport -->
        <main class="flex-1 flex flex-col h-full overflow-y-auto relative bg-[#0a0f18]">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none -z-0"></div>
            
            <div class="relative z-10 w-full flex-1">
                <!-- Optics Vertical (Legacy Wrapping) -->
                <div id="vertical-optics" class="w-full">
                    ${match}
                </div>

                <!-- New Verticals Placeholders -->
                <div id="vertical-battery" class="hidden w-full h-full flex flex-col justify-center items-center p-8">
                     <div class="glass-panel p-10 max-w-2xl text-center rounded-2xl w-full shadow-2xl border-t border-emerald-500/30">
                         <i class="fa-solid fa-battery-full text-emerald-400 text-6xl mb-6 mt-4"></i>
                         <h2 class="text-3xl font-black text-white mb-2 tracking-tight">Energy Storage Engine</h2>
                         <p class="text-slate-400 mb-8 max-w-lg mx-auto">Database connected. Integrating Lithium/Solid-State Coulomb math and discharge curves.</p>
                         <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs text-emerald-400/80">
                             <div class="mb-2 uppercase opacity-50">SEED DATA MOUNTED:</div>
                             > Molicel P42A 6S4P (16800mAh)<br>
                             > Tattu Plus 6S 22000mAh
                         </div>
                     </div>
                </div>

                <div id="vertical-fc" class="hidden w-full h-full flex flex-col justify-center items-center p-8">
                     <div class="glass-panel p-10 max-w-2xl text-center rounded-2xl w-full shadow-2xl border-t border-indigo-500/30">
                         <i class="fa-solid fa-microchip text-indigo-400 text-6xl mb-6 mt-4"></i>
                         <h2 class="text-3xl font-black text-white mb-2 tracking-tight">Core Avionics Engine</h2>
                         <p class="text-slate-400 mb-8 max-w-lg mx-auto">Database connected. Mapping IMU redundancy, CAN architectures, and ArduPilot bindings.</p>
                         <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs text-indigo-400/80">
                             <div class="mb-2 uppercase opacity-50">SEED DATA MOUNTED:</div>
                             > Cube Orange+ (Standard Carrier)<br>
                             > Holybro Pixhawk 6X<br>
                             > mRo Control Zero H7
                         </div>
                     </div>
                </div>

                <div id="vertical-compute" class="hidden w-full h-full flex flex-col justify-center items-center p-8">
                     <div class="glass-panel p-10 max-w-2xl text-center rounded-2xl w-full shadow-2xl border-t border-purple-500/30">
                         <i class="fa-solid fa-brain text-purple-400 text-6xl mb-6 mt-4"></i>
                         <h2 class="text-3xl font-black text-white mb-2 tracking-tight">Edge Neural Compute</h2>
                         <p class="text-slate-400 mb-8 max-w-lg mx-auto">Database connected. Benchmarking Tensor Operations (TOPS), thermal limits, and MIPI bandwidth.</p>
                         <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs text-purple-400/80">
                             <div class="mb-2 uppercase opacity-50">SEED DATA MOUNTED:</div>
                             > NVIDIA Jetson Orin NX (8GB)<br>
                             > Raspberry Pi 5 + Hailo-8 M.2<br>
                             > Google Coral Dev Board
                         </div>
                     </div>
                </div>

                <div id="vertical-motor" class="hidden w-full h-full flex flex-col justify-center items-center p-8">
                     <div class="glass-panel p-10 max-w-2xl text-center rounded-2xl w-full shadow-2xl border-t border-amber-500/30">
                         <i class="fa-solid fa-fan text-amber-400 text-6xl mb-6 mt-4"></i>
                         <h2 class="text-3xl font-black text-white mb-2 tracking-tight">Propulsion Engine</h2>
                         <p class="text-slate-400 mb-8 max-w-lg mx-auto">Database connected. Resolving aerodynamic drag, PWM thresholds, and hover KV limits.</p>
                         <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs text-amber-400/80">
                             <div class="mb-2 uppercase opacity-50">SEED DATA MOUNTED:</div>
                             > T-Motor U8 Lite (85KV)<br>
                             > KDE Direct 7215XF-135
                         </div>
                     </div>
                </div>
            </div>
        </main>
    </div>
        `;
    });

    // 3. Inject javascript for routing
    const scriptToAppend = `
        // AeroForge Vertical Navigation
        function switchVertical(target) {
            const verticals = ['optics', 'battery', 'motor', 'fc', 'compute'];
            verticals.forEach(v => {
                const el = document.getElementById('vertical-' + v);
                if(el){ el.style.display = (v === target) ? 'block' : 'none'; }
                const navBtn = document.getElementById('nav-' + v);
                if(navBtn){
                    if(v === target) {
                        navBtn.classList.add('text-white', 'bg-brand-500/10', 'border-brand-500/30');
                        navBtn.classList.remove('text-slate-400', 'border-transparent', 'hover:text-white', 'hover:bg-slate-900');
                    } else {
                        navBtn.classList.remove('text-white', 'bg-brand-500/10', 'border-brand-500/30');
                        navBtn.classList.add('text-slate-400', 'border-transparent', 'hover:text-white', 'hover:bg-slate-900');
                    }
                }
            });
        }
    `;
    html = html.replace('bootEnterpriseEngine();', scriptToAppend + '\n        bootEnterpriseEngine();');

    // 4. Remove the old absolute blurred background that was hardcoded in body previously
    html = html.replace('<div class="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>', '');
    
    // 5. Ensure body is clean since we wrapped everything
    html = html.replace('<body class="bg-[#0a0f18] text-slate-300 font-sans antialiased overflow-x-hidden min-h-screen">', '<body class="bg-[#0a0f18] text-slate-300 font-sans antialiased h-screen overflow-hidden">');

    fs.writeFileSync('index.html', html);
    console.log("UI Successfully refactored to Dashboard.");
} catch (e) {
    console.error("UI Update failed:", e);
}
