/* ====================== 模块：施工流程 / 创新成果 / 一码溯源 / 部署 ====================== */
(function () {
  // 注入静态模块所需样式（一次）
  if (!document.getElementById("staticStyle")) {
    const s = document.createElement("style"); s.id = "staticStyle";
    s.textContent = `
    .phase{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}.phase .ph{flex:1;min-width:200px;border:1px solid var(--line);border-radius:12px;padding:14px 16px;background:linear-gradient(160deg,rgba(20,32,60,.7),rgba(10,17,34,.7))}.phase .ph h4{margin:0 0 6px;font-size:15px;color:#9fe9ff}
    .step{display:flex;gap:16px;margin-bottom:14px}.step .sn{flex-shrink:0;width:46px;height:46px;border-radius:13px;display:grid;place-items:center;font-weight:900;font-size:18px;color:#021;background:linear-gradient(135deg,var(--cyan),var(--primary))}.step h3{margin:0 0 4px;font-size:16px}
    .sub{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.sub span{font-size:12px;padding:4px 10px;border-radius:8px;background:rgba(56,189,248,.1);border:1px solid var(--line);color:#cbd5e1}
    .note{margin-top:8px;font-size:13px;color:var(--text-dim);border-left:3px solid var(--success);padding-left:10px}
    .tool{display:flex;align-items:center;gap:10px}.tool .ti{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;font-size:18px;background:linear-gradient(135deg,#6366f1,#a855f7)}
    .innov{position:relative;padding-left:18px}.innov::before{content:"";position:absolute;left:0;top:6px;bottom:6px;width:3px;border-radius:3px;background:linear-gradient(180deg,var(--cyan),var(--purple))}.innov h3{margin:0 0 6px;font-size:17px}
    .num-big{font-size:30px;font-weight:900;background:linear-gradient(90deg,#fff,#9fe9ff);-webkit-background-clip:text;background-clip:text;color:transparent}
    .award{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid rgba(148,163,184,.12)}.award .ic{width:42px;height:42px;border-radius:12px;display:grid;place-items:center;font-size:20px;flex-shrink:0;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff}
    .scene{text-align:center;padding:18px 12px;border:1px solid var(--line);border-radius:14px;background:linear-gradient(160deg,rgba(20,32,60,.7),rgba(10,17,34,.7))}.scene i{font-size:30px;color:var(--cyan)}.scene b{display:block;margin-top:8px}
    .searchbar{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px}.searchbar input{flex:1;min-width:220px}
    .cidpill{display:inline-block;margin:4px 6px 0 0;padding:5px 12px;border-radius:8px;cursor:pointer;font-size:13px;background:rgba(56,189,248,.1);border:1px solid var(--line);color:#cbd5e1}.cidpill:hover{border-color:var(--cyan);color:#fff}
    .timeline .ev{display:flex;gap:14px;padding-bottom:16px;position:relative}.timeline .ev::before{content:"";position:absolute;left:16px;top:34px;bottom:-2px;width:2px;background:var(--line)}.timeline .ev:last-child::before{display:none}.timeline .ev .dotc{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:grid;place-items:center;font-size:14px;z-index:1}
    .trace-photos{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}.trace-photos img{width:92px;height:92px;object-fit:cover;border-radius:8px;border:1px solid var(--line-strong);background:#06101f}
    .idcard{display:flex;gap:18px;flex-wrap:wrap;align-items:center}.idcard .qr{background:#0b1220;padding:10px;border-radius:12px;border:1px solid var(--line)}
    code,pre{font-family:Consolas,Menlo,monospace}pre{background:#05070f;border:1px solid var(--line);border-radius:10px;padding:12px 14px;overflow:auto;font-size:13px;color:#9fe9ff}`;
    document.head.appendChild(s);
  }
  const M = (window.MODULES = window.MODULES || []);

  /* ---------------- 施工流程 ---------------- */
  M.push({ id: "liucheng", label: "施工流程", icon: "fa-list-ol", render(el) {
    el.innerHTML = `
    <h2 class="section-title"><span class="i"></span>标准施工流程 · “缩模验工艺，五步定标准，参数控精度”</h2>
    <p class="muted" style="margin:0 0 18px">本项目施工严格围绕“人机料法环”管理核心，系统划分为 <b style="color:#9fe9ff">准备 → 施工 → 工完场清</b> 三个阶段；以 a 轴与 2 轴为轴线吊装和美乡村 3 号房 1/2 号剪力墙。</p>
    <div class="phase">
      <div class="ph"><h4><i class="fa fa-check-square-o"></i> 准备阶段</h4><div class="muted" style="font-size:13px">安全技术交底 · 工具设备检查 · 外观尺寸测量</div></div>
      <div class="ph"><h4><i class="fa fa-cogs"></i> 施工阶段</h4><div class="muted" style="font-size:13px">五步标准化流程，速度 + 精度双达标</div></div>
      <div class="ph"><h4><i class="fa fa-trash-o"></i> 工完场清</h4><div class="muted" style="font-size:13px">工具归位 · 资料整理 · 垃圾分类（回收率 90%）</div></div>
    </div>
    <div class="card" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span>准备阶段 · 安全技术交底</div>
      <div class="grid g3">
        <div><div class="chip">三确认</div><p class="muted" style="font-size:13px">确认环境安全 · 确认设备完好 · 确认构件合格</p></div>
        <div><div class="chip">一复核</div><p class="muted" style="font-size:13px">复核施工方案</p></div>
        <div><div class="chip">两到位</div><p class="muted" style="font-size:13px">安全交底到位 · 责任分工到位</p></div>
      </div><div class="note">未达标准，坚决不试吊；作业超限，立停、报告、复核后再启动。</div></div>
    <div class="card" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span>施工阶段 · 五步标准流程</div>
      <div class="step"><div class="sn">1</div><div><h3>定位弹线 <span class="badge cyan">墙体边线 + 双控线</span></h3><div class="muted" style="font-size:14px">采用粉斗弹线，线条清晰，从源头杜绝定位偏移，确保构件对接。</div><div class="sub"><span>① 定位划点</span><span>② 弹墙体边线</span><span>③ 弹墙体控制线</span><span>影像采集留痕</span></div></div></div>
      <div class="step"><div class="sn">2</div><div><h3>基层处理 <span class="badge cyan">钢筋清理 · 基层质控</span></h3><div class="muted" style="font-size:14px">钢筋除锈彻底，确保与灌浆料粘结力；钢筋定位与图纸相符；测量垂直度与外露长度。</div><div class="sub"><span>① 钢筋除锈</span><span>② 钢筋定位及测量</span><span>③ 基层凿毛</span></div><div class="note">凿毛深度 ≥3mm，面积占比 >80%；外露长度 ≥8d，符合锚固规范。</div></div></div>
      <div class="step"><div class="sn">3</div><div><h3>垫片找平 <span class="badge cyan">垫片位置标高双控</span></h3><div class="muted" style="font-size:14px">地面设置垫片并标高找平，保证墙体垂直；架设水准仪测量后视点高度与垫片高度。</div><div class="sub"><span>① 放置垫片（距边线 ≥40mm）</span><span>② 架设水准仪</span><span>③ 测量读数</span></div></div></div>
      <div class="step"><div class="sn">4</div><div><h3>吊装固定 <span class="badge cyan">速度 + 精度双达标</span></h3><div class="muted" style="font-size:14px">连接吊具→试吊（高度 300mm 停顿 3 秒）→吊运落位→安装斜支撑临时固定→数显靠尺测量垂直度。</div><div class="sub"><span>① 连接吊具（夹角 >45°）</span><span>② 试吊及吊运</span><span>③ 落位及固定</span><span>④ 测量垂直度</span></div><div class="note">无关人员禁止入内，安全距离 ≥ 构件高度的 1.5 倍；激光定位器对孔，吊装效率提升超 15%。</div></div></div>
      <div class="step"><div class="sn">5</div><div><h3>节点连接 <span class="badge cyan">规范化 + 团队协作</span></h3><div class="muted" style="font-size:14px">安装钢筋连接套筒→插放纵筋→放置纵筋定位器→斜扣绑扎法绑扎→布置保护层卡子→防侧漏胶条→模板选型与对拉螺杆固定。</div><div class="sub"><span>① 插放纵筋</span><span>② 绑扎钢筋</span><span>③ 安装模板</span></div><div class="note">纵筋定位器精准固定纵筋位置，绑扎不偏移；模板接缝间隙 ≤3mm（塞尺检测），斜支撑安装牢固。</div></div></div>
    </div>
    <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span>配套创新工具</div>
      <div class="grid g3">
        <div class="tool"><div class="ti"><i class="fa fa-crosshairs"></i></div><div><b>激光定位器</b><div class="muted" style="font-size:12px">替代镜面反射，快速精准对孔，零碰撞</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-arrows-v"></i></div><div><b>数显靠尺</b><div class="muted" style="font-size:12px">垂直度可视化，误差 ±0.1mm/m</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-align-justify"></i></div><div><b>纵筋定位器</b><div class="muted" style="font-size:12px">固定纵筋位置，绑扎不偏移</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-microchip"></i></div><div><b>装配慧检 AI 系统</b><div class="muted" style="font-size:12px">数据比对 · 超差报警 · 图纸核对</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-rss"></i></div><div><b>环境检测器</b><div class="muted" style="font-size:12px">风速 / 温度实时判定作业条件</div></div></div>
        <div class="tool"><div class="ti"><i class="fa fa-sitemap"></i></div><div><b>智慧工地平台</b><div class="muted" style="font-size:12px">人机料法环全要素监控</div></div></div>
      </div>
    </div>`;
  }});

  /* ---------------- 创新成果 ---------------- */
  M.push({ id: "chengguo", label: "创新成果", icon: "fa-trophy", render(el) {
    el.innerHTML = `
    <h2 class="section-title"><span class="i"></span>项目创新 · 三大创新点</h2>
    <div class="grid g3" style="margin-bottom:26px">
      <div class="card glow"><span class="chip">创新点一</span><div class="innov" style="margin-top:12px"><h3>质量管控数字化</h3><p class="muted" style="font-size:14px">自主研发<b style="color:#9fe9ff">装配慧检 AI 系统</b>，智慧工地全时监控，解决纸质易污损、难追溯、效率低的痛点。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge cyan">实时采集</span><span class="badge cyan">智能比对</span><span class="badge cyan">超差报警</span><span class="badge cyan">图纸核对</span></div></div></div>
      <div class="card glow"><span class="chip">创新点二</span><div class="innov" style="margin-top:12px"><h3>施工工具革新化</h3><p class="muted" style="font-size:14px">吊装定位激光化、纵筋定位精准化，<b style="color:#9fe9ff">速装周期短、易操队伍熟、质控数据明、隐患皆消除</b>。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge green">激光定位器</span><span class="badge green">数显靠尺</span><span class="badge green">纵筋定位器</span></div></div></div>
      <div class="card glow"><span class="chip">创新点三</span><div class="innov" style="margin-top:12px"><h3>工艺流程精益化</h3><p class="muted" style="font-size:14px">缩模验工艺、五步定标准、参数控精度，形成<b style="color:#9fe9ff">乡村可复制</b>的预制构件施工方案。</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><span class="badge amber">1:5 缩尺模型</span><span class="badge amber">标准五步</span><span class="badge amber">参数控精度</span></div></div></div>
    </div>
    <h2 class="section-title"><span class="i"></span>项目成果 · 关键成果</h2>
    <div class="card" style="margin-bottom:26px">
      <div class="award"><div class="ic"><i class="fa fa-trophy"></i></div><div><b>装配式建筑施工多维度协同系统及应用方法</b><div class="muted" style="font-size:13px">《一种用于装配式墙面砖镶贴和嵌缝精度的设备及方法》，对人员、机械、工序一体化协同管控优化，荣获“鲁新杯”山东省建设建材系统“五小”创新成果竞赛<b style="color:#fcd34d">一等奖</b>。效率提升超 30%，整体施工周期缩短 15%。</div></div></div>
      <div class="award"><div class="ic"><i class="fa fa-file-text"></i></div><div><b>行业标准编制成果</b><div class="muted" style="font-size:13px">参与校企合作企业牵头编制《装配式节能结构一体化混凝土墙板应用技术规程》（CECS 标准），填补该领域行业规范空白，为技术落地、产品推广及质量管控提供权威标准依据。</div></div></div>
      <div class="award" style="border:0"><div class="ic"><i class="fa fa-flask"></i></div><div><b>质量技术攻坚</b><div class="muted" style="font-size:13px">攻关完成《降低装配式混凝土保护层开裂率》成果，显著提升构件耐久性与施工稳定性，荣获 2025 年工程建设质量管理小组成果大赛<b style="color:#fcd34d">二等奖</b>。</div></div></div>
    </div>
    <h2 class="section-title"><span class="i"></span>应用价值</h2>
    <div class="grid g3" style="margin-bottom:18px">
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>产教融合价值</div><div class="grid g2" style="text-align:center;margin-bottom:10px"><div><div class="num-big">30.7%</div><div class="mute2" style="font-size:12px">技能提升</div></div><div><div class="num-big">100%</div><div class="mute2" style="font-size:12px">素质提升</div></div></div><p class="muted" style="font-size:13px;margin:0">以 95% 高装配率施工流程、毫米级精度构件安装融入课程体系，学生通过模块拼装、标准化实训直接掌握行业急需技能。</p></div>
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>行业价值</div><div class="grid g2" style="text-align:center;margin-bottom:10px"><div><div class="num-big">20%</div><div class="mute2" style="font-size:12px">建材损耗降低</div></div><div><div class="num-big">95%</div><div class="mute2" style="font-size:12px">高装配率</div></div></div><p class="muted" style="font-size:13px;margin:0">打造“低碳高效 + 乡村适配”创新应用范本，契合国家“双碳”战略，为行业绿色转型提供可落地参考。</p></div>
      <div class="card"><div class="section-title" style="font-size:15px"><span class="i"></span>推广价值</div><div class="grid g3" style="margin:6px 0 10px"><div class="scene"><i class="fa fa-home"></i><b style="font-size:13px">乡村新居</b></div><div class="scene"><i class="fa fa-wheelchair"></i><b style="font-size:13px">养老配套</b></div><div class="scene"><i class="fa fa-soccer-ball-o"></i><b style="font-size:13px">体育场馆</b></div></div><p class="muted" style="font-size:13px;margin:0">多场景可复制的绿色建造方案，可在城市更新、灾后重建、文旅配套等同类场景快速复制推广。</p></div>
    </div>
    <div class="card glow" style="text-align:center;padding:30px"><div class="section-title" style="justify-content:center;font-size:18px"><span class="i"></span>展望未来</div><p style="max-width:760px;margin:6px auto;color:var(--text-dim);line-height:1.9">推动“智慧建房”如搭积木般简单普惠，让乡村施工队伍易学易用；为每栋农房建立全生命周期“数字档案”，通过一码溯源实现长效智能运维。<br><b style="color:#9fe9ff">用创新筑巢，为乡亲圆梦，为建设宜居宜业和美乡村贡献新时代青春力量！</b></p></div>`;
  }});

  /* ---------------- 一码溯源 ---------------- */
  M.push({ id: "trace", label: "一码溯源", icon: "fa-qrcode",
    render(el) {
      el.innerHTML = `
      <h2 class="section-title"><span class="i"></span>一码溯源 · 构件唯一“数字身份证”</h2>
      <p class="muted" style="margin:0 0 18px">为每个构件建立唯一数字身份，把 AI 数字表格、拍照留痕与检测数据一一绑定，扫码即可全生命周期信息化追溯与管理。</p>
      <div class="card" style="margin-bottom:18px">
        <div class="searchbar"><input id="cidInput" placeholder="输入构件 ID（cid），如 WQ-3F-A5-01" /><button id="btnSearch" class="btn btn-cyan"><i class="fa fa-search"></i> 查询溯源</button><button id="btnScan" class="btn btn-ghost"><i class="fa fa-qrcode"></i> 模拟扫码</button></div>
        <div class="muted" style="font-size:13px">已入库构件（点击快速查询）：</div>
        <div id="cidList" style="margin-top:6px"></div>
      </div>
      <div id="traceResult"></div>`;
      this.setup(el);
    },
    onShow(el) { if (this._list) this._list(); },
    setup(root) {
      const { $, Store, toast } = window.Platform;
      const STEP_NAMES = { size: "墙体尺寸检查", line: "定位弹线", fix: "固定安装", rebar: "钢筋绑扎" };
      const q = (id) => root.querySelector("#" + id);
      const listCids = async () => {
        const all = await Store.list(); const cids = [];
        all.forEach((r) => { if (r.walls) Object.values(r.walls).forEach((w) => { if (w.cid && !cids.includes(w.cid)) cids.push(w.cid); }); });
        q("cidList").innerHTML = cids.slice(0, 16).map((c) => `<span class="cidpill">${c}</span>`).join("") || '<span class="mute2">暂无数据，请先在“装配慧检”上传记录。</span>';
        root.querySelectorAll(".cidpill").forEach((p) => p.addEventListener("click", () => { q("cidInput").value = p.textContent; search(); }));
        return cids;
      };
      this._list = listCids;
      const verdict = (v) => v === true ? '<span class="badge green">合格</span>' : v === false ? '<span class="badge red">不合格</span>' : '<span class="badge">未判定</span>';
      function initialCidFromUrl() {
        const direct = new URLSearchParams(location.search).get("cid");
        if (direct) return direct;
        const hash = location.hash.split("?")[1] || "";
        return new URLSearchParams(hash).get("cid") || "";
      }
      async function search() {
        const cid = q("cidInput").value.trim(); if (!cid) { q("traceResult").innerHTML = ""; return; }
        const recs = await Store.findByCid(cid);
        if (!recs.length) { q("traceResult").innerHTML = `<div class="card" style="text-align:center;padding:30px"><i class="fa fa-search" style="font-size:30px;color:var(--text-mute)"></i><div class="muted" style="margin-top:10px">未找到构件 <b>${cid}</b> 的溯源记录</div></div>`; return; }
        const r = recs[recs.length - 1];
        const wallNo = Object.keys(r.walls).find((k) => (r.walls[k].cid || "").trim() === cid) || "1";
        const w = r.walls[wallNo]; const stCls = r.status === "合格" ? "green" : r.status === "预警" ? "amber" : "red";
        const steps = w.steps || {};
        const timeline = Object.keys(STEP_NAMES).map((k) => {
          const s = steps[k] || {};
          const done = s.done;
          const photos = Array.isArray(s.photos) ? s.photos : [];
          const c = s.pass === false ? "red" : done ? "green" : "amber";
          const photoHtml = photos.length ? `<div class="trace-photos">${photos.map((p, idx) => {
            const src = typeof p === "string" ? p : p.dataUrl;
            const title = typeof p === "string" ? `照片${idx + 1}` : `${p.name || "照片"} · ${p.time || ""}`;
            return src ? `<img src="${src}" alt="${title}" title="${title}">` : "";
          }).join("")}</div>` : "";
          return `<div class="ev"><div class="dotc" style="background:${c === "green" ? "rgba(16,185,129,.18)" : c === "red" ? "rgba(239,68,68,.18)" : "rgba(245,158,11,.18)"};border:1px solid var(--line)"><i class="fa ${done ? "fa-check" : "fa-clock-o"}" style="color:${c === "green" ? "#6ee7b7" : c === "red" ? "#fca5a5" : "#fcd34d"}"></i></div><div style="flex:1"><b>${STEP_NAMES[k]}</b> ${verdict(s.pass)}<div class="mute2" style="font-size:12px">${done ? `已完成拍照留痕 · ${photos.length} 张照片` : "待完成"}</div>${photoHtml}</div></div>`;
        }).join("");
        q("traceResult").innerHTML = `
        <div class="card glow" style="margin-bottom:16px"><div class="section-title" style="font-size:16px"><span class="i"></span>构件数字身份证 · ${cid}</div>
          <div class="idcard"><div class="qr" id="qrHolder"></div><div style="flex:1;min-width:260px"><div class="grid g2">
            <div><div class="mute2" style="font-size:12px">构件类型</div><b>${w.componentType || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">施工场地</div><b>${w.matchSession || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">图纸编号</div><b>${w.drawingNo || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">楼栋/轴线</div><b>${w.grid || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">项目编号</div><b>${w.pid || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">套筒通透</div><b>${(w.sleeveTotal || 0) - (w.sleeveFailed || 0)}/${w.sleeveTotal || 0}</b></div>
            <div><div class="mute2" style="font-size:12px">记录人</div><b>${r.recorder || "-"}</b></div>
            <div><div class="mute2" style="font-size:12px">上传时间</div><b>${r.uploadTime || "-"}</b></div>
          </div><div style="margin-top:12px;display:flex;gap:10px;align-items:center"><span class="badge ${stCls}" style="font-size:14px;padding:6px 14px">综合判定：${r.status || "-"}</span><span class="badge cyan">合格率 ${r.passRate ?? "-"}%</span></div></div></div>
        </div>
        <div class="card"><div class="section-title" style="font-size:16px"><span class="i"></span>关键工序留痕（全生命周期）</div><div class="timeline">${timeline}</div><div class="muted" style="font-size:12px;margin-top:6px">记录ID：${r.id} · 工位号：${r.workstationNo || "-"} · 施工队伍：${w.teamId || "-"}</div></div>`;
        const holder = q("qrHolder"); holder.innerHTML = "";
        const qrUrl = location.href.split("#")[0].split("?")[0] + `?cid=${encodeURIComponent(cid)}#trace`;
        new QRCode(holder, { text: qrUrl, width: 150, height: 150, colorDark: "#00e5ff", colorLight: "#0b1220", correctLevel: QRCode.CorrectLevel.L });
      }
      q("btnSearch").addEventListener("click", search);
      q("cidInput").addEventListener("keydown", (e) => { if (e.key === "Enter") search(); });
      q("btnScan").addEventListener("click", async () => { const cids = await listCids(); if (!cids.length) { alert("暂无可扫码的构件，请先上传记录。"); return; } q("cidInput").value = cids[Math.floor(Math.random() * cids.length)]; toast("模拟扫码成功"); search(); });
      listCids().then(() => { const cid = initialCidFromUrl(); if (cid) { q("cidInput").value = cid; search(); } });
    },
  });

  /* ---------------- 部署到网址 ---------------- */
  M.push({ id: "deploy", label: "部署上线", icon: "fa-cloud-upload", render(el) {
    el.innerHTML = `
    <h2 class="section-title"><span class="i"></span>部署到网址 · 让平台拥有公开链接</h2>
    <p class="muted" style="margin:0 0 20px">本平台是<b style="color:#9fe9ff">纯静态单页网站</b>，无需服务器即可运行，可直接上传到任意静态托管，几分钟拥有公开网址。数据默认存在访问者浏览器本地，打开即用。</p>
    <div class="card glow" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span><span class="chip">推荐</span> 方案一：GitHub Pages（免费 · 与参考平台同款）</div>
      <ol style="line-height:2;padding-left:20px">
        <li>登录 <a class="link" style="color:var(--cyan)" href="https://github.com" target="_blank">github.com</a>，新建 Public 仓库，如 <code>zhuang-platform</code>。</li>
        <li>把 <code>zhuang</code> 文件夹内<b>全部文件</b>上传到仓库根目录：<pre>git init
git add .
git commit -m "装配式智慧建造指挥中心"
git branch -M main
git remote add origin https://github.com/你的用户名/zhuang-platform.git
git push -u origin main</pre>（或网页 “Add file → Upload files” 拖拽上传。）</li>
        <li>仓库 <b>Settings → Pages</b>，Source 选 <b>Deploy from a branch</b>，Branch 选 <b>main /(root)</b>，保存。</li>
        <li>1–2 分钟后得到网址：<code>https://你的用户名.github.io/zhuang-platform/</code>。</li>
      </ol></div>
    <div class="card" style="margin-bottom:18px"><div class="section-title" style="font-size:16px"><span class="i"></span>方案二：Netlify / Vercel（拖拽上传，最快）</div>
      <ol style="line-height:2;padding-left:20px"><li>打开 <a class="link" style="color:var(--cyan)" href="https://app.netlify.com/drop" target="_blank">app.netlify.com/drop</a>。</li><li>把整个 <code>zhuang</code> 文件夹<b>直接拖到网页上</b>。</li><li>几秒生成网址，如 <code>https://xxxx.netlify.app</code>。</li></ol>
      <p class="muted" style="font-size:13px;margin:0">Vercel 同理：vercel.com → 上传文件夹即可。</p></div>
    <div class="card" style="border-color:rgba(245,158,11,.35)"><div class="section-title" style="font-size:16px"><span class="i" style="background:linear-gradient(180deg,#fbbf24,#f59e0b)"></span>关于数据存储</div>
      <ul class="muted" style="font-size:14px;line-height:2;margin:0;padding-left:20px">
        <li><b style="color:#9fe9ff">静态网址模式：</b>记录保存在每位访问者自己的浏览器（localStorage），首次打开自动注入演示数据，适合展示答辩。</li>
        <li><b style="color:#9fe9ff">本地完整模式：</b>双击 <code>启动平台.bat</code> 启动内置零依赖后端，数据持久化到 <code>backend/data/records.json</code>。</li>
        <li>如需多人共享同一份数据，可将后端部署到云服务器，并在页面设置 <code>window.PLATFORM_API="后端地址"</code> 即可自动联网。</li>
      </ul></div>`;
  }});
})();
