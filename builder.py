import os

path = './index.html'
tpl_path = './template.html'

with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

with open(tpl_path, 'r', encoding='utf-8') as f:
    tpl = f.read()

v_data = [
    {
        "id": "motor", "name": "Propulsion", "icon": "fa-fan", "c_text": "text-amber-400", "c_bg": "bg-amber-500", "c_b": "border-amber-500",
        "i1": "Target Mass (kg)", "i1_d": "5.0", "i2": "Motor Arms", "i2_d": "4",
        "o1": "Hover Base", "o1_u": "g", "o2": "Thrust Reqd", "o2_u": "g", "o3": "Peak Amp Draw", "o3_u": "A"
    },
    {
        "id": "fc", "name": "Core Avionics (FC)", "icon": "fa-microchip", "c_text": "text-indigo-400", "c_bg": "bg-indigo-500", "c_b": "border-indigo-500",
        "i1": "Redundancy Req", "i1_d": "2", "i2": "CAN Nodes", "i2_d": "4",
        "o1": "MCU Heat", "o1_u": "C", "o2": "Serial Bus", "o2_u": "kB/s", "o3": "Loop Rate", "o3_u": "Hz"
    },
    {
        "id": "compute", "name": "Edge Compute", "icon": "fa-brain", "c_text": "text-purple-400", "c_bg": "bg-purple-500", "c_b": "border-purple-500",
        "i1": "Camera Count", "i1_d": "4", "i2": "Model Complexity", "i2_d": "7",
        "o1": "Req. TOPS", "o1_u": "T", "o2": "Thermal Load", "o2_u": "W", "o3": "RAM Usage", "o3_u": "GB"
    },
    {
        "id": "frame", "name": "Airframes", "icon": "fa-compress", "c_text": "text-sky-400", "c_bg": "bg-sky-500", "c_b": "border-sky-500",
        "i1": "Payload Weight (kg)", "i1_d": "2.5", "i2": "Flight Time Req (m)", "i2_d": "40",
        "o1": "Frame Class", "o1_u": "mm", "o2": "Drag Coeff", "o2_u": "Cd", "o3": "CG Shift Reqd", "o3_u": "cm"
    },
    {
        "id": "datalink", "name": "Data Link (C2)", "icon": "fa-broadcast-tower", "c_text": "text-blue-400", "c_bg": "bg-blue-500", "c_b": "border-blue-500",
        "i1": "Target Range (km)", "i1_d": "15", "i2": "Video Streams", "i2_d": "2",
        "o1": "Min Bandwidth", "o1_u": "Mbps", "o2": "Fade Margin", "o2_u": "dBm", "o3": "Est Latency", "o3_u": "ms"
    },
    {
        "id": "sensor", "name": "Sensors & GNSS", "icon": "fa-radar", "c_text": "text-emerald-400", "c_bg": "bg-emerald-500", "c_b": "border-emerald-500",
        "i1": "Flight Speed (m/s)", "i1_d": "12", "i2": "Altitude (m)", "i2_d": "80",
        "o1": "Cloud Density", "o1_u": "pts", "o2": "GNSS Fix Est.", "o2_u": "s", "o3": "Blind Spot", "o3_u": "m"
    },
    {
        "id": "pdb", "name": "Power Module", "icon": "fa-bolt", "c_text": "text-yellow-400", "c_bg": "bg-yellow-500", "c_b": "border-yellow-500",
        "i1": "Motor Burst (A)", "i1_d": "120", "i2": "Payload (A)", "i2_d": "8",
        "o1": "Peak Rating", "o1_u": "A", "o2": "Heat Dissipation", "o2_u": "W", "o3": "Voltage Sag", "o3_u": "V"
    },
    {
        "id": "gimbal", "name": "Camera Gimbals", "icon": "fa-arrows-to-dot", "c_text": "text-slate-300", "c_bg": "bg-slate-500", "c_b": "border-slate-500",
        "i1": "Payload Mass (g)", "i1_d": "1200", "i2": "Wind Max (kt)", "i2_d": "20",
        "o1": "Stab Mass", "o1_u": "g", "o2": "Torque Req", "o2_u": "Nm", "o3": "Micro-jitter", "o3_u": "rad"
    },
    {
        "id": "props", "name": "Propellers", "icon": "fa-superpowers", "c_text": "text-cyan-400", "c_bg": "bg-cyan-500", "c_b": "border-cyan-500",
        "i1": "Motor KV", "i1_d": "100", "i2": "Air Density", "i2_d": "1.2",
        "o1": "Tip Mach", "o1_u": "M", "o2": "Pitch Speed", "o2_u": "m/s", "o3": "Thrust Coeff", "o3_u": "Ct"
    },
    {
        "id": "esc", "name": "Motor Controllers", "icon": "fa-memory", "c_text": "text-red-400", "c_bg": "bg-red-500", "c_b": "border-red-500",
        "i1": "Stator Volume", "i1_d": "24", "i2": "Target RPM", "i2_d": "5000",
        "o1": "Freewheel Cap", "o1_u": "uF", "o2": "Heat Soak", "o2_u": "C/m", "o3": "Burst Overhd", "o3_u": "%"
    }
]

generated_html = ""
btn_html = ""
calc_js = ""

for v in v_data:
    block = tpl.replace("{{id}}", v["id"]).replace("{{name}}", v["name"])
    block = block.replace("{{icon}}", v["icon"]).replace("{{c_text}}", v["c_text"])
    block = block.replace("{{c_bg}}", v["c_bg"]).replace("{{c_b}}", v["c_b"])
    block = block.replace("{{c_grad}}", v["c_text"].replace("text", "from"))
    block = block.replace("{{c_border}}", v["c_text"].replace("text", "border"))
    
    block = block.replace("{{i1}}", v["i1"]).replace("{{i1_d}}", v["i1_d"])
    block = block.replace("{{i2}}", v["i2"]).replace("{{i2_d}}", v["i2_d"])
    
    block = block.replace("{{o1}}", v["o1"]).replace("{{o1_u}}", v["o1_u"])
    block = block.replace("{{o2}}", v["o2"]).replace("{{o2_u}}", v["o2_u"])
    block = block.replace("{{o3}}", v["o3"]).replace("{{o3_u}}", v["o3_u"])
    
    generated_html += block + "\n\n"
    
    btn_html += f"""
                <button onclick="switchVertical('{v['id']}')" id="nav-{v['id']}" class="w-full text-left px-3 py-3 sm:px-4 rounded-lg text-sm font-bold transition-all duration-300 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent flex items-center justify-center sm:justify-start gap-3">
                    <i class="fa-solid {v['icon']} {v['c_text']} text-lg w-5 text-center"></i> <span class="hidden sm:inline">{v['name']}</span>
                </button>
"""

    calc_js += f"""
        function calc_{v['id']}() {{
            const v1 = parseFloat(document.getElementById('{v['id']}-in1').value) || 1;
            const v2 = parseFloat(document.getElementById('{v['id']}-in2').value) || 1;
            document.getElementById('{v['id']}-out1').innerHTML = Math.round(v1 * 2.5) + '<span class="text-sm ml-1 text-slate-500">{v['o1_u']}</span>';
            document.getElementById('{v['id']}-out2').innerHTML = Math.round(v2 * 1.8) + '<span class="text-sm ml-1 text-slate-500">{v['o2_u']}</span>';
            document.getElementById('{v['id']}-out3').innerHTML = Math.round(v1 / v2 * 10) + '<span class="text-sm ml-1 text-slate-500">{v['o3_u']}</span>';
        }}
"""

switch_js = """
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
"""

import re

# 1. Update verticals Array
stringified = "['optics', 'battery', " + ", ".join([ f"'{v['id']}'" for v in v_data ]) + "]"
html = re.sub(r'const verticals = \[.*?\];', f'const verticals = {stringified};', html)

# 2. Nav Inject
html = re.sub(r'<button.*id="nav-motor"[\s\S]*?</nav>', btn_html + "\n            </nav>", html)

# 3. Inject Viewport HTML
html = re.sub(r'<div id="vertical-motor"[\s\S]*?<footer', generated_html + "\n\n    </div>\n    <footer", html)

# 4. Inject JS Scripts
html = re.sub(r'function populateAllOtherDropdowns\(\) \{[\s\S]*?//\s*---\s*CALLED FROM bootEnterpriseEngine', "\n" + calc_js + "\n" + switch_js + "\n        // --- CALLED FROM bootEnterpriseEngine ---", html)

call_all = " ".join([ f"calc_{v['id']}();" for v in v_data ])
html = re.sub(r'populateBatteryDropdown\(\);', f'populateBatteryDropdown(); {call_all}', html)

with open(path, 'w', encoding='utf-8') as f:
    f.write(html)

print("SUCCESSFULLY OVERHAULED ALL VERTICALS TO DUAL-TAB OPERATOR UX WITH PYTHON!")
