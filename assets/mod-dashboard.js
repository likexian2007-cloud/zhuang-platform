/* ====================== 模块：智慧数据大屏 ====================== */
(window.MODULES = window.MODULES || []).push({
  id: "dashboard", label: "智慧大屏", icon: "fa-th-large",
  render(el) {
    el.innerHTML = `
    <div class="lane">
      <div class="card glow">
        <div style="font-size:15px;font-weight:800;margin-bottom:6px"><i class="fa fa-bolt" style="color:var(--cyan)"></i> 演示优先通道</div>
        <p style="margin:0;font-size:12.5px;color:var(--text-dim);line-height:1.7">按装配慧检、智慧工地、施工流程、AI作业票、AI闭环中心、一码溯源顺序快速切换；首页同步显示运维阶段 BHI 建筑健康指数，形成全生命周期闭环。</p>
      </div>
      <a class="card seq" data-go="huijian"><span class="no">01 装配慧检</span><h4>录入 · 图纸核对</h4><p>实测录入 → 图纸AI核对 → 超差报警。</p></a>
      <a class="card seq" data-go="gongdi"><span class="no">02 智慧工地</span><h4>人机料法环</h4><p>人员/机械/材料/环境实时监控。</p></a>
      <a class="card seq" data-go="liucheng"><span class="no">03 标准工艺</span><h4>五步定标准</h4><p>定位弹线 → 吊装固定 → 节点连接。</p></a>
      <a class="card seq" data-go="zuoyepiao"><span class="no">04 AI作业票</span><h4>准吊 · 整改闭环</h4><p>三确认一复核两到位 → AI生成作业票。</p></a>
      <a class="card seq" data-go="aiCenter"><span class="no">05 AI闭环中心</span><h4>派单 · 日志 · 评分</h4><p>整改派单 → 规范问答 → 日志热力图。</p></a>
      <a class="card seq" data-go="trace"><span class="no">06 一码溯源</span><h4>质量闭环</h4><p>数字身份证 → 工序留痕 → 扫码追溯。</p></a>
    </div>

    <div class="holo" id="holo">
      <div class="gridfloor"></div>
      <div class="title">
        <h2>和美乡村装配式建造 · 数字孪生态势</h2>
        <p>校企合作项目 · 装配式节能结构一体化混凝土墙板技术 · 装配率 95%</p>
      </div>
      <div class="center">
        <div class="holo-stage">
          <div class="holo-video-frame">
            <video class="dash-video auto-video" controls autoplay muted loop preload="metadata" playsinline src="assets/media/prefab-monitor-3.mp4"></video>
            <div class="video-caption"><i class="fa fa-video-camera"></i> 数字孪生主屏 · 全景视频</div>
          </div>
          <aside class="bhi-panel">
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
          </aside>
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
        <div style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="font-size:16px;font-weight:800">AI 运维总工 · 健康评估</div><span id="bhiAiBadge" class="badge amber">AI检测中</span>
        </div>
        <p style="margin:6px 0 12px;font-size:12.5px;color:var(--text-dim)">读取 BHI 传感器实时数据，调用 DeepSeek 生成风险原因、运维处置、复核频率和闭环建议。</p>
        <div id="bhiAiReport" class="ai-report">等待 AI 健康评估。当前 BHI 数据会实时刷新，点击下方按钮生成专业运维建议。</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <button id="btnBhiAI" class="btn btn-cyan btn-sm"><i class="fa fa-magic"></i> AI健康评估</button>
          <button id="btnBhiLocal" class="btn btn-ghost btn-sm"><i class="fa fa-heartbeat"></i> 本地规则复核</button>
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
        <div class="scene-img media-frame" style="margin-top:12px">
          <video class="embedded-video dash-video auto-video" controls autoplay muted loop preload="metadata" playsinline src="assets/media/prefab-monitor-2.mp4"></video>
          <div class="video-caption"><i class="fa fa-video-camera"></i> 第二段视频 · 施工实景</div>
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
          <div class="vib-console" id="vibConsole" style="flex:1;min-width:340px">
            <div class="vib-head">
              <div>
                <b><i class="fa fa-line-chart"></i> 震动传感器 · 实时曲线</b>
                <p>参考设计赛道结构监测效果，模拟两人配合触发构件震动峰值。</p>
              </div>
              <span id="vibStatus" class="badge green">正常波动</span>
            </div>
            <div class="vib-canvas-wrap">
              <canvas id="vibCurve" width="720" height="320" aria-label="三轴振动曲线"></canvas>
              <div class="vib-threshold">5 mm/s² 警戒线</div>
            </div>
            <div class="vib-readouts">
              <div><span>X轴</span><b id="vibX">0.82</b><em>mm/s²</em></div>
              <div><span>Y轴</span><b id="vibY">0.64</b><em>mm/s²</em></div>
              <div><span>Z轴</span><b id="vibZ">0.91</b><em>mm/s²</em></div>
              <div><span>峰值</span><b id="vibPeak">0.91</b><em>mm/s²</em></div>
            </div>
            <div class="vib-actions">
              <button id="btnVibHit" class="btn btn-cyan btn-sm" onclick="window.__prefabVibPulse=6.2"><i class="fa fa-bolt"></i> 模拟双人配合震动</button>
              <button id="btnVibAuto" class="btn btn-ghost btn-sm on"><i class="fa fa-play"></i> 自动播放曲线</button>
            </div>
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
    const { $, Store, AI } = window.Platform;
    // 合格率
    Store.stats().then((s) => { const e = el.querySelector("#fRate"); if (e) e.textContent = (s.total ? Math.round((s.qualified / s.total) * 100) : 100) + "%"; }).catch(() => {});
    el.querySelectorAll(".auto-video").forEach((v) => {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    });
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
    const localBhiReport = (d) => {
      if (!d) return "暂无传感器快照，请稍后重试。";
      const weak = d.items.filter((x) => x.level !== "ok").map((x) => x.name);
      if (!weak.length) return `【安全运行】BHI ${d.score} 分。振动、裂缝、倾角、位移及温湿度均处于正常区间，建议保持 24h 自动巡检、每周生成一次运维健康报告，并将数据同步到一码溯源档案。`;
      return `【持续关注】BHI ${d.score} 分。重点关注：${weak.join("、")}。建议提高采样频率，复核对应构件节点和传感器安装状态，形成“预警-派单-复核-销项”闭环。`;
    };
    const initVibrationCurve = () => {
      const canvas = el.querySelector("#vibCurve");
      if (!canvas || canvas.dataset.ready) return;
      canvas.dataset.ready = "1";
      const ctx = canvas.getContext("2d");
      const state = this._vibState || (this._vibState = {
        t: 0,
        auto: true,
        spike: 0,
        points: Array.from({ length: 96 }, () => ({ x: 0.6, y: 0.5, z: 0.7 })),
      });
      const xNode = el.querySelector("#vibX");
      const yNode = el.querySelector("#vibY");
      const zNode = el.querySelector("#vibZ");
      const peakNode = el.querySelector("#vibPeak");
      const status = el.querySelector("#vibStatus");
      const autoBtn = el.querySelector("#btnVibAuto");
      const hitBtn = el.querySelector("#btnVibHit");
      const resize = () => {
        const r = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(360, Math.round(r.width * dpr));
        canvas.height = Math.max(210, Math.round(r.height * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const drawLine = (pts, key, color, w, h, maxV) => {
        ctx.beginPath();
        pts.forEach((p, i) => {
          const x = (i / (pts.length - 1)) * w;
          const y = h - (p[key] / maxV) * (h - 24) - 12;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      };
      const render = () => {
        if (el.classList.contains("active") && state.auto) {
          state.t += 0.12;
          if (window.__prefabVibPulse) {
            state.spike = Math.max(state.spike, window.__prefabVibPulse);
            window.__prefabVibPulse = 0;
          }
          const pulse = state.spike;
          const x = clamp(0.72 + Math.sin(state.t * 1.7) * 0.22 + Math.random() * 0.18 + pulse * 0.82, 0, 7.8);
          const y = clamp(0.54 + Math.cos(state.t * 1.3) * 0.18 + Math.random() * 0.16 + pulse * 0.63, 0, 7.2);
          const z = clamp(0.88 + Math.sin(state.t * 2.1 + 1.2) * 0.26 + Math.random() * 0.20 + pulse * 0.96, 0, 8.4);
          state.spike = Math.max(0, state.spike * 0.985 - 0.005);
          state.points.push({ x, y, z });
          state.points = state.points.slice(-96);
          const peak = Math.max(x, y, z);
          if (xNode) xNode.textContent = x.toFixed(2);
          if (yNode) yNode.textContent = y.toFixed(2);
          if (zNode) zNode.textContent = z.toFixed(2);
          if (peakNode) peakNode.textContent = peak.toFixed(2);
          if (status) {
            status.className = "badge " + (peak >= 5 ? "red" : peak >= 3.2 ? "amber" : "green");
            status.textContent = peak >= 5 ? "超过警戒" : peak >= 3.2 ? "持续关注" : "正常波动";
          }
        }
        const w = canvas.clientWidth || 640;
        const h = canvas.clientHeight || 360;
        ctx.clearRect(0, 0, w, h);
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "rgba(14,165,233,.15)");
        grad.addColorStop(1, "rgba(2,6,23,.02)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "rgba(148,163,184,.12)";
        ctx.lineWidth = 1;
        for (let i = 1; i < 6; i++) {
          const y = (h / 6) * i;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
        for (let i = 1; i < 8; i++) {
          const x = (w / 8) * i;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        const maxV = 8;
        const thresholdY = h - (5 / maxV) * (h - 24) - 12;
        ctx.setLineDash([7, 6]);
        ctx.strokeStyle = "rgba(251,191,36,.8)";
        ctx.beginPath();
        ctx.moveTo(0, thresholdY);
        ctx.lineTo(w, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);
        drawLine(state.points, "x", "#22d3ee", w, h, maxV);
        drawLine(state.points, "y", "#a78bfa", w, h, maxV);
        drawLine(state.points, "z", "#34d399", w, h, maxV);
        ctx.fillStyle = "rgba(219,234,254,.72)";
        ctx.font = "12px sans-serif";
        ctx.fillText("X轴", 12, 20);
        ctx.fillStyle = "#a78bfa";
        ctx.fillText("Y轴", 50, 20);
        ctx.fillStyle = "#34d399";
        ctx.fillText("Z轴", 88, 20);
        requestAnimationFrame(render);
      };
      window.addEventListener("resize", resize);
      resize();
      if (hitBtn) hitBtn.addEventListener("click", () => {
        state.spike = Math.max(state.spike, 6.2);
        const impact = { x: 5.72 + Math.random() * 0.35, y: 4.88 + Math.random() * 0.45, z: 6.18 + Math.random() * 0.42 };
        state.points.push(impact);
        state.points = state.points.slice(-96);
        if (xNode) xNode.textContent = impact.x.toFixed(2);
        if (yNode) yNode.textContent = impact.y.toFixed(2);
        if (zNode) zNode.textContent = impact.z.toFixed(2);
        if (peakNode) peakNode.textContent = Math.max(impact.x, impact.y, impact.z).toFixed(2);
        if (status) { status.className = "badge red"; status.textContent = "超过警戒"; }
        window.Platform.toast("已模拟双人配合产生震动峰值，传感器曲线进入预警区");
      });
      if (autoBtn) autoBtn.addEventListener("click", () => {
        state.auto = !state.auto;
        autoBtn.classList.toggle("on", state.auto);
        autoBtn.innerHTML = state.auto ? '<i class="fa fa-play"></i> 自动播放曲线' : '<i class="fa fa-pause"></i> 曲线已暂停';
      });
      requestAnimationFrame(render);
    };
    initVibrationCurve();
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
      this._bhiSnapshot = {
        score: score.toFixed(1),
        state: stateText,
        items: [
          { name: "振动", value: sensor.vib.toFixed(2) + " mm/s", level: vibLv },
          { name: "裂缝", value: sensor.crack.toFixed(2) + " mm", level: crackLv },
          { name: "倾角", value: sensor.tilt.toFixed(2) + "°", level: tiltLv },
          { name: "位移", value: sensor.disp.toFixed(1) + " mm", level: dispLv },
          { name: "温湿度", value: Math.round(sensor.temp) + "℃ / " + Math.round(sensor.hum) + "%", level: humLv },
        ],
      };
    };
    updateBhi();
    if (!this._bhiAiReady) {
      const report = el.querySelector("#bhiAiReport");
      const aiBtn = el.querySelector("#btnBhiAI");
      const localBtn = el.querySelector("#btnBhiLocal");
      const badge = el.querySelector("#bhiAiBadge");
      AI.available().then((ok) => {
        if (!badge) return;
        badge.className = "badge " + (ok ? "green" : "amber");
        badge.textContent = ok ? "DeepSeek 在线" : "本地规则兜底";
      });
      if (localBtn) localBtn.addEventListener("click", () => {
        if (report) { report.classList.remove("loading"); report.textContent = localBhiReport(this._bhiSnapshot); }
      });
      if (aiBtn) aiBtn.addEventListener("click", async () => {
        if (!report) return;
        const snap = this._bhiSnapshot;
        report.classList.add("loading");
        report.textContent = "AI 正在读取 BHI 传感器数据并生成运维建议...";
        try {
          if (!(await AI.available())) throw new Error("AI 后端暂不可用");
          const reply = await AI.chat([
            { role: "system", content: "你是装配式建筑智慧运维总工，擅长建筑健康监测、传感器数据分析、风险预警和运维闭环。回答要专业、简洁、可执行，控制在220字内。" },
            { role: "user", content: "请基于以下 BHI 建筑健康指数数据生成运维健康评估，包含：总体判定、异常识别、风险等级、处置建议、复核频率、归档要求。\n" + JSON.stringify(snap, null, 2) },
          ], { max_tokens: 560, temperature: 0.35 });
          report.classList.remove("loading");
          report.textContent = reply || localBhiReport(snap);
        } catch (e) {
          report.classList.remove("loading");
          report.textContent = localBhiReport(snap) + `\n\n（AI 暂不可用，已使用本地规则；原因：${e.message}）`;
        }
      });
      this._bhiAiReady = true;
    }
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
