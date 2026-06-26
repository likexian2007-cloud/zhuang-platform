/* ====================== 模块：智慧数据大屏 ====================== */
(window.MODULES = window.MODULES || []).push({
  id: "dashboard", label: "智慧大屏", icon: "fa-th-large",
  render(el) {
    el.innerHTML = `
    <div class="lane">
      <div class="card glow">
        <div style="font-size:15px;font-weight:800;margin-bottom:6px"><i class="fa fa-bolt" style="color:var(--cyan)"></i> 演示优先通道</div>
        <p style="margin:0;font-size:12.5px;color:var(--text-dim);line-height:1.7">按装配慧检、智慧工地、施工流程、AI作业票、一码溯源顺序快速切换；首页同步显示运维阶段 BHI 建筑健康指数，形成全生命周期闭环。</p>
      </div>
      <a class="card seq" data-go="huijian"><span class="no">01 装配慧检</span><h4>录入 · 图纸核对</h4><p>实测录入 → 图纸AI核对 → 超差报警。</p></a>
      <a class="card seq" data-go="gongdi"><span class="no">02 智慧工地</span><h4>人机料法环</h4><p>人员/机械/材料/环境实时监控。</p></a>
      <a class="card seq" data-go="liucheng"><span class="no">03 标准工艺</span><h4>五步定标准</h4><p>定位弹线 → 吊装固定 → 节点连接。</p></a>
      <a class="card seq" data-go="zuoyepiao"><span class="no">04 AI作业票</span><h4>准吊 · 整改闭环</h4><p>三确认一复核两到位 → AI生成作业票。</p></a>
      <a class="card seq" data-go="trace"><span class="no">05 一码溯源</span><h4>质量闭环</h4><p>数字身份证 → 工序留痕 → 扫码追溯。</p></a>
    </div>

    <div class="holo" id="holo">
      <div class="gridfloor"></div>
      <div class="title">
        <h2>和美乡村装配式建造 · 数字孪生态势</h2>
        <p>校企合作项目 · 装配式节能结构一体化混凝土墙板技术 · 装配率 95%</p>
      </div>
      <div class="center">
        <svg width="560" height="420" viewBox="0 0 560 420" style="max-width:90%;filter:drop-shadow(0 0 26px rgba(0,200,255,.45))">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7df9ff"/><stop offset="1" stop-color="#1f7fff"/></linearGradient>
            <linearGradient id="wallF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="rgba(0,200,255,.28)"/><stop offset="1" stop-color="rgba(0,90,200,.08)"/></linearGradient>
            <linearGradient id="roofF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgba(125,249,255,.35)"/><stop offset="1" stop-color="rgba(30,120,255,.12)"/></linearGradient>
          </defs>
          <polygon points="280,300 470,360 280,420 90,360" fill="rgba(0,150,255,.10)" stroke="url(#edge)" stroke-width="1.5"/>
          <polygon points="280,278 430,326 280,374 130,326" fill="rgba(0,150,255,.06)" stroke="rgba(125,249,255,.4)" stroke-width="1"/>
          <polygon points="160,196 280,234 280,330 160,292" fill="url(#wallF)" stroke="url(#edge)" stroke-width="1.6"/>
          <polygon points="280,234 400,196 400,292 280,330" fill="url(#wallF)" stroke="url(#edge)" stroke-width="1.6"/>
          <polygon points="160,196 280,158 400,196 280,234" fill="url(#roofF)" stroke="url(#edge)" stroke-width="1.8"/>
          <polygon points="195,238 235,251 235,300 195,287" fill="rgba(0,229,255,.12)" stroke="rgba(125,249,255,.55)" stroke-width="1"/>
          <polygon points="325,251 365,238 365,287 325,300" fill="rgba(0,229,255,.12)" stroke="rgba(125,249,255,.55)" stroke-width="1"/>
          <g fill="#7df9ff"><circle cx="190" cy="288" r="2.4"/><circle cx="214" cy="296" r="2.4"/><circle cx="238" cy="304" r="2.4"/><circle cx="322" cy="304" r="2.4"/><circle cx="346" cy="296" r="2.4"/><circle cx="370" cy="288" r="2.4"/></g>
          <g opacity="0.95">
            <line x1="280" y1="20" x2="280" y2="86" stroke="#7df9ff" stroke-width="1.4" stroke-dasharray="4 4"/>
            <polygon points="232,90 328,90 328,150 232,150" fill="rgba(0,229,255,.18)" stroke="url(#edge)" stroke-width="1.6"/>
            <line x1="248" y1="90" x2="280" y2="64" stroke="#7df9ff" stroke-width="1"/>
            <line x1="312" y1="90" x2="280" y2="64" stroke="#7df9ff" stroke-width="1"/>
            <circle cx="280" cy="62" r="4" fill="none" stroke="#7df9ff" stroke-width="1.4"/>
            <text x="280" y="126" fill="#bdf3ff" font-size="12" text-anchor="middle" font-family="sans-serif">预制剪力墙吊装</text>
          </g>
          <ellipse cx="280" cy="360" rx="150" ry="36" fill="none" stroke="rgba(0,229,255,.35)" stroke-width="1">
            <animate attributeName="rx" values="60;175;60" dur="4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;0;0.6" dur="4s" repeatCount="indefinite"/>
          </ellipse>
        </svg>
      </div>
      <div class="bhi-panel">
        <div class="bhi-head">
          <div>
            <div class="label"><i class="fa fa-heartbeat"></i> 建筑健康指数 Building Health Index</div>
            <div class="score"><span id="bhiScore">98.6</span><small> 分</small></div>
          </div>
          <div id="bhiState" class="bhi-state"><i class="fa fa-circle"></i> 安全运行</div>
        </div>
        <div class="bhi-grid">
          <div class="bhi-item"><b><span id="bhiVibDot" class="ok">●</span> 振动</b><div id="bhiVib" class="val">0.18 mm/s · 正常</div></div>
          <div class="bhi-item"><b><span id="bhiCrackDot" class="ok">●</span> 裂缝</b><div id="bhiCrack" class="val">0.02 mm · 正常</div></div>
          <div class="bhi-item"><b><span id="bhiTiltDot" class="ok">●</span> 倾角</b><div id="bhiTilt" class="val">0.04° · 正常</div></div>
          <div class="bhi-item"><b><span id="bhiDispDot" class="ok">●</span> 位移</b><div id="bhiDisp" class="val">0.3 mm · 正常</div></div>
          <div class="bhi-item"><b><span id="bhiHumDot" class="ok">●</span> 温湿度</b><div id="bhiHum" class="val">22℃ / 58% · 正常</div></div>
        </div>
      </div>
      <div class="float l1"><div class="t">装配率</div><div class="v">95%</div><div class="s">高装配率建造</div></div>
      <div class="float l2"><div class="t">在岗人员</div><div class="v" id="fPeople">5 人</div><div class="s">智能安全帽 100%</div></div>
      <div class="float l3"><div class="t">吊装效率提升</div><div class="v">30%</div><div class="s">激光定位 · 零碰撞</div></div>
      <div class="float r1"><div class="t">质量合格率</div><div class="v" id="fRate">--</div><div class="s">质量监测看板</div></div>
      <div class="float r2"><div class="t">风速 · 作业条件</div><div class="v" id="fWind">0.2 m/s</div><div class="s" id="fWindOk">符合吊装条件</div></div>
      <div class="float r3"><div class="t">超差报警阈值</div><div class="v">10 mm</div><div class="s">同组差值自动报警</div></div>
    </div>

    <div class="cols2">
      <div class="card">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
          <div><div style="font-size:16px;font-weight:800">智慧运维 · AI健康监测</div>
          <p style="margin:6px 0 0;font-size:12.5px;color:var(--text-dim)">关键部位布设振动、裂缝、倾角、位移及温湿度传感器，实时上传至智慧运维平台，异常自动识别、风险预警、健康评估。</p></div>
          <span class="badge green">BHI在线</span>
        </div>
        <div class="life-chain" style="margin-top:12px">
          <div class="node"><b>设计</b><p>BIM构件编码、传感器预留点位</p></div>
          <div class="node"><b>施工</b><p>装配慧检、图纸AI核对、作业票闭环</p></div>
          <div class="node"><b>验收</b><p>质量档案、二维码溯源、节点照片</p></div>
          <div class="node"><b>运维</b><p>BHI健康指数、风险预警、寿命评估</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center">
          <div style="font-size:16px;font-weight:800">现场视频 · 流畅播放</div><span class="badge cyan">MP4证据链</span>
        </div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">视频采用按需加载，播放一个视频时自动暂停其它视频，保证手机端和网页端播放更稳。</p>
        <div class="video-grid">
          <div class="video-card"><video controls preload="metadata" playsinline src="assets/media/prefab-monitor-1.mp4"></video><div class="vcap"><b>吊装巡检</b><span>实景记录</span></div></div>
          <div class="video-card"><video controls preload="metadata" playsinline src="assets/media/prefab-monitor-2.mp4"></video><div class="vcap"><b>平台演示</b><span>操作流程</span></div></div>
          <div class="video-card"><video controls preload="metadata" playsinline src="assets/media/prefab-monitor-3.mp4"></video><div class="vcap"><b>运维监测</b><span>闭环留痕</span></div></div>
        </div>
      </div>
    </div>

    <div class="cols3">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><div style="font-size:16px;font-weight:800">装配式施工实景 · 数字孪生</div>
          <p style="margin:6px 0 0;font-size:12.5px;color:var(--text-dim)">缩尺模型与现场孪生联动，说明剪力墙吊装、节点连接与基层处理的现场状态。</p></div>
          <span class="badge cyan">现场孪生</span>
        </div>
        <div class="scene-img" style="margin-top:12px;height:150px;background:radial-gradient(300px 120px at 30% 20%,rgba(0,180,255,.25),transparent),linear-gradient(160deg,#0a1426,#0a1f33);display:grid;place-items:center">
          <i class="fa fa-cubes" style="font-size:40px;color:rgba(125,249,255,.6)"></i>
        </div>
        <div class="grid g3" style="margin-top:12px">
          <div><b style="font-size:13px">剪力墙吊装</b><p style="margin:2px 0 0;font-size:11px;color:var(--text-dim)">三确认一复核两到位</p></div>
          <div><b style="font-size:13px">节点连接</b><p style="margin:2px 0 0;font-size:11px;color:var(--text-dim)">套筒对接·绑扎</p></div>
          <div><b style="font-size:13px">基层处理</b><p style="margin:2px 0 0;font-size:11px;color:var(--text-dim)">凿毛≥3mm·80%</p></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between"><div style="font-size:16px;font-weight:800">施工阶段专业关注</div><span class="badge green">重点复核</span></div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">结合真实工艺，突出最具价值的专业点。</p>
        <div class="focus"><span class="n">01</span><div><b>吊装安全</b><p>试吊高度 300mm 停顿 3 秒，安全距离 ≥1.5 倍构件高度。</p></div></div>
        <div class="focus"><span class="n">02</span><div><b>钢筋定位复核</b><p>纵筋定位器固定，套筒数量与预留钢筋相符，外露 ≥8d。</p></div></div>
        <div class="focus" style="margin:0"><span class="n">03</span><div><b>质量闭环</b><p>图纸AI核对 → 超差报警 → 拍照留痕 → 一码溯源。</p></div></div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between"><div style="font-size:16px;font-weight:800">平台核心能力</div><span class="badge cyan">数字提效</span></div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">规范筑基 · 数字提效。</p>
        <div class="cap">
          <div class="c"><div class="t">质量管控</div><div class="big">数字化</div><div class="s">实时采集·智能比对·超差报警</div></div>
          <div class="c"><div class="t">图纸核对</div><div class="big">AI化</div><div class="s">实测对图纸·自动判定偏差</div></div>
          <div class="c"><div class="t">工艺流程</div><div class="big">精益化</div><div class="s">缩模验工艺·五步定标准</div></div>
          <div class="c"><div class="t">建造模式</div><div class="big">可复制</div><div class="s">低碳高效·乡村适配</div></div>
        </div>
      </div>
    </div>

    <div class="cols2">
      <div class="card">
        <div style="display:flex;justify-content:space-between"><div style="font-size:16px;font-weight:800">装配式建造 · 指挥态势墙</div><span class="badge cyan">实景联动</span></div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">把剪力墙吊装、节点连接、基层处理与环境监测做成可互动的施工指挥面板。</p>
        <div style="display:flex;gap:14px;flex-wrap:wrap">
          <div class="scene-img" style="flex:1;min-width:240px;height:180px;background:radial-gradient(220px 120px at 60% 30%,rgba(0,180,255,.25),transparent),linear-gradient(160deg,#0a1426,#0a1f33)">
            <span class="pt" style="left:18%;top:24%">屋盖结构</span>
            <span class="pt" style="left:55%;top:46%">剪力墙吊装</span>
            <span class="pt" style="left:22%;bottom:18%">基层处理</span>
            <span class="pt" style="right:14%;bottom:24%">节点连接</span>
          </div>
          <div style="flex:1;min-width:200px">
            <div class="focus" style="padding:10px"><div><b style="font-size:13px">墙体吊装闭合</b><p>高空吊装、节点焊缝、临边防护与传感器布点。</p></div></div>
            <div class="focus" style="padding:10px"><div><b style="font-size:13px">混凝土质量</b><p>线形复核、预理件、裂缝巡检与成品保护。</p></div></div>
            <div class="focus" style="padding:10px;margin:0"><div><b style="font-size:13px">基层与排水</b><p>凿毛、垫片找平、雨水排放与后续基础。</p></div></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
              <a class="btn btn-sm btn-primary" data-go="gongdi">现场风险扫描</a>
              <a class="btn btn-sm btn-ghost" data-go="liucheng">刷新施工进度</a>
              <a class="btn btn-sm btn-cyan" data-go="huijian">生成吊装记录</a>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between"><div style="font-size:16px;font-weight:800">功能闭环清单</div><span class="badge green">全部接入</span></div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">对照 PPT、文档与展演脚本，把核心功能集中到指挥中心。</p>
        <div class="check"><div><b>PPT 五维度</b><p>总体思路·技能要点·项目创新·项目成果·应用价值</p></div><span class="badge green">已接入</span></div>
        <div class="check"><div><b>图纸AI核对</b><p>实测实量对照原始图纸，自动校对判定偏差</p></div><span class="badge cyan">新增</span></div>
        <div class="check"><div><b>装配慧检报警</b><p>超差 10mm 大框 + 警笛，红/黄/绿三级响应</p></div><span class="badge green">已接入</span></div>
        <div class="check"><div><b>人机料法环</b><p>人员·机械·材料·工法·环境全要素监控</p></div><span class="badge green">已接入</span></div>
        <div class="check"><div><b>AI 数字人</b><p>按装配式技术标准指挥，问答即时预警</p></div><span class="badge cyan">可交互</span></div>
      </div>
    </div>`;
  },
  onShow(el) {
    const { $, Store } = window.Platform;
    // 合格率
    Store.stats().then((s) => { const e = el.querySelector("#fRate"); if (e) e.textContent = (s.total ? Math.round((s.qualified / s.total) * 100) : 100) + "%"; }).catch(() => {});
    if (!this._videoReady) {
      el.querySelectorAll("video").forEach((v) => {
        v.addEventListener("play", () => {
          el.querySelectorAll("video").forEach((other) => { if (other !== v) other.pause(); });
        });
      });
      this._videoReady = true;
    }
    const setText = (id, text) => { const n = el.querySelector("#" + id); if (n) n.textContent = text; };
    const setDot = (id, level) => {
      const n = el.querySelector("#" + id);
      if (!n) return;
      n.className = level === "bad" ? "bad" : level === "warn" ? "warn" : "ok";
    };
    const statusLevel = (value, warn, bad) => value >= bad ? "bad" : value >= warn ? "warn" : "ok";
    const levelText = (level) => level === "bad" ? "预警" : level === "warn" ? "关注" : "正常";
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const sensor = this._sensor || (this._sensor = {
      vib: 0.18, crack: 0.02, tilt: 0.04, disp: 0.3, temp: 22, hum: 58,
    });
    const updateBhi = () => {
      sensor.vib = clamp(sensor.vib + (Math.random() - 0.48) * 0.05, 0.08, 0.72);
      sensor.crack = clamp(sensor.crack + (Math.random() - 0.5) * 0.006, 0.01, 0.18);
      sensor.tilt = clamp(sensor.tilt + (Math.random() - 0.5) * 0.012, 0.02, 0.28);
      sensor.disp = clamp(sensor.disp + (Math.random() - 0.5) * 0.16, 0.1, 2.8);
      sensor.temp = clamp(sensor.temp + (Math.random() - 0.5) * 0.5, 18, 31);
      sensor.hum = clamp(sensor.hum + (Math.random() - 0.5) * 1.6, 45, 76);
      const vibLv = statusLevel(sensor.vib, 0.45, 0.65);
      const crackLv = statusLevel(sensor.crack, 0.10, 0.16);
      const tiltLv = statusLevel(sensor.tilt, 0.18, 0.26);
      const dispLv = statusLevel(sensor.disp, 1.8, 2.5);
      const envScore = (sensor.temp < 28 && sensor.hum < 70) ? 0 : (sensor.temp < 30 && sensor.hum < 74 ? 1.4 : 3.2);
      const score = clamp(
        100 - sensor.vib * 5.2 - sensor.crack * 20 - sensor.tilt * 8 - sensor.disp * 1.15 - envScore,
        86,
        99.4
      );
      const state = el.querySelector("#bhiState");
      const stateText = score >= 95 ? "安全运行" : score >= 90 ? "持续关注" : "风险预警";
      if (state) {
        state.className = "bhi-state " + (score >= 95 ? "" : score >= 90 ? "warn" : "danger");
        state.innerHTML = `<i class="fa fa-circle"></i> ${stateText}`;
      }
      setText("bhiScore", score.toFixed(1));
      const humLv = envScore > 2 ? "bad" : envScore > 0 ? "warn" : "ok";
      setText("bhiVib", sensor.vib.toFixed(2) + " mm/s · " + levelText(vibLv));
      setText("bhiCrack", sensor.crack.toFixed(2) + " mm · " + levelText(crackLv));
      setText("bhiTilt", sensor.tilt.toFixed(2) + "° · " + levelText(tiltLv));
      setText("bhiDisp", sensor.disp.toFixed(1) + " mm · " + levelText(dispLv));
      setText("bhiHum", Math.round(sensor.temp) + "℃ / " + Math.round(sensor.hum) + "% · " + levelText(humLv));
      setDot("bhiVibDot", vibLv);
      setDot("bhiCrackDot", crackLv);
      setDot("bhiTiltDot", tiltLv);
      setDot("bhiDispDot", dispLv);
      setDot("bhiHumDot", humLv);
    };
    updateBhi();
    if (this._timer) return; // 只启动一次
    let wind = 0.4;
    this._timer = setInterval(() => {
      if (!el.classList.contains("active")) return; // 隐藏时不更新
      const w = el.querySelector("#fWind"), ok = el.querySelector("#fWindOk"), p = el.querySelector("#fPeople");
      wind = Math.max(0, Math.min(9, wind + (Math.random() - 0.5) * 1.2));
      const good = wind < 5.5;
      if (w) w.textContent = wind.toFixed(1) + " m/s";
      if (ok) { ok.textContent = good ? "符合吊装条件" : "超限·立停报告"; ok.style.color = good ? "#6ee7b7" : "#fca5a5"; }
      if (p) p.textContent = (5 + (Math.random() > 0.7 ? 1 : 0)) + " 人";
      updateBhi();
    }, 2800);
  },
});
