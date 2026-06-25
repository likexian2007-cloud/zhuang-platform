/* ====================== 模块：智慧工地（人机料法环 + AI 数字人） ====================== */
(window.MODULES = window.MODULES || []).push({
  id: "gongdi", label: "智慧工地", icon: "fa-sitemap",
  render(el) {
    el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:6px">
      <h2 class="section-title" style="margin:0"><span class="i"></span>智慧工地平台 · “人机料法环”全要素数字化监控</h2>
      <div class="badge green"><span class="dot green"></span> 实时在线 · <span id="gdClock">--:--:--</span></div>
    </div>
    <p class="muted" style="margin:0 0 16px">依托 BIM + 智慧工地平台与智能安全帽等设备，实现安全管控、人员管理、绿色施工全维度覆盖，从源头规避风险。</p>

    <div class="pill5">
      <div class="p"><b style="color:#9fe9ff" id="kPeople">--</b><span>人 · 在岗人员</span></div>
      <div class="p"><b style="color:#6ee7b7" id="kMachine">--</b><span>机 · 设备在线</span></div>
      <div class="p"><b style="color:#fcd34d" id="kMaterial">--</b><span>料 · 构件库存</span></div>
      <div class="p"><b style="color:#c4b5fd" id="kMethod">--</b><span>法 · 工序合规率</span></div>
      <div class="p"><b style="color:#7dd3fc" id="kEnv">--</b><span>环 · 作业条件</span></div>
    </div>

    <div class="grid g4" style="margin:16px 0">
      <div class="kpi"><div class="lbl"><i class="fa fa-shield"></i> 安全运行天数</div><div class="val">128</div><div class="sub">零重大安全事故</div></div>
      <div class="kpi"><div class="lbl"><i class="fa fa-hdd-o"></i> 智能安全帽佩戴率</div><div class="val">100%</div><div class="sub">人员定位 + 脱帽预警</div></div>
      <div class="kpi"><div class="lbl"><i class="fa fa-recycle"></i> 可回收物回收率</div><div class="val">90%</div><div class="sub">绿色低碳建造</div></div>
      <div class="kpi"><div class="lbl"><i class="fa fa-leaf"></i> 建材损耗降低</div><div class="val">20%</div><div class="sub">契合双碳战略</div></div>
    </div>

    <div class="grid" style="grid-template-columns:1.4fr 1fr">
      <div class="card glow"><div class="section-title" style="font-size:16px"><span class="i" style="background:linear-gradient(180deg,#f87171,#ef4444)"></span><i class="fa fa-bell"></i> 安全 / 质量隐患实时预警</div><div class="feed" id="alertFeed"></div></div>
      <div class="card glow"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-cloud"></i> 环境监测 · 吊装作业条件</div><div id="envBox"></div><div id="hoistVerdict" class="badge green" style="margin-top:12px;width:100%;justify-content:center;padding:10px">符合吊装作业条件</div></div>
    </div>

    <div class="grid" style="grid-template-columns:1fr 1fr;margin-top:16px">
      <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-users"></i> 人员管理 · 实名考勤定位</div><div id="workers"></div></div>
      <div class="grid" style="gap:16px">
        <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-truck"></i> 机械设备管控</div><div id="machines"></div></div>
        <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-cubes"></i> 构件 / 材料库存</div><table><tbody id="materials"></tbody></table></div>
      </div>
    </div>

    <div class="grid g2" style="margin-top:16px">
      <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-line-chart"></i> 现场环境趋势（风速 / 扬尘 / 噪声）</div><canvas id="envChart" height="120"></canvas></div>
      <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-tachometer"></i> 用电 / 能耗实时负荷</div><canvas id="powerChart" height="120"></canvas></div>
    </div>

    <div class="card glow" style="margin-top:16px">
      <div class="section-title" style="font-size:16px"><span class="i"></span><i class="fa fa-android"></i> AI 大模型 · 数字人施工指挥助手</div>
      <p class="muted" style="margin:0 0 12px;font-size:13px">融合 AI 大模型与数字人技术，严格按照装配式建筑技术标准对施工现场管理指挥，如有安全及质量问题立刻预警并纠正。</p>
      <div class="chat" id="chat"></div>
      <div style="display:flex;gap:8px;margin-top:12px"><input id="chatInput" placeholder="向数字人助手提问，如：当前能否吊装？" /><button id="chatSend" class="btn btn-cyan"><i class="fa fa-paper-plane"></i> 发送</button></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button class="btn btn-sm btn-ghost q">现在能否吊装？</button>
        <button class="btn btn-sm btn-ghost q">钢筋外露长度规范是多少？</button>
        <button class="btn btn-sm btn-ghost q">基层凿毛有什么要求？</button>
        <button class="btn btn-sm btn-ghost q">本次施工是否符合规范？</button>
      </div>
    </div>`;

    if (!document.getElementById("gdStyle")) { const s = document.createElement("style"); s.id = "gdStyle"; s.textContent = ".pill5{display:flex;gap:8px;flex-wrap:wrap}.pill5 .p{flex:1;min-width:120px;text-align:center;padding:10px;border-radius:12px;border:1px solid var(--line);background:linear-gradient(160deg,rgba(20,32,60,.8),rgba(10,17,34,.8))}.pill5 .p b{font-size:15px;display:block}.pill5 .p span{font-size:12px;color:var(--text-dim)}.feed{max-height:300px;overflow:auto}.feed .row{display:flex;gap:10px;align-items:flex-start;padding:9px 0;border-bottom:1px solid rgba(148,163,184,.1);font-size:13px}.feed .row .t{color:var(--text-mute);font-size:11px;white-space:nowrap}.env{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(148,163,184,.1)}.env:last-child{border:0}.chat{height:300px;overflow:auto;display:flex;flex-direction:column;gap:10px;padding-right:4px}.msg{max-width:88%;padding:10px 13px;border-radius:12px;font-size:13px;line-height:1.6}.msg.ai{align-self:flex-start;background:rgba(56,189,248,.12);border:1px solid var(--line)}.msg.me{align-self:flex-end;background:linear-gradient(135deg,var(--primary),#3b82f6);color:#fff}.digital-human{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,#22d3ee,#6366f1);display:grid;place-items:center;font-size:22px;flex-shrink:0;box-shadow:0 0 16px rgba(56,189,248,.4)}.worker{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(148,163,184,.1)}.av2{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:700;color:#021;font-size:13px}"; document.head.appendChild(s); }
    this.setup(el);
  },

  setup(root) {
    const { $, pad } = window.Platform;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    setInterval(() => { const d = new Date(); const e = $("gdClock"); if (e) e.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; }, 1000);

    const WORKERS = [{ n: "队长(技术负责人)", r: "统筹/记录", c: "#22d3ee" }, { n: "1号施工员", r: "设备核验/工序", c: "#34d399" }, { n: "2号施工员", r: "前置保障/精度", c: "#fbbf24" }, { n: "起重信号工", r: "吊装指挥", c: "#a78bfa" }, { n: "安全员", r: "现场巡检", c: "#f472b6" }];
    function renderWorkers() { $("workers").innerHTML = WORKERS.map((w) => { const online = Math.random() > 0.08, helmet = Math.random() > 0.04; return `<div class="worker"><div class="av2" style="background:${w.c}">${w.n[0]}</div><div style="flex:1"><div style="font-weight:700">${w.n}</div><div class="mute2" style="font-size:12px">${w.r}</div></div><span class="badge ${helmet ? "green" : "red"}">${helmet ? "已戴帽" : "脱帽!"}</span><span class="badge ${online ? "cyan" : "amber"}">${online ? "在岗" : "离场"}</span></div>`; }).join(""); $("kPeople").textContent = WORKERS.length + " 人"; }

    const MACHINES = [{ n: "汽车吊 25t" }, { n: "水准仪" }, { n: "数显靠尺" }, { n: "激光定位器" }, { n: "环境检测器" }];
    function renderMachines() { let online = 0; $("machines").innerHTML = MACHINES.map((m) => { const st = Math.random() > 0.12 ? (Math.random() > 0.5 ? "运行" : "待机") : "离线"; if (st !== "离线") online++; const cls = st === "运行" ? "green" : st === "待机" ? "cyan" : "red"; return `<div class="env"><span><i class="fa fa-cog" style="color:var(--text-mute)"></i> ${m.n}</span><span class="badge ${cls}"><span class="dot ${cls === "cyan" ? "cyan" : cls}"></span>${st}</span></div>`; }).join(""); $("kMachine").textContent = online + "/" + MACHINES.length; }

    const MATERIALS = [{ n: "预制剪力墙板", u: "块", total: 48 }, { n: "灌浆套筒", u: "个", total: 320 }, { n: "纵向连接钢筋", u: "根", total: 600 }, { n: "斜支撑", u: "套", total: 24 }, { n: "灌浆料", u: "袋", total: 80 }];
    function renderMaterials() { let totalStock = 0; $("materials").innerHTML = MATERIALS.map((m) => { const used = Math.floor(rnd(0.3, 0.8) * m.total), left = m.total - used; totalStock += left; const low = left / m.total < 0.25; return `<tr><td>${m.n}</td><td class="mute2">${left}/${m.total} ${m.u}</td><td style="width:120px"><div class="bar-wrap" style="height:8px"><div class="bar" style="width:${(left / m.total) * 100}%;background:${low ? "linear-gradient(90deg,#f59e0b,#ef4444)" : ""}"></div></div></td><td>${low ? '<span class="badge amber">偏低</span>' : '<span class="badge green">充足</span>'}</td></tr>`; }).join(""); $("kMaterial").textContent = totalStock + " 件"; }

    let env = { wind: 0.2, temp: 20, humid: 55, dust: 30, noise: 62 };
    let lastEnv = { windLevel: 0 };
    function renderEnv() {
      env.wind = Math.max(0, env.wind + rnd(-0.4, 0.5)); env.temp = Math.min(35, Math.max(8, env.temp + rnd(-0.3, 0.3))); env.humid = Math.min(90, Math.max(30, env.humid + rnd(-2, 2))); env.dust = Math.max(10, env.dust + rnd(-6, 7)); env.noise = Math.max(45, env.noise + rnd(-3, 4));
      const windLevel = env.wind < 1.6 ? 0 : env.wind < 3.4 ? 1 : env.wind < 5.5 ? 2 : env.wind < 8 ? 3 : env.wind < 10.8 ? 4 : 6;
      const rows = [{ i: "fa-flag", n: "风速", v: env.wind.toFixed(1) + " m/s", ok: windLevel < 6, extra: `${windLevel} 级` }, { i: "fa-thermometer-half", n: "温度", v: env.temp.toFixed(0) + " ℃", ok: env.temp > 5 && env.temp < 38 }, { i: "fa-tint", n: "湿度", v: env.humid.toFixed(0) + " %", ok: true }, { i: "fa-cloud", n: "PM 扬尘", v: env.dust.toFixed(0) + " μg/m³", ok: env.dust < 75 }, { i: "fa-volume-up", n: "噪声", v: env.noise.toFixed(0) + " dB", ok: env.noise < 75 }];
      $("envBox").innerHTML = rows.map((r) => `<div class="env"><span><i class="fa ${r.i}" style="color:var(--cyan)"></i> ${r.n}</span><span><b style="color:${r.ok ? "#6ee7b7" : "#fca5a5"}">${r.v}</b> ${r.extra ? `<span class="mute2" style="font-size:12px">${r.extra}</span>` : ""}</span></div>`).join("");
      const canHoist = windLevel < 6 && env.temp > 5 && env.temp < 38; const vd = $("hoistVerdict"); vd.className = "badge " + (canHoist ? "green" : "red"); vd.style.cssText = "margin-top:12px;width:100%;justify-content:center;padding:10px"; vd.innerHTML = canHoist ? '<i class="fa fa-check-circle"></i> 符合吊装作业条件（风速<6级）' : '<i class="fa fa-ban"></i> 不符合吊装条件 · 立停报告';
      $("kEnv").textContent = canHoist ? "良好" : "受限"; $("kMethod").textContent = (95 + Math.random() * 4).toFixed(1) + "%"; lastEnv = { windLevel };
    }

    const ALERT_LIB = [{ lv: "amber", t: "3号料区构件库存偏低，请及时补料" }, { lv: "red", t: "B 区检测到人员脱帽，已推送整改" }, { lv: "green", t: "1号剪力墙吊装作业完成，用时 1分59秒" }, { lv: "amber", t: "瞬时风速接近 5 级，吊装请注意" }, { lv: "green", t: "AI 视觉检测：钢筋绑扎合格" }, { lv: "red", t: "高度三点差值 >10mm，已触发超差报警" }, { lv: "green", t: "2号剪力墙就位，激光定位对孔成功" }, { lv: "amber", t: "扬尘浓度上升，已启动喷淋降尘" }, { lv: "green", t: "灌浆套筒通透性检测全部通过" }, { lv: "red", t: "无关人员进入吊装安全距离（≥1.5倍构件高度）" }, { lv: "green", t: "图纸AI核对通过：厚度/外露长度符合设计" }];
    const feedRows = [];
    function pushAlert(a) { const d = new Date(); feedRows.unshift({ ...a, time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` }); if (feedRows.length > 30) feedRows.pop(); $("alertFeed").innerHTML = feedRows.map((r) => `<div class="row"><span class="dot ${r.lv}" style="margin-top:4px"></span><div style="flex:1">${r.t}</div><span class="t">${r.time}</span></div>`).join(""); }
    [...ALERT_LIB].slice(0, 6).forEach(pushAlert);

    Chart.defaults.color = "#94a3b8"; Chart.defaults.borderColor = "rgba(148,163,184,.12)";
    const labels = Array.from({ length: 12 }, (_, i) => i + ":00");
    const envChart = new Chart($("envChart"), { type: "line", data: { labels, datasets: [{ label: "风速 m/s", data: labels.map(() => rnd(0, 4)), borderColor: "#00e5ff", tension: .35, pointRadius: 0 }, { label: "扬尘 μg", data: labels.map(() => rnd(20, 70)), borderColor: "#f59e0b", tension: .35, pointRadius: 0, yAxisID: "y1" }, { label: "噪声 dB", data: labels.map(() => rnd(50, 72)), borderColor: "#a855f7", tension: .35, pointRadius: 0, yAxisID: "y1" }] }, options: { responsive: true, plugins: { legend: { position: "bottom" } }, scales: { y: { position: "left" }, y1: { position: "right", grid: { display: false } } } } });
    const powerChart = new Chart($("powerChart"), { type: "bar", data: { labels, datasets: [{ label: "能耗 kW", data: labels.map(() => rnd(20, 90)), backgroundColor: "rgba(56,189,248,.5)", borderColor: "#38bdf8", borderWidth: 1 }] }, options: { responsive: true, plugins: { legend: { display: false } } } });
    function shift(chart) { chart.data.datasets.forEach((ds, i) => { ds.data.shift(); ds.data.push(i === 0 && chart === envChart ? env.wind : rnd(...(chart === powerChart ? [20, 90] : i === 1 ? [20, 70] : [50, 72]))); }); chart.update("none"); }

    const QA = [
      { k: ["吊装", "能否", "可以吊", "起吊"], a: () => { const wl = lastEnv.windLevel; return wl < 6 ? `当前风速约 ${env.wind.toFixed(1)} m/s（${wl} 级，<6级），温度 ${env.temp.toFixed(0)}℃，符合吊装作业条件。请执行“三确认（环境安全、设备完好、构件合格）、一复核（方案）、两到位”，试吊高度 300mm 停顿 3 秒后再吊运。` : `当前风速 ${env.wind.toFixed(1)} m/s 已达 ${wl} 级，超过 6 级限值，不符合吊装条件。建议立停、报告、复核后再启动。`; } },
      { k: ["外露", "8d", "外漏"], a: () => "上端连接钢筋外露长度应满足 ≥8d，并符合《装配式混凝土建筑技术标准》锚固规范，允许偏差 +10/-5mm，以保证套筒精准对接与可靠锚固。" },
      { k: ["凿毛", "基层"], a: () => "基层凿毛深度应 ≥3mm，面积占比 ≥80%，以增强机械咬合力；并清理碎屑、洒水湿润，防止水分流失，保证灌浆粘结强度。" },
      { k: ["垫片"], a: () => "垫片应距墙边线 >40mm，使用水准仪测量标高并双控找平，保证墙体垂直与标高一致。" },
      { k: ["套筒", "通透"], a: () => "灌浆套筒需逐一检查通透性，灌浆套筒数量应与地面预留钢筋数量相符；不通透应记录编号并处理后方可吊装。" },
      { k: ["图纸", "核对", "校对"], a: () => "可在“装配慧检·录入”中导入原始图纸，AI 将识别设计值并与实测数据逐项核对，自动标出超差项，支持一键生成核对结论。" },
      { k: ["规范", "符合", "验收"], a: () => "本次施工严格依据《混凝土结构工程施工质量验收规范》，主控项目（吊装、钢筋连接）与一般项目（吊具、模板接缝）均已数字化留痕；模板接缝间隙 ≤3mm、斜支撑安装牢固，符合规范要求。" },
      { k: ["你好", "在吗", "开始"], a: () => "你好，数字人助手已就位。现在开始，将严格按照装配式建筑技术标准对施工现场进行管理指挥，如有安全及质量问题会立刻预警并纠正。" },
    ];
    const { AI } = window.Platform;
    function addMsg(text, who) { const c = $("chat"); if (who === "ai") { const row = document.createElement("div"); row.style.cssText = "display:flex;gap:10px;align-items:flex-start"; row.innerHTML = `<div class="digital-human"><i class="fa fa-android"></i></div><div class="msg ai"></div>`; row.querySelector(".msg").textContent = text; c.appendChild(row); } else { const m = document.createElement("div"); m.className = "msg me"; m.textContent = text; c.appendChild(m); } c.scrollTop = c.scrollHeight; return c.lastElementChild; }
    function answer(q) { const hit = QA.find((x) => x.k.some((k) => q.includes(k))); return hit ? hit.a() : "已收到。请按标准化五步流程（定位弹线→基层处理→垫片找平→吊装固定→节点连接）作业，关键节点请拍照上传至装配慧检 AI 系统留痕。如涉及超差，系统将自动报警。"; }

    // 系统提示词：装配式施工指挥专家
    const SYS = "你是“装配智建·和美乡村”平台的 AI 数字人施工指挥助手，是一名装配式混凝土建筑（预制剪力墙吊装、灌浆套筒连接、钢筋绑扎）领域的资深技术专家。请严格依据《装配式混凝土建筑技术标准》《混凝土结构工程施工质量验收规范》等规范，对施工现场进行管理指挥；回答务必专业、简洁（一般 80~200 字），给出具体数值与判定标准，发现安全或质量风险要明确预警并给整改建议。只回答与本工程施工、安全、质量、规范相关的问题。";
    const history = [{ role: "system", content: SYS }];
    let aiLive = false;
    function liveState() { return `（当前现场实时：风速 ${env.wind.toFixed(1)} m/s 约 ${lastEnv.windLevel} 级，温度 ${env.temp.toFixed(0)}℃；吊装作业要求风速<6级、温度5~38℃。）`; }

    async function send() {
      const v = $("chatInput").value.trim(); if (!v) return;
      addMsg(v, "me"); $("chatInput").value = "";
      if (!aiLive) { setTimeout(() => addMsg(answer(v), "ai"), 400); return; }
      const typing = addMsg("正在思考…", "ai"); const bubble = typing.querySelector(".msg");
      history.push({ role: "user", content: v + " " + liveState() });
      try {
        const reply = await AI.chat(history.slice(-12), { max_tokens: 500 });
        bubble.textContent = reply || answer(v);
        history.push({ role: "assistant", content: reply });
      } catch (e) {
        bubble.textContent = answer(v);
        bubble.insertAdjacentHTML("beforeend", ' <span class="mute2" style="font-size:11px">(AI 暂不可用，已回退内置应答)</span>');
      }
      $("chat").scrollTop = $("chat").scrollHeight;
    }
    $("chatSend").addEventListener("click", send);
    $("chatInput").addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
    root.querySelectorAll(".q").forEach((b) => b.addEventListener("click", () => { $("chatInput").value = b.textContent; send(); }));
    addMsg("你好，我是装配智建数字人助手。现在开始严格按照装配式建筑技术标准对施工现场管理指挥，如有安全及质量问题，将立刻预警并纠正。", "ai");

    // 标注 AI 状态
    const aiTag = document.createElement("span");
    aiTag.className = "badge"; aiTag.style.marginLeft = "8px"; aiTag.textContent = "检测中…";
    const titleEl = root.querySelector(".section-title"); // 顶部标题，足够
    AI.available().then((ok) => { aiLive = ok; aiTag.className = "badge " + (ok ? "green" : "amber"); aiTag.innerHTML = ok ? '<span class="dot green"></span> DeepSeek 在线' : "内置应答模式"; });
    // 放到数字人卡片标题
    const dhTitle = [...root.querySelectorAll(".section-title")].find((t) => t.textContent.includes("数字人"));
    if (dhTitle) dhTitle.appendChild(aiTag);

    const visible = () => root.classList.contains("active"); // 仅当模块可见时刷新，隐藏时空转省资源
    function refresh() { renderWorkers(); renderMachines(); renderMaterials(); renderEnv(); }
    refresh();
    setInterval(() => { if (visible()) refresh(); }, 4000);
    setInterval(() => { if (visible()) { shift(envChart); shift(powerChart); } }, 3000);
    setInterval(() => { if (visible()) pushAlert(pick(ALERT_LIB)); }, 6000);
  },
});
